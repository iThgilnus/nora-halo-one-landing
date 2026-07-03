import { ArrowDown, MessageCircle, Mouse } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section id="top" className="relative min-h-[86svh] overflow-hidden">
      <Image
        src="/images/nora-halo-one-hero.webp"
        alt="NORA Halo One concept smart cat care station in a modern home"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_14_13_/_0.94)_0%,rgb(11_14_13_/_0.72)_34%,rgb(11_14_13_/_0.2)_68%,rgb(11_14_13_/_0.04)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-page to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[86svh] max-w-7xl items-end px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-[72px]">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-card border border-white/16 bg-black/28 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/88 backdrop-blur">
            <span className="size-2 rounded-full bg-lime shadow-[0_0_18px_rgb(200_255_90_/_0.8)]" />
            Monitoring | Halo One online
          </div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-lime">
            NORA / HALO ONE
          </p>
          <h1 className="max-w-4xl text-balance text-5xl font-extrabold leading-[0.98] text-white sm:text-6xl lg:text-8xl">
            When you are away, care stays close.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
            Một trạm chăm sóc thông minh giúp không gian sống sạch hơn và thói
            quen của boss rõ ràng hơn mỗi ngày.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="#experience"
              className="min-h-[52px] bg-lime text-[#111411] hover:bg-lime/90"
              data-track-event="hero_explore_click"
              data-track-section="hero"
            >
              <ArrowDown size={18} />
              Explore Halo One
            </ButtonLink>
            <ButtonLink
              href="#consultation"
              variant="secondary"
              className="min-h-[52px] border-white/20 bg-white/10 text-white hover:border-lime hover:bg-white/16"
              data-track-event="hero_consultation_click"
              data-track-section="hero"
            >
              <MessageCircle size={18} />
              Get Consultation
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-4 z-10 hidden items-center gap-3 rounded-card border border-white/14 bg-black/24 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/78 backdrop-blur md:flex lg:right-8">
        <Mouse size={16} />
        Scroll to build story
        <span className="relative h-8 w-px overflow-hidden rounded-full bg-white/20">
          <span className="absolute left-0 top-0 h-3 w-px animate-bounce rounded-full bg-lime" />
        </span>
      </div>
    </section>
  );
}
