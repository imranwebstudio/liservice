/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useGetServicesQuery, useBuyServiceMutation } from "../../../redux/features/service/service.api";
import { useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/features/auth/authSlice";
import type { IService } from "../../service/Service";
import "../../service/service.css";

/* ── Platform map (mirrors Service.tsx) ── */
const PLATFORMS: Record<string, { name: string; icon: string; color: string; glow: string }> = {
  all:       { name: "All",       icon: "✦",  color: "#1fbf6c", glow: "rgba(31,191,108,0.45)" },
  feature:   { name: "Featured",  icon: "⭐", color: "#1fbf6c", glow: "rgba(31,191,108,0.45)" },
  facebook:  { name: "Facebook",  icon: "📘", color: "#1877f2", glow: "rgba(24,119,242,0.45)" },
  instagram: { name: "Instagram", icon: "📸", color: "#e1306c", glow: "rgba(225,48,108,0.45)" },
  youtube:   { name: "YouTube",   icon: "▶️",  color: "#ff2d2d", glow: "rgba(255,45,45,0.42)"  },
  tiktok:    { name: "TikTok",    icon: "🎵", color: "#27e6dd", glow: "rgba(39,230,221,0.4)"  },
  telegram:  { name: "Telegram",  icon: "✈️",  color: "#2aa6e0", glow: "rgba(42,166,224,0.45)" },
  linkedin:  { name: "LinkedIn",  icon: "💼", color: "#0a66c2", glow: "rgba(10,102,194,0.45)" },
  twitter:   { name: "Twitter",   icon: "🐦", color: "#1d9bf0", glow: "rgba(29,155,240,0.45)" },
  whatsapp:  { name: "WhatsApp",  icon: "💬", color: "#25d366", glow: "rgba(37,211,102,0.42)" },
  snapchat:  { name: "Snapchat",  icon: "👻", color: "#f3c400", glow: "rgba(243,196,0,0.4)"   },
};

const PLATFORM_ORDER = ["all","feature","facebook","instagram","youtube","tiktok","telegram","linkedin","twitter","whatsapp","snapchat"];

function getPlatformKey(service: IService): string {
  const text = (service.name + " " + service.category).toLowerCase();
  for (const key of PLATFORM_ORDER.filter(k => k !== "all")) {
    if (text.includes(key)) return key;
  }
  return "feature";
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: Math.min(i * 0.05, 0.4), duration: 0.5, ease: EASE },
  }),
};

const modalVar = {
  hidden:  { opacity: 0, scale: 0.93, y: 18 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.28, ease: EASE } },
  exit:    { opacity: 0, scale: 0.93, y: 12, transition: { duration: 0.2  } },
};

const revealUp = (delay: number) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] as const } },
});

const PREVIEW_COUNT = 6;

