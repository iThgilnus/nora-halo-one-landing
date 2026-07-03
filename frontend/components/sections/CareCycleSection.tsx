import { careCycle } from "@/lib/product-data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CareCycleSection() {
  return (
    <section className="bg-page px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Care cycle"
          title="Một chu trình rõ ràng từ lúc boss bước vào đến khi dữ liệu được đồng bộ."
          align="center"
        />

        <ol className="mt-12 grid gap-4 lg:grid-cols-5">
          {careCycle.map((step, index) => (
            <li
              key={step}
              className="micro-lift relative rounded-card border border-line bg-panel p-5"
            >
              <span className="grid size-10 place-items-center rounded-card bg-lime text-sm font-extrabold text-[#111411]">
                {index + 1}
              </span>
              <p className="mt-6 text-lg font-extrabold leading-tight text-ink">
                {step}
              </p>
              {index < careCycle.length - 1 ? (
                <span className="absolute -bottom-3 left-9 h-6 w-px bg-line lg:-right-3 lg:bottom-auto lg:left-auto lg:top-9 lg:h-px lg:w-6" />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
