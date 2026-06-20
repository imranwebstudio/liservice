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

/* Double the array so the CSS infinite loop is seamless */
const DOUBLED = [...SERVICES, ...SERVICES];

const TickerSection = () => (
  <section
    style={{
      padding: '60px 0',
      borderTop: '1px solid #1d2c23',
      borderBottom: '1px solid #1d2c23',
      overflow: 'hidden',
      background: '#070b09',
    }}
  >
    <div className="home-ticker-track">
      {DOUBLED.map(([ic, label], i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            border: '1px solid #28392d',
            borderRadius: 999,
            padding: '10px 20px',
            fontSize: 14,
            color: '#aebcb2',
            whiteSpace: 'nowrap',
            background: 'rgba(255,255,255,0.02)',
            fontFamily: "'Inter', sans-serif",
            flexShrink: 0,
          }}
        >
          <span style={{ color: '#34d97e' }}>{ic}</span>
          <b style={{ color: '#f3fbf5', fontWeight: 600 }}>{label}</b>
        </div>
      ))}
    </div>
  </section>
);

export default TickerSection;
