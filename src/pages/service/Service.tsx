/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import {
  useBuyServiceMutation,
  useGetServicesQuery,
} from "../../redux/features/service/service.api";
import Loading from "../../utils/Loading";
import HomeNav from "../home/components/HomeNav";
import HomeFooter from "../home/components/HomeFooter";
import "./service.css";

/* ── IService (re-exported for Packages.tsx) ── */
export interface IService {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  min: number;
  max: number;
  avgTime: string;
  image: string;
}

/* ── Platform definitions ── */
const PLATFORMS: Record<
  string,
  { name: string; icon: string; color: string; glow: string }
> = {
  all: {
    name: "All",
    icon: "✦",
    color: "#1fbf6c",
    glow: "rgba(31,191,108,0.45)",
  },
  feature: {
    name: "Featured",
    icon: "⭐",
    color: "#1fbf6c",
    glow: "rgba(31,191,108,0.45)",
  },
  facebook: {
    name: "Facebook",
    icon: "📘",
    color: "#1877f2",
    glow: "rgba(24,119,242,0.45)",
  },
  instagram: {
    name: "Instagram",
    icon: "📸",
    color: "#e1306c",
    glow: "rgba(225,48,108,0.45)",
  },
  youtube: {
    name: "YouTube",
    icon: "▶️",
    color: "#ff2d2d",
    glow: "rgba(255,45,45,0.42)",
  },
  tiktok: {
    name: "TikTok",
    icon: "🎵",
    color: "#27e6dd",
    glow: "rgba(39,230,221,0.4)",
  },
  telegram: {
    name: "Telegram",
    icon: "✈️",
    color: "#2aa6e0",
    glow: "rgba(42,166,224,0.45)",
  },
  linkedin: {
    name: "LinkedIn",
    icon: "💼",
    color: "#0a66c2",
    glow: "rgba(10,102,194,0.45)",
  },
  twitter: {
    name: "Twitter",
    icon: "🐦",
    color: "#1d9bf0",
    glow: "rgba(29,155,240,0.45)",
  },
  whatsapp: {
    name: "WhatsApp",
    icon: "💬",
    color: "#25d366",
    glow: "rgba(37,211,102,0.42)",
  },
  snapchat: {
    name: "Snapchat",
    icon: "👻",
    color: "#f3c400",
    glow: "rgba(243,196,0,0.4)",
  },
};

const PLATFORM_ORDER = [
  "all",
  "feature",
  "facebook",
  "instagram",
  "youtube",
  "tiktok",
  "telegram",
  "linkedin",
  "twitter",
  "whatsapp",
  "snapchat",
];

function getPlatformKey(service: IService): string {
  const text = (service.name + " " + service.category).toLowerCase();
  for (const key of PLATFORM_ORDER.filter((k) => k !== "all")) {
    if (text.includes(key)) return key;
  }
  return "feature";
}

