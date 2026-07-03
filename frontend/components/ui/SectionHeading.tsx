import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-lime">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-4xl leading-[1.03] text-ink md:text-6xl">
        <span className="font-extrabold">{title}</span>
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
