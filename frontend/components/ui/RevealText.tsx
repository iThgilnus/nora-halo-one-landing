"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function RevealText({
  children,
  className,
  delay = 0,
  duration = 0.8,
  yOffset = 40,
}: RevealTextProps) {
  return (
    <div className={cn("relative overflow-hidden py-1.5", className)}>
      <motion.div
        initial={{ y: yOffset, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1], // easeOutExpo
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
