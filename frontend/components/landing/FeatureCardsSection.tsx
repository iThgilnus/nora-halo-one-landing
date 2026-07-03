"use client";

import Image from "next/image";
import { Shield, Sparkles, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./FeatureCardsSection.module.scss";

const cards = [
  {
    icon: Sparkles,
    eyebrow: "Khử mùi sinh học",
    title: "Khử mùi sinh học tối ưu",
    description:
      "Tích hợp màng khóa mùi sinh học thế hệ mới, liên tục phân hủy khí ammonia và hợp chất hữu cơ dễ bay hơi ngay tại ngăn chứa — hiệu quả 72 giờ liên tục.",
    image: "/assets/features/feature-odor-control-macro.webp",
    badge: null,
  },
  {
    icon: Shield,
    eyebrow: "An toàn chủ động",
    title: "Vành bảo vệ NORA Guard",
    description:
      "Hệ thống vòng đệm cơ học kết hợp cảm biến tiệm cận quanh lối vào. Tự động đóng băng mọi hoạt động xoay của lồng máy lập tức khi phát hiện vật cản.",
    image: "/assets/features/feature-safety-sensor-macro.webp",
    badge: "Tính năng lõi",
  },
  {
    icon: Trash2,
    eyebrow: "Sức chứa vượt trội",
    title: "Hộc rác tự đóng kín 8L",
    description:
      "Cơ chế tự động gom cuộn và niêm phong miệng túi đựng chất thải thông minh, giúp giữ vệ sinh tối đa và kéo dài chu kỳ dọn dẹp lên đến 15 ngày.",
    image: "/assets/features/feature-sealed-waste-drawer-macro.webp",
    badge: null,
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
            unoptimized
          />
          {card.badge && (
            <span className={styles.cardBadge}>
              {card.badge}
            </span>
          )}

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
