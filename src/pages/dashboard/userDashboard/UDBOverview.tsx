import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/* ── helpers ─────────────────────────────────────────────────── */
function easeOutExpo(t: number) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

function useCountUp(target: number, duration = 1500, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || target === 0) { setCount(0); return; }
    let frame: number;
    const start = Date.now();
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      setCount(Math.round(easeOutExpo(t) * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, active]);
  return count;
}

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function lastSixLabels() {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return MONTH_NAMES[d.getMonth()];
  });
}

function ordersByMonth(orders: any[]): number[] {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const from = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const to   = new Date(now.getFullYear(), now.getMonth() - 4 + i, 1);
    return orders.filter(o => {
      const d = new Date(o.createdAt);
      return d >= from && d < to;
    }).length;
  });
}

function buildLinePath(data: number[], W: number, H: number) {
  const [pL, pR, pT, pB] = [46, 14, 18, 38];
  const x0 = pL, x1 = W - pR, y0 = pT, y1 = H - pB;
  const max = Math.max(...data, 1);
  const xs = data.map((_, i) => x0 + (x1 - x0) * i / (data.length - 1));
  const ys = data.map(v => y1 - (y1 - y0) * v / max);
  return {
    line: xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(' '),
    area: [`M${xs[0].toFixed(1)} ${y1}`, ...xs.map((x, i) => `L${x.toFixed(1)} ${ys[i].toFixed(1)}`), `L${xs[xs.length-1].toFixed(1)} ${y1}`, 'Z'].join(' '),
    xs, ys, yTicks: [0, Math.round(max * 0.25), Math.round(max * 0.5), Math.round(max * 0.75), max],
    x0, x1, y0, y1,
  };
}

/* ── StatCard ────────────────────────────────────────────────── */
const C = 2 * Math.PI * 72;

const DONUT_COLORS = { done: '#34d97e', pending: '#f0c869', rejected: '#f4677a' };

const STATUS_MAP: Record<string, [string, string]> = {
  done:     ['#6ee7a8', 'Completed'],
  pending:  ['#f0c869', 'Pending'],
  rejected: ['#f4677a', 'Rejected'],
};

interface StatCardProps { label: string; icon: React.ReactNode; value: number; dec?: number; prefix?: string; suffix?: string; accent: string; glow: string; active: boolean; }

const StatCard = ({ label, icon, value, dec = 0, prefix = '', suffix = '', accent, glow, active }: StatCardProps) => {
  const count = useCountUp(value, 1500, active);
  return (
    <div className="db-stat-card relative overflow-hidden isolate rounded-[20px] p-[22px] border border-[var(--db-line)] [background:linear-gradient(165deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012))] backdrop-blur-[8px]"
      style={{ '--accent': accent } as React.CSSProperties}>
      <div className="db-stat-glow absolute z-[-1] right-[-40px] top-[-40px] w-40 h-40 rounded-full opacity-[0.6]"
        style={{ background: `radial-gradient(circle,${glow},transparent 68%)` }} />
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[var(--db-t1)] font-medium">{label}</span>
        <span className="db-stat-ic w-[42px] h-[42px] rounded-[12px] flex items-center justify-center flex-shrink-0">{icon}</span>
      </div>
      <div className="db-stat-num text-[38px] font-bold tracking-[-0.02em] mt-3.5 mb-1.5 leading-none">
        {prefix}{dec > 0 ? `${count}.${String(dec).padStart(2,'0')}` : count.toLocaleString()}{suffix}
      </div>
    </div>
  );
};

