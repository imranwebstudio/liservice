import logoWhite from '../../assets/logoWhite.png';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/features/auth/authSlice';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const stats = [
    { value: '500+',   label: 'Services',  gradient: 'from-violet-400 to-fuchsia-400' },
    { value: '1,383+', label: 'Orders',    gradient: 'from-fuchsia-400 to-pink-400'   },
    { value: '1,200+', label: 'Customers', gradient: 'from-cyan-400 to-blue-400'      },
    { value: '24/7',   label: 'Support',   gradient: 'from-emerald-400 to-teal-400'   },
];

const WHATSAPP = 'https://wa.me/message/FI3L5HOJSGYBA1';

const WA_ICON = (
    <svg className="w-4 h-4 fill-current text-green-400 shrink-0" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const Hero = () => {
    const user = useAppSelector(selectUser);

    return (
        <section
            className="relative min-h-screen flex flex-col overflow-hidden"
            style={{ background: '#060714' }}
        >
            {/* ── Animated background orbs ── */}
            <motion.div
                className="pointer-events-none absolute rounded-full"
                style={{
                    width: 750, height: 750,
                    top: '-20%', left: '-18%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)',
                    filter: 'blur(48px)',
                }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="pointer-events-none absolute rounded-full"
                style={{
                    width: 560, height: 560,
                    top: '8%', right: '-14%',
                    background: 'radial-gradient(circle, rgba(217,70,239,0.18) 0%, transparent 70%)',
                    filter: 'blur(48px)',
                }}
                animate={{ scale: [1, 1.14, 1], opacity: [0.45, 0.75, 0.45] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
            <motion.div
                className="pointer-events-none absolute rounded-full"
                style={{
                    width: 420, height: 420,
                    bottom: '8%', left: '28%',
                    background: 'radial-gradient(circle, rgba(34,211,238,0.13) 0%, transparent 70%)',
                    filter: 'blur(48px)',
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            />

            {/* Dot grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.032] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                }}
            />

            {/* ── Hero content ── */}
            <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 pt-24 pb-10">

                {/* Logo badge */}
                <motion.div
                    initial={{ opacity: 0, y: -22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65 }}
                    className="mb-6"
                >
                    <div
                        className="inline-flex items-center gap-2.5 rounded-2xl px-4 py-2.5"
                        style={{
                            background: 'rgba(255,255,255,0.06)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
                        }}
                    >
                        <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center p-1 shrink-0"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #c026d3)' }}
                        >
                            <img src={logoWhite} alt="Li Service 24" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-white/90 font-bold text-sm tracking-tight">Li Service 24</span>
                        <span
                            className="text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
                        >
                            PRO
                        </span>
                    </div>
                </motion.div>

                {/* Stars trust badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.12 }}
                    className="mb-8"
                >
                    <div
                        className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.07)',
                        }}
                    >
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <FiStar key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            ))}
                        </div>
                        <span className="text-white/50 text-xs font-medium">Trusted by 1,200+ customers worldwide</span>
                    </div>
                </motion.div>

                {/* Main headline */}
                <motion.div
                    initial={{ opacity: 0, y: 52 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-6"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-[82px] font-extrabold leading-[1.04] tracking-tight text-white max-w-4xl mx-auto">
                        Grow Your<br />
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa, #f0abfc, #fb7185)' }}
                        >
                            Social Presence
                        </span>
                        <br />
                        <span style={{ color: 'rgba(255,255,255,0.65)' }}>Instantly</span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.36, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg md:text-xl mb-9 max-w-xl leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.42)' }}
                >
                    The most trusted SMM panel. 500+ services across all major platforms —
                    instant delivery & real results guaranteed.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.46, duration: 0.7 }}
                    className="flex flex-col sm:flex-row items-center gap-3"
                >
                    {!user ? (
                        <Link
                            to="/register"
                            className="group flex items-center gap-2 font-bold text-white px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
                            style={{
                                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 55%, #ec4899 100%)',
                                boxShadow: '0 0 36px rgba(168,85,247,0.45), 0 4px 20px rgba(0,0,0,0.35)',
                            }}
                        >
                            Get Started Free
                            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ) : (
                        <Link
                            to="/service"
                            className="group flex items-center gap-2 font-bold text-white px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
                            style={{
                                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 55%, #ec4899 100%)',
                                boxShadow: '0 0 36px rgba(168,85,247,0.45), 0 4px 20px rgba(0,0,0,0.35)',
                            }}
                        >
                            Browse Services
                            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                    <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2.5 font-medium px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                            background: 'rgba(255,255,255,0.07)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: 'rgba(255,255,255,0.78)',
                        }}
                    >
                        {WA_ICON}
                        WhatsApp Support
                    </a>
                </motion.div>

                {/* Stats grid */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.62, duration: 0.8 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-14 w-full max-w-xl"
                >
                    {stats.map((s) => (
                        <motion.div
                            key={s.label}
                            whileHover={{ scale: 1.05, y: -3 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-2xl p-4 text-center cursor-default"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                            }}
                        >
                            <p className={`text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r ${s.gradient}`}>
                                {s.value}
                            </p>
                            <p className="text-xs mt-1 font-medium" style={{ color: 'rgba(255,255,255,0.32)' }}>
                                {s.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* ── Proof videos ── */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.88, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 pb-16 px-4"
            >
                <p
                    className="text-[11px] text-center uppercase tracking-[0.2em] mb-5 font-semibold"
                    style={{ color: 'rgba(255,255,255,0.18)' }}
                >
                    Proof of Results
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    {[
                        'https://drive.google.com/file/d/1ns-cyL0QpRoAOXzX9XSx8NhFjwbAA1Sl/preview',
                        'https://drive.google.com/file/d/152Zgi2rwmvorXD_x5ZnXKRJZwozJnRdB/preview',
                    ].map((src, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-2xl overflow-hidden shadow-2xl aspect-video"
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.07)',
                            }}
                        >
                            <iframe
                                allow="fullscreen"
                                allowFullScreen
                                src={src}
                                className="w-full h-full"
                                style={{ border: 'none' }}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
