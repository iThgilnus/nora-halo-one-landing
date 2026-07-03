"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./FaqSection.module.scss";

const faqs = [
  {
    question: "NORA Halo One có an toàn cho mèo con nhỏ dưới 1.5kg không?",
    answer: "NORA Halo One tích hợp mạng lưới cảm biến đa lớp phối hợp thời gian thực. Đối với mèo con nhỏ dưới 1.5kg, hệ thống tự động khóa tính năng tự dọn dẹp để đảm bảo an toàn tuyệt đối. Bạn có thể bật chế độ dọn dẹp bằng tay (Manual Mode) trên ứng dụng NORA App cho đến khi boss đủ cân nặng."
  },
  {
    question: "Tôi có thể sử dụng các loại cát thông thường khác không?",
    answer: "Thiết bị tương thích tốt với hầu hết các loại cát vón cục phổ biến trên thị trường: Cát đậu nành (hạt đường kính khuyên dùng <2mm), cát đất sét (Bentonite) và cát hỗn hợp."
  },
  {
    question: "Ngăn chứa chất thải lưu trữ được bao lâu và có bị rò rỉ mùi ra ngoài không?",
    answer: "Với dung tích lớn 8L cùng cơ chế tự động gom cuộn đóng túi và màng khóa mùi sinh học chủ động tiêu hủy khí ammonia, ngăn chứa có thể lưu trữ rác thải lên đến 15 ngày liên tục (cho một mèo) mà hoàn toàn không để mùi thoát ra môi trường xung quanh."
  },
  {
    question: "NORA Halo One kết nối được với mạng Wi-Fi nào?",
    answer: "Thiết bị hỗ trợ băng tần Wi-Fi 2.4GHz để tối ưu hóa khoảng cách phủ sóng xa và ổn định, kết hợp Bluetooth để hỗ trợ ghép nối nhanh chóng trên ứng dụng trong lần đầu thiết lập."
  },
  {
    question: "Màng khóa mùi sinh học có cần phải thay thế định kỳ không?",
    answer: "Để đạt hiệu suất khử mùi và diệt khuẩn tối đa, chúng tôi khuyến nghị thay thế màng khóa mùi sinh học định kỳ sau mỗi 60-90 ngày. Bạn có thể dễ dàng đặt mua màng thay thế chính hãng trực tiếp trên NORA App."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.sectionContainer}>
      <div className={styles.innerContainer}>
        {/* Heading Area */}
        <div className={styles.headingArea}>
          <div className={styles.eyebrowBadge}>
            <HelpCircle size={12} />
            Hỗ trợ khách hàng
          </div>
          <h2 className={styles.headingTitle}>
            Giải đáp{" "}
            <span className={styles.headingTitleAccent}>
              thắc mắc.
            </span>
          </h2>
          <p className={styles.headingSubtext}>
            Mọi câu hỏi về công nghệ an toàn, cơ chế hoạt động và cách bảo dưỡng thiết bị NORA Halo One.
          </p>
        </div>

        {/* Accordions list */}
        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(styles.faqRow, isOpen && styles.open)}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className={styles.faqButton}
                  aria-expanded={isOpen}
                >
                  <span className={styles.faqNum}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.faqQuestion}>
                    {faq.question}
                  </span>
                  <ChevronDown size={16} className={styles.faqArrow} />
                </button>
                <div className={cn(styles.drawer, isOpen && styles.open)}>
                  <div className={styles.drawerInner}>
                    <p className={styles.faqAnswer}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
