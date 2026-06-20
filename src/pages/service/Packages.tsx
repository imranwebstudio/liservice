/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { useBuyServiceMutation, useGetServicesQuery } from "../../redux/features/service/service.api";
import { IService } from "./Service";
import Loading from "../../utils/Loading";
import { useEffect, useState } from "react";
import placeHolderImg from "../../assets/placeHolderImg.gif";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiLink, FiHash, FiArrowRight, FiClock, FiZap } from "react-icons/fi";

const categoryImages: Record<string, string> = {
    facebook:  "https://images.macrumors.com/t/3SwpDI7nrMQeeIro9X7SbILE4_I=/1600x0/article-new/2021/03/Facebook-Feature.jpg",
    instagram: "https://www.internetmatters.org/wp-content/uploads/2020/01/instalogo.png",
    youtube:   "https://images.macrumors.com/t/oVY3CeutZiDKCY3YZHL7LEoRf54=/1600x0/article-new/2021/09/General-YouTube-Feature-1.jpg",
    telegram:  "https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/03/Telegram-featured.jpg",
    tiktok:    "https://www.manchesterdigital.com/storage/15585/alexander-shatov-I4p0FcjDBJI-unsplash.jpg",
    whatsapp:  "https://images.macrumors.com/t/vidUYJg5x6IPyS6kgo7Voj5JaXk=/1600x0/article-new/2021/03/Whatsapp-Feature.jpg",
    snapchat:  "https://engage.sinch.com/sites/default/files/styles/small/public/image/2023-12/Was%20ist%20Snapchat.jpg?itok=ifJAOVyr",
    twitter:   "https://kendesk.co.ke/wp-content/uploads/X-Twitter.jpg",
    linkedin:  "https://irishtechnews-ie.exactdn.com/wp-content/uploads/2015/12/linkedin-earnings1-759x500.png?lossy=1&ssl=1",
    apple:     "https://blog.logomyway.com/wp-content/uploads/2020/08/apple-logo2.jpg",
};

const catColors: Record<string, string> = {
    facebook: "bg-blue-50 text-blue-700 border-blue-200",
    instagram:"bg-pink-50 text-pink-700 border-pink-200",
    youtube:  "bg-red-50 text-red-700 border-red-200",
    telegram: "bg-sky-50 text-sky-700 border-sky-200",
    tiktok:   "bg-gray-100 text-gray-700 border-gray-200",
    whatsapp: "bg-green-50 text-green-700 border-green-200",
    snapchat: "bg-yellow-50 text-yellow-700 border-yellow-200",
    twitter:  "bg-slate-50 text-slate-700 border-slate-200",
    linkedin: "bg-blue-50 text-blue-700 border-blue-200",
    apple:    "bg-gray-100 text-gray-800 border-gray-200",
};

const getCategoryImage = (name: string) => {
    for (const [cat, url] of Object.entries(categoryImages)) {
        if (name.toLowerCase().includes(cat)) return url;
    }
    return "";
};

const getCatColor = (name: string) => {
    for (const [cat, cls] of Object.entries(catColors)) {
        if (name.toLowerCase().includes(cat)) return cls;
    }
    return "bg-indigo-50 text-indigo-700 border-indigo-200";
};

