"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  eyebrow?: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
  className?: string;
}

export function FeatureCard({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  children,
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-card border border-line bg-panel p-6 shadow-sm",
        "transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:border-teal/30 hover:shadow-soft",
        className
      )}
    >
      <div>
        {imageSrc && (
          <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-card bg-panel-soft">
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        )}
        
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal">
            {eyebrow}
          </p>
        )}
        
        <h3 className="mt-4 text-xl font-extrabold leading-snug text-ink transition-colors duration-200 group-hover:text-teal">
          {title}
        </h3>
        
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {description}
        </p>
      </div>

      {children && <div className="mt-5">{children}</div>}
    </article>
  );
}
