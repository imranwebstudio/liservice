import { motion } from 'framer-motion';

const STEPS = [
  { num: 1, title: 'Create account', desc: 'Sign up in under a minute, no card required upfront.' },
  { num: 2, title: 'Pick a service', desc: '500+ services across every major platform.' },
  { num: 3, title: 'Pay your way', desc: 'bKash, Nagad, Rocket or crypto — instant confirmation.' },
  { num: 4, title: 'Watch it grow', desc: 'Delivery starts in minutes. Track it live from your dashboard.' },
];

const revealUp = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] as const },
  },
});

const HowItWorksSection = () => (
  <section className="home-section" style={{ padding: '120px 0', background: '#070b09' }}>
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
          How it works
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 42,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            color: '#f3fbf5',
          }}
        >
          Order to result, in four steps
        </h2>
      </motion.div>

      {/* Steps grid with connector */}
      <div
        className="how-it-works-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          position: 'relative',
        }}
      >
        {/* Horizontal connector line */}
        <div
          className="how-it-works-connector"
          style={{
            position: 'absolute',
            top: 23,
            left: '12%',
            right: '12%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, #149656, #149656, transparent)',
            opacity: 0.4,
          }}
        />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            variants={revealUp(i * 0.11)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ textAlign: 'center', padding: '0 16px' }}
          >
            {/* Number bubble */}
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: '50%',
                margin: '0 auto 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                background: '#070b09',
                border: '1px solid #149656',
                color: '#6ee7a8',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {step.num}
            </div>
            <h4
              style={{
                fontSize: 15.5,
                fontWeight: 600,
                marginBottom: 8,
                color: '#f3fbf5',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {step.title}
            </h4>
            <p
              style={{
                fontSize: 13.5,
                color: '#74877b',
                lineHeight: 1.6,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
