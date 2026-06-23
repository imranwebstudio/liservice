import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetAllServicesQuery, useBuyServiceMutation } from '../../../redux/features/service/service.api';

const INPUT = "w-full h-[46px] px-[16px] rounded-[11px] border border-[var(--db-line2)] bg-[var(--db-input)] text-[var(--db-t0)] text-[14px] outline-none transition-[border-color,box-shadow] focus:border-[var(--db-g5)] focus:shadow-[0_0_0_4px_rgba(31,191,108,0.12)]";

/* Fixed filter definitions — no dynamic category dump */
const SORT_OPTS = [
  { id: 'default',    label: 'Recommended' },
  { id: 'price-asc',  label: 'Price: Low' },
  { id: 'price-desc', label: 'Price: High' },
  { id: 'fastest',    label: 'Top Volume' },
];

const PLATFORMS = [
  { id: 'all',       label: 'All' },
  { id: 'facebook',  label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'youtube',   label: 'YouTube' },
  { id: 'tiktok',    label: 'TikTok' },
  { id: 'telegram',  label: 'Telegram' },
  { id: 'twitter',   label: 'Twitter' },
  { id: 'linkedin',  label: 'LinkedIn' },
  { id: 'whatsapp',  label: 'WhatsApp' },
  { id: 'snapchat',  label: 'Snapchat' },
  { id: 'spotify',   label: 'Spotify' },
];

const TYPES = [
  { id: 'all',         label: 'All' },
  { id: 'followers',   label: 'Followers' },
  { id: 'views',       label: 'Views' },
  { id: 'likes',       label: 'Likes' },
  { id: 'subscribers', label: 'Subscribers' },
  { id: 'members',     label: 'Members' },
  { id: 'story',       label: 'Story Views' },
  { id: 'watch',       label: 'Watch Time' },
  { id: 'comments',    label: 'Comments' },
  { id: 'reactions',   label: 'Reactions' },
];

function matchesPlatform(svc: any, platform: string) {
  if (platform === 'all') return true;
  const hay = `${svc.name ?? ''} ${svc.category ?? ''}`.toLowerCase();
  return hay.includes(platform);
}

function matchesType(svc: any, type: string) {
  if (type === 'all') return true;
  const hay = `${svc.name ?? ''} ${svc.category ?? ''}`.toLowerCase();
  if (type === 'story') return hay.includes('story');
  if (type === 'watch') return hay.includes('watch');
  return hay.includes(type);
}

