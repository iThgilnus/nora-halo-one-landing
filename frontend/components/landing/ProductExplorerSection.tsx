"use client";

import { ArrowLeft, ArrowRight, Check, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { productSpinImages } from "@/data/product-spin";
import { cn } from "@/lib/utils";
import styles from "./ProductExplorerSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    title: "Góc chính diện",
    eyebrow: "0° View",
    description:
      "Mặt trước tối giản, đối xứng và tập trung vào vòng Halo đặc trưng. Trạng thái thiết bị được hiển thị như một tín hiệu nhẹ nhàng, hài hoà với không gian sống.",
    metric: "Vòng Halo",
    value: "Halo Ring",
  },
  {
    title: "Góc nghiêng 20°",
    eyebrow: "Entry Comfort",
    description:
      "Lối vào hạ thấp giúp boss tiếp cận tự nhiên hơn, trong khi thân máy vẫn giữ được dáng khối gọn gàng — lý tưởng cho căn hộ hiện đại.",
    metric: "Lối vào",
    value: "Bước thấp",
  },
  {
    title: "Góc nghiêng 45°",
    eyebrow: "Cabin Volume",
    description:
      "Góc nhìn này thể hiện tỷ lệ giữa khoang cabin rộng 74L và kích thước ngoài gọn. Đây là điểm cân bằng hoàn hảo giữa thoải mái và tiết kiệm diện tích.",
    metric: "Khoang chứa",
    value: "74L",
  },
  {
    title: "Mặt bên cân đối",
    eyebrow: "Clean Mechanics",
    description:
      "Nửa dưới của thân máy chứa cụm gom chất thải và ngăn kín mùi. Toàn bộ được ẩn trong một profile ngang tinh gọn, không để lộ chi tiết cơ học.",
    metric: "Ngăn rác",
    value: "8L kín mùi",
  },
  {
    title: "Mặt sau tinh gọn",
    eyebrow: "Safe Placement",
    description:
      "Mặt sau được xử lý gọn để đặt sát tường, có khu vực cáp nguồn an toàn và các điểm tiếp xúc giúp máy đứng vững khi vận hành.",
    metric: "An toàn",
    value: "10 cảm biến",
  },
];

