"use client";

import { Check, Heart, Plus } from "lucide-react";
import { accessories } from "@/lib/product-data";
import { useQuoteCart } from "@/components/commerce/QuoteCartProvider";

export function QuoteCartSection() {
  const {
    addItem,
    isInCart,
    isWishlisted,
    markViewed,
    openCart,
    toggleWishlist,
  } = useQuoteCart();

  return (
    <section
      id="quote"
      className="border-y border-line bg-panel-soft px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
              Build your care setup
            </p>
            <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.03] text-ink md:text-6xl">
              Chọn bộ chăm sóc phù hợp trước khi gửi tư vấn.
            </h2>
          </div>
          <button
            type="button"
            onClick={openCart}
            className="inline-flex min-h-12 items-center justify-center rounded-card bg-orange px-5 text-sm font-extrabold text-white transition hover:bg-orange/90"
          >
            Open quote cart
          </button>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {accessories.map((item) => {
            const added = isInCart(item.id);
            const wished = isWishlisted(item.id);

            return (
              <article
                key={item.id}
                onMouseEnter={() => markViewed(item.id)}
                onFocus={() => markViewed(item.id)}
              className="micro-lift flex min-h-[280px] flex-col rounded-card border border-line bg-panel p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-card bg-lime/12 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-lime">
                    {item.tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item.id)}
                    className="grid size-10 place-items-center rounded-card border border-line text-orange transition hover:-translate-y-0.5 hover:border-orange active:scale-[0.96]"
                    aria-label={
                      wished
                        ? `Remove ${item.name} from wishlist`
                        : `Add ${item.name} to wishlist`
                    }
                  >
                    <Heart
                      size={18}
                      fill={wished ? "currentColor" : "none"}
                      aria-hidden
                    />
                  </button>
                </div>

                <h3 className="mt-8 text-2xl font-extrabold leading-tight text-ink">
                  {item.name}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                  {item.description}
                </p>

                <button
                  type="button"
                  onClick={() => addItem(item.id)}
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-card border border-line bg-page px-4 text-sm font-extrabold text-ink transition hover:-translate-y-0.5 hover:border-lime active:scale-[0.98]"
                >
                  {added ? (
                    <>
                      <Check size={17} className="text-lime" aria-hidden />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus size={17} aria-hidden />
                      Add to quote
                    </>
                  )}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
