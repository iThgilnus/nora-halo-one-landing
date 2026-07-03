import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionLabelProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  withLines?: boolean;
}

export function SectionLabel({
  children,
  className,
  glow = true,
  withLines = false,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-teal font-sans",
        className
      )}
    >
      {withLines && <span className="h-[1px] w-6 bg-teal/40" />}
      
      {glow && (
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]"></span>
        </span>
      )}
      
      <span>{children}</span>
      
      {withLines && <span className="h-[1px] w-6 bg-teal/40" />}
    </div>
  );
}
