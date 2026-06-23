import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../../redux/hooks';
import { selectUser } from '../../../redux/features/auth/authSlice';
import SubscribeButton from '../components/SubscribeButton';

const WHATSAPP = 'https://wa.me/message/FI3L5HOJSGYBA1';

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function StatBlock({ target, label, isStatic, staticVal }: {
  target?: number; label: string; isStatic?: boolean; staticVal?: string;
}) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (isStatic) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const duration = 1800;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setDisplay(Math.round(easeOutExpo(progress) * (target ?? 0)).toLocaleString() + '+');
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, isStatic]);

  return (
    <div ref={ref} className="text-center">
      <b style={{
        display: 'block',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 32, fontWeight: 600,
        background: 'linear-gradient(180deg, #fff, #6ee7a8)',
        WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
      }}>
        {isStatic ? staticVal : display}
      </b>
      <span style={{ fontSize: 13, color: 'var(--site-t2)', fontFamily: "'Inter', sans-serif" }}>
        {label}
      </span>
    </div>
  );
}

const lineVar = (delay: number) => ({
  hidden: { opacity: 0, y: '110%' },
  visible: { opacity: 1, y: '0%', transition: { duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] as const } },
});

const Div = () => <div style={{ width: 1, background: 'var(--site-border)', alignSelf: 'stretch' }} />;

const HeroSection = () => {
  const user = useAppSelector(selectUser);

  return (
    <section
      className="relative overflow-hidden pt-[168px] max-[768px]:pt-[110px] max-sm:pt-24"
      style={{ background: 'var(--site-bg)' }}
    >
      {/* Mesh blobs */}
      <div className="absolute -top-1/5 -left-[10%] -right-[10%] h-[1000px] z-0 pointer-events-none blur-[70px] opacity-85">
        <div className="home-blob-a absolute w-[560px] h-[560px] left-[6%] top-0 rounded-full"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(52,217,126,0.55), transparent 70%)', mixBlendMode: 'screen' }} />
        <div className="home-blob-b absolute w-[480px] h-[480px] right-[2%] top-[120px] rounded-full"
          style={{ background: 'radial-gradient(circle at 60% 40%, rgba(45,212,207,0.45), transparent 70%)', mixBlendMode: 'screen' }} />
        <div className="home-blob-c absolute w-[420px] h-[420px] left-[38%] top-[260px] rounded-full"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(31,191,108,0.4), transparent 70%)', mixBlendMode: 'screen' }} />
      </div>

      {/* Grid fade overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black 30%, transparent 75%)',
        }} />

      {/* Grain overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Hero content */}
      <div className="max-w-295 mx-auto px-8 max-sm:px-5 relative z-[2] text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-[#28392d] bg-white/[0.03] rounded-full py-[7px] pr-4 pl-2 text-[13px] text-[#aebcb2] mb-7"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="w-1.7 h-1.7 rounded-full bg-[#34d97e] shadow-[0_0_0_3px_rgba(52,217,126,0.18)] inline-block shrink-0" />
          Trusted by <b className="text-[#f3fbf5] font-semibold">1,200+</b> customers worldwide
        </motion.div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(42px, 6vw, 74px)', lineHeight: 1.02,
          letterSpacing: '-0.035em', fontWeight: 700, marginBottom: 26, color: 'var(--site-t0)',
        }}>
          <div className="overflow-hidden">
            <motion.span className="inline-block" variants={lineVar(0.2)} initial="hidden" animate="visible">The most&nbsp;</motion.span>
            <motion.span className="grad-text-home inline-block" variants={lineVar(0.32)} initial="hidden" animate="visible">trusted</motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span className="inline-block" variants={lineVar(0.44)} initial="hidden" animate="visible">SMM panel built for&nbsp;</motion.span>
            <motion.span className="grad-text-home inline-block" variants={lineVar(0.56)} initial="hidden" animate="visible">real growth</motion.span>
          </div>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-[580px] mx-auto mb-10 text-[#aebcb2] leading-[1.65]"
          style={{ fontSize: 17.5, fontFamily: "'Inter', sans-serif" }}
        >
          Likes, followers, views and engagement — delivered fast, priced fair, and
          built on real accounts. No bots, no shortcuts, just results you can verify.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex gap-3.5 justify-center mb-16  max-[768px]:items-center max-[768px]:gap-3"
        >
          <SubscribeButton
            label="Services" to={user ? '/service' : '/register'}
            className=" max-[768px]:max-w-[320px] max-[768px]:justify-between"
          />
          <SubscribeButton
            label="WhatsApp" href={WHATSAPP} target="_blank" rel="noreferrer"
            className="max-[768px]:max-w-[320px] max-[768px]:justify-between"
          />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex justify-center gap-16 items-center max-[768px]:gap-7 max-[768px]:flex-wrap max-[768px]:justify-center"
        >
          <StatBlock target={500} label="Services live" />
          <Div />
          <StatBlock target={1383} label="Orders delivered" />
          <Div />
          <StatBlock isStatic staticVal="24/7" label="Real support" />
        </motion.div>
      </div>

      {/* Trust strip */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="relative z-[2] border-t border-[#1d2c23] max-w-295 mx-auto mt-[90px] px-8 pb-20"
      >
        <p className="text-center text-[12.5px] tracking-[0.12em] uppercase text-[#74877b] mb-[26px]"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          Pay your way, instantly
        </p>
        <div className="flex justify-center gap-[54px] flex-wrap opacity-55 max-[768px]:gap-6">
          {['bKash', 'Nagad', 'Rocket', 'Binance', 'STC Pay'].map(name => (
            <span key={name} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600, fontSize: 17, color: 'var(--site-t1)', letterSpacing: '-0.01em',
            }}>
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
