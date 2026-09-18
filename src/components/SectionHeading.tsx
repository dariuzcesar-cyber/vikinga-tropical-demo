interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-sm font-semibold uppercase tracking-widest text-organic">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-forest sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-forest/75 sm:text-lg">{description}</p>
      )}
    </div>
  );
}