/* ── OrderModal ─────────────────────────────────────────────── */
const OrderModal = ({ svc, onClose, onSuccess }: { svc: any; onClose: () => void; onSuccess: () => void }) => {
  const [qty, setQty]   = useState(svc.min ?? 100);
  const [link, setLink] = useState('');
  const [buyService, { isLoading }] = useBuyServiceMutation();
  const price = ((qty * (svc.price ?? 0)) / 1000).toFixed(4);

  const submit = async () => {
    try {
      await buyService({ id: svc._id, buyInfo: { quantity: qty, link, price: parseFloat(price) } }).unwrap();
      onSuccess();
      onClose();
    } catch { /* parent handles toast */ }
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}>
        <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="relative w-full max-w-[520px] rounded-[24px] p-7 border border-[var(--db-line)]"
          style={{ background: 'linear-gradient(165deg,#0b1810,#060d0a)' }}
          onClick={e => e.stopPropagation()}>
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[var(--db-t2)] border border-[var(--db-line2)] hover:text-[var(--db-t0)] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div className="mb-5">
            <span className="inline-block text-[11px] font-bold tracking-[0.09em] uppercase text-[var(--db-g3)] bg-[rgba(52,217,126,0.12)] border border-[rgba(52,217,126,0.22)] rounded-full px-3 py-[4px] mb-2">{svc.category ?? 'Service'}</span>
            <h2 className="font-bold text-[19px] text-[var(--db-t0)] leading-[1.3]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{svc.name}</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[{ label: 'Min', value: svc.min?.toLocaleString() ?? '—' }, { label: 'Max', value: svc.max?.toLocaleString() ?? '—' }, { label: 'Avg time', value: svc.avgTime ?? '—' }].map(p => (
              <div key={p.label} className="flex flex-col items-center gap-1 p-3 rounded-[12px] border border-[var(--db-line2)] bg-[rgba(255,255,255,0.025)]">
                <span className="text-[11px] font-medium tracking-[0.06em] uppercase text-[var(--db-t2)]">{p.label}</span>
                <span className="font-bold text-[var(--db-t0)]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{p.value}</span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-[12.5px] font-medium text-[var(--db-t1)] mb-1.5">Quantity</label>
            <input type="number" className={INPUT} min={svc.min ?? 1} max={svc.max ?? 999999}
              value={qty} onChange={e => setQty(Math.max(svc.min ?? 1, parseInt(e.target.value) || 0))} />
            <div className="flex justify-between text-[11.5px] text-[var(--db-t2)] mt-1.5 px-0.5">
              <span>Min: {svc.min?.toLocaleString() ?? '—'}</span><span>Max: {svc.max?.toLocaleString() ?? '—'}</span>
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-[12.5px] font-medium text-[var(--db-t1)] mb-1.5">Link / URL</label>
            <input type="url" className={INPUT} placeholder="https://..." value={link} onChange={e => setLink(e.target.value)} />
          </div>
          <div className="flex items-center justify-between px-4 py-3 rounded-[12px] bg-[rgba(52,217,126,0.07)] border border-[rgba(52,217,126,0.18)] mb-5">
            <span className="text-sm text-[var(--db-t1)]">Total price</span>
            <b className="text-[22px] font-bold db-grad-text" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>${price}</b>
          </div>
          <button disabled={!link.trim() || isLoading} onClick={submit}
            className="w-full h-[50px] rounded-[12px] text-white font-bold text-[15px] cursor-pointer [background:linear-gradient(90deg,#188A50,#06B913)] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
            {isLoading ? 'Placing Order…' : 'Place Order'}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ── Platform data (matches reference HTML exactly) ─────────────── */
const PLATFORM_DATA: Record<string, { color: string; glow: string; icon: string; label: string }> = {
  facebook:   { color: '#1877f2', glow: 'rgba(24,119,242,0.45)',  icon: '👍', label: 'FACEBOOK' },
  instagram:  { color: '#e1306c', glow: 'rgba(225,48,108,0.45)',  icon: '📸', label: 'INSTAGRAM' },
  youtube:    { color: '#ff2d2d', glow: 'rgba(255,45,45,0.42)',   icon: '▶️', label: 'YOUTUBE' },
  tiktok:     { color: '#27e6dd', glow: 'rgba(39,230,221,0.4)',   icon: '🎵', label: 'TIKTOK' },
  telegram:   { color: '#2aa6e0', glow: 'rgba(42,166,224,0.45)',  icon: '✈️', label: 'TELEGRAM' },
  linkedin:   { color: '#0a66c2', glow: 'rgba(10,102,194,0.45)',  icon: '🔗', label: 'LINKEDIN' },
  twitter:    { color: '#1d9bf0', glow: 'rgba(29,155,240,0.45)',  icon: '🐦', label: 'TWITTER' },
  whatsapp:   { color: '#25d366', glow: 'rgba(37,211,102,0.42)',  icon: '💬', label: 'WHATSAPP' },
  snapchat:   { color: '#f3c400', glow: 'rgba(243,196,0,0.4)',    icon: '👻', label: 'SNAPCHAT' },
  spotify:    { color: '#1db954', glow: 'rgba(29,185,84,0.4)',    icon: '🎧', label: 'SPOTIFY' },
  soundcloud: { color: '#ff5500', glow: 'rgba(255,85,0,0.4)',     icon: '☁️', label: 'SOUNDCLOUD' },
  shopee:     { color: '#f85929', glow: 'rgba(248,89,41,0.4)',    icon: '🛒', label: 'SHOPEE' },
};

const DEFAULT_PLATFORM = { color: '#34d97e', glow: 'rgba(52,217,126,0.45)', icon: '⭐', label: 'SERVICE' };

function getPlatform(name: string) {
  const n = (name ?? '').toLowerCase();
  for (const [key, val] of Object.entries(PLATFORM_DATA)) {
    if (n.includes(key)) return val;
  }
  return DEFAULT_PLATFORM;
}

function fmtNum(n: number) {
  if (!n) return '—';
  if (n >= 1000000) return `${(n/1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n/1000).toFixed(0)}K`;
  return n.toString();
}

/* Arrow SVG matching reference exactly */
const ArrowSVG = () => (
  <svg viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 19, height: 15 }}>
    <circle cx="1.83"  cy="8.75"  r="1.25" />
    <circle cx="5.16"  cy="8.75"  r="1.25" />
    <circle cx="8.50"  cy="8.75"  r="1.25" />
    <circle cx="11.83" cy="8.75"  r="1.25" />
    <circle cx="15.17" cy="8.75"  r="1.25" />
    <circle cx="20.17" cy="8.75"  r="1.25" />
    <circle cx="17.67" cy="6.25"  r="1.25" />
    <circle cx="15.17" cy="3.75"  r="1.25" />
    <circle cx="17.67" cy="11.25" r="1.25" />
    <circle cx="15.17" cy="13.75" r="1.25" />
    <circle cx="12.67" cy="16.25" r="1.25" />
    <circle cx="12.67" cy="1.25"  r="1.25" />
  </svg>
);

