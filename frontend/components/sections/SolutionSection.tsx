import Image from "next/image";
import { promises } from "@/lib/product-data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SolutionSection() {
  return (
    <section className="border-y border-line bg-panel-soft px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="The reveal"
            title="Halo One không thay bạn chăm boss. Nó giúp bạn nhận ra điều cần quan tâm sớm hơn."
            description="Sản phẩm concept tập trung vào bốn lời hứa: quan sát, bảo vệ, làm sạch và thông tin hóa các tín hiệu nhỏ trong ngày."
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {promises.map((item) => (
              <article
                key={item.eyebrow}
                className="micro-lift rounded-card border border-line bg-panel p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
                  {item.eyebrow}
                </p>
                <h3 className="mt-4 text-lg font-extrabold text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="micro-lift relative overflow-hidden rounded-card border border-line bg-page">
          <Image
            src="/images/nora-halo-one-hero.webp"
            alt="Full product view of the NORA Halo One concept station"
            width={1710}
            height={966}
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="aspect-[4/3] w-full object-cover object-[66%_center]"
          />
          <div className="absolute bottom-4 left-4 right-4 rounded-card border border-white/16 bg-black/42 p-4 text-white backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime">
              NORA Guard active
            </p>
            <p className="mt-2 text-sm leading-6 text-white/78">
              Safety scan complete. Cleaning cycle waits until the cabin is
              clear.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
