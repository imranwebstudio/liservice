import { motion } from 'framer-motion';

const STEPS = [
  { num: 1, title: 'Create account', desc: 'Sign up in under a minute, no card required upfront.' },
  { num: 2, title: 'Pick a service', desc: '500+ services across every major platform.' },
  { num: 3, title: 'Pay your way', desc: 'bKash, Nagad, Rocket or crypto — instant confirmation.' },
  { num: 4, title: 'Watch it grow', desc: 'Delivery starts in minutes. Track it live from your dashboard.' },
];

const revealUp = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] as const } },
});

const HowItWorksSection = () => (
  <section className="py-30 max-[900px]:py-20 max-sm:py-16" style={{ background: '#070b09' }}>
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
          How it works
        </div>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 42, fontWeight: 600, letterSpacing: '-0.025em',
          lineHeight: 1.15, color: '#f3fbf5',
        }}>
          Order to result, in four steps
        </h2>
      </motion.div>

      {/* Steps grid with connector */}
      <div className="grid grid-cols-4 max-[900px]:grid-cols-2 max-sm:grid-cols-1 relative">

        {/* Connector line */}
        <div
          className="absolute top-5.75 left-[12%] right-[12%] h-px opacity-40 max-[900px]:hidden"
          style={{ background: 'linear-gradient(90deg, transparent, #149656, #149656, transparent)' }}
        />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            variants={revealUp(i * 0.11)}
            initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center px-4"
          >
            {/* Number bubble */}
            <div className="w-11.5 h-11.5 rounded-full mx-auto mb-5.5 flex items-center justify-center relative z-1 border border-[#149656]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600, fontSize: 16,
                background: '#070b09', color: '#6ee7a8',
              }}>
              {step.num}
            </div>
            <h4 className="text-[15.5px] font-semibold mb-2 text-[#f3fbf5]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {step.title}
            </h4>
            <p className="text-[13.5px] text-[#74877b] leading-[1.6]"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
