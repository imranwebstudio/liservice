import { useRef, useState, useEffect, useCallback } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { selectUser } from '../../../redux/features/auth/authSlice';
import SubscribeButton from '../components/SubscribeButton';

const CARDS = [
  { bg: 'linear-gradient(165deg,#5b2dd4,#9747ff)', icon: '📸', platform: 'Instagram', label: 'Followers gained', stat: '+12.4k', row: 'Engagement up 38%', bar: 78 },
  { bg: 'linear-gradient(165deg,#0866ff,#1877f2)', icon: '👍', platform: 'Facebook',  label: 'Page likes',       stat: '+8.9k',  row: 'Reach up 52%',         bar: 65 },
  { bg: 'linear-gradient(165deg,#0a0a0a,#2b2b2b)', icon: '🎵', platform: 'TikTok',    label: 'Video views',      stat: '+210k',  row: 'Shares up 91%',        bar: 92 },
  { bg: 'linear-gradient(165deg,#149656,#34d97e)', icon: '📈', platform: 'Growth',    label: 'This month',       stat: '+147%',  row: 'Across all platforms', bar: 85 },
  { bg: 'linear-gradient(165deg,#cc1620,#ff0000)', icon: '▶️', platform: 'YouTube',   label: 'Subscribers',      stat: '+5.2k',  row: 'Watch time up 44%',    bar: 70 },
  { bg: 'linear-gradient(165deg,#0d8bd9,#00acee)', icon: '🐦', platform: 'X / Twitter', label: 'Engagement',    stat: '+9.7k',  row: 'Profile visits up 60%',bar: 74 },
  { bg: 'linear-gradient(165deg,#0a66c2,#2b8ae0)', icon: '🔗', platform: 'LinkedIn',  label: 'Connections',      stat: '+3.1k',  row: 'Post reach up 33%',    bar: 58 },
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
function slotZIndex(slot: number) { return 10 - Math.abs(slot - MID); }
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
  const [order, setOrder] = useState<number[]>(CARDS.map((_, i) => i));
  const [fanned, setFanned] = useState(false);
  const [activeDot, setActiveDot] = useState(0);

  const tick = useCallback(() => {
    if (!isFannedRef.current) {
      setOrder(curr => {
        let next = shuffle(curr);
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
    if (intervalRef.current !== null) { clearInterval(intervalRef.current); intervalRef.current = null; }
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
    <section ref={sectionRef} className="pb-30">
      <div className="max-w-295 mx-auto px-8 max-sm:px-5">
        <div className="cta-box">
          <span className="cta-glow" />

          {/* Card deck */}
          <div
            className="relative flex flex-col items-center gap-7 mb-15"
            onMouseEnter={startCycle}
          >
            <div className={`relative w-42.5 h-52.5 cursor-default${fanned ? ' fanned' : ''}`}>
              {CARDS.map((card, cardIdx) => {
                const slot = order.indexOf(cardIdx);
                return (
                  <div
                    key={cardIdx}
                    className="deck-card absolute top-0 left-0 w-42.5 h-52.5 rounded-[18px] p-4 flex flex-col justify-between will-change-transform cursor-default select-none box-border shadow-[0_10px_28px_-8px_rgba(0,0,0,0.5),0_4px_10px_rgba(0,0,0,0.3)] transition-[transform,box-shadow] duration-1100 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                    style={{
                      background: card.bg,
                      transform: fanned ? fannedTransform(slot) : collapsedTransform(slot),
                      zIndex: slotZIndex(slot),
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[22px] leading-none">{card.icon}</span>
                      <span className="text-[13px] font-bold text-white/90 tracking-tight">{card.platform}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-[30px] font-extrabold text-white leading-none tracking-[-0.03em]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {card.stat}
                      </div>
                      <div className="text-[10.5px] text-white/65 font-medium uppercase tracking-[0.06em]">{card.label}</div>
                      <div className="h-1 rounded-full bg-white/15 mt-1.5 overflow-hidden">
                        <div className="h-full rounded-full bg-white/70 transition-[width] duration-1000"
                          style={{ width: `${card.bar}%` }} />
                      </div>
                      <div className="text-[11px] text-white/55 font-medium mt-0.5">{card.row}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dot indicators */}
            <div className="flex gap-1.5 items-center">
              {CARDS.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-[background,transform] duration-300 ${activeDot === i ? 'bg-[#34d97e] scale-[1.3]' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="inline-flex items-center gap-2.5 border border-[#1a2e1f] bg-white/3 rounded-full px-4.5 py-2 text-[13px] text-[#aebcb2] mb-7"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_0_3px_rgba(34,197,94,0.18)] shrink-0" />
            Have a project in mind? Just let us know.
          </div>

          <h2>
            Ready to<br />
            <span className="grad-text-home">grow?</span>
          </h2>

          <p className="max-w-120 mx-auto mb-9 text-[15.5px] max-sm:text-sm leading-[1.65] text-[rgba(243,251,245,0.55)]"
            style={{ fontFamily: "'Inter', sans-serif" }}>
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
