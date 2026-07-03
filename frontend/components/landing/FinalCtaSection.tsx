"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./FinalCtaSection.module.scss";

// Split word animation
function SplitHeading({ lines }: { lines: { text: string; highlight?: boolean }[][] }) {
  return (
    <h2 className={styles.heading}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((segment, si) =>
            segment.text.split(" ").map((word, wi) => (
              <motion.span
                key={`${li}-${si}-${wi}`}
                initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.75,
                  delay: (li * 3 + si + wi) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  styles.splitWord,
                  segment.highlight && styles.headingAccent
                )}
              >
                {word}{" "}
              </motion.span>
            ))
          )}
        </span>
      ))}
    </h2>
  );
}

export default function FinalCtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [badgesVisible, setBadgesVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax glow
  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBadgesVisible(true); },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="final-cta"
      ref={containerRef}
      className={styles.sectionContainer}
    >
      {/* Radial glow blobs */}
      <motion.div
        style={{ y: glowY }}
        className={styles.ambientBlobs}
      >
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </motion.div>

      {/* Grid accent */}
      <div className={styles.gridAccent} />

      <div className={styles.innerContainer}>
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={styles.eyebrowBadge}
        >
          <Sparkles size={12} className="animate-pulse" />
          Sẵn sàng trải nghiệm?
        </motion.div>

        {/* Split-word heading */}
        <SplitHeading
          lines={[
            [{ text: "Chăm sóc trọn vẹn." }],
            [{ text: "Thảnh thơi ", highlight: false }, { text: "trọn đời.", highlight: true }],
          ]}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={styles.description}
        >
          Hãy để NORA Halo One đồng hành cùng bạn trên hành trình nuôi boss cưng
          khoa học, hiện đại và sạch sẽ hơn. Giải phóng đôi bàn tay khỏi công
          việc dọn dẹp mỗi ngày.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className={styles.actions}
        >
          <ButtonLink
            href="#consultation"
            className={styles.btnConsult}
          >
            <MessageSquare size={18} />
            Đăng ký tư vấn miễn phí
          </ButtonLink>

          <ButtonLink
            href="#specs"
            variant="secondary"
            className={styles.btnSpecs}
          >
            Xem thông số chi tiết
            <ArrowRight size={16} />
          </ButtonLink>
        </motion.div>

        {/* Trust badges */}
        <div className={styles.trustBadgesRow}>
          <div className={styles.trustBadgesWrapper}>
            {[
              { icon: "✓", text: "100% Ý tưởng thông minh" },
              { icon: "✓", text: "Hệ sinh thái NORA App" },
              { icon: "✓", text: "Thiết kế hiện đại" },
              { icon: "✓", text: "Bảo hành 24 tháng" },
            ].map((badge, i) => (
              <motion.span
                key={badge.text}
                initial={{ opacity: 0, y: 12 }}
                animate={badgesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={styles.badgeItem}
              >
                <span className={styles.badgeCheckmark}>{badge.icon}</span>
                {badge.text}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
