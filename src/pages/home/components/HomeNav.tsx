import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logout, selectUser } from '../../../redux/features/auth/authSlice';
import { useGetUserProfileQuery } from '../../../redux/features/auth/authApi';
import { useTheme } from '../../../utils/ThemeContext';
import SubscribeButton from './SubscribeButton';
import ThemeToggle from '../../../components/ThemeToggle';

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/service" },
  { label: "FAQ", to: "#faq" },
];

const HomeNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const { data } = useGetUserProfileQuery(undefined, {
    skip: !user,
    pollingInterval: 5000,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setMobileOpen(false);
    navigate("/");
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '12px 0',
        background: scrolled || mobileOpen
          ? (isDark ? 'rgba(7,11,9,0.97)' : 'rgba(240,247,243,0.97)')
          : (isDark ? 'rgba(7,11,9,0.55)' : 'rgba(240,247,243,0.75)'),
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? `1px solid ${isDark ? '#1d2c23' : '#c8dbd0'}` : '1px solid transparent',
        transition: 'border-color 0.4s ease, background 0.4s ease',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Top bar */}
      <div className="max-w-295 mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobile}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600, fontSize: 19, letterSpacing: '-0.02em',
            textDecoration: 'none', color: 'var(--site-t0)',
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background:
                "linear-gradient(155deg, #6ee7a8, #149656 60%, #2dd4cf)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 700,
              color: "#06150d",
              boxShadow:
                "0 0 0 1px rgba(110,231,168,0.25), 0 8px 24px -8px rgba(31,191,108,0.6)",
              flexShrink: 0,
            }}
          >
            L
          </div>
          Li Service<span style={{ color: "#34d97e" }}>24</span>
          {/* <img className='w-9' src={logo} alt="Logo" /> */}
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-9">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={label} to={to} className="home-nav-link">
              {label}
            </Link>
          ))}
          {user && (
            <Link to="/dashboard" className="home-nav-link">
              Dashboard
            </Link>
          )}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3.5">
           <ThemeToggle />
          {user && (
            <div className="home-balance" onClick={() => navigate('/dashboard', { state: { view: 'addBalance' } })} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              border: '1px solid var(--site-border)', borderRadius: 999,
              padding: '8px 16px', fontSize: 13.5, fontWeight: 500, color: 'var(--site-t1)',
              cursor: 'pointer',
            }}>
              $ {data?.data?.balance ?? '0.00'}
            </div>
          )}
          {user
            ? <SubscribeButton label="Logout" onClick={handleLogout} />
            : <SubscribeButton label="Sign in" to="/register" />
          }
         
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="flex md:hidden flex-col justify-center items-center gap-1.25 w-10 h-10 bg-[rgba(52,217,126,0.08)] border border-[rgba(52,217,126,0.2)] rounded-[10px] cursor-pointer p-0 shrink-0"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-[#f3fbf5] rounded-sm origin-center transition-[transform,opacity] duration-300 ${mobileOpen ? "translate-y-1.75 rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#f3fbf5] rounded-sm origin-center transition-[transform,opacity] duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#f3fbf5] rounded-sm origin-center transition-[transform,opacity] duration-300 ${mobileOpen ? "-translate-y-1.75 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-[max-height] duration-350 ease-in-out ${mobileOpen ? "max-h-125" : "max-h-0"}`}
      >
        <div className="px-6 py-7 border-t border-[#1d2c23]">
          {/* Nav links */}
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={closeMobile}
                className="block py-3 px-3.5 text-[#aebcb2] no-underline text-base font-medium rounded-[10px] transition-[background,color] duration-200 hover:bg-[rgba(52,217,126,0.08)] hover:text-[#f3fbf5]"
              >
                {label}
              </Link>
            ))}
            {user && (
              <Link
                to="/dashboard"
                onClick={closeMobile}
                className="block py-3 px-3.5 text-[#aebcb2] no-underline text-base font-medium rounded-[10px] transition-[background,color] duration-200 hover:bg-[rgba(52,217,126,0.08)] hover:text-[#f3fbf5]"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="my-4 h-px bg-[#1d2c23]" />

          <div className="flex flex-col gap-3.5">
            {user && (
              <div
                className="flex justify-between items-center px-3.5 py-2.5 border border-[#1d2c23] rounded-[10px] text-sm"
                onClick={() => { navigate('/dashboard', { state: { view: 'addBalance' } }); closeMobile(); }}
                style={{ cursor: 'pointer' }}
              >
                <span style={{ color: '#34d97e', fontWeight: 600 }}>Balance</span>
                <span style={{ color: 'var(--site-t0)', fontWeight: 600 }}>$ {data?.data?.balance ?? '0.00'}</span>
              </div>
            )}
            {user ? (
              <SubscribeButton label="Logout" onClick={handleLogout} />
            ) : (
              <SubscribeButton label="Sign in" to="/register" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
