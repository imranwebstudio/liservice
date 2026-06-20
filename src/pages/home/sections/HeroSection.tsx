import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../../redux/hooks';
import { selectUser } from '../../../redux/features/auth/authSlice';
import SubscribeButton from '../components/SubscribeButton';

const WHATSAPP = 'https://wa.me/message/FI3L5HOJSGYBA1';

/* ── Easing: easeOutExpo ── */
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ── Count-up stat ── */
function StatBlock({
  target,
  label,
  isStatic,
  staticVal,
}: {
  target?: number;
  label: string;
  isStatic?: boolean;
  staticVal?: string;
}) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (isStatic) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const duration = 1800;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const val = Math.round(easeOutExpo(progress) * (target ?? 0));
          setDisplay(val.toLocaleString() + '+');
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, isStatic]);

  const numStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 32,
    fontWeight: 600,
    background: 'linear-gradient(180deg, #fff, #6ee7a8)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <b style={numStyle}>{isStatic ? staticVal : display}</b>
      <span style={{ fontSize: 13, color: '#74877b', fontFamily: "'Inter', sans-serif" }}>
        {label}
      </span>
    </div>
  );
}

/* ── Line reveal variant ── */
const lineVar = (delay: number) => ({
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] as const },
  },
});

/* ── Divider ── */
const Div = () => (
  <div style={{ width: 1, background: '#28392d', alignSelf: 'stretch' }} />
);

const HeroSection = () => {
  const user = useAppSelector(selectUser);

  return (
    <section
      className="home-hero-section"
      style={{
        position: 'relative',
        padding: '168px 0 0',
        overflow: 'hidden',
        background: '#070b09',
      }}
    >
      {/* ── Mesh blobs ── */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          right: '-10%',
          height: 1000,
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'blur(70px)',
          opacity: 0.85,
        }}
      >
        <div
          className="home-blob-a"
          style={{
            position: 'absolute',
            width: 560,
            height: 560,
            left: '6%',
            top: 0,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 30% 30%, rgba(52,217,126,0.55), transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="home-blob-b"
          style={{
            position: 'absolute',
            width: 480,
            height: 480,
            right: '2%',
            top: 120,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 60% 40%, rgba(45,212,207,0.45), transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="home-blob-c"
          style={{
            position: 'absolute',
            width: 420,
            height: 420,
            left: '38%',
            top: 260,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 50% 50%, rgba(31,191,108,0.4), transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* ── Grid fade overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 20%, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 20%, black 30%, transparent 75%)',
        }}
      />

      {/* ── Grain overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.035,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Hero content ── */}
      <div
        className="home-wrap"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            border: '1px solid #28392d',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 999,
            padding: '7px 16px 7px 8px',
            fontSize: 13,
            color: '#aebcb2',
            marginBottom: 28,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#34d97e',
              boxShadow: '0 0 0 3px rgba(52,217,126,0.18)',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          Trusted by{' '}
          <b style={{ color: '#f3fbf5', fontWeight: 600 }}>1,200+</b> customers worldwide
        </motion.div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(42px, 6vw, 74px)',
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            fontWeight: 700,
            marginBottom: 26,
            color: '#f3fbf5',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.span
              style={{ display: 'inline-block' }}
              variants={lineVar(0.2)}
              initial="hidden"
              animate="visible"
            >
              The most&nbsp;
            </motion.span>
            <motion.span
              className="grad-text-home"
              style={{ display: 'inline-block' }}
              variants={lineVar(0.32)}
              initial="hidden"
              animate="visible"
            >
              trusted
            </motion.span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.span
              style={{ display: 'inline-block' }}
              variants={lineVar(0.44)}
              initial="hidden"
              animate="visible"
            >
              SMM panel built for&nbsp;
            </motion.span>
            <motion.span
              className="grad-text-home"
              style={{ display: 'inline-block' }}
              variants={lineVar(0.56)}
              initial="hidden"
              animate="visible"
            >
              real growth
            </motion.span>
          </div>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            maxWidth: 580,
            margin: '0 auto 40px',
            color: '#aebcb2',
            fontSize: 17.5,
            lineHeight: 1.65,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Likes, followers, views and engagement — delivered fast, priced fair, and
          built on real accounts. No bots, no shortcuts, just results you can verify.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="hero-cta-row"
          style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 64, flexWrap: 'wrap' }}
        >
          <SubscribeButton label="Browse services" to={user ? '/service' : '/register'} />
          <SubscribeButton label="WhatsApp support" href={WHATSAPP} target="_blank" rel="noreferrer" />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="hero-stats-row"
          style={{ display: 'flex', justifyContent: 'center', gap: 64, alignItems: 'center' }}
        >
          <StatBlock target={500} label="Services live" />
          <Div />
          <StatBlock target={1383} label="Orders delivered" />
          <Div />
          <StatBlock isStatic staticVal="24/7" label="Real support" />
        </motion.div>
      </div>

      {/* ── Trust strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1 }}
        style={{
          position: 'relative',
          zIndex: 2,
          borderTop: '1px solid #1d2c23',
          maxWidth: 1180,
          margin: '90px auto 0',
          padding: '38px 32px 80px',
        }}
      >
        <p
          style={{
            textAlign: 'center',
            fontSize: 12.5,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#74877b',
            marginBottom: 26,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Pay your way, instantly
        </p>
        <div
          className="hero-trust-logos"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 54,
            flexWrap: 'wrap',
            opacity: 0.55,
          }}
        >
          {['bKash', 'Nagad', 'Rocket', 'Binance', 'STC Pay'].map((name) => (
            <span
              key={name}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 17,
                color: '#aebcb2',
                letterSpacing: '-0.01em',
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