/* ─── Variants ──────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.06, duration: 0.5, ease: EASE },
    }),
};

const modalVariants = {
    hidden:   { opacity: 0, scale: 0.94, y: 16 },
    visible:  { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: EASE } },
    exit:     { opacity: 0, scale: 0.94, y: 16, transition: { duration: 0.2 } },
};

/* ═══════════════════════════════════════════════════════════════ */
const Packages = () => {
    const [filter, setFilter] = useState("");
    const { data, isLoading } = useGetServicesQuery({ category: "feature" });
    const [buyService, { isLoading: buyingService }] = useBuyServiceMutation();
    const [selectedService, setSelectedService] = useState<IService | null>(null);
    const [buyInfo, setBuyInfo] = useState({ link: "", quantity: 0 });
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        if (data?.data) {
            const unique = new Set<string>();
            data.data.forEach((s: IService) => {
                Object.keys(categoryImages).forEach(kw => {
                    if (s.name.toLowerCase().includes(kw)) unique.add(kw);
                });
            });
            setCategories(Array.from(unique));
        }
    }, [data]);

    const openModal = (s: IService) => { setSelectedService(s); setBuyInfo({ link: "", quantity: s.min }); };
    const closeModal = () => setSelectedService(null);

    const handleSubmit = async () => {
        if (buyingService) return;
        if (!buyInfo.link) {
            Swal.fire({ icon: 'error', title: 'Link Required', text: 'Please provide a valid link before submitting.' });
            return;
        }
        Swal.fire({ title: 'Processing...', text: 'Please wait', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        try {
            await buyService({ id: selectedService?._id, buyInfo }).unwrap();
            Swal.fire({ icon: 'success', title: 'Order Successful!', text: 'Your service has been successfully purchased.' });
            closeModal();
        } catch (e: any) {
            Swal.fire({ icon: 'error', title: 'Order Failed', text: e?.data?.error || 'An error occurred.' });
        }
    };

    const filtered = data?.data?.filter((s: IService) =>
        filter === "" || s.name.toLowerCase().includes(filter)
    );

    if (isLoading) return <Loading />;
    if (!data?.data?.length) return null;

    return (
        <section className="py-20 px-4 bg-base-200/30">
            <div className="max-w-7xl mx-auto">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}
                    className="text-center mb-10"
                >
                    <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest mb-2">Featured</span>
                    <h2 className="text-3xl md:text-4xl font-bold">Popular Packages</h2>
                    <p className="text-base-content/50 mt-2 text-sm max-w-md mx-auto">
                        Hand-picked services loved by thousands of customers. Instant delivery guaranteed.
                    </p>
                </motion.div>

                {/* Category filter pills */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-2 mb-10"
                >
                    <button
                        onClick={() => setFilter("")}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                            filter === ""
                                ? "bg-primary text-primary-content border-primary shadow-md shadow-primary/20"
                                : "bg-base-100 text-base-content/60 border-base-200 hover:border-primary/30 hover:text-base-content"
                        }`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                                filter === cat
                                    ? "bg-primary text-primary-content border-primary shadow-md shadow-primary/20"
                                    : "bg-base-100 text-base-content/60 border-base-200 hover:border-primary/30 hover:text-base-content"
                            }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </motion.div>

                {/* Service cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered?.map((service: IService, i: number) => (
                        <motion.div
                            key={service._id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-40px' }}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="group bg-base-100 rounded-2xl border border-base-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden h-44">
                                <img
                                    src={service.image || getCategoryImage(service.name) || placeHolderImg}
                                    alt={service.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={e => { (e.target as HTMLImageElement).src = placeHolderImg; }}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                                {/* Category badge */}
                                {(() => {
                                    const match = Object.keys(categoryImages).find(k => service.name.toLowerCase().includes(k));
                                    return match ? (
                                        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${getCatColor(service.name)} backdrop-blur-sm`}>
                                            {match.charAt(0).toUpperCase() + match.slice(1)}
                                        </span>
                                    ) : null;
                                })()}
                                {/* Price badge */}
                                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm border border-white/15 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                    ${service.price}/1K
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-3">{service.name}</h3>

                                <div className="flex items-center gap-4 text-xs text-base-content/50 mb-4">
                                    <span className="flex items-center gap-1">
                                        <FiZap className="w-3.5 h-3.5 text-amber-500" />
                                        Min {service.min.toLocaleString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FiHash className="w-3.5 h-3.5 text-indigo-400" />
                                        Max {service.max.toLocaleString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FiClock className="w-3.5 h-3.5 text-emerald-500" />
                                        {service.avgTime}h avg
                                    </span>
                                </div>

                                <button
                                    onClick={() => openModal(service)}
                                    className="mt-auto w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-content font-semibold text-sm py-2.5 rounded-xl transition-all duration-150 group/btn"
                                >
                                    Order Now
                                    <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Premium Modal ──────────────────────────────────── */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
                    >
                        <motion.div
                            variants={modalVariants} initial="hidden" animate="visible" exit="exit"
                            className="w-full max-w-md bg-base-100 rounded-2xl border border-base-200 shadow-2xl overflow-hidden"
                        >
                            {/* Modal header */}
                            <div className="flex items-start justify-between p-5 border-b border-base-200">
                                <div>
                                    <p className="text-xs text-base-content/40 uppercase tracking-wider font-semibold mb-0.5">Place Order</p>
                                    <h3 className="font-bold text-sm leading-snug max-w-75">{selectedService.name}</h3>
                                </div>
                                <button onClick={closeModal} className="btn btn-ghost btn-sm btn-circle text-base-content/40 hover:text-base-content shrink-0">
                                    <FiX className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Price info strip */}
                            <div className="flex items-center gap-6 px-5 py-3 bg-primary/5 border-b border-base-200 text-sm">
                                <span className="text-base-content/50">Price</span>
                                <span className="font-bold text-primary">${selectedService.price} / 1000</span>
                                <span className="text-base-content/50 ml-auto">
                                    Min <strong className="text-base-content">{selectedService.min}</strong>
                                    &nbsp;&nbsp;
                                    Max <strong className="text-base-content">{selectedService.max}</strong>
                                </span>
                            </div>

                            {/* Form */}
                            <div className="p-5 space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1.5 block">
                                        Your Link
                                    </label>
                                    <div className="relative">
                                        <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                        <input
                                            type="text"
                                            placeholder="https://..."
                                            value={buyInfo.link}
                                            onChange={e => setBuyInfo({ ...buyInfo, link: e.target.value })}
                                            className="input input-bordered w-full pl-9 text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1.5 block">
                                        Quantity
                                    </label>
                                    <div className="relative">
                                        <FiHash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
                                        <input
                                            type="number"
                                            placeholder={`Min ${selectedService.min}`}
                                            value={buyInfo.quantity || ""}
                                            min={selectedService.min}
                                            max={selectedService.max}
                                            onChange={e => setBuyInfo({ ...buyInfo, quantity: parseInt(e.target.value) || 0 })}
                                            className="input input-bordered w-full pl-9 text-sm"
                                        />
                                    </div>
                                    {buyInfo.quantity > 0 && (
                                        <p className="text-xs text-base-content/40 mt-1.5">
                                            Estimated cost: <strong className="text-primary">${((selectedService.price / 1000) * buyInfo.quantity).toFixed(4)}</strong>
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Footer buttons */}
                            <div className="flex items-center gap-3 p-5 pt-0">
                                <button onClick={closeModal} className="btn btn-ghost btn-sm flex-1 rounded-xl">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!buyInfo.link || buyingService}
                                    className="btn btn-primary btn-sm flex-1 rounded-xl font-semibold"
                                >
                                    {buyingService ? <span className="loading loading-spinner loading-xs" /> : 'Place Order'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Packages;
