"use client";

import Link from "next/link";
import { navItems } from "@/lib/product-data";
import styles from "./SiteFooter.module.scss";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* Top Grid */}
        <div className={styles.topGrid}>
          
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link
              href="#top"
              className={styles.brandLink}
            >
              <span className={styles.brandIcon}>
                N
              </span>
              <span>
                <span className={styles.brandName}>
                  NORA
                </span>
                <span className={styles.brandSub}>
                  Halo One
                </span>
              </span>
            </Link>
            <p className={styles.brandDesc}>
              Trạm chăm sóc boss thông minh hàng đầu. Tái định nghĩa không gian
              sống trong lành cho căn hộ hiện đại.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4 className={styles.sectionTitle}>
              Khám phá
            </h4>
            <nav className={styles.navLinks}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navLink}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className={styles.sectionTitle}>
              Liên hệ (Concept)
            </h4>
            <div className={styles.contactInfo}>
              <p className={styles.contactText}>
                📍 Thảo Điền, Quận 2, TP. Hồ Chí Minh
              </p>
              <p className={styles.contactText}>📞 +84 (0) 900 88 NORA</p>
              <p className={styles.contactText}>✉ contact@nora-concept.pet</p>
            </div>
          </div>

          {/* Social Links Column */}
          <div>
            <h4 className={styles.sectionTitle}>
              Kết nối
            </h4>
            <div className={styles.socialList}>
              {/* Facebook */}
              <a
                href="#"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3 0-5 2-5 5v2z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c2.7 0 3 .01 4 .06 1 .04 1.6.2 2.2.4a5 5 0 011.8 1.8c.2.6.3 1.2.4 2.2.05 1 .06 1.3.06 4s-.01 3-.06 4c-.04 1-.2 1.6-.4 2.2a5 5 0 01-1.8 1.8c-.6.2-1.2.3-2.2.4-1 .05-1.3.06-4 .06s-3-.01-4-.06c-1-.04-1.6-.2-2.2-.4a5 5 0 01-1.8-1.8c-.2-.6-.3-1.2-.4-2.2C2.01 15 2 14.7 2 12s.01-3 .06-4c.04-1 .2-1.6.4-2.2a5 5 0 011.8-1.8c.6-.2 1.2-.3 2.2-.4 1-.05 1.3-.06 4-.06zm0 1.8c-2.7 0-3 .01-4 .05-.9.04-1.4.19-1.8.35a3 3 0 00-1.1 1.1c-.16.4-.3 1-.35 1.8-.04 1-.05 1.3-.05 4s.01 3 .05 4c.04.9.19 1.4.35 1.8.16.4.4.8.7 1.1.4.3.7.5 1.1.7.4.16 1 .3 1.8.35 1 .04 1.3.05 4 .05s3-.01 4-.05c.9-.04 1.4-.19 1.8-.35.4-.16.8-.4 1.1-.7.3-.4.5-.7.7-1.1.16-.4.3-1 .35-1.8.04-1 .05-1.3.05-4s-.01-3-.05-4c-.04-.9-.19-1.4-.35-1.8a3 3 0 00-1.1-1.1c-.4-.16-1-.3-1.8-.35-1-.04-1.3-.05-4-.05zm0 1.8a3 3 0 100 6 3 3 0 000-6zm4.8-1.6a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href="#"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.2 3H21l-6.2 7.1L22 21h-5.6l-4.4-5.8L7 21H4.2l6.6-7.6L4 3h5.8l4 5.3zm-1 16h1.5L8.2 5H6.6z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className={styles.bottomBar}>
          <div className={styles.disclaimer}>
            <p className={styles.disclaimerTitle}>NORA Halo One — Công nghệ chăm sóc thú cưng thế hệ mới</p>
            <p>
              NORA và Halo One là các nhãn hiệu đã được bảo hộ của NORA Inc. Tất cả các thiết kế sản phẩm, giải pháp dọn dẹp thông minh khép kín và bằng sáng chế công nghệ liên quan đều được đăng ký bản quyền theo quy định pháp luật hiện hành.
            </p>
          </div>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} NORA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
