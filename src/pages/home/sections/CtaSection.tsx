import { useRef, useState, useEffect, useCallback } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { selectUser } from '../../../redux/features/auth/authSlice';
import SubscribeButton from '../components/SubscribeButton';

const CARDS = [
  { bg: 'linear-gradient(165deg,#5b2dd4,#9747ff)', icon: '📸', platform: 'Instagram', label: 'Followers gained', stat: '+12.4k', row: 'Engagement up 38%', bar: 78 },
  { bg: 'linear-gradient(165deg,#0866ff,#1877f2)', icon: '👍', platform: 'Facebook',  label: 'Page likes',       stat: '+8.9k',  row: 'Reach up 52%',          bar: 65 },
  { bg: 'linear-gradient(165deg,#0a0a0a,#2b2b2b)', icon: '🎵', platform: 'TikTok',    label: 'Video views',      stat: '+210k',  row: 'Shares up 91%',         bar: 92 },
  { bg: 'linear-gradient(165deg,#149656,#34d97e)', icon: '📈', platform: 'Growth',    label: 'This month',       stat: '+147%',  row: 'Across all platforms',  bar: 85 },
  { bg: 'linear-gradient(165deg,#cc1620,#ff0000)', icon: '▶️', platform: 'YouTube',   label: 'Subscribers',      stat: '+5.2k',  row: 'Watch time up 44%',     bar: 70 },
  { bg: 'linear-gradient(165deg,#0d8bd9,#00acee)', icon: '🐦', platform: 'X / Twitter', label: 'Engagement',    stat: '+9.7k',  row: 'Profile visits up 60%', bar: 74 },
  { bg: 'linear-gradient(165deg,#0a66c2,#2b8ae0)', icon: '🔗', platform: 'LinkedIn',  label: 'Connections',      stat: '+3.1k',  row: 'Post reach up 33%',     bar: 58 },
];

const N = CARDS.length;
const MID = (N - 1) / 2;

function collapsedTransform(slot: number) {
  const d = slot - MID;
  return `translateX(${d * 3}px) rotate(${d * 2}deg) scale(${1 - Math.abs(d) * 0.015})`;
}

function fannedTransform(slot: number) {
  const d = slot - MID;
  return `translateX(${d * 92}px) rotate(${d * 7}deg) translateY(${Math.abs(d) * 14}px)`;
}

function slotZIndex(slot: number) {
  return 10 - Math.abs(slot - MID);
}

function shuffle(arr: number[]): number[] {
  const next = [...arr];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

const CtaSection = () => {
  const user = useAppSelector(selectUser);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<number | null>(null);
  const isFannedRef = useRef(false);
  const activeDotRef = useRef(0);

  // order[slot] = cardIndex — drives both transform and z-index
  const [order, setOrder] = useState<number[]>(CARDS.map((_, i) => i));
  const [fanned, setFanned] = useState(false);
  const [activeDot, setActiveDot] = useState(0);

  const tick = useCallback(() => {
    if (!isFannedRef.current) {
      setOrder(curr => {
        let next = shuffle(curr);
        // ensure at least one card moved
        if (N > 1 && next.every((v, i) => v === curr[i])) next = shuffle(next);
        return next;
      });
      isFannedRef.current = true;
      setFanned(true);
    } else {
      const newDot = (activeDotRef.current + 1) % N;
      activeDotRef.current = newDot;
      setActiveDot(newDot);
      isFannedRef.current = false;
      setFanned(false);
    }
  }, []);

  const startCycle = useCallback(() => {
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(tick, 1800);
  }, [tick]);

  const stopCycle = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isFannedRef.current = false;
    setFanned(false);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startCycle(); else stopCycle(); },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => { obs.disconnect(); stopCycle(); };
  }, [startCycle, stopCycle]);

  return (
    <section ref={sectionRef} className="home-section" style={{ padding: '0 0 120px' }}>
      <div className="home-wrap">
        <div className="cta-box">
          <span className="cta-glow" />

          {/* ── Card deck ── */}
          <div
            className="deck-wrap"
            onMouseEnter={startCycle}
            onMouseLeave={stopCycle}
          >
            <div className={`deck${fanned ? ' fanned' : ''}`}>
              {CARDS.map((card, cardIdx) => {
                const slot = order.indexOf(cardIdx);
                return (
                  <div
                    key={cardIdx}
                    className="deck-card"
                    style={{
                      background: card.bg,
                      transform: fanned ? fannedTransform(slot) : collapsedTransform(slot),
                      zIndex: slotZIndex(slot),
                    }}
                  >
                    <div className="dc-head">
                      <span className="dc-icon">{card.icon}</span>
                      <span className="dc-plat">{card.platform}</span>
                    </div>
                    <div className="dc-body">
                      <div className="dc-stat">{card.stat}</div>
                      <div className="dc-label">{card.label}</div>
                      <div className="dc-bar">
                        <div className="dc-bar-fill" style={{ width: `${card.bar}%` }} />
                      </div>
                      <div className="dc-row">{card.row}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dot indicators */}
            <div className="deck-caption">
              {CARDS.map((_, i) => (
                <span key={i} className={`deck-dot${activeDot === i ? ' active' : ''}`} />
              ))}
            </div>
          </div>

          {/* ── Text ── */}
          <div className="eyebrow-line">
            <span className="dot-live" />
            Have a project in mind? Just let us know.
          </div>

          <h2>
            Ready to<br />
            <span className="grad-text-home">grow?</span>
          </h2>

          <p className="sub-cta">
            Our SMM panel delivers likes, followers, views and real engagement —
            priced fair and powered by real accounts.
          </p>

          <SubscribeButton label="Explore services" to={user ? '/service' : '/register'} />
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
