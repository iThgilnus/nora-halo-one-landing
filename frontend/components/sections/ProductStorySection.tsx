"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { storyChapters } from "@/lib/product-data";
import { cn } from "@/lib/utils";

const stageDetails = [
  {
    accent: "var(--accent-blue)",
    metric: "200°",
    metricLabel: "vision range",
    signal: "Live view ready",
    note: "Lens focuses on the entry halo and usage moment.",
    hotspot: { left: "47%", top: "34%" },
  },
  {
    accent: "var(--accent-lime)",
    metric: "10",
    metricLabel: "sensor points",
    signal: "Cabin clear",
    note: "Multi-point checks wait before the clean cycle starts.",
    hotspot: { left: "52%", top: "50%" },
  },
  {
    accent: "var(--accent-orange)",
    metric: "36 dB",
    metricLabel: "quiet cycle",
    signal: "Cleaning staged",
    note: "Waste is routed after the exit state is stable.",
    hotspot: { left: "54%", top: "70%" },
  },
  {
    accent: "var(--accent-lime)",
    metric: "8L",
    metricLabel: "sealed drawer",
    signal: "Odor seal locked",
    note: "The drawer module keeps the routine clean and fast.",
    hotspot: { left: "60%", top: "78%" },
  },
] as const;

export function ProductStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const nextIndex = Math.min(
        storyChapters.length - 1,
        Math.floor(nextProgress * storyChapters.length),
      );

      setProgress((current) =>
        Math.abs(current - nextProgress) > 0.004 ? nextProgress : current,
      );
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const requestUpdate = () => {
      if (frameRef.current) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const scrollToStage = (index: number) => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const rect = section.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const target = top + scrollable * (index / (storyChapters.length - 1));

    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const activeChapter = storyChapters[activeIndex];
  const activeDetail = stageDetails[activeIndex];
  const progressPercent = Math.round(progress * 100);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-page lg:min-h-[430vh]"
    >
      <div className="hidden border-y border-line lg:sticky lg:top-0 lg:block lg:h-svh lg:overflow-hidden">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-[0.72fr_1.28fr] gap-10 px-8 pt-[108px]">
          <aside className="flex flex-col justify-between pb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
                Inside Halo One
              </p>
              <h2 className="mt-5 text-balance text-5xl font-extrabold leading-[0.98] text-ink">
                A care station told in four quiet moves.
              </h2>
              <p className="mt-6 text-base leading-8 text-muted">
                Scroll through the product like a guided teardown: camera,
                safety, clean cycle and sealed drawer each take focus as the
                station stays anchored.
              </p>
            </div>

            <div className="space-y-3">
              {storyChapters.map((chapter, index) => (
                <button
                  key={chapter.eyebrow}
                  type="button"
                  onClick={() => scrollToStage(index)}
                  className={cn(
                    "group grid w-full grid-cols-[52px_1fr] items-center gap-4 rounded-card border p-3 text-left transition",
                    activeIndex === index
                      ? "border-lime bg-panel text-ink"
                      : "border-line bg-transparent text-muted hover:border-lime/70 hover:bg-panel/70",
                  )}
                >
                  <span className="grid size-10 place-items-center rounded-card border border-line text-sm font-extrabold">
                    0{index + 1}
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.16em] text-lime">
                      {chapter.eyebrow.split("/").at(1)?.trim()}
                    </span>
                    <span className="mt-1 block text-sm font-bold">
                      {chapter.title}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <div className="relative flex items-center">
            <div className="absolute left-0 top-0 h-1 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full bg-lime transition-[width] duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="relative grid w-full grid-cols-[1fr_360px] items-center gap-8">
              <div className="relative aspect-[1.08] overflow-hidden rounded-card border border-line bg-panel-soft shadow-[var(--shadow-soft)]">
                <Image
                  src="/images/nora-halo-one-hero.webp"
                  alt="NORA Halo One scrollytelling product stage"
                  fill
                  sizes="58vw"
                  className="scale-[1.18] object-cover object-[64%_center] transition duration-700"
                  style={{
                    transform: `scale(${1.18 + activeIndex * 0.035}) translate3d(${-activeIndex * 1.5}%, ${activeIndex * -0.8}%, 0)`,
                  }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,transparent_0%,rgb(11_14_13_/_0.12)_36%,rgb(11_14_13_/_0.58)_100%)]" />
                <div className="scan-line absolute inset-y-8 left-[50%] w-px overflow-hidden bg-white/10" />

                <div
                  className="halo-pulse absolute size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
                  style={
                    {
                      left: activeDetail.hotspot.left,
                      top: activeDetail.hotspot.top,
                      borderColor: activeDetail.accent,
                      boxShadow: `0 0 80px ${activeDetail.accent}`,
                    } as CSSProperties
                  }
                />
                <div
                  className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-lime"
                  style={
                    {
                      left: activeDetail.hotspot.left,
                      top: activeDetail.hotspot.top,
                      background: activeDetail.accent,
                    } as CSSProperties
                  }
                />

                <div className="float-panel absolute bottom-6 left-6 max-w-xs rounded-card border border-white/16 bg-black/46 p-4 text-white backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">
                    {activeDetail.signal}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/72">
                    {activeDetail.note}
                  </p>
                </div>
              </div>

              <article className="rounded-card border border-line bg-panel p-6 shadow-[var(--shadow-soft)]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime">
                  {activeChapter.eyebrow}
                </p>
                <h3 className="mt-5 text-3xl font-extrabold leading-tight text-ink">
                  {activeChapter.title}
                </h3>
                <p className="mt-5 text-base leading-8 text-muted">
                  {activeChapter.description}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-card border border-line bg-page p-4">
                    <p className="text-3xl font-extrabold text-ink">
                      {activeDetail.metric}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                      {activeDetail.metricLabel}
                    </p>
                  </div>
                  <div className="rounded-card border border-line bg-page p-4">
                    <p className="text-3xl font-extrabold text-ink">
                      {progressPercent}%
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                      story progress
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-20 sm:px-6 lg:hidden">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
            Inside Halo One
          </p>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.02] text-ink">
            A care station told in four quiet moves.
          </h2>
          <div className="mt-10 space-y-5">
            {storyChapters.map((chapter, index) => (
              <article
                key={chapter.eyebrow}
                className="micro-lift rounded-card border border-line bg-panel p-5"
              >
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-card bg-panel-soft">
                  <Image
                    src="/images/nora-halo-one-hero.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    className="scale-125 object-cover object-[64%_center]"
                  />
                  <div className="absolute inset-0 bg-black/28" />
                  <span className="absolute left-4 top-4 rounded-card bg-black/46 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-lime backdrop-blur">
                    0{index + 1}
                  </span>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime">
                  {chapter.eyebrow}
                </p>
                <h3 className="mt-4 text-2xl font-extrabold leading-tight text-ink">
                  {chapter.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {chapter.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
