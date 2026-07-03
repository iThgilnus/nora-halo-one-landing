import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const baseStyles =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-card px-5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

const variants = {
  primary:
    "bg-charcoal text-ivory shadow-[0_4px_20px_rgba(17,20,13,0.15)] hover:bg-teal hover:text-charcoal hover:shadow-[0_0_20px_var(--color-teal)]",
  secondary:
    "border border-line bg-white/40 text-charcoal backdrop-blur-sm hover:border-teal hover:bg-teal-soft hover:text-teal",
  ghost:
    "text-charcoal hover:bg-teal-soft hover:text-teal",
};

export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
