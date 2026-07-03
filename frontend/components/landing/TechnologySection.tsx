"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./TechnologySection.module.scss";

const nodes = [
  {
    title: "Camera góc rộng 200°",
    description:
      "Nhận diện boss ngay khi tiếp cận lối vào cabin — kể cả trong bóng tối hoàn toàn nhờ hồng ngoại ban đêm.",
    signal: "Camera hoạt động",
    stat: "200°",
  },
  {
    title: "Radar hồng ngoại cửa vào",
    description:
      "Phát hiện chuyển động của mèo và tạm dừng chu trình dọn dẹp trong 80ms nếu boss tiến lại gần.",
    signal: "Radar sẵn sàng",
    stat: "80ms",
  },
  {
    title: "Cảm biến chống kẹt",
    description:
      "Lắp đặt ở các mép xoay cabin, phát hiện vật cản dưới 200g và ngăn chặn hoàn toàn rủi ro va chạm.",
    signal: "Chống kẹt an toàn",
    stat: "<200g",
  },
  {
    title: "Cảm biến trọng lượng đế",
    description:
      "4 cảm biến trọng lực đo chính xác cân nặng boss và giám sát sự hiện diện liên tục với độ chính xác ±10g.",
    signal: "Cảm lực hiệu chuẩn",
    stat: "±10g",
  },
  {
    title: "Hall sensor định vị lồng",
    description:
      "Định vị góc xoay của lồng máy chính xác đến 0.1mm, đảm bảo cabin luôn dừng đúng vị trí sau mỗi chu kỳ.",
    signal: "Lồng máy thẳng hàng",
    stat: "0.1mm",
  },
];

export default function TechnologySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Desktop scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      Math.floor(latest * nodes.length),
      nodes.length - 1
    );
    setActiveIndex(index);
  });

  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const start = window.scrollY + rect.top;
    const scrollableDist = el.clientHeight - window.innerHeight;
    const target = start + scrollableDist * (index / (nodes.length - 1));
    
    window.scrollTo({
      top: target,
      behavior: "smooth"
    });
  };

  const handleMobileScroll = () => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(`.${styles.mobileCard}`);
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
    const cards = el.querySelectorAll(`.${styles.mobileCard}`);
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

  const active = nodes[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="technology"
      className={styles.sectionContainer}
    >
      {/* Ambient gradient */}
      <motion.div
        key={activeIndex}
        className={styles.ambientGradient}
        animate={{
          background: [
            "radial-gradient(circle at 80% 25%, rgba(13,148,136,0.06), transparent 55%)",
            "radial-gradient(circle at 20% 75%, rgba(13,148,136,0.06), transparent 55%)",
          ],
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Grid overlay */}
      <div className={styles.gridOverlay} />

      <div className={styles.innerContainer}>
        {/* Heading */}
        <div className={styles.headingArea}>
          <div className={styles.eyebrowBadge}>
            <Cpu size={12} />
            Hệ cảm biến thông minh
          </div>
          <h2 className={styles.headingTitle}>
            Cấu trúc bên trong{" "}
            <span className={styles.headingTitleAccent}>
              an toàn tuyệt đối.
            </span>
          </h2>
          <p className={styles.headingSubtext}>
            Mạng lưới 10 cảm biến phối hợp thời gian thực — cuộn để khám phá từng bộ phận.
          </p>
        </div>

        {/* ============== DESKTOP ============== */}
        <div className={styles.desktopGrid}>

          {/* Left: compact sensor list */}
          <div className={styles.sensorList}>
            {nodes.map((node, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={node.title}
                  onClick={() => scrollToIndex(index)}
                  className={cn(
                    styles.sensorCard,
                    isActive && styles.active,
                    "cursor-pointer"
                  )}
                >
                  <div className={styles.cardHeader}>
                    {/* Number */}
                    <span
                      className={styles.numBadge}
                    >
                      {index + 1}
                    </span>
                    <h3 className={styles.cardTitle}>
                      {node.title}
                    </h3>
                    {/* Stat */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.span
                          key="stat"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          className={styles.activeStat}
                        >
                          {node.stat}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Expanded description */}
                  <div className={cn(styles.drawer, isActive && styles.open)}>
                    <div className={styles.drawerInner}>
                      <p className={styles.description}>{node.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky cutaway image */}
          <div className={styles.stickyPanel}>
            <div className={styles.cutawayFrame}>
              <Image
                src="/assets/features/tech-cutaway-internal-system.webp"
                alt="NORA Halo One internal system cutaway"
                fill
                sizes="40vw"
                className={styles.cutawayImage}
                priority
                unoptimized
              />

              {/* Sensor status bar — bottom overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className={styles.statusBar}
                >
                  <div className={styles.statusIndicatorGroup}>
                    <span className={styles.pingDot}>
                      <span className={styles.pingDotAnimate} />
                      <span className={styles.pingDotSolid} />
                    </span>
                    <span className={styles.statusSignal}>
                      {active.signal}
                    </span>
                  </div>
                  <span className={styles.statusStat}>{active.stat}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <div className={styles.progressDots}>
              {nodes.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  animate={{ width: activeIndex === i ? 24 : 6, opacity: activeIndex === i ? 1 : 0.3 }}
                  transition={{ duration: 0.25 }}
                  className={cn(styles.progressDot, activeIndex === i && styles.active)}
                  aria-label={`Sensor ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ============== MOBILE ============== */}
        <div className={styles.mobileViewport}>
          {/* Cutaway image with active status bar overlay */}
          <div className={styles.mobileImageFrame}>
            <Image
              src="/assets/features/tech-cutaway-internal-system.webp"
              alt="NORA Halo One internal system cutaway"
              fill
              sizes="90vw"
              className={styles.mobileImage}
              priority
              unoptimized
            />

            {/* Sensor status bar overlay on image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className={styles.mobileStatusBar}
              >
                <div className={styles.statusIndicatorGroup}>
                  <span className={styles.pingDot}>
                    <span className={styles.pingDotAnimate} />
                    <span className={styles.pingDotSolid} />
                  </span>
                  <span className={styles.statusSignal}>
                    {active.signal}
                  </span>
                </div>
                <span className={styles.statusStat}>{active.stat}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Horizontal Scroll Cards Track */}
          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className={styles.mobileTrack}
          >
            {nodes.map((node, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={node.title}
                  className={cn(
                    styles.mobileCard,
                    isActive && styles.activeCard
                  )}
                >
                  <div className={styles.mobileCardHeader}>
                    <span className={styles.mobileNumBadge}>{index + 1}</span>
                    <h3 className={styles.mobileCardTitle}>{node.title}</h3>
                    <span className={styles.mobileActiveStat}>{node.stat}</span>
                  </div>
                  <p className={styles.mobileCardDesc}>{node.description}</p>
                </div>
              );
            })}
          </div>

          {/* Mobile Pagination dots */}
          <div className={styles.mobileControls}>
            <div className={styles.progressDots}>
              {nodes.map((_, i) => (
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
                  aria-label={`Sensor slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
