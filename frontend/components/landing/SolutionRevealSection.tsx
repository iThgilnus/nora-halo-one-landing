"use client";

import { useRef, useState, useEffect, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import styles from "./SolutionRevealSection.module.scss";

type Theme = "dark" | "light";
const themeKey = "nora-theme";
const themeEvent = "nora-theme-change";

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem(themeKey) === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

function subscribeTheme(callback: () => void) {
  window.addEventListener(themeEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(themeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

// 🎨 SVG 1: Minimalist Capsule Contour & Pulsing Halo Ring
function DesignSvg() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bodyOutline" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(20, 184, 166, 0.45)" />
          <stop offset="100%" stopColor="rgba(20, 184, 166, 0.15)" />
        </linearGradient>
      </defs>
      {/* Schematic grid lines */}
      <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(20, 184, 166, 0.08)" strokeDasharray="4 4" />
      <line x1="200" y1="50" x2="200" y2="350" stroke="rgba(20, 184, 166, 0.08)" strokeDasharray="4 4" />

      {/* Main capsule chassis */}
      <rect
        className="designOutline"
        x="110"
        y="60"
        width="180"
        height="280"
        rx="90"
        stroke="url(#bodyOutline)"
        strokeWidth="1.5"
        strokeDasharray="900"
        strokeDashoffset="0"
      />

      {/* Outer entrance frame */}
      <circle cx="200" cy="200" r="66" stroke="rgba(20, 184, 166, 0.25)" strokeWidth="1" />

      {/* Signature glowing Halo Ring */}
      <motion.circle
        className="haloGlowCircle"
        cx="200"
        cy="200"
        r="66"
        fill="url(#haloGlow)"
        opacity="0.65"
        style={{ transformOrigin: "center center" }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      />
      <motion.circle
        className="haloRingPath"
        cx="200"
        cy="200"
        r="66"
        stroke="#14b8a6"
        strokeLinecap="round"
        filter="drop-shadow(0 0 10px #14b8a6)"
        animate={{ strokeWidth: [3, 4.5, 3] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      />

      {/* Ambient data coordinates dots */}
      <motion.circle cx="120" cy="110" r="3" fill="#14b8a6" opacity="0.6" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0 }} />
      <motion.circle cx="280" cy="130" r="2.5" fill="#14b8a6" opacity="0.4" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.12 }} />
      <motion.circle cx="140" cy="290" r="4" fill="#14b8a6" opacity="0.5" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.24 }} />
      <motion.circle cx="260" cy="280" r="3" fill="#14b8a6" opacity="0.3" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.36 }} />
    </svg>
  );
}

