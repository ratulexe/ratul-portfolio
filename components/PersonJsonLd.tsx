import { contacts, profile, siteDescription, siteUrl, skillGroups } from "@/data/portfolio";

/**
 * schema.org "Person" structured data — helps Google show your name, role and
 * profile links correctly in search results. Everything comes from data/portfolio.ts.
 * Validate at https://search.google.com/test/rich-results
 */
export default function PersonJsonLd() {
  const sameAs = contacts.filter((c) => c.external).map((c) => c.href);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    image: `${siteUrl}${profile.portrait}`,
    description: siteDescription,
    jobTitle: "Web Developer",
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.city,
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.university,
    },
    knowsAbout: [
      ...skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
    ],
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      // Escaping "<" prevents the JSON from ever closing the <script> tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
    />
  );
}
