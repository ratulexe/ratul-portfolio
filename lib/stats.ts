// Live activity stats, fetched on the server.
//
// On Vercel the page is regenerated in the background at most every REFRESH_SECONDS
// (see `revalidate` in app/page.tsx), so the numbers update on their own — no redeploy.
// If any API is unreachable, the last known values below are shown instead.

import { profile } from "@/data/portfolio";

/** How often the stats are refreshed (seconds). Keep in sync with app/page.tsx. */
export const REFRESH_SECONDS = 21600; // 6 hours

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type Stats = {
  leetcode: { total: number; easy: number; medium: number; hard: number };
  github: {
    repos: number;
    contributionsLastYear: number;
    days: ContributionDay[];
    /** official = GitHub GraphQL API (token), community = public mirror, cached = fallback */
    source: "official" | "community" | "cached";
  };
  live: { leetcode: boolean; github: boolean };
};

// Last known values (12 Nov 2026), used only when an API call fails.
const FALLBACK: Stats = {
  leetcode: { total: 88, easy: 46, medium: 36, hard: 6 },
  github: { repos: 13, contributionsLastYear: 368, days: [], source: "cached" },
  live: { leetcode: false, github: false },
};

const cached = { next: { revalidate: REFRESH_SECONDS } } as const;

async function getJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...cached,
    ...init,
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json() as Promise<T>;
}

async function getLeetCode(): Promise<Stats["leetcode"] | null> {
  const query = `{matchedUser(username:"${profile.handles.leetcode}"){submitStatsGlobal{acSubmissionNum{difficulty count}}}}`;
  try {
    const data = await getJson<{
      data?: {
        matchedUser?: {
          submitStatsGlobal: { acSubmissionNum: { difficulty: string; count: number }[] };
        } | null;
      };
    }>(`https://leetcode.com/graphql?query=${encodeURIComponent(query)}`, {
      headers: { Referer: "https://leetcode.com" },
    });
    const rows = data.data?.matchedUser?.submitStatsGlobal.acSubmissionNum;
    if (!rows) return null;
    const by = (d: string) => rows.find((r) => r.difficulty === d)?.count ?? 0;
    return { total: by("All"), easy: by("Easy"), medium: by("Medium"), hard: by("Hard") };
  } catch {
    return null;
  }
}

const LEVELS: Record<string, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/**
 * Official GitHub GraphQL API — the same calendar shown on your GitHub profile.
 * Needs a token in the GITHUB_TOKEN environment variable (a fine-grained personal
 * access token with no extra permissions is enough; it only reads public data).
 */
async function getGitHubOfficial(token: string): Promise<Stats["github"]> {
  const query = `query($login: String!) {
    user(login: $login) {
      repositories(privacy: PUBLIC, ownerAffiliations: OWNER) { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }`;
  const body = await getJson<{
    data?: {
      user: {
        repositories: { totalCount: number };
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: {
              contributionDays: { date: string; contributionCount: number; contributionLevel: string }[];
            }[];
          };
        };
      } | null;
    };
    errors?: { message: string }[];
  }>("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: profile.handles.github } }),
  });

  const user = body.data?.user;
  if (!user) throw new Error(body.errors?.[0]?.message ?? "GitHub user not found");
  const calendar = user.contributionsCollection.contributionCalendar;
  return {
    repos: user.repositories.totalCount,
    contributionsLastYear: calendar.totalContributions,
    days: calendar.weeks.flatMap((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVELS[d.contributionLevel] ?? 0,
      })),
    ),
    source: "official",
  };
}

/** No-token fallback: GitHub REST for repos + a community mirror of the public calendar. */
async function getGitHubCommunity(): Promise<Stats["github"]> {
  const user = profile.handles.github;
  const [account, contributions] = await Promise.all([
    getJson<{ public_repos: number }>(`https://api.github.com/users/${user}`, {
      headers: { Accept: "application/vnd.github+json" },
    }),
    getJson<{ total: { lastYear: number }; contributions: ContributionDay[] }>(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
    ),
  ]);
  return {
    repos: account.public_repos,
    contributionsLastYear: contributions.total.lastYear,
    days: contributions.contributions,
    source: "community",
  };
}

/** Official API when a token is configured, then the community mirror, then null (→ cached values). */
async function getGitHub(): Promise<Stats["github"] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    try {
      return await getGitHubOfficial(token);
    } catch (err) {
      // Visible in Vercel's function logs — usually an expired or mistyped token.
      console.error("[stats] GitHub official API failed, using fallback:", err);
    }
  }
  try {
    return await getGitHubCommunity();
  } catch {
    return null;
  }
}

export async function getStats(): Promise<Stats> {
  const [leetcode, github] = await Promise.all([getLeetCode(), getGitHub()]);
  return {
    leetcode: leetcode ?? FALLBACK.leetcode,
    github: github ?? FALLBACK.github,
    live: { leetcode: leetcode !== null, github: github !== null },
  };
}
