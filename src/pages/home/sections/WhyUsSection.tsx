import { motion } from 'framer-motion';

const FEATURES = [
  { icon: '⚡', title: 'Instant delivery', desc: 'Orders start processing within minutes. Watch your numbers move in real time, not days later.' },
  { icon: '🛡️', title: 'Safe & compliant', desc: "Every service follows platform guidelines. Your account's standing stays protected, always." },
  { icon: '✅', title: 'Real engagement', desc: 'Genuine accounts, not bots. Growth that holds up because it was never fake to begin with.' },
  { icon: '৳', title: 'Fair pricing', desc: "Premium quality without the premium markup. The best value you'll find on a panel this reliable." },
  { icon: '🎧', title: '24/7 support', desc: "A real team on WhatsApp, ready when something needs a human — not just a help center article." },
  { icon: '🔁', title: 'Easy payments', desc: 'bKash, Nagad, Rocket, Binance or STC Pay. Local, fast, and secure — pay the way you already do.' },
];

const revealUp = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] as const } },
});

const WhyUsSection = () => (
  <section id="services" className="py-30 max-[900px]:py-20 max-sm:py-16" style={{ background: '#070b09' }}>
    <div className="max-w-295 mx-auto px-8 max-sm:px-5">

      {/* Section head */}
      <motion.div
        variants={revealUp(0)} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center max-w-140 mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 text-[12.5px] font-semibold tracking-widest uppercase text-[#34d97e] mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          <span className="w-4.5 h-px bg-[#34d97e] inline-block" />
          Why us
        </div>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 42, fontWeight: 600, letterSpacing: '-0.025em',
          marginBottom: 16, lineHeight: 1.15, color: '#f3fbf5',
        }}>
          Built to be the safe choice
        </h2>
        <p className="text-[#aebcb2] text-base leading-[1.7]" style={{ fontFamily: "'Inter', sans-serif" }}>
          Everything you need to grow your social presence, backed by a platform people actually trust.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            className="group relative overflow-hidden [background:linear-gradient(160deg,rgba(255,255,255,0.025),rgba(255,255,255,0.005))] border border-[#1d2c23] rounded-[20px] py-8 px-7 transition-[border-color,background] duration-350 hover:border-[#149656] hover:bg-[rgba(52,217,126,0.04)]"
            variants={revealUp(i * 0.09)}
            initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {/* Shimmer sweep */}
            <div className="absolute -top-[60%] -left-[30%] w-[60%] h-[160%] bg-linear-to-r from-transparent via-[rgba(52,217,126,0.08)] to-transparent pointer-events-none transition-transform duration-[800ms] [transform:rotate(20deg)_translateX(-200%)] group-hover:[transform:rotate(20deg)_translateX(200%)]" />

            {/* Icon */}
            <div className="w-11.5 h-11.5 rounded-xl mb-5 flex items-center justify-center text-xl bg-[rgba(52,217,126,0.1)] border border-[rgba(52,217,126,0.25)] text-[#6ee7a8]">
              {f.icon}
            </div>

            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 18.5, fontWeight: 600, marginBottom: 10,
              letterSpacing: '-0.01em', color: '#f3fbf5',
            }}>
              {f.title}
            </h3>
            <p className="text-[#aebcb2] text-[14.5px] leading-[1.65]" style={{ fontFamily: "'Inter', sans-serif" }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
