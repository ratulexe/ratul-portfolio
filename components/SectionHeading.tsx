export default function SectionHeading({
  eyebrow,
  title,
  big = false,
}: {
  eyebrow: string;
  title: string;
  big?: boolean;
}) {
  return (
    <div className="mb-9">
      <p className="mb-4.5 inline-block bg-ink px-2.5 py-1 text-sm font-bold tracking-[0.08em] text-paper uppercase">
        {eyebrow}
      </p>
      <h2
        className={`max-w-205 font-display uppercase ${
          big
            ? "text-[clamp(2.6rem,8vw,6rem)] leading-[0.95]"
            : "text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.05]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
