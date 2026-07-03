"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AlertTriangle } from "lucide-react";
import styles from "./ProblemSection.module.scss";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Desktop Card Refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Desktop HUD Refs
  const deskMeterFillRef = useRef<HTMLDivElement>(null);
  const deskGaugeTextRef = useRef<HTMLSpanElement>(null);
  const deskCircleFillRef = useRef<SVGCircleElement>(null);
  const deskCircleTextRef = useRef<HTMLSpanElement>(null);
  const deskStressTextRef = useRef<HTMLSpanElement>(null);

  // Mobile HUD Refs
  const mobMeterFillRef = useRef<HTMLDivElement>(null);
  const mobGaugeTextRef = useRef<HTMLSpanElement>(null);
  const mobCircleFillRef = useRef<SVGCircleElement>(null);
  const mobCircleTextRef = useRef<HTMLSpanElement>(null);
  const mobStressTextRef = useRef<HTMLSpanElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      gsap.set(containerRef.current, { height: "300vh" });

      // 1. Initial State for visual elements
      gsap.set(imageRef.current, { scale: 1.1, xPercent: 0, yPercent: 0 });
      gsap.set(deskCircleFillRef.current, { strokeDashoffset: 377 });

      // Create Desktop Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top+=72",
          end: "bottom bottom",
          pin: pinWrapperRef.current,
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(2, Math.floor(progress * 2.999));
            setActiveIndex(idx);
          }
        }
      });

      // --- CAM PAN ANIMATION ---
      tl.to(imageRef.current, {
        scale: 1.25,
        xPercent: 5,
        yPercent: 4,
        duration: 1,
        ease: "power2.inOut",
      });

      tl.to(imageRef.current, {
        scale: 1.12,
        xPercent: -6,
        yPercent: -5,
        duration: 1,
        ease: "power2.inOut",
      });

      // --- COMPLICATIONS ANIMATION ---
      
      // Step 1: Odor Vertical Fill (15% to 85%)
      const ammoniaObj = { value: 15 };
      tl.to(ammoniaObj, {
        value: 85,
        duration: 0.6,
        ease: "power1.out",
        onUpdate: () => {
          if (deskGaugeTextRef.current) {
            deskGaugeTextRef.current.innerText = `${Math.round(ammoniaObj.value)}%`;
          }
          if (deskMeterFillRef.current) {
            deskMeterFillRef.current.style.height = `${ammoniaObj.value}%`;
          }
        }
      }, 0);

      // Step 2: Time Circular Complication (+91 hrs)
      const timeObj = { value: 0 };
      tl.to(timeObj, {
        value: 100,
        duration: 0.8,
        ease: "power1.inOut",
        onUpdate: () => {
          if (deskCircleFillRef.current) {
            const offset = 377 - (377 * (timeObj.value / 100));
            deskCircleFillRef.current.style.strokeDashoffset = `${offset}`;
          }
          if (deskCircleTextRef.current) {
            const currentHours = Math.round((timeObj.value / 100) * 91);
            deskCircleTextRef.current.innerText = `${currentHours}`;
          }
        }
      }, 0.5);

      // Step 3: Stress level text (10% to 95%)
      const stressObj = { value: 10 };
      tl.to(stressObj, {
        value: 95,
        duration: 0.8,
        ease: "power1.inOut",
        onUpdate: () => {
          if (deskStressTextRef.current) {
            deskStressTextRef.current.innerText = `${Math.round(stressObj.value)}%`;
          }
        }
      }, 1.3);

    } else {
      gsap.set(containerRef.current, { height: "auto" });

      // Mobile Card 1: Vertical Level Fill
      const mobAmmoniaObj = { value: 15 };
      gsap.to(mobAmmoniaObj, {
        value: 85,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card1Ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        onUpdate: () => {
          if (mobGaugeTextRef.current) {
            mobGaugeTextRef.current.innerText = `${Math.round(mobAmmoniaObj.value)}%`;
          }
          if (mobMeterFillRef.current) {
            mobMeterFillRef.current.style.height = `${mobAmmoniaObj.value}%`;
          }
        }
      });

      // Mobile Card 2: Circle Activity Ring Fill
      const mobTimeObj = { value: 0 };
      gsap.to(mobTimeObj, {
        value: 100,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card2Ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        onUpdate: () => {
          if (mobCircleFillRef.current) {
            const offset = 377 - (377 * (mobTimeObj.value / 100));
            mobCircleFillRef.current.style.strokeDashoffset = `${offset}`;
          }
          if (mobCircleTextRef.current) {
            const currentHours = Math.round((mobTimeObj.value / 100) * 91);
            mobCircleTextRef.current.innerText = `${currentHours}`;
          }
        }
      });

      // Mobile Card 3: Stress level index
      const mobStressObj = { value: 10 };
      gsap.to(mobStressObj, {
        value: 95,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card3Ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        onUpdate: () => {
          if (mobStressTextRef.current) {
            mobStressTextRef.current.innerText = `${Math.round(mobStressObj.value)}%`;
          }
        }
      });
    }
  }, { scope: containerRef });

  const getGlowClass = () => {
    if (activeIndex === 0) return styles.glowOrange;
    if (activeIndex === 1) return styles.glowCyan;
    return styles.glowRed;
  };

  return (
    <div ref={containerRef} id="experience" className={styles.sectionContainer}>
      <div ref={pinWrapperRef} className={styles.pinWrapper}>
        <div className={styles.gridContainer}>
          
          {/* LEFT COLUMN: Minimalist watch-face canvas */}
          <div className={styles.visualColumn}>
            <div className={styles.visualFrame}>
              <Image
                ref={imageRef}
                src="/assets/story/problem-manual-litter-lifestyle.webp"
                alt="Manual litter cleaning struggle"
                fill
                sizes="45vw"
                className={styles.backgroundImage}
                priority
              />
              <div className={styles.gradientOverlay} />
              
              {/* Ultra smooth atmospheric glow wash */}
              <div className={cn(styles.ambientGlow, getGlowClass())} />

              <div className={styles.complicationContainer}>
                {/* WIDGET 1: ODOR LEVEL METER */}
                <div className={cn(styles.widgetPane, activeIndex === 0 && styles.active)}>
                  <div className={styles.verticalMeterWrapper}>
                    <div className={styles.verticalTrack}>
                      <div ref={deskMeterFillRef} className={styles.verticalFill} />
                    </div>
                    <span className={styles.compLabel}>Nồng độ khí độc</span>
                    <span ref={deskGaugeTextRef} className={styles.compValue}>15%</span>
                  </div>
                </div>

                {/* WIDGET 2: TIME RING COMPLICATION */}
                <div className={cn(styles.widgetPane, activeIndex === 1 && styles.active)}>
                  <div className={styles.circleComplication}>
                    <svg className={styles.circleSvg} viewBox="0 0 130 130">
                      <circle className={styles.circleTrack} cx="65" cy="65" r="60" />
                      <circle
                        ref={deskCircleFillRef}
                        className={styles.circleFill}
                        cx="65"
                        cy="65"
                        r="60"
                      />
                    </svg>
                    <div className={styles.circleText}>
                      <span className={styles.circleNum}>
                        +<span ref={deskCircleTextRef}>0</span>
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
                  <span ref={deskStressTextRef} className={styles.healthValue}>10%</span>
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
                      <div ref={mobMeterFillRef} className={styles.verticalFill} />
                    </div>
                    <span ref={mobGaugeTextRef} className={styles.compValue} style={{ fontSize: '1.5rem' }}>15%</span>
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
                      <circle
                        ref={mobCircleFillRef}
                        className={styles.circleFill}
                        cx="65"
                        cy="65"
                        r="60"
                      />
                    </svg>
                    <div className={styles.circleText}>
                      <span className={styles.circleNum} style={{ fontSize: '1.5rem' }}>
                        +<span ref={mobCircleTextRef}>0</span>
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
                  <span className={styles.cardNum}>03 // BÁO ĐỘNG</span>
                  <h4 className={styles.cardTitle}>{painPoints[2].title}</h4>
                </div>

                {/* Mobile Inline Widget 3 */}
                <div className={styles.mobileComplication}>
                  <div className={styles.ecgWaveWrapper} style={{ width: 240, height: 75, marginBottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <svg className={styles.ecgSvg} viewBox="0 0 260 80" style={{ height: 50 }}>
                      <path
                        className={styles.ecgPath}
                        d="M0,40 L60,40 L65,15 L70,65 L75,40 L120,40 L125,5 L132,75 L138,40 L180,40 L185,15 L190,65 L195,40 L260,40"
                      />
                      <path
                        className={styles.ecgPathActive}
                        d="M0,40 L60,40 L65,15 L70,65 L75,40 L120,40 L125,5 L132,75 L138,40 L180,40 L185,15 L190,65 L195,40 L260,40"
                      />
                    </svg>
                    <span ref={mobStressTextRef} className={styles.healthValue} style={{ fontSize: '1.25rem', marginTop: '0.25rem' }}>10%</span>
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
