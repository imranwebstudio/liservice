import { Link } from 'react-router-dom';
import SubscribeButton from './SubscribeButton';

const WHATSAPP = 'https://wa.me/message/FI3L5HOJSGYBA1';

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1.04 3.4 2 2 0 0 1 3 1.44h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const FbIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const LogoMark = () => (
  <Link to="/" style={{
    display: 'inline-flex', alignItems: 'center', gap: 10,
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600, fontSize: 19, letterSpacing: '-0.02em',
    textDecoration: 'none', color: 'var(--site-t0)',
  }}>
    <div style={{
      width: 34, height: 34, borderRadius: 10,
      background: 'linear-gradient(155deg, #6ee7a8, #149656 60%, #2dd4cf)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 16, fontWeight: 700, color: '#06150d',
      boxShadow: '0 0 0 1px rgba(110,231,168,0.25), 0 8px 24px -8px rgba(31,191,108,0.6)',
      flexShrink: 0,
    }}>L</div>
    Li Service<span style={{ color: '#34d97e' }}>24</span>
  </Link>
);

const contactIconCls = "w-8.5 h-8.5 rounded-lg border border-[#1a2e1f] bg-white/3 flex items-center justify-center shrink-0 text-[#74877b]";
const socialLinkCls  = "w-9 h-9 rounded-lg border border-[#1a2e1f] bg-white/3 flex items-center justify-center text-[#74877b] no-underline transition-[color,border-color,background] duration-250 hover:text-[#34d97e] hover:border-[#28392d] hover:bg-[rgba(52,217,126,0.06)]";
const colLinkCls     = "text-sm text-[#74877b] no-underline transition-colors duration-250 hover:text-[#34d97e]";
const footLinkCls    = "text-[12.5px] text-[#74877b] no-underline transition-colors duration-250 hover:text-[#34d97e]";

const HomeFooter = () => (
  <>
    {/* Main footer */}
    <div className="relative overflow-hidden pt-22 border-t border-[#1a2e1f]" style={{ background: 'linear-gradient(180deg,var(--site-bg) 0%,var(--site-bg2) 100%)' }}>
      <div className="max-w-295 mx-auto px-8 max-sm:px-5">

        {/* Grid */}
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1.2fr] max-[900px]:grid-cols-2 max-sm:grid-cols-1 gap-[48px_32px] max-[900px]:gap-[40px_24px] pb-14 border-b border-[#1a2e1f]">

          {/* Brand */}
          <div className="max-[900px]:col-span-full">
            <LogoMark />
            <p className="text-sm leading-[1.65] text-[#74877b] my-[18px]" style={{ fontFamily: "'Inter', sans-serif" }}>
              Li Service 24 is your trusted SMM panel for real growth — delivering
              likes, followers, views and engagement across every major platform.
            </p>
            <SubscribeButton label="Contact us" href={WHATSAPP} target="_blank" rel="noreferrer" />
          </div>

          {/* Site map */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-widest uppercase text-[#aebcb2] mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
              Site map
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li><Link to="/" className={colLinkCls}>Home</Link></li>
              <li><Link to="/service" className={colLinkCls}>Services</Link></li>
              <li><Link to="/service" className={colLinkCls}>Pricing</Link></li>
              <li><Link to="/about" className={colLinkCls}>About us</Link></li>
              <li><a href="#faq" className={colLinkCls}>FAQ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-widest uppercase text-[#aebcb2] mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
              Support
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li><a href={WHATSAPP} target="_blank" rel="noreferrer" className={colLinkCls}>Help Center</a></li>
              <li><a href="#" className={colLinkCls}>API Access</a></li>
              <li><a href="#" className={colLinkCls}>Refund Policy</a></li>
              <li><a href="#" className={colLinkCls}>Terms of Service</a></li>
              <li><a href="#" className={colLinkCls}>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-widest uppercase text-[#aebcb2] mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
              Contact us
            </h4>

            <div className="flex items-start gap-3 mb-[18px]">
              <span className={contactIconCls}><PhoneIcon /></span>
              <div>
                <small className="block text-[10px] uppercase tracking-[0.08em] text-[#74877b] mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>Phone</small>
                <span className="block text-sm text-[#aebcb2]" style={{ fontFamily: "'Inter', sans-serif" }}>+880 1XXX-XXXXXX</span>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-[18px]">
              <span className={contactIconCls}><EmailIcon /></span>
              <div>
                <small className="block text-[10px] uppercase tracking-[0.08em] text-[#74877b] mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>Email</small>
                <span className="block text-sm text-[#aebcb2]" style={{ fontFamily: "'Inter', sans-serif" }}>support@liservice24.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-[18px]">
              <span className={contactIconCls}><LocationIcon /></span>
              <div>
                <small className="block text-[10px] uppercase tracking-[0.08em] text-[#74877b] mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>Location</small>
                <span className="block text-sm text-[#aebcb2]" style={{ fontFamily: "'Inter', sans-serif" }}>Dhaka, Bangladesh</span>
              </div>
            </div>

            <div className="mt-1">
              <small className="block text-[10px] uppercase tracking-[0.08em] text-[#74877b] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Follow us</small>
              <div className="flex gap-2">
                <a href="#" className={socialLinkCls} aria-label="Facebook"><FbIcon /></a>
                <a href="#" className={socialLinkCls} aria-label="Instagram"><IgIcon /></a>
                <a href="#" className={socialLinkCls} aria-label="LinkedIn"><LiIcon /></a>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className={socialLinkCls} aria-label="WhatsApp"><WaIcon /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className="w-full text-center [line-height:0.78] overflow-hidden whitespace-nowrap pb-[18px] mt-10">
          <span className="footer-mark-text">LISERVICE24</span>
        </div>
      </div>
    </div>

    {/* Copyright bar */}
    <div className="px-8 py-[18px] border-t border-[#1a2e1f] flex items-center justify-between max-sm:flex-col max-sm:gap-3 max-sm:text-center" style={{ background: 'var(--site-bg2)' }}
      style={{ fontFamily: "'Inter', sans-serif" }}>
      <p className="text-[12.5px] text-[#74877b] m-0">© 2026 Li Service 24. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className={footLinkCls}>Terms</a>
        <a href="#" className={footLinkCls}>Privacy</a>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className={footLinkCls}>Contact</a>
      </div>
    </div>
  </>
);

export default HomeFooter;
