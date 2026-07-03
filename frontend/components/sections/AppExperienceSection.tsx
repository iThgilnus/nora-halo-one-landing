import { History, Moon, Play, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const actions = [
  { icon: Play, label: "Clean now" },
  { icon: Moon, label: "Quiet mode" },
  { icon: History, label: "View history" },
];

export function AppExperienceSection() {
  return (
    <section className="border-y border-line bg-panel px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="order-2 rounded-card border border-line bg-page p-5 lg:order-1">
          <div className="rounded-card border border-line bg-panel-soft p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
                  Today
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-ink">
                  Habit timeline
                </h3>
              </div>
              <Sparkles className="text-lime" size={24} aria-hidden />
            </div>

            <div className="mt-7 space-y-4">
              {[
                ["08:12", "Milo used Halo One"],
                ["13:47", "Cleaning cycle completed"],
                ["16:05", "Mochi visit logged"],
              ].map(([time, text]) => (
                <div
                  key={time}
                  className="grid grid-cols-[72px_1fr] items-start gap-4 rounded-card border border-line bg-panel p-4"
                >
                  <p className="text-sm font-extrabold text-lime">{time}</p>
                  <p className="text-sm leading-6 text-muted">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {actions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.label}
                    type="button"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-card border border-line bg-panel px-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-lime active:scale-[0.98]"
                  >
                    <Icon size={17} aria-hidden />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="App experience"
            title="Không cần nhiều biểu đồ. Chỉ cần đúng tín hiệu vào đúng lúc."
            description="NORA App được thiết kế như một bảng điều khiển ngắn gọn: trạng thái máy, lượt sử dụng trong ngày, thao tác nhanh và lịch sử chăm sóc."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#quote" variant="secondary">
              Build your setup
            </ButtonLink>
            <ButtonLink href="#consultation">Request consultation</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
