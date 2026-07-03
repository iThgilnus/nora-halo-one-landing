import { painPoints } from "@/lib/product-data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProblemSection() {
  return (
    <section id="experience" className="bg-page px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The daily gap"
          title="Chăm boss không khó. Khó là biết khi nào thói quen của boss đang thay đổi."
          description="Halo One bắt đầu từ một vấn đề rất đời thường: chủ nuôi không thể ở bên cạnh mèo mọi lúc, nhưng vẫn cần một cách quan sát yên tĩnh và đáng tin hơn."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {painPoints.map((item) => (
            <article
              key={item.eyebrow}
              className="micro-lift rounded-card border border-line bg-panel p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
                {item.eyebrow}
              </p>
              <h3 className="mt-8 text-2xl font-extrabold leading-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
