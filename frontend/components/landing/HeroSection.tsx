"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./HeroSection.module.scss";

// Split text into animatable word spans
function SplitWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={styles.splitWords}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const smoothGridY = useSpring(gridY, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={containerRef}
      id="top"
      className={styles.sectionContainer}
    >
      {/* Background Parallax Grid */}
      <motion.div
        style={{ y: smoothGridY }}
        className={styles.parallaxGrid}
      />

      {/* Radial vignette */}
      <div className={styles.vignette} />

      <motion.div
        style={{ scale, opacity, y }}
        className={styles.contentGrid}
      >
        {/* Left Column: Content */}
        <div className={styles.textCol}>
          <div className={styles.textContainer}>
            {/* Status Badge — entrance */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={styles.statusBadge}
            >
              <span className={styles.pingWrapper}>
                <span className={styles.pingDotActive}></span>
                <span className={styles.pingDotBase}></span>
              </span>
              Giám sát | Halo One trực tuyến
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={styles.eyebrow}
            >
              HỘP VỆ SINH MÈO TỰ ĐỘNG
            </motion.p>

            {/* Heading — split words */}
            <h1 className={styles.heading}>
              <SplitWords text="Sạch hơn mỗi ngày." delay={0.2} />
              <br />
              <SplitWords
                text="Nhẹ đầu hơn mỗi tối."
                delay={0.45}
                className={styles.highlightedText}
              />
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className={styles.subtext}
            >
              Tự động làm sạch, kiểm soát mùi và theo dõi an toàn — để bạn chăm
              mèo dễ dàng hơn mà không phải dọn khay cát liên tục.
            </motion.p>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <ButtonLink
                href="#experience"
                variant="ghost"
                className={styles.btnExplore}
                data-track-event="hero_explore_click"
                data-track-section="hero"
              >
                <ArrowDown size={18} />
                Khám phá cách hoạt động
              </ButtonLink>

              <ButtonLink
                href="#product-explorer"
                variant="secondary"
                className={styles.btnProduct}
                data-track-event="hero_explorer_click"
                data-track-section="hero"
              >
                <MessageCircle size={18} />
                Xem thiết kế sản phẩm
              </ButtonLink>
            </div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className={styles.statsRow}
            >
              {[
                { value: "10+", label: "Cảm biến" },
                { value: "74L", label: "Khoang chứa" },
                { value: "36dB", label: "Êm ái" },
              ].map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <p className={styles.statVal}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className={styles.imageCol}>
          <Image
            src="/assets/hero/hero-main-product-lifestyle.webp"
            alt="NORA Halo One smart cat care station in a modern cat-friendly home"
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={styles.heroImage}
          />
          {/* Gradient overlays */}
          <div className={styles.darkOverlay} />
          <div className={styles.bottomFade} />
          <div className={styles.leftFade} />
        </div>
      </motion.div>
    </section>
  );
}
