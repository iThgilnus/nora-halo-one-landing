"use client";

import { useState } from "react";
import { Cpu } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./SpecsSection.module.scss";

// 📐 Technical mechanical Blueprint line drawing with dimensions markers
function DimensionSvg() {
  return (
    <svg viewBox="30 65 340 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.blueprintSvg}>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 10 5 L 0 8 z" fill="#14b8a6" />
        </marker>
        <linearGradient id="blueprintGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(20, 184, 166, 0.35)" />
          <stop offset="100%" stopColor="rgba(20, 184, 166, 0.08)" />
        </linearGradient>
      </defs>

      {/* Blueprint Grid Mesh */}
      <rect x="20" y="20" width="360" height="360" fill="none" stroke="rgba(20, 184, 166, 0.05)" strokeWidth="0.5" />
      <path d="M 20 110 L 380 110 M 20 200 L 380 200 M 20 290 L 380 290" stroke="rgba(20, 184, 166, 0.04)" strokeWidth="0.5" />
      <path d="M 110 20 L 110 380 M 200 20 L 200 380 M 290 20 L 290 380" stroke="rgba(20, 184, 166, 0.04)" strokeWidth="0.5" />

      {/* ================= FRONT PROFILE (Left) ================= */}
      {/* Outer shell contour */}
      <rect x="45" y="80" width="125" height="195" rx="62.5" stroke="url(#blueprintGrad)" strokeWidth="1.5" />
      {/* Waste bin divider line */}
      <line x1="45" y1="225" x2="170" y2="225" stroke="rgba(20, 184, 166, 0.25)" strokeWidth="1" />
      {/* Handle detailing */}
      <rect x="88" y="240" width="38" height="8" rx="2" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="0.8" />
      {/* Spherical Inner Cylinder Entrance */}
      <circle cx="107.5" cy="160" r="42" stroke="rgba(20, 184, 166, 0.35)" strokeWidth="1" />
      {/* Circular Glowing Halo Ring */}
      <circle cx="107.5" cy="160" r="42" stroke="#14b8a6" strokeWidth="2.2" filter="drop-shadow(0 0 5px #14b8a6)" />

      {/* ================= SIDE PROFILE (Right) ================= */}
      {/* Tilted cylinder shell */}
      <path d="M 215 135 C 215 75, 305 75, 305 135 L 305 235 C 305 265, 215 265, 215 235 Z" stroke="url(#blueprintGrad)" strokeWidth="1.5" />
      {/* Bottom slide seam */}
      <line x1="215" y1="225" x2="305" y2="225" stroke="rgba(20, 184, 166, 0.25)" strokeWidth="1" />
      {/* Drawer slide */}
      <rect x="235" y="238" width="50" height="15" rx="3" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="0.8" />

      {/* ================= DIMENSION ARROWS & LINES ================= */}
      {/* Width dimension line (Front) */}
      <line x1="45" y1="310" x2="170" y2="310" stroke="#14b8a6" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <line x1="45" y1="280" x2="45" y2="325" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="0.8" />
      <line x1="170" y1="280" x2="170" y2="325" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="0.8" />
      <text x="107.5" y="325" fill="#14b8a6" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">520 mm</text>

      {/* Depth dimension line (Side) */}
      <line x1="215" y1="310" x2="305" y2="310" stroke="#14b8a6" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <line x1="215" y1="270" x2="215" y2="325" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="0.8" />
      <line x1="305" y1="270" x2="305" y2="325" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="0.8" />
      <text x="260" y="325" fill="#14b8a6" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">540 mm</text>

      {/* Vertical Height dimension line */}
      <line x1="340" y1="80" x2="340" y2="275" stroke="#14b8a6" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <line x1="300" y1="80" x2="350" y2="80" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="0.8" />
      <line x1="300" y1="275" x2="350" y2="275" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="0.8" />

      <g transform="translate(355, 177.5)">
        <text transform="rotate(90)" fill="#14b8a6" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">655 mm</text>
      </g>
    </svg>
  );
}

const specsData = [
  {
    category: "Thiết kế & Kích thước",
    items: [
      { label: "Kích thước vật lý", value: "520 x 540 x 655 mm" },
      { label: "Trọng lượng thiết bị", value: "12.5 kg" },
      { label: "Thể tích khoang lồng", value: "65 L" },
      { label: "Khuyến nghị cân nặng boss", value: "Từ 1.5 kg đến 10 kg" }
    ]
  },
  {
    category: "Dung tích & Vận hành",
    items: [
      { label: "Hộp chứa chất thải", value: "8 L (Tự gom túi kín mùi)" },
      { label: "Sức chứa khay cát", value: "8 L" },
      { label: "Loại cát tương thích", value: "Đậu nành (<2mm), Đất sét, Hỗn hợp" },
      { label: "Độ ồn khi dọn dẹp", value: "≤ 36 dB (Siêu êm)" }
    ]
  },
  {
    category: "Năng lượng & Kết nối",
    items: [
      { label: "Nguồn điện đầu vào", value: "12V - 2A (Đầu cắm DC)" },
      { label: "Công suất định mức", value: "24 W" },
      { label: "Kết nối không dây", value: "Wi-Fi 2.4GHz + Bluetooth" },
      { label: "Ứng dụng tương thích", value: "NORA App (iOS & Android)" }
    ]
  }
];

export function SpecsSection() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -5;
    const tiltY = (x / (rect.width / 2)) * 5;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="specs" className={styles.sectionContainer}>
      <div className={styles.innerContainer}>
        {/* Heading Wrapper */}
        <div className={styles.headingArea}>
          <div className={styles.eyebrowBadge}>
            <Cpu size={12} />
            Thông số kỹ thuật
          </div>
          <h2 className={styles.headingTitle}>
            Chi tiết cấu hình{" "}
            <span className={styles.headingTitleAccent}>
              phần cứng.
            </span>
          </h2>
          <p className={styles.headingSubtext}>
            Được gia công tỉ mỉ với độ chính xác cao, NORA Halo One thiết lập tiêu chuẩn mới về thiết bị thông minh cho thú cưng.
          </p>
        </div>

        <div className={styles.specsGrid}>
          {/* Left Column: Interactive Dimensions Blueprint */}
          <div className={styles.visualColumn}>
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
                transformStyle: "preserve-3d"
              }}
              className={styles.blueprintFrame}
            >
              <DimensionSvg />
            </div>
          </div>

          {/* Right Column: Specifications categories tables */}
          <div className={styles.tableColumn}>
            {specsData.map((cat, catIdx) => (
              <div key={catIdx} className={styles.specsCategory}>
                <h3 className={styles.categoryTitle}>{cat.category}</h3>
                <div className={styles.specsList}>
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className={styles.specRow}>
                      <span className={styles.specLabel}>{item.label}</span>
                      <span className={styles.specValue}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