export default function ProductExplorerSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            id: "product-explorer-horizontal",
            trigger: section,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            start: "top 72px",
            end: () => `+=${Math.max(getDistance(), window.innerHeight * 3)}`,
            onUpdate: (self) => {
              const nextIndex = Math.min(
                milestones.length - 1,
                Math.round(self.progress * (milestones.length - 1))
              );
              setActiveIndex(nextIndex);
              setProgress(self.progress);
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const scrollToMilestone = (index: number) => {
    const trigger = ScrollTrigger.getById("product-explorer-horizontal");
    if (trigger) {
      const target =
        trigger.start +
        (trigger.end - trigger.start) * (index / (milestones.length - 1));
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }
    const panel = mobileTrackRef.current?.querySelector<HTMLElement>(
      `[data-product-panel="${index}"]`
    );
    panel?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const handleMobileScroll = () => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const panels = Array.from(track.querySelectorAll<HTMLElement>("[data-product-panel]"));
    const nearest = panels.reduce(
      (best, panel, index) => {
        const distance = Math.abs(panel.offsetLeft - track.scrollLeft);
        return distance < best.distance ? { distance, index } : best;
      },
      { distance: Number.POSITIVE_INFINITY, index: 0 }
    );
    const maxScroll = Math.max(1, track.scrollWidth - track.clientWidth);
    setActiveIndex(nearest.index);
    setProgress(track.scrollLeft / maxScroll);
  };

  const goPrevious = () => scrollToMilestone(Math.max(0, activeIndex - 1));
  const goNext = () => scrollToMilestone(Math.min(milestones.length - 1, activeIndex + 1));

  return (
    <section
      id="product-explorer"
      ref={sectionRef}
      className={styles.sectionContainer}
    >
      {/* ====================== DESKTOP ====================== */}
      <div
        className={styles.desktopViewport}
      >
        {/* Ambient radial gradient */}
        <div className={styles.ambientRadial} />

        {/* Header area */}
        <div className={styles.headerArea}>
          <div>
            <p className={styles.eyebrowBadge}>
              Product Explorer
            </p>
          </div>

          {/* Progress & Navigation */}
          <div className={styles.progressArea}>
            <div className={styles.progressLine}>
              <motion.div
                className={styles.progressBarFill}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>
            <div className={styles.controlsRow}>
              <button
                type="button"
                onClick={goPrevious}
                disabled={activeIndex === 0}
                className={styles.navButton}
                aria-label="Previous product angle"
              >
                <ArrowLeft size={17} aria-hidden />
              </button>
              <div className={styles.dotsRow}>
                {milestones.map((m, index) => (
                  <button
                    key={m.title}
                    type="button"
                    onClick={() => scrollToMilestone(index)}
                    aria-current={activeIndex === index ? "step" : undefined}
                    title={m.title}
                    className={cn(
                      styles.dotButton,
                      activeIndex === index && styles.active
                    )}
                    aria-label={`Go to ${m.title}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNext}
                disabled={activeIndex === milestones.length - 1}
                className={styles.navButton}
                aria-label="Next product angle"
              >
                <ArrowRight size={17} aria-hidden />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className={styles.horizontalTrack}
        >
          {milestones.map((milestone, index) => (
            <article
              key={milestone.title}
              className={styles.milestoneCard}
            >
              {/* Left: info */}
              <div className={styles.cardInfo}>
                <div>
                  <span className={styles.cardLabel}>
                    {String(index + 1).padStart(2, "0")} / {milestone.eyebrow}
                  </span>
                  <h3 className={styles.cardTitle}>
                    {milestone.title}
                  </h3>
                  <p className={styles.cardDescription}>
                    {milestone.description}
                  </p>
                </div>

                <div className={styles.cardMetricsArea}>
                  <div className={styles.cardMetricsGrid}>
                    <div className={styles.metricBlock}>
                      <p className={styles.metricLabel}>
                        {milestone.metric}
                      </p>
                      <p className={cn(styles.metricValue, styles.tealHighlight)}>{milestone.value}</p>
                    </div>
                    <div className={styles.metricBlock}>
                      <p className={styles.metricLabel}>
                        Góc độ
                      </p>
                      <p className={styles.metricValue}>{index * 45}°</p>
                    </div>
                  </div>
                  <a
                    href="#consultation"
                    className={styles.btnAdd}
                  >
                    <Plus size={16} aria-hidden />
                    Đăng ký tư vấn ngay
                  </a>
                </div>
              </div>

              {/* Right: product image */}
              <div className={styles.cardImageFrame}>
                <Image
                  src={productSpinImages[index]}
                  alt={`NORA Halo One ${milestone.title}`}
                  fill
                  loading="eager"
                  sizes="45vw"
                  className={styles.cardImage}
                />
                {/* Bottom label */}
                <div className={styles.cardBottomLabel}>
                  <span>Halo One</span>
                  <span>{milestone.value}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ====================== MOBILE ====================== */}
      <div className={styles.mobileViewport}>
        <div className={styles.mobileInner}>
          <p className={styles.eyebrowBadge}>
            Product Explorer
          </p>
          <h2 className={styles.mobTitle}>
            Vuốt ngang để xoay quanh Halo One.
          </h2>
          <p className={styles.mobSubtext}>
            Mỗi panel là một góc nhìn riêng của sản phẩm. Kéo ngang hoặc dùng
            nút điều hướng để chuyển giữa các góc.
          </p>

          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className={styles.mobileTrack}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {milestones.map((milestone, index) => (
              <article
                key={milestone.title}
                data-product-panel={index}
                className={styles.mobCard}
              >
                <div className={styles.mobImageFrame}>
                  <Image
                    src={productSpinImages[index]}
                    alt={milestone.title}
                    fill
                    loading="eager"
                    sizes="86vw"
                    className={styles.mobImage}
                  />
                  <span className={styles.mobBadgeNum}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className={styles.mobContent}>
                  <p className={styles.eyebrowBadge} style={{ fontSize: '10px' }}>
                    {milestone.eyebrow}
                  </p>
                  <h3 className={styles.mobCardTitle}>
                    {milestone.title}
                  </h3>
                  <p className={styles.mobCardDesc}>
                    {milestone.description}
                  </p>

                  <div className={styles.mobCardFooter}>
                    <div>
                      <p className={styles.metricLabel}>
                        {milestone.metric}
                      </p>
                      <p className={styles.metricValue} style={{ color: 'var(--accent-lime)', fontSize: '1.125rem', marginTop: '0.25rem' }}>{milestone.value}</p>
                    </div>
                    <a
                      href="#consultation"
                      className={styles.mobAddBtn}
                    >
                      <Plus size={14} aria-hidden />
                      Tư vấn ngay
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.mobControlsRow}>
            <button
              type="button"
              onClick={goPrevious}
              disabled={activeIndex === 0}
              className={styles.mobNavBtn}
              aria-label="Previous"
            >
              <ArrowLeft size={17} aria-hidden />
            </button>
            <div className={styles.dotsRow}>
              {milestones.map((m, index) => (
                <button
                  key={m.title}
                  type="button"
                  onClick={() => scrollToMilestone(index)}
                  className={cn(
                    styles.dotButton,
                    activeIndex === index && styles.active
                  )}
                  aria-label={`Go to ${m.title}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === milestones.length - 1}
              className={styles.mobNavBtn}
              aria-label="Next"
            >
              <ArrowRight size={17} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