/* ── ServiceCard ─────────────────────────────────────────────── */
const ServiceCard = ({ svc, onBuy }: { svc: any; onBuy: (s: any) => void }) => {
  const plat = getPlatform(svc.name ?? svc.category ?? '');
  return (
    <article
      className="svc-card relative isolate rounded-[22px] border border-[var(--db-line)] cursor-pointer overflow-hidden"
      style={{ '--accent': plat.color, '--glow': plat.glow } as React.CSSProperties}
      onClick={() => onBuy(svc)}>

      {/* platform glow blob — top center */}
      <div className="svc-glow absolute z-[-1] top-[-120px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full pointer-events-none" />
      {/* dot texture pattern */}
      <div className="svc-pattern absolute inset-0 z-[-1] pointer-events-none" />
      {/* sheen bar at top */}
      <div className="svc-sheen absolute top-0 left-0 right-0 h-[78px] pointer-events-none" />
      {/* ambient orb */}
      <div className="svc-orb absolute top-[15px] left-[20px] w-[9px] h-[9px] rounded-full pointer-events-none" />

      <div className="p-5">
        {/* platform row */}
        <div className="flex items-center gap-3 mb-[18px]">
          <div className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center text-[21px] flex-shrink-0"
            style={{ background: `linear-gradient(150deg,${plat.color}22,${plat.color}44)`, border: `1px solid ${plat.color}44` }}>
            {plat.icon}
          </div>
          <span className="text-[12px] font-bold tracking-[0.06em] uppercase text-[var(--db-t2)]">{plat.label}</span>
        </div>

        {/* title */}
        <h3 className="text-[16px] font-semibold leading-[1.32] text-[var(--db-t0)] line-clamp-3 mb-0"
          style={{ minHeight: 65, fontFamily: "'Space Grotesk',sans-serif" }}>
          {svc.name}
        </h3>

        {/* divider */}
        <div className="h-px bg-[var(--db-line)] my-[18px]" />

        {/* price */}
        <div className="flex items-baseline gap-2 mb-4">
          <b className="text-[24px] font-bold leading-none" style={{ color: plat.color, fontFamily: "'Space Grotesk',sans-serif" }}>
            ${svc.price?.toFixed(3) ?? '—'}
          </b>
          <span className="text-[13px] text-[var(--db-t2)]">per 1,000</span>
        </div>

        {/* meta row */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[['MIN', fmtNum(svc.min)], ['MAX', fmtNum(svc.max)], ['AVG TIME', svc.avgTime ?? '—']].map(([l, v]) => (
            <div key={l} className="flex flex-col gap-0.5 p-2 rounded-[10px] text-center"
              style={{ background: `${plat.color}0d`, border: `1px solid ${plat.color}22` }}>
              <span className="text-[9.5px] font-semibold tracking-[0.07em] uppercase text-[var(--db-t2)]">{l}</span>
              <span className="text-[12.5px] font-bold text-[var(--db-t1)]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{v}</span>
            </div>
          ))}
        </div>

        {/* CTA button — platform-colored with white sweep hover */}
        <button className="svc-cta-btn w-full h-12.5 flex items-center justify-between px-2.5 rounded-[11px] border border-black/12 text-[15px]"
          onClick={e => { e.stopPropagation(); onBuy(svc); }}>
          <span className="svc-cta-label font-bold">Create Order</span>
          <span className="svc-cta-circle w-9.5 h-9.5 rounded-[7px] flex items-center justify-center ml-3">
            <ArrowSVG />
          </span>
        </button>
      </div>
    </article>
  );
};

