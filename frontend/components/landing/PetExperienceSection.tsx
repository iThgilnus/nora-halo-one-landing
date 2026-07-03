"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Heart, Home, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./PetExperienceSection.module.scss";

const benefits = [
  {
    icon: Heart,
    title: "Hoàn toàn không tiếng ồn",
    desc: "Chu trình tự dọn dẹp vận hành êm ru dưới 36dB, bảo vệ giấc ngủ ngon cho cả bạn và thú cưng.",
    iconBg: styles.iconBgHeart,
    iconColor: styles.iconColorHeart,
  },
  {
    icon: Leaf,
    title: "Tạo dựng nhịp sống sạch",
    desc: "Giải phóng thời gian dọn dẹp hàng ngày để bạn rảnh tay tận hưởng tình yêu thương với boss cưng.",
    iconBg: styles.iconBgLeaf,
    iconColor: styles.iconColorLeaf,
  },
  {
    icon: Home,
    title: "Hoà hợp với không gian sống",
    desc: "Thiết kế tối giản, im lặng và không mùi — như một vật trang trí thẩm mỹ hơn là thiết bị kỹ thuật.",
    iconBg: styles.iconBgHome,
    iconColor: styles.iconColorHome,
  },
];

export default function PetExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax for image
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const smoothY = useSpring(y, { stiffness: 60, damping: 18 });

  // Ambient color shift
  const ambientProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  // Text parallax
  const textX = useTransform(scrollYProgress, [0.1, 0.9], ["-2%", "2%"]);
  const textSmooth = useSpring(textX, { stiffness: 40, damping: 15 });

  return (
    <section
      id="lifestyle"
      ref={containerRef}
      className={styles.sectionContainer}
    >
      {/* Ambient color blobs */}
      <motion.div
        className={styles.ambientBlobLeft}
        style={{ opacity: useTransform(ambientProgress, [0, 0.5, 1], [0.12, 0.15, 0.06]) }}
      />
      <motion.div
        className={styles.ambientBlobRight}
        style={{ opacity: useTransform(ambientProgress, [0, 0.5, 1], [0, 0.06, 0.14]) }}
      />

      <div className={styles.innerContainer}>
        <div className={styles.gridContainer}>

          {/* Left Column: Text */}
          <motion.div style={{ x: textSmooth }} className={styles.textColumn}>

            <div className={styles.headingArea}>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={styles.eyebrowBadge}
              >
                <Home size={13} />
                Không gian hài hòa
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={styles.headingTitle}
              >
                Nơi cuộc sống của boss và sen tìm thấy sự{" "}
                <span className={styles.headingTitleAccent}>
                  cân bằng.
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={styles.headingSubtext}
              >
                Halo One không chỉ là một thiết bị công nghệ mà là một mảnh ghép hoàn
                hảo cho không gian sống hiện đại. Vận hành êm ái dưới 36dB, thiết kế
                kín mùi tuyệt đối giúp bạn tận hưởng trọn vẹn những khoảnh khắc thư
                thái bên boss cưng.
              </motion.p>
            </div>

            {/* Benefits list */}
            <div className={styles.benefitsList}>
              {benefits.map((b, i) => {
                const BIcon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={styles.benefitRow}
                  >
                    <div className={styles.iconFrame}>
                      <BIcon size={17} />
                    </div>

                    <div>
                      <h4 className={styles.benefitTitle}>{b.title}</h4>
                      <p className={styles.benefitDesc}>{b.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Parallax Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.imageColumn}
          >
            {/* Ambient shadow box */}
            <div className={styles.shadowBox} />

            {/* Frame */}
            <div
              ref={imageRef}
              className={styles.imageFrame}
            >
              {/* Parallax image wrapper */}
              <motion.div
                style={{ y: smoothY, height: "124%", top: "-12%" }}
                className={styles.parallaxWrapper}
              >
                <Image
                  src="/assets/story/lifestyle-cat-using-product.webp"
                  alt="Cat relaxing in a modern peaceful home environment with NORA"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  priority
                />
              </motion.div>

              <div className={styles.imageVignette} />

              {/* Glass quote card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={styles.glassQuote}
              >
                <p className={styles.quoteEyebrow}>
                  Trải nghiệm thực tế
                </p>
                <p className={styles.quoteText}>
                  &ldquo;Từ khi có Halo One, phòng khách của mình luôn thơm tho sạch sẽ
                  và Milo thì cực kỳ hợp tác với chiếc lồng mới.&rdquo;
                </p>
                <div className={styles.quoteFooter}>
                  <div className={styles.starsGroup}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={styles.star}>★</span>
                    ))}
                  </div>
                  <p className={styles.userName}>— Anh Minh &amp; Milo, Thảo Điền</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
