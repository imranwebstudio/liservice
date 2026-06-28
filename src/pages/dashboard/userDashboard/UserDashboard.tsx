import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../../utils/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logout, selectUser } from '../../../redux/features/auth/authSlice';
import { useGetPendingServiceByUserIdQuery } from '../../../redux/features/service/service.api';
import { useGetBalanceByUserIdQuery } from '../../../redux/features/balance/balance.api';
import UDBOverview    from './UDBOverview';
import UDBOrders      from './UDBOrders';
import UDBServices    from './UDBServices';
import UDBRecharge    from './UDBRecharge';
import UDBBalance     from './UDBBalance';
import ManageOrders   from '../adminDashboard/ManageOrders';
import ManageRecharge from '../adminDashboard/ManageRecharge';
import ManageUser     from '../adminDashboard/ManageUser';
import ManageService         from '../adminDashboard/ManageService';
import AddServices           from '../adminDashboard/AddServices';
import ManagePaymentMethods  from '../adminDashboard/ManagePaymentMethods';
import './user-dashboard.css';
import ThemeToggle from '../../../components/ThemeToggle';

/* ── types ─────────────────────────────────────────────── */
type UserView  = 'overview' | 'services' | 'orders' | 'recharge' | 'addBalance';
type AdminView = 'manageOrders' | 'manageRecharges' | 'manageUsers' | 'manageServices' | 'addService' | 'managePayments';
type View = UserView | AdminView;

