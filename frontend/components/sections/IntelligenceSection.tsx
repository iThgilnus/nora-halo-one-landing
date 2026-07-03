import { Activity, Bell, Camera, ShieldCheck } from "lucide-react";
import { appProfiles } from "@/lib/product-data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const insightCards = [
  {
    icon: Activity,
    label: "Usage rhythm",
    value: "3 visits today",
    note: "Average duration: 1m 12s",
  },
  {
    icon: Camera,
    label: "Vision status",
    value: "Live view ready",
    note: "Infrared supported at night",
  },
  {
    icon: ShieldCheck,
    label: "Safety",
    value: "Cabin clear",
    note: "Cleaning can begin",
  },
];

export function IntelligenceSection() {
  return (
    <section
      id="intelligence"
      className="border-y border-line bg-panel-soft px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="NORA Intelligence"
            title="Từ những hành vi nhỏ, tạo ra một bức tranh rõ hơn."
            description="Halo One không chẩn đoán sức khỏe. Nó mô phỏng cách gom các tín hiệu sử dụng thành nhật ký dễ hiểu để chủ nuôi quan sát hoặc tham khảo chuyên gia khi cần."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {insightCards.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="micro-lift rounded-card border border-line bg-panel p-5"
                >
                  <Icon className="text-blue" size={22} aria-hidden />
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                    {item.label}
                  </p>
                  <h3 className="mt-3 text-xl font-extrabold text-ink">
                    {item.value}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {item.note}
                  </p>
                </article>
              );
            })}
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">
            Dữ liệu trên là mô phỏng trải nghiệm sản phẩm. Không thay thế tư
            vấn thú y.
          </p>
        </div>

        <div className="rounded-[28px] border border-line bg-[#101411] p-3 shadow-[var(--shadow-soft)]">
          <div className="rounded-[20px] border border-white/10 bg-[#171c19] p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">
                  NORA App
                </p>
                <h3 className="mt-2 text-2xl font-extrabold">Halo One</h3>
              </div>
              <div className="grid size-11 place-items-center rounded-card bg-lime/12 text-lime">
                <Bell size={19} aria-hidden />
              </div>
            </div>

            <div className="mt-7 rounded-card border border-white/10 bg-white/6 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold">Online</span>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-lime">
                  <span className="size-2 rounded-full bg-lime" />
                  Monitoring
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-card bg-black/26 p-3">
                  <p className="text-3xl font-extrabold">36</p>
                  <p className="text-xs text-white/60">dB max</p>
                </div>
                <div className="rounded-card bg-black/26 p-3">
                  <p className="text-3xl font-extrabold">8</p>
                  <p className="text-xs text-white/60">cat profiles</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {appProfiles.map((profile) => (
                <div
                  key={profile.name}
                  className="rounded-card border border-white/10 bg-white/6 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold">{profile.name}</p>
                      <p className="mt-1 text-sm text-white/62">
                        {profile.visits}
                      </p>
                    </div>
                    <p className="max-w-28 text-right text-xs font-semibold text-lime">
                      {profile.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Clean now", "Quiet mode", "View history"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="min-h-11 rounded-card border border-white/10 bg-white/8 px-3 text-xs font-bold text-white transition hover:bg-white/14"
                  data-track-section="app"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
