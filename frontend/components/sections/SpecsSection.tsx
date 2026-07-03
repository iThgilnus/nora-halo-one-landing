import { specs } from "@/lib/product-data";

export function SpecsSection() {
  return (
    <section
      id="specifications"
      className="bg-page px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Specifications
            </p>
            <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.03] text-ink md:text-6xl">
              Built for quieter routines.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted lg:justify-self-end">
            Đây là thông số concept dành riêng cho bài test. Các con số được
            thiết kế để website có đủ chiều sâu sản phẩm mà không đại diện cho
            thiết bị thương mại thật.
          </p>
        </div>

        <dl className="divide-y divide-line">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="grid gap-3 py-5 sm:grid-cols-[0.42fr_0.58fr] sm:items-center"
            >
              <dt className="text-sm font-bold uppercase tracking-[0.14em] text-muted">
                {spec.label}
              </dt>
              <dd className="text-xl font-extrabold text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
