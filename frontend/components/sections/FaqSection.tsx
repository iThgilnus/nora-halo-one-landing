"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/product-data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-panel-soft px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Những câu hỏi cần rõ trước khi mang một thiết bị thông minh vào nhà."
        />

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <article
                key={item.question}
                className="micro-lift rounded-card border border-line bg-panel"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-5 rounded-card px-5 py-5 text-left text-base font-extrabold text-ink transition hover:bg-panel-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                  >
                    <span>{item.question}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-card border border-line text-lime">
                      {isOpen ? (
                        <Minus size={16} aria-hidden />
                      ) : (
                        <Plus size={16} aria-hidden />
                      )}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-5"
                >
                  <p className="max-w-3xl text-sm leading-7 text-muted">
                    {item.answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