const ServicesPreviewSection = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const [activePlatform, setActivePlatform] = useState("all");
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [link, setLink] = useState("");

  const { data, isLoading } = useGetServicesQuery({ category: "" });
  const [buyService, { isLoading: buyingService }] = useBuyServiceMutation();

  const price = useMemo(() => {
    if (!selectedService) return 0;
    return parseFloat((quantity * (selectedService.price / 1000)).toFixed(4));
  }, [quantity, selectedService]);

  const filtered = useMemo<IService[]>(() => {
    if (!data?.data?.services) return [];
    const list = data.data.services as IService[];
    if (activePlatform === "all") return list;
    return list.filter(s => getPlatformKey(s) === activePlatform);
  }, [data, activePlatform]);

  const preview = filtered.slice(0, PREVIEW_COUNT);

  const openModal = (s: IService) => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please sign in to purchase services.",
        showCancelButton: true,
        confirmButtonText: "Sign In",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#1fbf6c",
        background: "#0b1a10",
        color: "#f3fbf5",
      }).then(result => {
        if (result.isConfirmed) navigate("/register");
      });
      return;
    }
    setSelectedService(s);
    setQuantity(s.min);
    setLink("");
  };

  const closeModal = () => setSelectedService(null);

  const handleBuy = async () => {
    if (buyingService) return;
    if (!link.trim()) {
      Swal.fire({ icon: "error", title: "Link Required", text: "Please provide a valid link or username." });
      return;
    }
    Swal.fire({ title: "Processing...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    try {
      await buyService({ id: selectedService?._id, buyInfo: { link, quantity, price } }).unwrap();
      Swal.fire({ icon: "success", title: "Order Placed!", text: "Your service is now being processed." });
      closeModal();
    } catch (e: any) {
      Swal.fire({ icon: "error", title: "Order Failed", text: e?.data?.error || "An error occurred." });
    }
  };

  return (
    <section
      id="services-preview"
      className="py-30 max-[900px]:py-20 max-sm:py-16"
      style={{ background: "var(--site-bg)" }}
    >
      <div className="max-w-295 mx-auto px-8 max-sm:px-5">

        {/* ── Section header ── */}
        <motion.div
          variants={revealUp(0)} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-140 mx-auto mb-14"
        >
          <div
            className="inline-flex items-center gap-2 text-[12.5px] font-semibold tracking-widest uppercase text-[#34d97e] mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="w-4.5 h-px bg-[#34d97e] inline-block" />
            Our Services
            <span className="w-4.5 h-px bg-[#34d97e] inline-block" />
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 42, fontWeight: 600, letterSpacing: "-0.025em",
            marginBottom: 16, lineHeight: 1.15, color: "var(--site-t0)",
          }}>
            Grow every platform,{" "}
            <span style={{
              background: "linear-gradient(120deg, #6ee7a8, #2dd4cf 50%, #1fbf6c)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            }}>
              instantly
            </span>
          </h2>
          <p className="text-[#aebcb2] text-base leading-[1.7]" style={{ fontFamily: "'Inter', sans-serif" }}>
            500+ SMM services across every major platform. Pick a category and start an order in seconds.
          </p>
        </motion.div>

        {/* ── Platform tabs ── */}
        <motion.div
          className="svc-tabs mb-9"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
        >
          {PLATFORM_ORDER.map(key => {
            const p = PLATFORMS[key];
            const isActive = activePlatform === key;
            return (
              <button
                key={key}
                className={`svc-tab${isActive ? " active" : ""}`}
                style={isActive ? ({ "--tab-color": p.color, "--tab-glow": p.glow } as React.CSSProperties) : {}}
                onClick={() => setActivePlatform(key)}
              >
                <span aria-hidden="true">{p.icon}</span>
                {p.name}
              </button>
            );
          })}
        </motion.div>

        {/* ── Cards ── */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-[#1fbf6c] border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            <div className="svc-grid">
              {preview.length === 0 ? (
                <div className="svc-empty">
                  <h3>No services in this category</h3>
                  <p>Try selecting a different platform above.</p>
                  <button
                    onClick={() => setActivePlatform("all")}
                    style={{ marginTop: 18, padding: "11px 28px", borderRadius: 10, background: "#1fbf6c", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}
                  >
                    View all
                  </button>
                </div>
              ) : preview.map((service, i) => {
                const platformKey = getPlatformKey(service);
                const platform = PLATFORMS[platformKey];
                return (
                  <motion.div
                    key={service._id}
                    custom={i}
                    variants={cardVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="svc-card"
                    style={{ "--accent": platform.color, "--glow": platform.glow } as React.CSSProperties}
                  >
                    <div className="svc-card-glow" />
                    <div className="svc-card-dots" />
                    <div className="svc-card-sheen" />
                    <div className="svc-card-content">
                      <div className="svc-card-header">
                        <span className="svc-platform-icon" aria-hidden="true">{platform.icon}</span>
                        <span className="svc-platform-name" style={{ color: platform.color }}>{platform.name}</span>
                        {platformKey === "feature" && <span className="svc-badge">Recommended</span>}
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
                          <span className="svc-meta-val">{service.min.toLocaleString()}</span>
                        </div>
                        <div className="svc-meta-item">
                          <span className="svc-meta-label">Max</span>
                          <span className="svc-meta-val">{service.max.toLocaleString()}</span>
                        </div>
                        <div className="svc-meta-item">
                          <span className="svc-meta-label">Avg Time</span>
                          <span className="svc-meta-val">{service.avgTime || "N/A"}</span>
                        </div>
                      </div>
                      <button className="svc-btn" onClick={() => openModal(service)}>
                        {user ? "Create Order" : "Get Started"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ── View all CTA ── */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to="/service"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 36px",
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #188A50, #06B913)",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                  boxShadow: "0 4px 28px -6px rgba(31,191,108,0.5)",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                View all {filtered.length > PREVIEW_COUNT ? `${filtered.length}+` : ""} services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </motion.div>
          </>
        )}
      </div>

      {/* ── Buy modal ── */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="svc-modal-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <motion.div
              className="svc-modal"
              variants={modalVar} initial="hidden" animate="visible" exit="exit"
            >
              <div className="svc-modal-header">
                <div>
                  <p className="svc-modal-title">Create Order</p>
                  <p className="svc-modal-sub">{selectedService.name}</p>
                </div>
                <button className="svc-modal-close" onClick={closeModal} aria-label="Close">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="svc-modal-body">
                <div className="svc-modal-price-strip">
                  <span className="lbl">Price per 1,000</span>
                  <span className="val">${selectedService.price}</span>
                </div>

                <div>
                  <label className="svc-modal-field-label">Target URL / Username</label>
                  <input
                    className="svc-input"
                    type="text"
                    placeholder="https://... or @username"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                  />
                </div>

                <div>
                  <div className="svc-qty-row">
                    <label className="svc-modal-field-label" style={{ marginBottom: 0 }}>Quantity</label>
                    <span style={{ fontSize: 12.5, color: "#c2dcc9", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {quantity.toLocaleString()} / {selectedService.max.toLocaleString()}
                    </span>
                  </div>
                  <input
                    className="svc-input"
                    type="number"
                    min={selectedService.min}
                    max={selectedService.max}
                    value={quantity}
                    onChange={e => {
                      const v = Math.min(Math.max(Number(e.target.value), selectedService.min), selectedService.max);
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
                <button className="svc-modal-btn-cancel" onClick={closeModal}>Cancel</button>
                <button
                  className="svc-modal-btn-submit"
                  onClick={handleBuy}
                  disabled={!link.trim() || buyingService}
                >
                  {buyingService ? "Placing order…" : "Place Order"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesPreviewSection;