/* ── FilterChip ──────────────────────────────────────────────── */
const FChip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button onClick={onClick}
    className={`db-chip text-[12.5px] font-semibold px-3.5 py-[7px] rounded-full border cursor-pointer whitespace-nowrap transition-all ${active ? 'text-[#06160e] border-transparent shadow-[0_4px_16px_-6px_rgba(52,217,126,0.7)]' : 'text-[var(--db-t1)] border-[var(--db-line2)] hover:border-[var(--db-g5)] hover:text-[var(--db-t0)]'}`}
    style={active ? { background: 'linear-gradient(135deg,#6ee7a8,#1fbf6c 60%,#2dd4cf)' } : {}}>
    {label}
  </button>
);

const LIMIT = 12;

/* ── Pagination bar ──────────────────────────────────────────── */
const Pagination = ({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) => {
  if (totalPages <= 1) return null;

  const pages: (number | '…')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('…');
    pages.push(totalPages);
  }

  const arrowCls = (disabled: boolean) =>
    `w-9 h-9 rounded-[9px] flex items-center justify-center border border-[var(--db-line2)] text-[var(--db-t1)] hover:border-[var(--db-g5)] hover:text-[var(--db-t0)] transition-all cursor-pointer ${disabled ? 'opacity-40 pointer-events-none' : ''}`;

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 flex-wrap">
      <button className={arrowCls(page === 1)} onClick={() => onChange(page - 1)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      {pages.map((p, i) =>
        p === '…'
          ? <span key={`el-${i}`} className="w-9 h-9 flex items-center justify-center text-[var(--db-t2)] text-sm select-none">…</span>
          : <button key={p}
              onClick={() => onChange(p as number)}
              className={`w-9 h-9 rounded-[9px] flex items-center justify-center text-[13px] font-semibold transition-all cursor-pointer ${p === page ? 'text-[#06160e] shadow-[0_4px_16px_-6px_rgba(52,217,126,0.7)]' : 'border border-[var(--db-line2)] text-[var(--db-t1)] hover:border-[var(--db-g5)] hover:text-[var(--db-t0)]'}`}
              style={p === page ? { background: 'linear-gradient(135deg,#6ee7a8,#1fbf6c 60%,#2dd4cf)' } : {}}>
              {p}
            </button>
      )}
      <button className={arrowCls(page === totalPages)} onClick={() => onChange(page + 1)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
};

/* ── Main ────────────────────────────────────────────────────── */
interface Props { onOrderSuccess: () => void; }

const UDBServices = ({ onOrderSuccess }: Props) => {
  const [page, setPage]           = useState(1);
  const [search, setSearch]       = useState('');
  const [sort, setSort]           = useState('default');
  const [platform, setPlatform]   = useState('all');
  const [type, setType]           = useState('all');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [orderSvc, setOrderSvc]   = useState<any | null>(null);

  const { data, isLoading, isFetching } = useGetAllServicesQuery({ page, limit: LIMIT });

  const rawServices: any[]  = data?.data?.services  ?? [];
  const total: number       = data?.data?.total      ?? 0;
  const totalPages: number  = data?.data?.totalPages ?? 1;

  const hasActiveFilter = platform !== 'all' || type !== 'all' || sort !== 'default' || search.trim() !== '';

  const displayed = useMemo(() => {
    let s = rawServices.filter(svc => {
      const q = search.toLowerCase();
      return !q || svc.name?.toLowerCase().includes(q) || svc.category?.toLowerCase().includes(q);
    });
    s = s.filter(svc => matchesPlatform(svc, platform));
    s = s.filter(svc => matchesType(svc, type));
    if (sort === 'price-asc')  s = [...s].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sort === 'price-desc') s = [...s].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    return s;
  }, [rawServices, search, sort, platform, type]);

  const clearFilters = () => { setPlatform('all'); setType('all'); setSort('default'); setSearch(''); setPage(1); };
  const goPage = (p: number) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

      {/* ── Filter panel ───────────────────────────────────────── */}
      <div className="rounded-[20px] border border-[var(--db-line)] mb-5 overflow-hidden [background:linear-gradient(165deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008))]">
        <div className="flex gap-3 items-center p-4 border-b border-[var(--db-line)]">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--db-t2)]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input className={`${INPUT} pl-9`} type="search" placeholder="Search services — e.g. Instagram followers, YouTube views…"
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <button onClick={() => setFiltersOpen(o => !o)}
            className="flex items-center gap-2 h-[46px] px-4 rounded-[11px] border border-[var(--db-line2)] text-[var(--db-t1)] text-[13px] font-semibold hover:border-[var(--db-g5)] hover:text-[var(--db-t0)] transition-colors whitespace-nowrap cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
            FILTERS
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-300 ${filtersOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
        <div className={`db-filters ${filtersOpen ? 'open' : 'collapsed'}`}>
          <div className="px-5 pt-4 pb-5 space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--db-t2)] w-16 pt-[9px] flex-shrink-0">SORT</span>
              <div className="flex gap-2 flex-wrap">
                {SORT_OPTS.map(o => <FChip key={o.id} label={o.label} active={sort === o.id} onClick={() => setSort(o.id)} />)}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--db-t2)] w-16 pt-[9px] flex-shrink-0">PLATFORM</span>
              <div className="flex gap-2 flex-wrap">
                {PLATFORMS.map(p => <FChip key={p.id} label={p.label} active={platform === p.id} onClick={() => { setPlatform(p.id); setPage(1); }} />)}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--db-t2)] w-16 pt-[9px] flex-shrink-0">TYPE</span>
              <div className="flex gap-2 flex-wrap">
                {TYPES.map(t => <FChip key={t.id} label={t.label} active={type === t.id} onClick={() => { setType(t.id); setPage(1); }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* results meta */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] text-[var(--db-t2)]">
          Showing <b className="text-[var(--db-t0)]">{displayed.length}</b> of <b className="text-[var(--db-t0)]">{total}</b> services
          {totalPages > 1 && <span className="ml-1 opacity-60">— page {page} / {totalPages}</span>}
        </p>
        {hasActiveFilter && (
          <button onClick={clearFilters}
            className="text-[12px] font-semibold text-[var(--db-t2)] hover:text-[var(--db-red)] transition-colors cursor-pointer flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Clear filters
          </button>
        )}
      </div>

      {/* grid */}
      {isLoading ? (
        <div className="py-24 text-center text-[var(--db-t2)] text-sm">Loading services…</div>
      ) : displayed.length === 0 ? (
        <div className="py-24 text-center text-[var(--db-t2)]">
          <b className="block text-[19px] text-[var(--db-t1)] mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>No services found</b>
          Try a different search or filter.
        </div>
      ) : (
        <div className={`grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-[18px] transition-opacity duration-200 ${isFetching ? 'opacity-60 pointer-events-none' : ''}`}>
          {displayed.map(svc => (
            <ServiceCard key={svc._id} svc={svc} onBuy={setOrderSvc} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={goPage} />

      {orderSvc && (
        <OrderModal svc={orderSvc} onClose={() => setOrderSvc(null)} onSuccess={onOrderSuccess} />
      )}
    </motion.div>
  );
};

export default UDBServices;