/* ── Toast ─────────────────────────────────────────────── */
const Toast = ({ msg, type, onDone }: { msg: string; type: 'success' | 'error'; onDone: () => void }) => (
  <motion.div initial={{ opacity: 0, y: 28, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 28, scale: 0.9 }}
    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-3 py-3.5 px-5 rounded-[16px] text-sm font-medium border shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
    style={{
      background: type === 'success' ? 'linear-gradient(135deg,#0d2518,#091910)' : 'linear-gradient(135deg,#250d0d,#190909)',
      borderColor: type === 'success' ? 'rgba(52,217,126,0.35)' : 'rgba(244,103,122,0.35)',
      color: type === 'success' ? '#6ee7a8' : '#f4677a',
    }}
    onAnimationComplete={() => setTimeout(onDone, 2800)}>
    {type === 'success'
      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
    {msg}
  </motion.div>
);

/* ── icons ─────────────────────────────────────────────── */
const IcOverview = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const IcServices = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
  </svg>
);
const IcOrders = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const IcRecharge = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);
const IcAdd = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IcLogout = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IcMenu = ({ open }: { open: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    {open
      ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
      : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
  </svg>
);

const IcUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IcManageService = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);
const IcPayment = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const USER_NAV_ITEMS: { id: View; label: string; Icon: React.FC }[] = [
  { id: 'overview',   label: 'Overview',    Icon: IcOverview },
  { id: 'services',   label: 'Services',    Icon: IcServices },
  { id: 'orders',     label: 'My Orders',   Icon: IcOrders },
  { id: 'recharge',   label: 'Recharges',   Icon: IcRecharge },
  { id: 'addBalance', label: 'Add Balance', Icon: IcAdd },
];

const ADMIN_NAV_ITEMS: { id: View; label: string; Icon: React.FC }[] = [
  { id: 'manageOrders',    label: 'Manage Orders',    Icon: IcOrders },
  { id: 'manageRecharges', label: 'Manage Recharges', Icon: IcRecharge },
  { id: 'manageUsers',     label: 'Manage Users',     Icon: IcUsers },
  { id: 'manageServices',  label: 'Manage Services',  Icon: IcManageService },
  { id: 'addService',      label: 'Add Service',      Icon: IcAdd },
  { id: 'managePayments',  label: 'Payment Methods',  Icon: IcPayment },
];

const PAGE_TITLES: Record<View, string> = {
  overview:        'Overview',
  services:        'Browse Services',
  orders:          'My Orders',
  recharge:        'Recharge History',
  addBalance:      'Add Balance',
  manageOrders:    'Manage Orders',
  manageRecharges: 'Manage Recharges',
  manageUsers:     'Manage Users',
  manageServices:  'Manage Services',
  addService:      'Add Service',
  managePayments:  'Payment Methods',
};

/* ── Main shell ─────────────────────────────────────────── */
const UserDashboard = () => {
  const dispatch   = useAppDispatch();
  const user       = useAppSelector(selectUser);
  const isAdmin    = user?.role === 'admin';
  const location   = useLocation();
  const initialView = (location.state as { view?: View } | null)?.view ?? (isAdmin ? 'manageOrders' : 'overview');
  const [view, setView]           = useState<View>(initialView);
  const [sideOpen, setSideOpen]   = useState(false);
  const [toast, setToast]         = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const navItems = isAdmin ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  const { isDark } = useTheme();
  const theme = isDark ? 'dark' : 'light';

  const { data: ordersData }    = useGetPendingServiceByUserIdQuery(undefined, { skip: isAdmin });
  const { data: balanceData }   = useGetBalanceByUserIdQuery(undefined, { skip: isAdmin });

  const allOrders: any[]  = ordersData?.data  ?? [];
  const recharges: any[]  = balanceData?.data?.balanceRequest ?? [];
  const approvedBalance   = recharges.filter(r => r.status === 'approved').reduce((s: number, r: any) => s + (r.amount ?? 0), 0);
  const totalSpent        = allOrders.reduce((s: number, o: any) => s + (o.price ?? 0), 0);
  const accountBalance    = Math.max(0, approvedBalance - totalSpent);

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
  }, []);

  const navigate = (v: View) => { setView(v); setSideOpen(false); };

  const initials = (user?.name ?? 'U').split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className={`db-root${theme === 'light' ? ' light' : ''} min-h-screen flex bg-[var(--db-bg0)] text-[var(--db-t0)]`}>
      {/* ambient blobs */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="db-blob-a absolute w-[700px] h-[700px] rounded-full" />
        <div className="db-blob-b absolute w-[500px] h-[500px] rounded-full" />
        <div className="db-blob-c absolute w-[600px] h-[600px] rounded-full" />
      </div>

      {/* mobile overlay */}
      <AnimatePresence>
        {sideOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[4px] md:hidden"
            onClick={() => setSideOpen(false)} />
        )}
      </AnimatePresence>

      {/* ── Sidebar ─────────────────────────────────── */}
      <aside className={`db-sidebar${sideOpen ? ' open' : ''} fixed inset-y-0 left-0 z-40 w-[260px] flex flex-col border-r border-(--db-line)`} style={{ background: 'linear-gradient(180deg,var(--db-bg1) 0%,var(--db-bg0) 100%)' }}>
        {/* logo */}
        <div className="flex items-center gap-2.5 px-6 h-[70px] border-b border-(--db-line) shrink-0">
          <span className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[14px] font-bold text-[#06150d]"
            style={{ background: 'linear-gradient(155deg,#6ee7a8,#149656 60%,#2dd4cf)' }}>L</span>
          <span className="db-grad-text font-black text-[19px]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>liservice24</span>
        </div>

        {/* profile card */}
        <div className="mx-4 mt-4 mb-2 px-4 py-3.5 rounded-[16px] border border-(--db-line) bg-[rgba(255,255,255,0.025)]">
          <div className="flex items-center gap-3">
            {user?.photo ? (
              <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-[var(--db-g5)]" />
            ) : (
              <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-[#06150d] shrink-0"
                style={{ background: 'linear-gradient(155deg,#6ee7a8,#149656)' }}>{initials}</span>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="font-semibold text-[14.5px] text-[var(--db-t0)] truncate" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{user?.name ?? 'User'}</div>
                {isAdmin && <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-md text-[#06150d]" style={{ background: 'linear-gradient(90deg,#34d97e,#2dd4cf)' }}>ADMIN</span>}
              </div>
              <div className="text-[11.5px] text-(--db-t2) truncate">{user?.email ?? ''}</div>
            </div>
          </div>
          {!isAdmin && (
            <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-(--db-line)">
              <span className="text-[11.5px] text-(--db-t2)">Balance</span>
              <span className="font-bold text-[15px] text-[var(--db-g3)]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>${accountBalance.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <div className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-(--db-t2) px-3 mb-2 mt-2">{isAdmin ? 'Admin Controls' : 'Main Menu'}</div>
          {navItems.map(({ id, label, Icon }) => (
            <button key={id}
              onClick={() => navigate(id)}
              className={`db-nav-btn relative w-full flex items-center gap-3 px-3.5 py-3 rounded-xl mb-0.5 text-[14px] font-medium transition-[background,color] cursor-pointer ${view === id ? 'active text-[var(--db-g3)] bg-[rgba(52,217,126,0.1)]' : 'text-[var(--db-t1)] hover:bg-white/[0.045] hover:text-[var(--db-t0)]'}`}>
              <span className={`shrink-0 transition-colors ${view === id ? 'text-[var(--db-g3)]' : 'text-(--db-t2)'}`}><Icon /></span>
              {label}
            </button>
          ))}

          <div className="text-[10.5px] font-bold tracking-[0.12em] uppercase text-(--db-t2) px-3 mb-2 mt-4">Quick Links</div>
          <a href="/" className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl mb-0.5 text-[14px] font-medium text-[var(--db-t1)] hover:bg-white/[0.045] hover:text-[var(--db-t0)] transition-colors">
            <svg className="text-(--db-t2) shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Home
          </a>
        </nav>

        {/* bottom: theme + logout */}
        <div className="px-4 pb-5 pt-3 border-t border-(--db-line) shrink-0 space-y-2">
          <div 
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-[14px] font-medium text-[var(--db-t1)] border border-[var(--db-line2)] hover:bg-white/[0.04] transition-colors cursor-pointer">
          <span className="text-(--db-t2)">Theme</span>
           <ThemeToggle/>
          </div>
          <button onClick={() => dispatch(logout())}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[14px] font-medium text-[#f4677a] hover:bg-[rgba(244,103,122,0.08)] transition-colors cursor-pointer">
            <IcLogout />Logout
          </button>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen md:ml-[260px]">
        {/* top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between h-[70px] px-6 border-b border-(--db-line) [background:rgba(var(--db-bg0-raw,6,13,10),0.82)] backdrop-blur-[14px]">
          <div className="flex items-center gap-4">
            <button className="text-[var(--db-t1)] md:hidden cursor-pointer" onClick={() => setSideOpen(o => !o)}>
              <IcMenu open={sideOpen} />
            </button>
            <h1 className="font-bold text-[20px] tracking-[-0.01em] text-[var(--db-t0)]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              {PAGE_TITLES[view]}
            </h1>
          </div>
          {!isAdmin && (
            <button onClick={() => navigate('addBalance')}
              className="h-[38px] px-4 rounded-[10px] text-[13px] font-bold text-[#06150d] cursor-pointer [background:linear-gradient(90deg,#34d97e,#2dd4cf)]">
              + Add Balance
            </button>
          )}
        </header>

        {/* content */}
        <main className="flex-1 p-6 max-[480px]:p-4">
          <AnimatePresence mode="wait">
            <motion.div key={view} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28 }}>
              {view === 'overview'        && (
                <UDBOverview
                  orders={allOrders}
                  balance={accountBalance}
                  servicesTotal={0}
                  onViewOrders={() => navigate('orders')}
                  onAddBalance={() => navigate('addBalance')}
                />
              )}
              {view === 'services'        && <UDBServices onOrderSuccess={() => showToast('Order placed successfully!')} />}
              {view === 'orders'          && <UDBOrders />}
              {view === 'recharge'        && <UDBRecharge />}
              {view === 'addBalance'      && (
                <UDBBalance onSuccess={() => { showToast('Balance request submitted! Awaiting approval.'); navigate('recharge'); }} />
              )}
              {view === 'manageOrders'    && <ManageOrders />}
              {view === 'manageRecharges' && <ManageRecharge />}
              {view === 'manageUsers'     && <ManageUser />}
              {view === 'manageServices'  && <ManageService />}
              {view === 'addService'      && <AddServices />}
              {view === 'managePayments'  && <ManagePaymentMethods />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast key="toast" msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDashboard;
