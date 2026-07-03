"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, Sparkles, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./FeatureCardsSection.module.scss";

// 🧪 Custom Vector Diagnostic HUDs
function OdorHud() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className={styles.hudSvg}>
      <circle cx="45" cy="40" r="3.5" fill="#14b8a6" filter="drop-shadow(0 0 4px #14b8a6)" />
      <circle cx="100" cy="30" r="4.5" fill="#14b8a6" filter="drop-shadow(0 0 4px #14b8a6)" />
      <circle cx="155" cy="45" r="3.5" fill="#14b8a6" filter="drop-shadow(0 0 4px #14b8a6)" />
      <circle cx="75" cy="80" r="3.5" fill="#14b8a6" filter="drop-shadow(0 0 4px #14b8a6)" />
      <circle cx="130" cy="75" r="4" fill="#14b8a6" filter="drop-shadow(0 0 4px #14b8a6)" />

      <line x1="45" y1="40" x2="100" y2="30" stroke="rgba(20, 184, 166, 0.45)" strokeWidth="1" />
      <line x1="100" y1="30" x2="155" y2="45" stroke="rgba(20, 184, 166, 0.45)" strokeWidth="1" />
      <line x1="100" y1="30" x2="75" y2="80" stroke="rgba(20, 184, 166, 0.45)" strokeWidth="1" />
      <line x1="75" y1="80" x2="130" y2="75" stroke="rgba(20, 184, 166, 0.45)" strokeWidth="1" />
      <line x1="155" y1="45" x2="130" y2="75" stroke="rgba(20, 184, 166, 0.45)" strokeWidth="1" />

      <rect x="15" y="98" width="105" height="13" rx="2" fill="rgba(0,0,0,0.65)" stroke="rgba(20, 184, 166, 0.4)" strokeWidth="0.8" />
      <text x="21" y="107" fill="#14b8a6">KHỬ MÙI [72H HOẠT TÍNH]</text>
    </svg>
  );
}

function SafetyHud() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className={styles.hudSvg}>
      <circle cx="100" cy="50" r="28" stroke="rgba(14, 165, 233, 0.35)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="100" cy="50" r="16" stroke="#0ea5e9" strokeWidth="1.2" filter="drop-shadow(0 0 4px #0ea5e9)" />
      <line x1="100" y1="18" x2="100" y2="82" stroke="rgba(14, 165, 233, 0.35)" strokeWidth="0.8" />
      <line x1="68" y1="50" x2="132" y2="50" stroke="rgba(14, 165, 233, 0.35)" strokeWidth="0.8" />

      <rect x="15" y="98" width="105" height="13" rx="2" fill="rgba(0,0,0,0.65)" stroke="rgba(14, 165, 233, 0.4)" strokeWidth="0.8" />
      <text x="21" y="107" fill="#0ea5e9">AN TOÀN [NORA GUARD BẬT]</text>
    </svg>
  );
}

function CapacityHud() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className={styles.hudSvg}>
      <rect x="30" y="35" width="140" height="10" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(234, 179, 8, 0.35)" strokeWidth="1" />
      <rect x="33" y="38" width="102" height="4" rx="1.5" fill="#eab308" filter="drop-shadow(0 0 4px #eab308)" />

      <path d="M30 75 L60 65 L90 80 L120 70 L150 78 L170 60" stroke="rgba(234, 179, 8, 0.45)" strokeWidth="1" strokeLinecap="round" />
      <circle cx="170" cy="60" r="2.5" fill="#eab308" />

      <rect x="15" y="98" width="105" height="13" rx="2" fill="rgba(0,0,0,0.65)" stroke="rgba(234, 179, 8, 0.4)" strokeWidth="0.8" />
      <text x="21" y="107" fill="#eab308">HỘC RÁC: NÉN TỰ ĐỘNG 8L</text>
    </svg>
  );
}

const cards = [
  {
    icon: Sparkles,
    eyebrow: "Khử mùi sinh học",
    title: "Khử mùi sinh học tối ưu",
    description:
      "Tích hợp màng khóa mùi sinh học thế hệ mới, liên tục phân hủy khí ammonia và hợp chất hữu cơ dễ bay hơi ngay tại ngăn chứa — hiệu quả 72 giờ liên tục.",
    image: "/assets/features/feature-odor-control-macro.webp",
    badge: null,
    hudColorClass: styles.colorTeal,
    hudSvg: <OdorHud />
  },
  {
    icon: Shield,
    eyebrow: "An toàn chủ động",
    title: "Vành bảo vệ NORA Guard",
    description:
      "Hệ thống vòng đệm cơ học kết hợp cảm biến tiệm cận quanh lối vào. Tự động đóng băng mọi hoạt động xoay của lồng máy lập tức khi phát hiện vật cản.",
    image: "/assets/features/feature-safety-sensor-macro.webp",
    badge: "Tính năng lõi",
    hudColorClass: styles.colorCyan,
    hudSvg: <SafetyHud />
  },
  {
    icon: Trash2,
    eyebrow: "Sức chứa vượt trội",
    title: "Hộc rác tự đóng kín 8L",
    description:
      "Cơ chế tự động gom cuộn và niêm phong miệng túi đựng chất thải thông minh, giúp giữ vệ sinh tối đa và kéo dài chu kỳ dọn dẹp lên đến 15 ngày.",
    image: "/assets/features/feature-sealed-waste-drawer-macro.webp",
    badge: null,
    hudColorClass: styles.colorAmber,
    hudSvg: <CapacityHud />
  },
];

function FeatureCard({
  card,
  index,
}: {
  card: (typeof cards)[0];
  index: number;
}) {
  const isMiddle = index === 1;
  const Icon = card.icon;

  // Track 3D Mouse Parallax
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -6;
    const tiltY = (x / (rect.width / 2)) * 6;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(styles.cardItem, isMiddle && styles.middleCard)}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.18s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        className={cn(
          styles.cardInner,
          isMiddle && styles.featuredBorder
        )}
      >
        {/* Image Frame */}
        <div className={styles.imageFrame}>
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
            priority
          />
          {card.badge && (
            <span className={styles.cardBadge}>
              {card.badge}
            </span>
          )}

          {/* Holographic Diagnostic HUD Overlay */}
          <div className={cn(styles.hudOverlay, card.hudColorClass)}>
            {card.hudSvg}
          </div>
        </div>

        {/* Content */}
        <div className={styles.cardContent}>
          {/* Icon row */}
          <div className={styles.iconRow}>
            <div className={styles.iconContainer}>
              <Icon size={19} />
            </div>
            <span className={styles.cardEyebrow}>
              {card.eyebrow}
            </span>
          </div>

          {/* Title */}
          <h3 className={styles.cardTitle}>
            {card.title}
          </h3>

          {/* Description */}
          <p className={styles.cardDescription}>{card.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeatureCardsSection() {
  return (
    <section
      id="features"
      className={styles.sectionContainer}
    >
      <div className={styles.innerContainer}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={styles.headingArea}
        >
          <div className={styles.eyebrowBadge}>
            <Sparkles size={12} />
            Kỹ nghệ cốt lõi
          </div>
          <h2 className={styles.headingTitle}>
            Chi tiết làm nên sự{" "}
            <span className={styles.headingTitleAccent}>
              khác biệt.
            </span>
          </h2>
          <p className={styles.headingSubtext}>
            Được phát triển với công nghệ độc quyền và quy trình thử nghiệm nghiêm ngặt từ NORA.
          </p>
        </motion.div>

        {/* 3 Cards */}
        <div className={styles.cardsGrid}>
          {cards.map((card, index) => (
            <FeatureCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
