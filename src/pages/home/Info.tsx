import { Link } from "react-router-dom";
import { FiArrowRight, FiChevronDown, FiZap, FiShield, FiDollarSign, FiAward, FiHeadphones, FiClock, FiCheckCircle, FiPackage, FiTrendingUp } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaTelegram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { SiTiktok, SiSnapchat } from 'react-icons/si';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

/* ─── Dark design tokens ────────────────────────────────────── */
const BG      = '#060714';
const BG_ALT  = '#0c0e24';
const GLASS   = 'rgba(255,255,255,0.04)';
const BORDER  = 'rgba(255,255,255,0.08)';
const BORDER2 = 'rgba(255,255,255,0.13)';
const WHATSAPP = 'https://wa.me/message/FI3L5HOJSGYBA1';

const WA_ICON = (
    <svg className="w-4 h-4 fill-current text-green-400 shrink-0" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

/* ─── Animated counter ─────────────────────────────────────── */
const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const count = useMotionValue(0);
    const spring = useSpring(count, { duration: 2400, bounce: 0 });
    const [display, setDisplay] = useState('0');
    useEffect(() => { if (isInView) count.set(target); }, [isInView, target, count]);
    useEffect(() => spring.on('change', v => setDisplay(Math.round(v).toLocaleString())), [spring]);
    return <span ref={ref}>{display}{suffix}</span>;
};

/* ─── Data ──────────────────────────────────────────────────── */
const platforms = [
    { icon: <FaFacebook  className="text-[22px]" />, name: 'Facebook',  glow: 'rgba(59,130,246,0.35)',  border: 'rgba(59,130,246,0.2)'  },
    { icon: <FaInstagram className="text-[22px]" />, name: 'Instagram', glow: 'rgba(236,72,153,0.35)',  border: 'rgba(236,72,153,0.2)'  },
    { icon: <FaYoutube   className="text-[22px]" />, name: 'YouTube',   glow: 'rgba(239,68,68,0.35)',   border: 'rgba(239,68,68,0.2)'   },
    { icon: <SiTiktok    className="text-[20px]" />, name: 'TikTok',    glow: 'rgba(255,255,255,0.15)', border: 'rgba(255,255,255,0.1)' },
    { icon: <FaTwitter   className="text-[22px]" />, name: 'Twitter',   glow: 'rgba(56,189,248,0.35)',  border: 'rgba(56,189,248,0.2)'  },
    { icon: <FaTelegram  className="text-[22px]" />, name: 'Telegram',  glow: 'rgba(59,130,246,0.35)',  border: 'rgba(59,130,246,0.2)'  },
    { icon: <FaWhatsapp  className="text-[22px]" />, name: 'WhatsApp',  glow: 'rgba(34,197,94,0.35)',   border: 'rgba(34,197,94,0.2)'   },
    { icon: <SiSnapchat  className="text-[20px]" />, name: 'Snapchat',  glow: 'rgba(250,204,21,0.35)',  border: 'rgba(250,204,21,0.2)'  },
    { icon: <FaLinkedin  className="text-[22px]" />, name: 'LinkedIn',  glow: 'rgba(59,130,246,0.35)',  border: 'rgba(59,130,246,0.2)'  },
];

