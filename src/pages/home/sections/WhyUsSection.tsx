import { motion } from 'framer-motion';

const FEATURES = [
  { icon: '⚡', title: 'Instant delivery', desc: 'Orders start processing within minutes. Watch your numbers move in real time, not days later.' },
  { icon: '🛡️', title: 'Safe & compliant', desc: "Every service follows platform guidelines. Your account's standing stays protected, always." },
  { icon: '✅', title: 'Real engagement', desc: 'Genuine accounts, not bots. Growth that holds up because it was never fake to begin with.' },
  { icon: '৳', title: 'Fair pricing', desc: "Premium quality without the premium markup. The best value you'll find on a panel this reliable." },
  { icon: '🎧', title: '24/7 support', desc: "A real team on WhatsApp, ready when something needs a human — not just a help center article." },
  { icon: '🔁', title: 'Easy payments', desc: 'bKash, Nagad, Rocket, Binance or STC Pay. Local, fast, and secure — pay the way you already do.' },
];

const SECTION_CARD_BASE: React.CSSProperties = {
  background: 'linear-gradient(160deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
  border: '1px solid #1d2c23',
  borderRadius: 20,
  padding: '32px 28px',
};

const revealUp = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] as const },
  },
});

const WhyUsSection = () => (
  <section id="services" className="home-section" style={{ padding: '120px 0', background: '#070b09' }}>
    <div className="home-wrap">

      {/* Section head */}
      <motion.div
        variants={revealUp(0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 64px' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: '#34d97e',
            marginBottom: 16,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span style={{ width: 18, height: 1, background: '#34d97e', display: 'inline-block' }} />
          Why us
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 42,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            marginBottom: 16,
            lineHeight: 1.15,
            color: '#f3fbf5',
          }}
        >
          Built to be the safe choice
        </h2>
        <p style={{ color: '#aebcb2', fontSize: 16, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
          Everything you need to grow your social presence, backed by a platform people actually trust.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
        }}
      >
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            className="home-feat-card"
            variants={revealUp(i * 0.09)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={SECTION_CARD_BASE}
          >
            {/* Shimmer sweep div */}
            <div className="home-feat-card-shimmer" />

            {/* Icon */}
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                background: 'rgba(52,217,126,0.1)',
                border: '1px solid rgba(52,217,126,0.25)',
                color: '#6ee7a8',
              }}
            >
              {f.icon}
            </div>

            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 18.5,
                fontWeight: 600,
                marginBottom: 10,
                letterSpacing: '-0.01em',
                color: '#f3fbf5',
              }}
            >
              {f.title}
            </h3>
            <p style={{ color: '#aebcb2', fontSize: 14.5, lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