/* ── Animation constants ── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i * 0.04, 0.48), duration: 0.5, ease: EASE },
  }),
};

const modalVar = {
  hidden: { opacity: 0, scale: 0.93, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.28, ease: EASE },
  },
  exit: { opacity: 0, scale: 0.93, y: 12, transition: { duration: 0.2 } },
};

const PAGE_SIZE = 24;

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

/* ── Component ── */
const ServiceCards = () => {
  const [activePlatform, setActivePlatform] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [link, setLink] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activePlatform, debouncedSearch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
 
  const categoryParam =
    !debouncedSearch && activePlatform !== "all" && activePlatform
      ? activePlatform
      : "";

  const { data, isLoading, isFetching } = useGetServicesQuery({
    category: categoryParam,
    search: debouncedSearch,
    page: currentPage,
    limit: PAGE_SIZE,
  });
  const [buyService, { isLoading: buyingService }] = useBuyServiceMutation();

  const services = (data?.data?.services ?? []) as IService[];
  const totalPages = data?.data?.totalPages ?? 1;
  const total      = data?.data?.total      ?? 0;
  const pageStart  = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageEnd    = Math.min(currentPage * PAGE_SIZE, total);

  const price = selectedService
    ? parseFloat((quantity * (selectedService.price / 1000)).toFixed(4))
    : 0;


  const openModal = (s: IService) => {
    setSelectedService(s);
    setQuantity(s.min);
    setLink("");
  };
  const closeModal = () => setSelectedService(null);

  const handleSubmit = async () => {
    if (buyingService) return;
    if (!link.trim()) {
      Swal.fire({
        icon: "error",
        title: "Link Required",
        text: "Please provide a valid link or username.",
      });
      return;
    }
    Swal.fire({
      title: "Processing...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    try {
      await buyService({
        id: selectedService?._id,
        buyInfo: { link, quantity, price },
      }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your service is now being processed.",
      });
      closeModal();
    } catch (e: any) {
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: e?.data?.error || "An error occurred.",
      });
    }
  };

  if (isLoading) {
    return (
      <div
        className="svc-page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Loading />
      </div>
    );
  }
  return (
    <div className="svc-page">
      <HomeNav />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="svc-hero pt-20">
        {/* Animated blobs */}
        <div
          style={{
            position: "fixed",
            top: "-20%",
            left: "-10%",
            right: "-10%",
            height: 900,
            zIndex: 0,
            pointerEvents: "none",
            filter: "blur(70px)",
            opacity: 0.82,
          }}
        >
          <div
            className="svc-blob-a"
            style={{
              position: "absolute",
              width: 480,
              height: 480,
              left: "8%",
              top: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, rgba(52,217,126,0.55), transparent 70%)",
              mixBlendMode: "screen" as const,
            }}
          />
          <div
            className="svc-blob-b"
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              right: "4%",
              top: 100,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 60% 40%, rgba(45,212,207,0.45), transparent 70%)",
              mixBlendMode: "screen" as const,
            }}
          />
          <div
            className="svc-blob-c"
            style={{
              position: "absolute",
              width: 360,
              height: 360,
              left: "40%",
              top: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, rgba(31,191,108,0.4), transparent 70%)",
              mixBlendMode: "screen" as const,
            }}
          />
        </div>

        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 20%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 20%, black 30%, transparent 75%)",
          }}
        />

        {/* Grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            opacity: 0.03,
            pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="svc-wrap  max-w-295 mx-auto px-2 sm:px-6 md:px-8 relative z-10">
          {/* Search */}
          <motion.div
            className="svc-search"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="svc-search-icon mt-4.5">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              className="mt-8.5 text-white placeholder:text-white"
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>

          {/* Category tabs */}
          <motion.div
            className="svc-tabs"
            style={{ marginBottom: 36 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
          >
            {PLATFORM_ORDER.map((key) => {
              const p = PLATFORMS[key];
              const isActive = activePlatform === key;
              return (
                <button
                  key={key}
                  className={`svc-tab${isActive ? " active" : ""}`}
                  style={
                    isActive
                      ? ({
                          "--tab-color": p.color,
                          "--tab-glow": p.glow,
                        } as React.CSSProperties)
                      : {}
                  }
                  onClick={() => setActivePlatform(key)}
                >
                  <span aria-hidden="true">{p.icon}</span>
                  {p.name}
                </button>
              );
            })}
          </motion.div>

          {/* Result count */}
          {total > 0 && (
            <p
              style={{
                color: "#4d6455",
                fontSize: 12.5,
                marginBottom: 18,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Showing {pageStart}–{pageEnd} of {total} services
            </p>
          )}

          {/* Cards grid */}
          <div className="svc-grid" style={{ opacity: isFetching ? 0.5 : 1, transition: "opacity 0.2s" }}>
            {!isFetching && services.length === 0 ? (
              <div className="svc-empty">
                <h3>No services found</h3>
                <p>Try a different category or clear your search.</p>
                <button
                  onClick={() => {
                    setActivePlatform("all");
                    setSearch("");
                  }}
                  style={{
                    marginTop: 18,
                    padding: "11px 28px",
                    borderRadius: 10,
                    background: "#1fbf6c",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  View all services
                </button>
              </div>
            ) : (
              services.map((service, i) => {
                const platformKey = getPlatformKey(service);
                const platform = PLATFORMS[platformKey];
                return (
                  <motion.div
                    key={service._id}
                    custom={i % PAGE_SIZE}
                    variants={cardVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="svc-card"
                    style={
                      {
                        "--accent": platform.color,
                        "--glow": platform.glow,
                      } as React.CSSProperties
                    }
                  >
                    <div className="svc-card-glow" />
                    <div className="svc-card-dots" />
                    <div className="svc-card-sheen" />
                    <div className="svc-card-content">
                      <div className="svc-card-header">
                        <span className="svc-platform-icon" aria-hidden="true">
                          {platform.icon}
                        </span>
                        <span
                          className="svc-platform-name"
                          style={{ color: platform.color }}
                        >
                          {platform.name}
                        </span>
                        {platformKey === "feature" && (
                          <span className="svc-badge">Recommended</span>
                        )}
                      </div>

                      <h3 className="svc-title">{service.name}</h3>

                      <div className="svc-divider" />

                      <div className="svc-price">
                        <span className="svc-price-val">${service.price}</span>
                        <span className="svc-price-per">/ 1,000</span>
                      </div>

                      <div className="svc-meta">
                        <div className="svc-meta-item">
                          <span className="svc-meta-label">Min</span>
                          <span className="svc-meta-val">
                            {service.min.toLocaleString()}
                          </span>
                        </div>
                        <div className="svc-meta-item">
                          <span className="svc-meta-label">Max</span>
                          <span className="svc-meta-val">
                            {service.max.toLocaleString()}
                          </span>
                        </div>
                        <div className="svc-meta-item">
                          <span className="svc-meta-label">Avg Time</span>
                          <span className="svc-meta-val">
                            {service.avgTime || "N/A"}
                          </span>
                        </div>
                      </div>

                      <button
                        className="svc-btn"
                        onClick={() => openModal(service)}
                      >
                        Create Order
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="svc-pagination flex items-center justify-center gap-1 my-2 flex-wrap">
              <button
                className="svc-page-nav"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                ← Prev
              </button>

              {getPageNumbers(currentPage, totalPages).map((n, idx) =>
                n === "…" ? (
                  <span key={`ellipsis-${idx}`} className="svc-page-ellipsis">…</span>
                ) : (
                  <button
                    key={n}
                    className={`svc-page-btn${currentPage === n ? " active" : ""}`}
                    onClick={() => setCurrentPage(n as number)}
                  >
                    {n}
                  </button>
                ),
              )}

              <button
                className="svc-page-nav"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      <HomeFooter />

      {/* ── Buy modal ── */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="svc-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              className="svc-modal"
              variants={modalVar}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="svc-modal-header">
                <div>
                  <p className="svc-modal-title">Create Order</p>
                  <p className="svc-modal-sub">{selectedService.name}</p>
                </div>
                <button
                  className="svc-modal-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="svc-modal-body">
                <div className="svc-modal-price-strip">
                  <span className="lbl">Price per 1,000</span>
                  <span className="val">${selectedService.price}</span>
                </div>

                <div>
                  <label className="svc-modal-field-label">
                    Target URL / Username
                  </label>
                  <input
                    className="svc-input"
                    type="text"
                    placeholder="https://... or @username"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>

                <div>
                  <div className="svc-qty-row">
                    <label
                      className="svc-modal-field-label"
                      style={{ marginBottom: 0 }}
                    >
                      Quantity
                    </label>
                    <span
                      style={{
                        fontSize: 12.5,
                        color: "#c2dcc9",
                        fontWeight: 600,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {quantity.toLocaleString()} /{" "}
                      {selectedService.max.toLocaleString()}
                    </span>
                  </div>
                  <input
                    className="svc-input"
                    type="number"
                    min={selectedService.min}
                    max={selectedService.max}
                    value={quantity}
                    onChange={(e) => {
                      const v = Math.min(
                        Math.max(Number(e.target.value), selectedService.min),
                        selectedService.max,
                      );
                      setQuantity(Number.isNaN(v) ? selectedService.min : v);
                    }}
                    style={{ marginBottom: 10, marginTop: 7 }}
                  />
                  <div className="svc-range">
                    <RangeSlider
                      value={[selectedService.min, quantity]}
                      onInput={(value: number[]) => setQuantity(value[1])}
                      min={selectedService.min}
                      max={selectedService.max}
                      thumbsDisabled={[true, false]}
                    />
                  </div>
                  <div className="svc-qty-hint">
                    <span>Min: {selectedService.min.toLocaleString()}</span>
                    <span>Max: {selectedService.max.toLocaleString()}</span>
                  </div>
                </div>

                <div className="svc-total-strip">
                  <span className="svc-total-lbl">Total cost</span>
                  <span className="svc-total-val">${price}</span>
                </div>
              </div>

              <div className="svc-modal-footer">
                <button className="svc-modal-btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  className="svc-modal-btn-submit"
                  onClick={handleSubmit}
                  disabled={!link.trim() || buyingService}
                >
                  {buyingService ? "Placing order…" : "Place Order"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceCards;