/* ── RecentRow ───────────────────────────────────────────────── */
const RecentRow = ({ o, i, total }: { o: any; i: number; total: number }) => {
  const [color, label] = STATUS_MAP[o.status] ?? STATUS_MAP.pending;
  const border = i < total - 1 ? '1px solid var(--db-line)' : 'none';
  return (
    <tr className="hover:bg-white/[0.022] transition-colors">
      <td className="px-[22px] py-4 text-[14px] text-[var(--db-t2)]" style={{ borderBottom: border, fontFamily: "'Space Grotesk',sans-serif" }}>#{o._id?.slice(-4) ?? String(i+1).padStart(4,'0')}</td>
      <td className="px-[22px] py-4 text-[14px] font-medium text-[var(--db-t0)] max-w-[320px]" style={{ borderBottom: border }}>
        {o.serviceId?.name ?? 'Service'}
        <small className="block text-[12px] text-[var(--db-t2)] font-normal mt-0.5">{o.serviceId?.category ?? '—'}</small>
      </td>
      <td className="px-[22px] py-4 text-[14px] font-semibold text-[var(--db-t0)] text-right" style={{ borderBottom: border, fontFamily: "'Space Grotesk',sans-serif" }}>${(o.price ?? 0).toFixed(2)}</td>
      <td className="px-[22px] py-4" style={{ borderBottom: border }}>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-[11px] py-[5px] rounded-full" style={{ color, background: `${color}1e` }}>
          <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />{label}
        </span>
      </td>
      <td className="px-[22px] py-4 text-[14px] text-[var(--db-t1)] text-right" style={{ borderBottom: border }}>
        {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-US',{ month:'short', day:'numeric', year:'numeric' }) : '—'}
      </td>
    </tr>
  );
};

/* ── Main ────────────────────────────────────────────────────── */
interface Props { orders: any[]; balance: number; servicesTotal: number; onViewOrders: () => void; onAddBalance: () => void; }

const UDBOverview = ({ orders, balance, servicesTotal, onViewOrders, onAddBalance }: Props) => {
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<SVGPathElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  const myOrders    = orders.length;
  const totalSpent  = orders.reduce((s, o) => s + (o.price ?? 0), 0);
  const months      = lastSixLabels();
  const chartData   = ordersByMonth(orders);
  const W = 720, H = 300;
  const chart       = buildLinePath(chartData, W, H);

  const donutData = [
    { label: 'Completed', value: orders.filter(o => o.status === 'done').length,     color: DONUT_COLORS.done },
    { label: 'Pending',   value: orders.filter(o => o.status === 'pending').length,  color: DONUT_COLORS.pending },
    { label: 'Rejected',  value: orders.filter(o => o.status === 'rejected').length, color: DONUT_COLORS.rejected },
  ].filter(d => d.value > 0);
  const donutTotal = donutData.reduce((s, d) => s + d.value, 0);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsActive(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const path = lineRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.style.transition = 'stroke-dashoffset 1.7s ease-in-out';
    const id = requestAnimationFrame(() => { path.style.strokeDashoffset = '0'; });
    return () => cancelAnimationFrame(id);
  }, [chartData]);

  let donutOffset = 0;
  const panelCls = "db-panel rounded-[20px] border border-[var(--db-line)] p-6 [background:linear-gradient(165deg,rgba(255,255,255,0.038),rgba(255,255,255,0.01))]";

  return (
    <div>
      {/* ── Stat cards ── */}
      <div ref={statsRef} className="grid grid-cols-4 max-[1180px]:grid-cols-2 gap-5 mb-6">
        <StatCard label="Active Services" value={servicesTotal} accent="var(--db-g4)" glow="rgba(52,217,126,0.4)" active={statsActive}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>} />
        <StatCard label="My Orders" value={myOrders} accent="var(--db-teal)" glow="rgba(45,212,207,0.4)" active={statsActive}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>} />
        <StatCard label="Total Spent" value={Math.floor(totalSpent)} dec={Math.round((totalSpent % 1) * 100)} prefix="$" accent="var(--db-gold)" glow="rgba(240,200,105,0.34)" active={statsActive}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} />
        <StatCard label="Account Balance" value={Math.floor(balance)} dec={Math.round((balance % 1) * 100)} prefix="$" accent="var(--db-g3)" glow="rgba(110,231,168,0.36)" active={statsActive}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>} />
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-[1.55fr_1fr] max-[1180px]:grid-cols-1 gap-5 mb-6">
        {/* Line chart */}
        <div className={panelCls}>
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="font-semibold text-[18px] tracking-[-0.01em] text-[var(--db-t0)]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Orders Trend</h3>
              <p className="text-[13px] text-[var(--db-t2)] mt-0.5">Orders you placed each month</p>
            </div>
            <span className="text-[12px] font-semibold text-[var(--db-g3)] bg-[rgba(52,217,126,0.12)] border border-[rgba(52,217,126,0.26)] rounded-full px-3 py-[5px]">Last 6 months</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="dbLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6ee7a8" /><stop offset="55%" stopColor="#34d97e" /><stop offset="100%" stopColor="#2dd4cf" />
              </linearGradient>
              <linearGradient id="dbAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(52,217,126,0.28)" /><stop offset="100%" stopColor="rgba(52,217,126,0)" />
              </linearGradient>
            </defs>
            {/* grid lines */}
            {chart.yTicks.map((t, idx) => {
              const y = chart.y1 - (chart.y1 - chart.y0) * t / Math.max(...chartData, 1);
              return <g key={idx}>
                <line x1={chart.x0} y1={y.toFixed(1)} x2={chart.x1} y2={y.toFixed(1)} stroke="var(--db-line)" strokeWidth="1" />
                <text x={chart.x0 - 10} y={(y + 4).toFixed(1)} textAnchor="end" fill="var(--db-t2)" fontSize="12">{t}</text>
              </g>;
            })}
            {/* month labels */}
            {chart.xs.map((x, i) => (
              <text key={i} x={x.toFixed(1)} y={H - 14} textAnchor="middle" fill="var(--db-t2)" fontSize="12">{months[i]}</text>
            ))}
            {/* area */}
            <path d={chart.area} fill="url(#dbAreaGrad)" opacity="0.8" />
            {/* line */}
            <path ref={lineRef} d={chart.line} fill="none" stroke="url(#dbLineGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* dots */}
            {chart.xs.map((x, i) => (
              <circle key={i} cx={x.toFixed(1)} cy={chart.ys[i].toFixed(1)} r="5" fill="var(--db-bg0)" stroke="#34d97e" strokeWidth="3" />
            ))}
          </svg>
        </div>

        {/* Donut chart */}
        <div className={panelCls}>
          <div className="mb-5">
            <h3 className="font-semibold text-[18px] tracking-[-0.01em] text-[var(--db-t0)]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Order Status</h3>
            <p className="text-[13px] text-[var(--db-t2)] mt-0.5">Breakdown of your orders</p>
          </div>
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <svg viewBox="0 0 200 200" className="w-[200px] h-[200px] -rotate-90">
                <circle className="db-donut-track" cx="100" cy="100" r="72" fill="none" strokeWidth="26" />
                {donutData.length === 0 ? (
                  <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(52,217,126,0.2)" strokeWidth="26" />
                ) : donutData.map(d => {
                  const frac = d.value / (donutTotal || 1);
                  const len  = frac * C;
                  const seg  = (
                    <circle key={d.label} cx="100" cy="100" r="72" fill="none" stroke={d.color} strokeWidth="26"
                      strokeDasharray={`${len.toFixed(2)} ${(C - len).toFixed(2)}`}
                      strokeDashoffset={(-donutOffset).toFixed(2)} strokeLinecap="round"
                      style={{ filter: `drop-shadow(0 0 6px ${d.color}55)` }} />
                  );
                  donutOffset += len;
                  return seg;
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <b className="text-[26px] font-bold text-[var(--db-t0)]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{donutTotal}</b>
                <span className="text-[11px] text-[var(--db-t2)] tracking-[0.04em] uppercase">Total Orders</span>
              </div>
            </div>
            <div className="flex flex-col gap-[11px] w-full">
              {(donutData.length > 0 ? donutData : [{ label: 'No orders', value: 0, color: '#28392d' }]).map(d => (
                <div key={d.label} className="flex items-center gap-2.5 text-[13.5px] text-[var(--db-t1)]">
                  <span className="w-[11px] h-[11px] rounded-[3px] flex-shrink-0" style={{ background: d.color }} />
                  {d.label}
                  <b className="ml-auto text-[var(--db-t0)]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{d.value}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent orders ── */}
      <div className={panelCls}>
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-semibold text-[18px] tracking-[-0.01em] text-[var(--db-t0)]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Recent Orders</h3>
            <p className="text-[13px] text-[var(--db-t2)] mt-0.5">Your latest orders</p>
          </div>
          <button onClick={onViewOrders}
            className="text-[12px] font-semibold text-[var(--db-g3)] bg-[rgba(52,217,126,0.12)] border border-[rgba(52,217,126,0.26)] rounded-full px-3 py-[5px] hover:bg-[rgba(52,217,126,0.2)] transition-colors cursor-pointer">
            View all →
          </button>
        </div>
        {orders.length === 0 ? (
          <div className="py-12 text-center text-[var(--db-t2)] text-sm">No orders yet.</div>
        ) : (
          <div className="rounded-[16px] overflow-hidden border border-[var(--db-line)]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['#','Service','Amount','Status','Date'].map((h, i) => (
                    <th key={h} className="text-[11px] tracking-[0.1em] uppercase font-semibold text-[var(--db-t2)] px-[22px] py-4 bg-white/[0.02] border-b border-[var(--db-line)]"
                      style={{ textAlign: i >= 2 ? 'right' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((o, i) => (
                  <RecentRow key={o._id ?? i} o={o} i={i} total={Math.min(orders.length, 5)} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UDBOverview;
