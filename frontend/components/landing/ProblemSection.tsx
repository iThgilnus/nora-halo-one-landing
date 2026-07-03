"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import styles from "./ProblemSection.module.scss";

const painPoints = [
  {
    id: "smell",
    title: "Mùi khó chịu tích tụ theo giờ",
    description:
      "Ammoniac và hợp chất hữu cơ từ chất thải bốc lên liên tục. Dù thông gió tốt, không khí trong nhà vẫn bị ảnh hưởng rõ rệt sau vài giờ.",
    stat: { value: "3×", label: "mỗi ngày" },
    colorTheme: "themeOrange",
    hudType: "ammonia",
  },
  {
    id: "time",
    title: "15 phút dọn dẹp lặp lại mỗi ngày",
    description:
      "Xúc cát, đổ túi, lau chùi, thay cát mới. Công việc nhỏ nhưng tích lũy thành hàng chục giờ mỗi tháng bị lãng phí vào chăm sóc vệ sinh thủ công.",
    stat: { value: "15'", label: "mỗi lần" },
    colorTheme: "themeCyan",
    hudType: "time",
  },
  {
    id: "health",
    title: "Vệ sinh không đều ảnh hưởng boss",
    description:
      "Mèo cực kỳ nhạy cảm với môi trường vệ sinh. Khay bẩn khiến boss stress, nhịn tiểu, thậm chí từ chối sử dụng — dẫn đến các vấn đề tiết niệu nghiêm trọng.",
    stat: { value: "72h", label: "tối đa nhịn" },
    colorTheme: "themeRed",
    hudType: "stress",
  },
];

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Desktop Scroll-driven animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background image pan/zoom mapping
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.25, 1.12]);
  const imageX = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "5%", "-6%"]);
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "4%", "-5%"]);

  // Gauges values mapping (Desktop)
  const ammoniaValue = useTransform(scrollYProgress, [0, 0.33], [15, 85]);
  const ammoniaHeight = useTransform(scrollYProgress, [0, 0.33], ["15%", "85%"]);

  const timeValue = useTransform(scrollYProgress, [0.33, 0.66], [0, 100]);
  const circleOffset = useTransform(scrollYProgress, [0.33, 0.66], [377, 0]);

  const stressValue = useTransform(scrollYProgress, [0.66, 1], [10, 95]);

  // States to hold formatted string values for text nodes to avoid layout thrashing
  const [ammoniaText, setAmmoniaText] = useState("15%");
  const [timeText, setTimeText] = useState("0");
  const [stressText, setStressText] = useState("10%");

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine active index
    const idx = Math.min(2, Math.floor(latest * 2.999));
    setActiveIndex(idx);
  });

  useMotionValueEvent(ammoniaValue, "change", (latest) => {
    setAmmoniaText(`${Math.round(latest)}%`);
  });

  useMotionValueEvent(timeValue, "change", (latest) => {
    const hours = Math.round((latest / 100) * 91);
    setTimeText(`${hours}`);
  });

  useMotionValueEvent(stressValue, "change", (latest) => {
    setStressText(`${Math.round(latest)}%`);
  });

  const getGlowClass = () => {
    if (activeIndex === 0) return styles.glowOrange;
    if (activeIndex === 1) return styles.glowCyan;
    return styles.glowRed;
  };

  return (
    <div ref={containerRef} id="experience" className={styles.sectionContainer}>
      <div className={styles.pinWrapper}>
        <div className={styles.gridContainer}>
          
          {/* LEFT COLUMN: Minimalist watch-face canvas (Desktop Only) */}
          <div className={styles.visualColumn}>
            <div className={styles.visualFrame}>
              <motion.div
                style={{ scale: imageScale, x: imageX, y: imageY }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src="/assets/story/problem-manual-litter-lifestyle.webp"
                  alt="Manual litter cleaning struggle"
                  fill
                  sizes="45vw"
                  className={styles.backgroundImage}
                  priority
                  unoptimized
                />
              </motion.div>
              <div className={styles.gradientOverlay} />
              
              {/* Ultra smooth atmospheric glow wash */}
              <div className={cn(styles.ambientGlow, getGlowClass())} />

              <div className={styles.complicationContainer}>
                {/* WIDGET 1: ODOR LEVEL METER */}
                <div className={cn(styles.widgetPane, activeIndex === 0 && styles.active)}>
                  <div className={styles.verticalMeterWrapper}>
                    <div className={styles.verticalTrack}>
                      <motion.div style={{ height: ammoniaHeight }} className={styles.verticalFill} />
                    </div>
                    <span className={styles.compLabel}>Nồng độ khí độc</span>
                    <span className={styles.compValue}>{ammoniaText}</span>
                  </div>
                </div>

                {/* WIDGET 2: TIME RING COMPLICATION */}
                <div className={cn(styles.widgetPane, activeIndex === 1 && styles.active)}>
                  <div className={styles.circleComplication}>
                    <svg className={styles.circleSvg} viewBox="0 0 130 130">
                      <circle className={styles.circleTrack} cx="65" cy="65" r="60" />
                      <motion.circle
                        style={{ strokeDashoffset: circleOffset }}
                        className={styles.circleFill}
                        cx="65"
                        cy="65"
                        r="60"
                      />
                    </svg>
                    <div className={styles.circleText}>
                      <span className={styles.circleNum}>
                        +{timeText}
                      </span>
                      <span className={styles.compLabel} style={{ marginTop: '0.25rem' }}>Giờ / Năm</span>
                    </div>
                  </div>
                  <span className={styles.compLabel}>Thời gian hao phí</span>
                </div>

                {/* WIDGET 3: HEALTH ECG SINE WAVE */}
                <div className={cn(styles.widgetPane, activeIndex === 2 && styles.active)}>
                  <div className={styles.ecgWaveWrapper}>
                    <svg className={styles.ecgSvg} viewBox="0 0 260 80">
                      <path
                        className={styles.ecgPath}
                        d="M0,40 L60,40 L65,15 L70,65 L75,40 L120,40 L125,5 L132,75 L138,40 L180,40 L185,15 L190,65 L195,40 L260,40"
                      />
                      <path
                        className={styles.ecgPathActive}
                        d="M0,40 L60,40 L65,15 L70,65 L75,40 L120,40 L125,5 L132,75 L138,40 L180,40 L185,15 L190,65 L195,40 L260,40"
                      />
                    </svg>
                  </div>
                  <span className={styles.compLabel}>
                    Chỉ số stress của Boss
                    <span className={styles.healthAlertDot} />
                  </span>
                  <span className={styles.healthValue}>{stressText}</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Focus-shifting timeline cards */}
          <div className={styles.textColumn}>
            <div className={styles.headingArea}>
              <div className={styles.eyebrowBadge}>
                <AlertTriangle size={12} />
                Thói quen cũ
              </div>
              <h2 className={styles.headingTitle}>
                Một việc nhỏ, <br />
                <span className={styles.headingTitleAccent}>lặp lại mỗi ngày.</span>
              </h2>
              <p className={styles.headingSubtext}>
                Dành 15 phút mỗi ngày dọn dẹp khay cát thủ công tích lũy thành hàng chục giờ hao phí mỗi tháng cùng nhiều rủi ro sức khỏe tiềm ẩn.
              </p>
            </div>

            <div className={styles.timelineWrapper}>
              {/* CARD 1 */}
              <div
                ref={card1Ref}
                className={cn(
                  styles.timelineCard,
                  styles.themeOrange,
                  activeIndex === 0 && styles.active
                )}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>01 // KHÔNG KHÍ</span>
                  <h4 className={styles.cardTitle}>{painPoints[0].title}</h4>
                </div>
                
                {/* Mobile Inline Widget 1 */}
                <div className={styles.mobileComplication}>
                  <div className={styles.verticalMeterWrapper} style={{ transform: 'scale(0.85)' }}>
                    <div className={styles.verticalTrack} style={{ height: 100 }}>
                      <motion.div
                        initial={{ height: "15%" }}
                        whileInView={{ height: "85%" }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={styles.verticalFill}
                      />
                    </div>
                    <span className={styles.compValue} style={{ fontSize: '1.5rem' }}>85%</span>
                  </div>
                </div>

                <p className={styles.cardDescription}>{painPoints[0].description}</p>
                <div className={styles.cardStat}>
                  <span className={styles.statValue}>{painPoints[0].stat.value}</span>
                  <span className={styles.statLabel}>{painPoints[0].stat.label}</span>
                </div>
              </div>

              {/* CARD 2 */}
              <div
                ref={card2Ref}
                className={cn(
                  styles.timelineCard,
                  styles.themeCyan,
                  activeIndex === 1 && styles.active
                )}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>02 // HAO PHÍ</span>
                  <h4 className={styles.cardTitle}>{painPoints[1].title}</h4>
                </div>

                {/* Mobile Inline Widget 2 */}
                <div className={styles.mobileComplication}>
                  <div className={styles.circleComplication} style={{ width: 100, height: 100, marginBottom: 0 }}>
                    <svg className={styles.circleSvg} viewBox="0 0 130 130">
                      <circle className={styles.circleTrack} cx="65" cy="65" r="60" />
                      <motion.circle
                        initial={{ strokeDashoffset: 377 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={styles.circleFill}
                        cx="65"
                        cy="65"
                        r="60"
                      />
                    </svg>
                    <div className={styles.circleText}>
                      <span className={styles.circleNum} style={{ fontSize: '1.5rem' }}>
                        +91
                      </span>
                      <span className={styles.compLabel} style={{ fontSize: '0.5rem' }}>Giờ / Năm</span>
                    </div>
                  </div>
                </div>

                <p className={styles.cardDescription}>{painPoints[1].description}</p>
                <div className={styles.cardStat}>
                  <span className={styles.statValue}>{painPoints[1].stat.value}</span>
                  <span className={styles.statLabel}>{painPoints[1].stat.label}</span>
                </div>
              </div>

              {/* CARD 3 */}
              <div
                ref={card3Ref}
                className={cn(
                  styles.timelineCard,
                  styles.themeRed,
                  activeIndex === 2 && styles.active
                )}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>03 // SỨC KHỎE BOSS</span>
                  <h4 className={styles.cardTitle}>{painPoints[2].title}</h4>
                </div>

                {/* Mobile Inline Widget 3 */}
                <div className={styles.mobileComplication}>
                  <div className={styles.widgetPane} style={{ opacity: 1, padding: 0 }}>
                    <div className={styles.ecgWaveWrapper} style={{ height: 40, width: 160 }}>
                      <svg className={styles.ecgSvg} viewBox="0 0 260 80">
                        <path
                          className={styles.ecgPath}
                          d="M0,40 L60,40 L65,15 L70,65 L75,40 L120,40 L125,5 L132,75 L138,40 L180,40 L185,15 L190,65 L195,40 L260,40"
                        />
                        <motion.path
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          className={styles.ecgPathActive}
                          d="M0,40 L60,40 L65,15 L70,65 L75,40 L120,40 L125,5 L132,75 L138,40 L180,40 L185,15 L190,65 L195,40 L260,40"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <p className={styles.cardDescription}>{painPoints[2].description}</p>
                <div className={styles.cardStat}>
                  <span className={styles.statValue}>{painPoints[2].stat.value}</span>
                  <span className={styles.statLabel}>{painPoints[2].stat.label}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
