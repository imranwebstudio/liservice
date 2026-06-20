import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logout, selectUser } from '../../../redux/features/auth/authSlice';
import { useGetUserProfileQuery } from '../../../redux/features/auth/authApi';
import SubscribeButton from './SubscribeButton';

const WRAP: React.CSSProperties = {
  maxWidth: 1180,
  margin: '0 auto',
  padding: '0 32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const HomeNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const user = useAppSelector(selectUser);
  const { data } = useGetUserProfileQuery(undefined, { skip: !user, pollingInterval: 5000 });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '12px 0',
        background: scrolled ? 'rgba(7,11,9,0.85)' : 'rgba(7,11,9,0.55)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid #1d2c23' : '1px solid transparent',
        transition: 'border-color 0.4s ease, background 0.4s ease',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={WRAP}>
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: 19,
            letterSpacing: '-0.02em',
            textDecoration: 'none',
            color: '#f3fbf5',
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(155deg, #6ee7a8, #149656 60%, #2dd4cf)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              fontWeight: 700,
              color: '#06150d',
              boxShadow: '0 0 0 1px rgba(110,231,168,0.25), 0 8px 24px -8px rgba(31,191,108,0.6)',
              flexShrink: 0,
            }}
          >
            L
          </div>
          Li Service<span style={{ color: '#34d97e' }}>24</span>
        </Link>

        {/* Centre nav links */}
        <div className="home-nav-links" style={{ display: 'flex', gap: 36 }}>
          {[
            { label: 'Home', to: '/' },
            { label: 'Services', to: '/service' },
            { label: 'FAQ', to: '#faq' },
          ].map(({ label, to }) => (
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

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {user && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                border: '1px solid #28392d',
                borderRadius: 999,
                padding: '8px 16px',
                fontSize: 13.5,
                fontWeight: 500,
                color: '#aebcb2',
              }}
            >
              $ {data?.data?.balance ?? '0.00'}
            </div>
          )}

          {user ? (
            <SubscribeButton label="Logout" onClick={handleLogout} />
          ) : (
            <SubscribeButton label="Sign in" to="/register" />
          )}

          {/* <SubscribeButton label="Get started" to={user ? '/service' : '/register'} /> */}
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
