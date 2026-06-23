const SERVICES: [string, string][] = [
  ['📸', 'Instagram followers'],
  ['👍', 'Facebook likes'],
  ['▶️', 'YouTube views'],
  ['🎵', 'TikTok followers'],
  ['🐦', 'Twitter / X engagement'],
  ['💬', 'Comments & replies'],
  ['📈', 'Story views'],
  ['🔗', 'LinkedIn engagement'],
];

const DOUBLED = [...SERVICES, ...SERVICES];

const TickerSection = () => (
  <section
    className="py-15 overflow-hidden border-t border-b border-[#1d2c23]"
    style={{ background: 'var(--site-bg)' }}
  >
    <div
      className="flex gap-3.5 w-max"
      style={{ animation: 'home-scroll-x 32s linear infinite' }}
    >
      {DOUBLED.map(([ic, label], i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 border border-[#28392d] rounded-full px-5 py-2.5 text-sm text-[#aebcb2] whitespace-nowrap bg-white/2 shrink-0"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="text-[#34d97e]">{ic}</span>
          <b className="text-[#f3fbf5] font-semibold">{label}</b>
        </div>
      ))}
    </div>
  </section>
);

export default TickerSection;