// 🛡️ SVG 2: AI Protection Shields & Radar Sweep Field
function TechSvg() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="radarCone" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Machine silhouette base */}
      <rect x="130" y="100" width="140" height="200" rx="70" stroke="rgba(14, 165, 233, 0.2)" strokeWidth="1" />

      {/* Active Radar Sweep Cone Group (rotating 360deg around center) */}
      <motion.g
        className="radarScanGroup"
        style={{ transformOrigin: "200px 200px" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
      >
        <path
          className="radarScanCone"
          d="M 200 200 L 200 80 A 120 120 0 0 1 284.85 115.15 Z"
          fill="url(#radarCone)"
          opacity="0.65"
        />
      </motion.g>

      {/* Concentric Guard Shields */}
      <motion.circle
        className="shieldRing1"
        cx="200"
        cy="200"
        r="80"
        stroke="#0ea5e9"
        strokeWidth="1.2"
        strokeDasharray="6 6"
        opacity="0.85"
        style={{ transformOrigin: "200px 200px" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      />
      <motion.circle
        className="shieldRing2"
        cx="200"
        cy="200"
        r="100"
        stroke="rgba(14, 165, 233, 0.5)"
        strokeWidth="1"
        strokeDasharray="12 8"
        opacity="0.65"
        style={{ transformOrigin: "200px 200px" }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
      <motion.circle
        className="shieldRing3"
        cx="200"
        cy="200"
        r="120"
        stroke="rgba(14, 165, 233, 0.3)"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.45"
        style={{ transformOrigin: "200px 200px" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
      />

      {/* Pulse Radar Wave */}
      <motion.circle
        cx="200"
        cy="200"
        stroke="#0ea5e9"
        strokeWidth="1.5"
        animate={{ r: [40, 110], opacity: [0.8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
      />

      {/* Embedded sensors blinking */}
      <g>
        <circle cx="200" cy="80" r="4" fill="#0ea5e9" />
        <motion.circle
          cx="200"
          cy="80"
          fill="#0ea5e9"
          style={{ transformOrigin: "200px 80px" }}
          animate={{ scale: [0.8, 1.8], opacity: [0.8, 0] }}
          transition={{ repeat: Infinity, duration: 1.3, ease: "easeOut" }}
          r="4"
        />
      </g>
    </svg>
  );
}

// 🍃 SVG 3: Sealed Chamber Airflow & Refreshing Bubbles
function ExperienceSvg() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const color = theme === "light" ? "rgba(17, 20, 17, 0.05)" : "rgba(250, 249, 246, 0.04)";

  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="freshZone" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Schematic chamber walls */}
      <rect x="80" y="80" width="240" height="240" rx="16" fill={color} stroke="rgba(245, 158, 11, 0.12)" strokeWidth="1" />

      {/* Airflow Circulation Loop (dashed curves) */}
      <motion.path
        d="M 120 180 A 80 80 0 0 1 280 180"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />
      <motion.path
        d="M 280 220 A 80 80 0 0 1 120 220"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        animate={{ strokeDashoffset: [0, 20] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />

      {/* Fresh fragrance bubble core */}
      <circle cx="200" cy="200" r="50" fill="url(#freshZone)" />

      {/* Odor particles (Staggered fading drifts) */}
      <motion.circle cx="200" cy="200" r="2.5" fill="#f59e0b" animate={{ x: [0, 35], y: [0, -25], opacity: [0.85, 0] }} transition={{ repeat: Infinity, duration: 2.0, ease: "easeOut", delay: 0 }} />
      <motion.circle cx="200" cy="200" r="3.5" fill="#f59e0b" animate={{ x: [0, 50], y: [0, -40], opacity: [0.85, 0] }} transition={{ repeat: Infinity, duration: 2.0, ease: "easeOut", delay: 0.35 }} />
      <motion.circle cx="200" cy="200" r="2" fill="#f59e0b" animate={{ x: [0, 65], y: [0, -55], opacity: [0.85, 0] }} transition={{ repeat: Infinity, duration: 2.0, ease: "easeOut", delay: 0.7 }} />

      {/* Rising fresh bubbles */}
      <motion.circle cx="160" r="5" fill="#f59e0b" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="0.8" animate={{ y: [220, 165], opacity: [0, 0.75, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: 0 }} />
      <motion.circle cx="240" r="3.5" fill="#f59e0b" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="0.8" animate={{ y: [220, 165], opacity: [0, 0.75, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: 0.5 }} />
      <motion.circle cx="200" r="6" fill="#f59e0b" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="0.8" animate={{ y: [220, 165], opacity: [0, 0.75, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: 1.0 }} />
    </svg>
  );
}

const milestones = [
  {
    id: "design",
    label: "01 / Thiết kế",
    badge: "Ngôn ngữ tối giản",
    title: "Vòng xoay Halo.\nĐiểm nhấn tinh tế.",
    description: "Khối lồng tròn vỏ nhám ôm khít khung chân kim loại mảnh. Đèn báo trạng thái Halo đổi sắc màu trực quan tạo điểm nhấn sang trọng.",
    svg: <DesignSvg />,
    bottomLabel: "Tinh hoa tối giản",
    metrics: [
      { label: "Vật liệu khung vỏ", value: "Nhựa ABS kháng khuẩn" },
      { label: "Bán kính xoay", value: "320mm Gọn gàng", isHighlight: true }
    ]
  },
  {
    id: "technology",
    label: "02 / Công nghệ",
    badge: "An toàn chủ động",
    title: "Mạng cảm biến.\nBảo vệ boss 3 lớp.",
    description: "Nhận dạng khoảng cách xa bằng camera hồng ngoại góc rộng, radar nhiệt lối vào cabin và hệ cảm biến lực bốn góc đế.",
    svg: <TechSvg />,
    bottomLabel: "Bảo vệ boss toàn diện",
    metrics: [
      { label: "Mạng cảm biến", value: "10 Cảm biến thông minh" },
      { label: "Độ nhạy radar", value: "80ms Phản hồi", isHighlight: true }
    ]
  },
  {
    id: "experience",
    label: "03 / Trải nghiệm",
    badge: "Thảnh thơi trọn vẹn",
    title: "Sạch hoàn toàn.\nThảnh thơi trọn đời.",
    description: "Tự động làm sạch, khóa mùi kín 72 giờ và đồng bộ ứng dụng NORA giúp theo dõi sức khỏe boss mọi lúc.",
    svg: <ExperienceSvg />,
    bottomLabel: "Thảnh thơi trọn đời",
    metrics: [
      { label: "Hộc mùi kín", value: "72h Không mùi" },
      { label: "Độ ồn hoạt động", value: "≤36dB Siêu êm", isHighlight: true }
    ]
  }
];

export function SolutionRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);

  // Desktop horizontal scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        setScrollDistance(trackRef.current.scrollWidth - window.innerWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest * 100);
    const index = Math.min(
      Math.floor(latest * milestones.length),
      milestones.length - 1
    );
    setActiveIndex(index);
  });

  const scrollToIndex = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const start = window.scrollY + rect.top;
    const scrollableDist = el.clientHeight - window.innerHeight;
    const target = start + scrollableDist * (index / (milestones.length - 1));
    window.scrollTo({
      top: target,
      behavior: "smooth"
    });
  };

  const handleMobileScroll = () => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(`.${styles.mobCard}`);
    const containerRect = el.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardDiv = card as HTMLDivElement;
      const cardRect = cardDiv.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const dist = Math.abs(containerCenter - cardCenter);

      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollMobileTo = (index: number) => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(`.${styles.mobCard}`);
    const targetCard = cards[index] as HTMLDivElement;
    if (targetCard) {
      const containerRect = el.getBoundingClientRect();
      const cardRect = targetCard.getBoundingClientRect();
      const scrollTarget = cardRect.left - containerRect.left + el.scrollLeft - (containerRect.width - cardRect.width) / 2;

      el.scrollTo({
        left: scrollTarget,
        behavior: "smooth"
      });
    }
  };

  return (
    <div
      ref={sectionRef}
      id="product-explorer"
      className={cn(
        styles.sectionContainer,
        activeIndex === 1 && styles.activeStep1,
        activeIndex === 2 && styles.activeStep2
      )}
    >
      {/* 🖥️ DESKTOP VIEWPORT */}
      <div className={styles.desktopViewport}>
        <div className={styles.ambientRadial} />
        <div className={styles.dotGrid} />

        {/* Global Progress Indicators Header */}
        <div className={styles.headerArea}>
          <div>
            <div className={styles.eyebrowBadge}>
              <Sparkles size={12} />
              Trình diễn công năng
            </div>
          </div>

          <div className={styles.progressArea}>
            <div className={styles.progressLine}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            <div className={styles.controlsRow}>
              {/* Pagination Dots */}
              <div className={styles.dotsRow}>
                {milestones.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => scrollToIndex(i)}
                    className={cn(styles.dotButton, activeIndex === i && styles.active)}
                    style={{ width: activeIndex === i ? "2rem" : "0.5rem" }}
                  />
                ))}
              </div>

              {/* Navigation Actions */}
              <div className={styles.dotsRow}>
                <button
                  onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className={styles.navButton}
                  aria-label="Previous Slide"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => scrollToIndex(Math.min(milestones.length - 1, activeIndex + 1))}
                  disabled={activeIndex === milestones.length - 1}
                  className={styles.navButton}
                  aria-label="Next Slide"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div style={{ x }} ref={trackRef} className={styles.horizontalTrack}>
          {milestones.map((milestone) => (
            <div key={milestone.id} className={styles.milestoneCard}>
              {/* Left Side Info Panel */}
              <div className={styles.cardInfo}>
                <div>
                  <span className={styles.cardLabel}>{milestone.label}</span>
                  <h3 className={styles.cardTitle}>{milestone.title}</h3>
                  <p className={styles.cardDescription}>{milestone.description}</p>
                </div>

                <div className={styles.cardMetricsArea}>
                  <div className={styles.cardMetricsGrid}>
                    {milestone.metrics.map((metric, i) => (
                      <div key={i} className={styles.metricBlock}>
                        <span className={styles.metricLabel}>{metric.label}</span>
                        <div
                          className={cn(
                            styles.metricValue,
                            metric.isHighlight && styles.tealHighlight
                          )}
                        >
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side Animated Vector SVG Panel */}
              <div className={styles.cardImageFrame}>
                <div className={styles.svgWrapper}>
                  {milestone.svg}
                </div>

                <div className={styles.cardBottomLabel}>
                  <span>{milestone.bottomLabel}</span>
                  <span>{milestone.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 📱 MOBILE VIEWPORT */}
      <div className={styles.mobileViewport}>
        <div className={styles.mobileInner}>
          <div className={styles.mobHeaderArea}>
            <div className={styles.eyebrowBadge}>
              <Sparkles size={12} />
              Trình diễn công năng
            </div>
            <h2 className={styles.mobHeadingTitle}>Trải nghiệm thông minh</h2>
            <p className={styles.mobHeadingDesc}>
              Khám phá giải pháp chăm sóc mèo vượt trội qua 3 phương diện chính.
            </p>
          </div>

          {/* Svg display area (peeks at active index SVG) */}
          <div className={styles.mobileSvgContainer}>
            <div className={styles.mobileSvgBorderWrapper}>
              <div className={styles.mobileSvgInnerFrame}>
                <div className={styles.mobSvgOverlayRadial} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className={styles.mobileSvgWrapper}
                  >
                    {milestones[activeIndex].svg}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Horizontal Track of info cards */}
          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className={styles.mobileTrack}
          >
            {milestones.map((milestone, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={milestone.id}
                  className={cn(styles.mobCard, isActive && styles.activeMobCard)}
                >
                  <span className={styles.mobCardLabel}>{milestone.label}</span>
                  <h3 className={styles.mobCardTitle}>{milestone.title}</h3>
                  <p className={styles.mobCardDesc}>{milestone.description}</p>
                  
                  <div className={styles.mobMetricsGrid}>
                    {milestone.metrics.map((metric, i) => (
                      <div key={i} className={styles.mobMetricItem}>
                        <span className={styles.mobMetricLabel}>{metric.label}</span>
                        <span className={styles.mobMetricValue}>{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.mobileControls}>
            <div className={styles.progressDots}>
              {milestones.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollMobileTo(i)}
                  className={cn(
                    styles.progressDot,
                    activeIndex === i && styles.active
                  )}
                  style={{
                    width: activeIndex === i ? 24 : 6,
                    opacity: activeIndex === i ? 1 : 0.3
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
