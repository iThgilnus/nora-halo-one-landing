"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./SolutionRevealSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

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
      <circle className="haloGlowCircle" cx="200" cy="200" r="66" fill="url(#haloGlow)" opacity="0.65" />
      <circle
        className="haloRingPath"
        cx="200"
        cy="200"
        r="66"
        stroke="#14b8a6"
        strokeWidth="3"
        strokeLinecap="round"
        filter="drop-shadow(0 0 10px #14b8a6)"
      />

      {/* Ambient data coordinates dots */}
      <circle className="designParticle" cx="120" cy="110" r="3" fill="#14b8a6" opacity="0.6" />
      <circle className="designParticle" cx="280" cy="130" r="2.5" fill="#14b8a6" opacity="0.4" />
      <circle className="designParticle" cx="140" cy="290" r="4" fill="#14b8a6" opacity="0.5" />
      <circle className="designParticle" cx="260" cy="280" r="3" fill="#14b8a6" opacity="0.3" />
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
      <g className="radarScanGroup">
        <path
          className="radarScanCone"
          d="M 200 200 L 200 80 A 120 120 0 0 1 284.85 115.15 Z"
          fill="url(#radarCone)"
          opacity="0.65"
        />
      </g>

      {/* Concentric Guard Shields */}
      <circle
        className="shieldRing1"
        cx="200"
        cy="200"
        r="80"
        stroke="#0ea5e9"
        strokeWidth="1.2"
        strokeDasharray="6 6"
        opacity="0.85"
      />
      <circle
        className="shieldRing2"
        cx="200"
        cy="200"
        r="100"
        stroke="rgba(14, 165, 233, 0.5)"
        strokeWidth="1"
        strokeDasharray="12 8"
        opacity="0.65"
      />
      <circle
        className="shieldRing3"
        cx="200"
        cy="200"
        r="120"
        stroke="rgba(14, 165, 233, 0.3)"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.45"
      />

      {/* Pulse Radar Wave */}
      <circle className="radarPulseWave" cx="200" cy="200" r="40" stroke="#0ea5e9" strokeWidth="1.5" opacity="0" />

      {/* Center Blinking Sensor Node */}
      <circle cx="200" cy="200" r="5" fill="#0ea5e9" />
      <circle className="sensorBlink" cx="200" cy="200" r="10" stroke="#0ea5e9" strokeWidth="1" opacity="0.75" />
    </svg>
  );
}

// 🍃 SVG 3: Airflow lines & Carbon filtration
function ExperienceSvg() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#eab308" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#eab308" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Machine Outline */}
      <rect x="120" y="80" width="160" height="240" rx="80" stroke="rgba(234, 179, 8, 0.18)" strokeWidth="1" />

      {/* Sealed Carbon Filter Block */}
      <rect x="220" y="140" width="45" height="70" rx="8" fill="rgba(234, 179, 8, 0.08)" stroke="rgba(234, 179, 8, 0.3)" strokeWidth="1" />

      {/* Airflow Curves */}
      <path
        className="airflowLine airflowLine1"
        d="M 155 260 C 170 210, 195 200, 235 180"
        stroke="url(#flowGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="8 8"
      />
      <path
        className="airflowLine airflowLine2"
        d="M 145 235 C 175 190, 195 180, 235 170"
        stroke="url(#flowGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="6 6"
      />
      <path
        className="airflowLine airflowLine3"
        d="M 165 270 C 185 230, 205 210, 235 190"
        stroke="url(#flowGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="7 7"
      />

      {/* Floating odor particles dissolving */}
      <circle className="odorParticle" cx="150" cy="255" r="3.5" fill="#eab308" opacity="0.8" />
      <circle className="odorParticle" cx="180" cy="225" r="3" fill="#eab308" opacity="0.6" />
      <circle className="odorParticle" cx="205" cy="200" r="2.5" fill="#eab308" opacity="0.4" />

      {/* Purified fresh air bubbles */}
      <circle className="cleanBubble" cx="255" cy="120" r="4.5" fill="#eab308" stroke="rgba(234, 179, 8, 0.4)" strokeWidth="1" opacity="0.6" />
      <circle className="cleanBubble" cx="275" cy="100" r="3" fill="#eab308" stroke="rgba(234, 179, 8, 0.4)" strokeWidth="1" opacity="0.4" />
      <circle className="cleanBubble" cx="245" cy="90" r="4" fill="#eab308" stroke="rgba(234, 179, 8, 0.4)" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

