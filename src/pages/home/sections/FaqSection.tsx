import { useState } from 'react';
import { motion } from 'framer-motion';

const FAQS = [
  {
    q: 'What is an SMM panel, and how does it work?',
    a: 'An SMM panel is a platform offering social media growth services — likes, followers, views and comments — so you can boost your presence quickly and reliably from one dashboard.',
  },
  {
    q: 'Why should I choose Li Service 24?',
    a: "High-quality, real engagement, fair prices, fast delivery, and a support team that's actually reachable on WhatsApp around the clock.",
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
      style={{ borderBottom: '1px solid var(--site-border)', padding: '24px 4px' }}
    >
      <div
        className="flex justify-between items-center gap-5 cursor-pointer"
        onClick={() => setOpen(o => !o)}
      >
        <h4 style={{
          fontSize: 16, fontWeight: 500, color: 'var(--site-t0)',
          fontFamily: "'Inter', sans-serif", margin: 0,
        }}>
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
  <section id="faq" className="py-30 max-[900px]:py-20 max-sm:py-16" style={{ background: 'var(--site-bg)' }}>
    <div className="max-w-295 mx-auto px-8 max-sm:px-5">

      {/* Section head */}
      <motion.div
        variants={revealUp} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center max-w-140 mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 text-[12.5px] font-semibold tracking-widest uppercase text-[#34d97e] mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          <span className="w-4.5 h-px bg-[#34d97e] inline-block" />
          FAQ
        </div>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 42, fontWeight: 600, letterSpacing: '-0.025em',
          lineHeight: 1.15, color: 'var(--site-t0)',
        }}>
          Questions, answered
        </h2>
      </motion.div>

      {/* FAQ list */}
      <motion.div
        variants={revealUp} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-190 mx-auto"
      >
        {FAQS.map((item, i) => (
          <FaqItem key={item.q} q={item.q} a={item.a} defaultOpen={i === 0} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default FaqSection;
