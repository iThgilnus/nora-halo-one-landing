"use client";

import {
  Check,
  Heart,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { trackEvent } from "@/lib/analytics";
import { accessories, Accessory } from "@/lib/product-data";
import { cn } from "@/lib/utils";

type QuoteCartContextValue = {
  cartItems: Accessory[];
  wishlistItems: Accessory[];
  recentItems: Accessory[];
  isInCart: (id: string) => boolean;
  isWishlisted: (id: string) => boolean;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  toggleWishlist: (id: string) => void;
  markViewed: (id: string) => void;
  openCart: () => void;
};

const QuoteCartContext = createContext<QuoteCartContextValue | null>(null);
const itemMap = new Map(accessories.map((item) => [item.id, item]));
const quoteStorageEvent = "nora-quote-storage-change";

function getStoredSnapshot(key: string) {
  return localStorage.getItem(key) ?? "[]";
}

function getServerStoredSnapshot() {
  return "[]";
}

function subscribeQuoteStorage(callback: () => void) {
  window.addEventListener(quoteStorageEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(quoteStorageEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function parseStoredIds(snapshot: string) {
  try {
    const value = JSON.parse(snapshot);
    return Array.isArray(value)
      ? value.filter((id): id is string => itemMap.has(id))
      : [];
  } catch {
    return [];
  }
}

function writeStoredIds(key: string, ids: string[]) {
  localStorage.setItem(key, JSON.stringify(ids));
  window.dispatchEvent(new Event(quoteStorageEvent));
}

function idsToItems(ids: string[]) {
  return ids
    .map((id) => itemMap.get(id))
    .filter((item): item is Accessory => Boolean(item));
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext);

  if (!context) {
    throw new Error("useQuoteCart must be used inside QuoteCartProvider");
  }

  return context;
}

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const cartSnapshot = useSyncExternalStore(
    subscribeQuoteStorage,
    () => getStoredSnapshot("nora-quote-cart"),
    getServerStoredSnapshot,
  );
  const wishlistSnapshot = useSyncExternalStore(
    subscribeQuoteStorage,
    () => getStoredSnapshot("nora-wishlist"),
    getServerStoredSnapshot,
  );
  const recentSnapshot = useSyncExternalStore(
    subscribeQuoteStorage,
    () => getStoredSnapshot("nora-recently-viewed"),
    getServerStoredSnapshot,
  );
  const cartIds = useMemo(() => parseStoredIds(cartSnapshot), [cartSnapshot]);
  const wishlistIds = useMemo(
    () => parseStoredIds(wishlistSnapshot),
    [wishlistSnapshot],
  );
  const recentIds = useMemo(() => parseStoredIds(recentSnapshot), [recentSnapshot]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const value = useMemo<QuoteCartContextValue>(
    () => ({
      cartItems: idsToItems(cartIds),
      wishlistItems: idsToItems(wishlistIds),
      recentItems: idsToItems(recentIds),
      isInCart: (id) => cartIds.includes(id),
      isWishlisted: (id) => wishlistIds.includes(id),
      addItem: (id) => {
        writeStoredIds(
          "nora-quote-cart",
          cartIds.includes(id) ? cartIds : [...cartIds, id],
        );
        writeStoredIds(
          "nora-recently-viewed",
          [id, ...recentIds.filter((currentId) => currentId !== id)].slice(
            0,
            4,
          ),
        );
        trackEvent("quote_cart_add", "quote", { itemId: id });
      },
      removeItem: (id) => {
        writeStoredIds(
          "nora-quote-cart",
          cartIds.filter((currentId) => currentId !== id),
        );
      },
      toggleWishlist: (id) => {
        writeStoredIds(
          "nora-wishlist",
          wishlistIds.includes(id)
            ? wishlistIds.filter((currentId) => currentId !== id)
            : [...wishlistIds, id],
        );
        writeStoredIds(
          "nora-recently-viewed",
          [id, ...recentIds.filter((currentId) => currentId !== id)].slice(
            0,
            4,
          ),
        );
      },
      markViewed: (id) => {
        writeStoredIds(
          "nora-recently-viewed",
          [id, ...recentIds.filter((currentId) => currentId !== id)].slice(
            0,
            4,
          ),
        );
      },
      openCart: () => {
        setDrawerOpen(true);
        trackEvent("quote_cart_opened", "quote");
      },
    }),
    [cartIds, recentIds, wishlistIds],
  );

  return (
    <QuoteCartContext.Provider value={value}>
      {children}
      <QuoteCartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </QuoteCartContext.Provider>
  );
}

export function QuoteCartButton({
  label,
  className,
  onOpen,
}: {
  label?: string;
  className?: string;
  onOpen?: () => void;
}) {
  const { cartItems, openCart } = useQuoteCart();

  return (
    <button
      type="button"
      onClick={() => {
        onOpen?.();
        openCart();
      }}
      className={cn(
        "relative inline-flex min-h-11 items-center justify-center gap-2 rounded-card border border-line bg-panel px-3 text-sm font-bold text-ink transition hover:border-lime hover:bg-panel-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime",
        !label && "size-11 px-0",
        className,
      )}
      aria-label={label ? undefined : "Open quote cart"}
    >
      <ShoppingBag size={18} aria-hidden />
      {label ? <span>{label}</span> : null}
      {cartItems.length ? (
        <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-lime text-[11px] font-extrabold text-[#111411]">
          {cartItems.length}
        </span>
      ) : null}
    </button>
  );
}

function QuoteCartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cartItems, wishlistItems, recentItems, removeItem } = useQuoteCart();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[70] bg-black/50 transition",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Quote cart"
        className={cn(
          "fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-md flex-col border-l border-line bg-page shadow-[0_24px_90px_rgb(0_0_0_/_0.42)] transition duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">
              Build your care setup
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-ink">
              Quote Cart
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote cart"
            className="grid size-10 place-items-center rounded-card border border-line bg-panel text-ink"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length ? (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 rounded-card border border-line bg-panel p-4"
                >
                  <div>
                    <p className="font-extrabold text-ink">{item.name}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {item.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="grid size-9 shrink-0 place-items-center rounded-card border border-line text-orange"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} aria-hidden />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-card border border-line bg-panel p-5 text-sm leading-7 text-muted">
              Chưa có sản phẩm nào trong quote cart.
            </div>
          )}

          <DrawerList title="Wishlist" items={wishlistItems} icon="heart" />
          <DrawerList title="Recently viewed" items={recentItems} />
        </div>

        <div className="border-t border-line p-5">
          <a
            href="#consultation"
            onClick={onClose}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-card bg-orange px-5 text-sm font-extrabold text-white transition hover:bg-orange/90"
          >
            Request a tailored consultation
          </a>
        </div>
      </aside>
    </>
  );
}

function DrawerList({
  title,
  items,
  icon,
}: {
  title: string;
  items: Accessory[];
  icon?: "heart";
}) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
        {title}
      </h3>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-card border border-line bg-panel p-3"
          >
            {icon === "heart" ? (
              <Heart className="text-orange" size={16} fill="currentColor" />
            ) : (
              <Check className="text-lime" size={16} />
            )}
            <span className="text-sm font-bold text-ink">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