interface Milestone {
  id: string;
  label: string;
  badge: string;
  title: string;
  description: string;
  svg: React.ReactNode;
  bottomLabel: string;
  metrics: {
    label: string;
    value: string;
    isHighlight?: boolean;
  }[];
}

const milestones: Milestone[] = [
  {
    id: "design",
    label: "01 / Thiết kế",
    badge: "Thiết kế tương lai",
    title: "Halo One.\nThiết kế từ tương lai.",
    description: "Tích hợp màng lọc khép kín và hệ thống cảm biến trong diện mạo tối giản như một tác phẩm nghệ thuật.",
    svg: <DesignSvg />,
    bottomLabel: "Nâng tầm không gian sống",
    metrics: [
      { label: "Kiểu dáng", value: "Trụ tròn tối giản" },
      { label: "Tiết diện", value: "Tiết kiệm 30%", isHighlight: true }
    ]
  },
  {
    id: "tech",
    label: "02 / Công nghệ",
    badge: "Bảo vệ đa lớp",
    title: "10 lớp bảo vệ.\nAn toàn tuyệt đối.",
    description: "Mạng lưới radar hồng ngoại, cảm biến lực, cảm biến Hall và camera AI phối hợp thời gian thực, phản hồi an toàn tức thì.",
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
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const track = trackRef.current;
      if (!section || !sticky || !track) return;

      const getDistance = () => {
        return track.scrollWidth - window.innerWidth;
      };

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      let tl: gsap.core.Tween | null = null;

      if (isDesktop) {
        // 1. GSAP ScrollTrigger timeline to drive horizontal sliding
        tl = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.8,
            start: "top 72px",
            end: () => `+=${Math.max(getDistance(), window.innerHeight * 2.5)}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              setScrollProgress(progress * 100);

              const index = Math.min(
                Math.floor(progress * milestones.length),
                milestones.length - 1
              );
              setActiveIndex(index);
            }
          }
        });
      }

      // 2. SVG 1 (Design) continuous breathing and float animations
      gsap.to(".haloRingPath", {
        strokeWidth: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        duration: 1.6
      });
      gsap.to(".haloGlowCircle", {
        scale: 1.06,
        transformOrigin: "center center",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        duration: 1.6
      });
      gsap.to(".designParticle", {
        y: -8,
        stagger: 0.12,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        duration: 2.2
      });

      // 3. SVG 2 (Tech) radar spins, cone sweeps, and blinking nodes
      gsap.to(".shieldRing1", {
        rotation: 360,
        transformOrigin: "center center",
        ease: "none",
        repeat: -1,
        duration: 12
      });
      gsap.to(".shieldRing2", {
        rotation: -360,
        transformOrigin: "center center",
        ease: "none",
        repeat: -1,
        duration: 20
      });
      gsap.to(".shieldRing3", {
        rotation: 360,
        transformOrigin: "center center",
        ease: "none",
        repeat: -1,
        duration: 32
      });
      gsap.to(".radarScanGroup", {
        rotation: 360,
        svgOrigin: "200 200",
        ease: "none",
        repeat: -1,
        duration: 3.5
      });
      gsap.fromTo(".radarPulseWave", {
        r: 40,
        opacity: 0.8
      }, {
        r: 110,
        opacity: 0,
        duration: 1.8,
        repeat: -1,
        ease: "power1.out"
      });
      gsap.fromTo(".sensorBlink", {
        scale: 0.8,
        opacity: 0.8,
        transformOrigin: "center center"
      }, {
        scale: 1.8,
        opacity: 0,
        duration: 1.3,
        repeat: -1,
        ease: "power1.out"
      });

      // 4. SVG 3 (Experience) continuous airflow dashes and fresh bubbles rising
      gsap.to(".airflowLine", {
        strokeDashoffset: -20,
        ease: "none",
        repeat: -1,
        duration: 1.2
      });
      gsap.fromTo(".odorParticle", {
        x: 0,
        y: 0,
        opacity: 0.85
      }, {
        x: (i) => i * 15 + 20,
        y: (i) => -i * 15 - 10,
        opacity: 0,
        stagger: { each: 0.35, repeat: -1 },
        duration: 2.0,
        ease: "power1.out"
      });
      gsap.fromTo(".cleanBubble", {
        y: 20,
        opacity: 0
      }, {
        y: -35,
        opacity: 0.75,
        repeat: -1,
        duration: 2.2,
        stagger: 0.5,
        ease: "sine.out"
      });

      return () => {
        if (tl) {
          tl.scrollTrigger?.kill();
          tl.kill();
        }
      };
    },
    { dependencies: [], scope: sectionRef }
  );

  const scrollToIndex = (index: number) => {
    const trigger = ScrollTrigger.getAll().find(st => st.vars.trigger === sectionRef.current);
    if (trigger) {
      const start = trigger.start;
      const total = trigger.end - start;
      const target = start + total * (index / (milestones.length - 1));
      window.scrollTo({
        top: target,
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
      <div ref={stickyRef} className={styles.desktopViewport}>
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
        <div ref={trackRef} className={styles.horizontalTrack}>
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
        </div>
      </div>

      {/* 📱 MOBILE VIEWPORT */}
      <div className={styles.mobileViewport}>
        <div className={styles.mobileInner}>
          <div className={styles.mobHeaderArea}>
            <div className={styles.eyebrowBadge}>
              <Sparkles size={12} />
              Hoạt họa chức năng
            </div>
            <h2 className={styles.mobTitle}>
              Khám phá{" "}
              <span className={styles.headingTitleAccent}>
                Halo One
              </span>
            </h2>
            <p className={styles.mobSubtext}>
              Nhấn các tab dưới đây để khám phá các khía cạnh công nghệ khác nhau của dòng sản phẩm Halo One qua bản vẽ động.
            </p>
          </div>

          {/* Segmented Control Tabs */}
          <div className={styles.mobTabsRow}>
            {milestones.map((milestone, idx) => {
              const shortLabels = ["Thiết kế", "Bảo vệ", "Tiện ích"];
              return (
                <button
                  key={milestone.id}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    styles.mobTabButton,
                    activeIndex === idx && styles.activeTab
                  )}
                >
                  <span className={styles.tabNum}>{`0${idx + 1}`}</span>
                  <span className={styles.tabText}>{shortLabels[idx]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Card Container with Fade Animation */}
          <div key={activeIndex} className={cn(styles.mobCard, styles.mobCardActive)}>
            <div className={styles.mobImageFrame}>
              <div className={styles.svgWrapper}>
                {milestones[activeIndex].svg}
              </div>
              <span className={styles.mobBadgeNum}>{`0${activeIndex + 1}`}</span>
            </div>

            <div className={styles.mobContent}>
              <span className={styles.eyebrow}>{milestones[activeIndex].badge}</span>
              <h3 className={styles.mobCardTitle}>{milestones[activeIndex].title}</h3>
              <p className={styles.mobCardDesc}>{milestones[activeIndex].description}</p>

              <div className={styles.mobCardFooter}>
                {milestones[activeIndex].metrics.map((metric, i) => (
                  <div key={i}>
                    <span className={styles.metricLabel}>{metric.label}</span>
                    <div
                      className={cn(
                        styles.metricValue,
                        styles.tealHighlight,
                        "text-sm"
                      )}
                    >
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.mobControlsRow}>
            {/* Pagination dots for mobile */}
            <div className={styles.dotsRow}>
              {milestones.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to mobile slide ${i + 1}`}
                  onClick={() => setActiveIndex(i)}
                  className={cn(styles.dotButton, activeIndex === i && styles.active)}
                  style={{ width: activeIndex === i ? "1.5rem" : "0.5rem" }}
                />
              ))}
            </div>

            <div className={styles.dotsRow}>
              <button
                onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className={styles.mobNavBtn}
                aria-label="Previous Slide Mobile"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={() => setActiveIndex(Math.min(milestones.length - 1, activeIndex + 1))}
                disabled={activeIndex === milestones.length - 1}
                className={styles.mobNavBtn}
                aria-label="Next Slide Mobile"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