const steps = [
    { num: '01', icon: <FiDollarSign className="w-7 h-7" />, title: 'Add Balance',      desc: 'Fund your account instantly via BKash, Nagad, Rocket, Binance, or STC Pay.',   grad: 'linear-gradient(135deg,#4f46e5,#7c3aed)' },
    { num: '02', icon: <FiPackage    className="w-7 h-7" />, title: 'Choose Service',   desc: 'Browse 500+ services. Pick the platform, quantity, and enter your target link.', grad: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
    { num: '03', icon: <FiTrendingUp className="w-7 h-7" />, title: 'Get Real Results', desc: 'Watch real engagement start flowing within minutes. Guaranteed delivery.',         grad: 'linear-gradient(135deg,#a855f7,#ec4899)' },
];

const features = [
    { icon: <FiZap        className="w-5 h-5" />, title: 'Instant Delivery',   desc: 'Orders start processing within minutes of placement. No waiting around.', grad: 'linear-gradient(135deg,#d97706,#f59e0b)', glow: 'rgba(245,158,11,0.25)' },
    { icon: <FiDollarSign className="w-5 h-5" />, title: 'Affordable Pricing', desc: 'Premium quality at unbeatable prices. Best value SMM panel in the market.', grad: 'linear-gradient(135deg,#059669,#10b981)', glow: 'rgba(16,185,129,0.25)' },
    { icon: <FiShield     className="w-5 h-5" />, title: 'Safe & Secure',      desc: 'Platform-compliant methods only. Your account safety is our #1 priority.', grad: 'linear-gradient(135deg,#2563eb,#3b82f6)', glow: 'rgba(59,130,246,0.25)' },
    { icon: <FiAward      className="w-5 h-5" />, title: 'Premium Quality',    desc: 'Real, genuine engagement from active accounts. Zero bots, zero fakes.',    grad: 'linear-gradient(135deg,#4f46e5,#7c3aed)', glow: 'rgba(124,58,237,0.25)' },
    { icon: <FiHeadphones className="w-5 h-5" />, title: '24/7 Support',       desc: 'Our team is always on WhatsApp and ready to help you with any issue.',      grad: 'linear-gradient(135deg,#7c3aed,#a855f7)', glow: 'rgba(168,85,247,0.25)' },
    { icon: <FiClock      className="w-5 h-5" />, title: 'Easy Payments',      desc: 'BKash, Nagad, Rocket, Binance, STC Pay — fast local & international options.',grad: 'linear-gradient(135deg,#be185d,#ec4899)', glow: 'rgba(236,72,153,0.25)' },
];

const statsData = [
    { target: 1200, suffix: '+', label: 'Happy Customers',   grad: 'from-violet-400 to-fuchsia-400' },
    { target: 500,  suffix: '+', label: 'Active Services',   grad: 'from-fuchsia-400 to-pink-400'   },
    { target: 1383, suffix: '+', label: 'Orders Completed',  grad: 'from-cyan-400 to-blue-400'      },
    { target: 99,   suffix: '%', label: 'Satisfaction Rate', grad: 'from-emerald-400 to-teal-400'   },
];

const faqs = [
    { q: 'What is an SMM panel, and how does it work?',  a: 'An SMM panel offers social media services like likes, followers, and views. Add balance, pick a service, enter your link — results start in minutes.' },
    { q: 'Is my account safe when using your services?', a: 'Yes. All services use safe, platform-compliant methods. We never ask for your password or any sensitive account information.' },
    { q: 'How long does delivery take?',                 a: 'Most orders start processing within minutes of placement. Delivery speed varies by service type but is always as fast as possible.' },
    { q: 'Which payment methods are supported?',         a: 'BKash, Nagad, Rocket (local BD), Binance USDT, and STC Pay. All transactions are fast and secure.' },
    { q: 'What if my order does not complete?',          a: 'Contact our 24/7 WhatsApp support and we will resolve it with a refill or full refund — no questions asked.' },
];

/* ─── Animation helpers ─────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { delay, duration: 0.7, ease: EASE } },
});

/* ─── Section label ─────────────────────────────────────────── */
const Label = ({ text }: { text: string }) => (
    <span
        className="inline-block text-xs font-bold uppercase tracking-[0.16em] mb-3 px-3 py-1 rounded-full"
        style={{ background: 'rgba(168,85,247,0.15)', color: 'rgba(196,148,255,0.9)', border: '1px solid rgba(168,85,247,0.25)' }}
    >
        {text}
    </span>
);

/* ─── FAQ item ───────────────────────────────────────────────── */
const FAQ = ({ q, a }: { q: string; a: string }) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="rounded-2xl overflow-hidden transition-all duration-200"
            style={{ background: GLASS, border: `1px solid ${open ? BORDER2 : BORDER}` }}
        >
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.85)' }}
            >
                <span className="font-medium text-sm leading-snug">{q}</span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <FiChevronDown className="w-4 h-4 shrink-0" style={{ color: 'rgba(168,85,247,0.7)' }} />
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div
                            className="px-6 pb-5 text-sm leading-relaxed"
                            style={{ color: 'rgba(255,255,255,0.45)', borderTop: `1px solid ${BORDER}`, paddingTop: '12px' }}
                        >
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const Info = () => {
    const doubled = [...platforms, ...platforms];

    return (
        <div style={{ background: BG }}>

            {/* ══ 1. PLATFORM MARQUEE ══════════════════════════════════ */}
            <section
                className="py-12 overflow-hidden"
                style={{ borderBottom: `1px solid ${BORDER}` }}
            >
                <motion.p
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-center text-xs uppercase tracking-[0.18em] font-semibold mb-7"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                    We support all major platforms
                </motion.p>
                <div
                    className="relative flex overflow-hidden"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                    }}
                >
                    <motion.div
                        className="flex gap-3 shrink-0"
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
                    >
                        {doubled.map((p, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl shrink-0 select-none cursor-default"
                                style={{
                                    background: `rgba(255,255,255,0.04)`,
                                    border: `1px solid ${p.border}`,
                                    backdropFilter: 'blur(8px)',
                                    boxShadow: `0 0 18px ${p.glow}`,
                                }}
                            >
                                <span style={{ filter: `drop-shadow(0 0 6px ${p.glow})`, color: 'rgba(255,255,255,0.88)' }}>
                                    {p.icon}
                                </span>
                                <span className="text-sm font-semibold whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                    {p.name}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══ 2. HOW IT WORKS ══════════════════════════════════════ */}
            <section className="py-24 px-4 relative overflow-hidden" style={{ background: BG_ALT }}>
                {/* bg orb */}
                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

                <div className="max-w-5xl mx-auto">
                    <motion.div variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
                        <Label text="Process" />
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                            How It <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400">Works</span>
                        </h2>
                        <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.42)' }}>
                            Get real results in three simple steps. No technical knowledge required.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {/* connecting line */}
                        <div
                            className="hidden md:block absolute top-[52px] left-[calc(16.66%+28px)] right-[calc(16.66%+28px)] h-px"
                            style={{ background: 'linear-gradient(to right, rgba(124,58,237,0.5), rgba(168,85,247,0.5), rgba(236,72,153,0.5))' }}
                        />
                        {steps.map((s, i) => (
                            <motion.div
                                key={s.num}
                                variants={fadeUp(i * 0.13)}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}
                                whileHover={{ y: -8, transition: { duration: 0.22 } }}
                                className="relative z-10 rounded-2xl p-7 text-center transition-all duration-300"
                                style={{
                                    background: 'rgba(255,255,255,0.045)',
                                    border: `1px solid ${BORDER}`,
                                    backdropFilter: 'blur(16px)',
                                    boxShadow: '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)',
                                }}
                            >
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white shadow-lg"
                                    style={{ background: s.grad, boxShadow: '0 8px 24px rgba(124,58,237,0.35)' }}
                                >
                                    {s.icon}
                                </div>
                                <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: 'rgba(196,148,255,0.6)' }}>
                                    {s.num}
                                </span>
                                <h3 className="font-bold text-lg mt-1.5 mb-2.5 text-white">{s.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 3. WHY CHOOSE US ═════════════════════════════════════ */}
            <section className="py-24 px-4 relative overflow-hidden" style={{ background: BG }}>
                <div
                    className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
                />
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
                        <Label text="Why Us" />
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                            Why Choose <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-pink-400">Li Service 24?</span>
                        </h2>
                        <p className="mt-3 text-sm max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            Everything you need to grow your presence — in one trusted platform.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                variants={fadeUp(i * 0.08)}
                                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                className="group p-6 rounded-2xl cursor-default transition-all duration-300"
                                style={{
                                    background: 'rgba(255,255,255,0.035)',
                                    border: `1px solid ${BORDER}`,
                                    backdropFilter: 'blur(12px)',
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg"
                                    style={{ background: f.grad, boxShadow: `0 6px 20px ${f.glow}` }}
                                >
                                    {f.icon}
                                </div>
                                <h3 className="font-bold text-base mb-2 text-white">{f.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 4. ANIMATED STATS ════════════════════════════════════ */}
            <section className="py-24 px-4 relative overflow-hidden" style={{ background: BG_ALT }}>
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(236,72,153,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
                </div>

                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.025] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }}
                />

                <div className="relative max-w-5xl mx-auto">
                    <motion.div variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
                        <Label text="By the numbers" />
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                            Trusted at <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-violet-400">Scale</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
                        {statsData.map((s, i) => (
                            <motion.div
                                key={s.label}
                                variants={fadeUp(i * 0.1)}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}
                                className="text-center"
                            >
                                <p className={`text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r ${s.grad} leading-tight tabular-nums`}>
                                    <AnimatedCounter target={s.target} suffix={s.suffix} />
                                </p>
                                <p className="text-sm mt-3 font-medium" style={{ color: 'rgba(255,255,255,0.42)' }}>{s.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        variants={fadeUp(0.35)}
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {['Real Engagement', 'Instant Processing', 'Money-back Guarantee', '24/7 WhatsApp Support'].map(badge => (
                            <div
                                key={badge}
                                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                                style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${BORDER2}`, color: 'rgba(255,255,255,0.65)' }}
                            >
                                <FiCheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                                {badge}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══ 5. FAQ ═══════════════════════════════════════════════ */}
            <section className="py-24 px-4 relative overflow-hidden" style={{ background: BG }}>
                <div
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
                />
                <div className="relative max-w-2xl mx-auto">
                    <motion.div variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
                        <Label text="FAQ" />
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
                        <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
                            Can't find your answer? Chat with us on WhatsApp — we're always online.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeUp(0.1)}
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="space-y-3"
                    >
                        {faqs.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
                    </motion.div>
                </div>
            </section>

            {/* ══ 6. CTA ═══════════════════════════════════════════════ */}
            <section
                className="relative py-28 px-4 overflow-hidden text-center"
                style={{ background: 'linear-gradient(135deg, #1e1245 0%, #2d1065 40%, #4a044e 100%)' }}
            >
                <div className="pointer-events-none absolute inset-0">
                    <motion.div
                        className="absolute -top-24 -left-24 w-80 h-80 rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }}
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(196,148,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}
                    />
                </div>

                <div className="relative max-w-xl mx-auto">
                    <motion.div variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div
                            className="inline-block text-xs font-bold uppercase tracking-[0.16em] px-4 py-1.5 rounded-full mb-6"
                            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)' }}
                        >
                            Get Started Today
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                            Ready to Grow<br />Your Presence?
                        </h2>
                        <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.52)' }}>
                            Join 1,200+ satisfied customers. No contracts, instant delivery, real results.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeUp(0.15)}
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3"
                    >
                        <Link
                            to="/service"
                            className="group flex items-center gap-2 font-bold text-white px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                            style={{ background: 'rgba(255,255,255,0.95)', color: '#4f46e5', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                        >
                            Explore Services
                            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href={WHATSAPP}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2.5 font-semibold text-white px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}
                        >
                            {WA_ICON}
                            WhatsApp Us
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ══ 7. FOOTER ════════════════════════════════════════════ */}
            <footer style={{ background: '#030309', borderTop: `1px solid ${BORDER}` }}>
                <div
                    className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm px-4 py-10"
                    style={{ color: 'rgba(255,255,255,0.32)' }}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-white/60 font-bold">Li Service</span>
                        <span style={{ color: '#a78bfa' }} className="font-bold">24</span>
                    </div>
                    <div className="flex gap-6">
                        <Link to="/service" className="hover:text-white/80 transition-colors">Services</Link>
                        <Link to="/about"   className="hover:text-white/80 transition-colors">About</Link>
                        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors">Support</a>
                    </div>
                    <p>&copy; {new Date().getFullYear()} Li Service 24. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Info;
