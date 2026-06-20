import { useState } from 'react';
import { motion } from 'framer-motion';

const FAQS = [
  {
    q: 'What is an SMM panel, and how does it work?',
    a: 'An SMM panel is a platform offering social media growth services — likes, followers, views and comments — so you can boost your presence quickly and reliably from one dashboard.',
  },
  {
    q: 'Why should I choose Li Service 24?',
    a: 'High-quality, real engagement, fair prices, fast delivery, and a support team that\'s actually reachable on WhatsApp around the clock.',
  },
  {
    q: 'Is it safe to use SMM services?',
    a: "Yes. We follow each platform's guidelines so your account's standing is never put at risk — no bots, no shady shortcuts.",
  },
  {
    q: 'What payment methods do you accept?',
    a: 'bKash, Nagad, Rocket, Binance, and STC Pay — pick whichever is easiest for you, confirmed instantly.',
  },
];

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div
      className={`home-faq-item${open ? ' open' : ''}`}
      style={{ borderBottom: '1px solid #1d2c23', padding: '24px 4px' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
          cursor: 'pointer',
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <h4
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: '#f3fbf5',
            fontFamily: "'Inter', sans-serif",
            margin: 0,
          }}
        >
          {q}
        </h4>
        <div className="home-faq-chevron">+</div>
      </div>
      <div className="home-faq-answer">{a}</div>
    </div>
  );
}

const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const FaqSection = () => (
  <section id="faq" className="home-section" style={{ padding: '120px 0', background: '#070b09' }}>
    <div className="home-wrap">

      {/* Section head */}
      <motion.div
        variants={revealUp}
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
          FAQ
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
          Questions, answered
        </h2>
      </motion.div>

      {/* FAQ list */}
      <motion.div
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{ maxWidth: 760, margin: '0 auto' }}
      >
        {FAQS.map((item, i) => (
          <FaqItem key={item.q} q={item.q} a={item.a} defaultOpen={i === 0} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default FaqSection;
