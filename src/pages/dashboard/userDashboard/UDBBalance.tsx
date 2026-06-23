import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAddBalanceMutation } from '../../../redux/features/balance/balance.api';

const RATE = 137;
const FEE_RATE = 0.0185;

const METHODS = [
  { id: 'bKash',   color: '#e2136e', ic: 'b' },
  { id: 'STC Pay', color: '#4f008c', ic: 'S' },
  { id: 'Nagad',   color: '#ec1c24', ic: 'N' },
  { id: 'Rocket',  color: '#8f228c', ic: 'R' },
];

const BKASH_NUM  = '01618616066';
const STC_NUM    = '1279655644';
const NAGAD_NUM  = '01618616066';
const ROCKET_NUM = '01618616066';

function getSteps(method: string, totalTaka: number) {
  const num =
    method === 'bKash'   ? BKASH_NUM  :
    method === 'STC Pay' ? STC_NUM    :
    method === 'Nagad'   ? NAGAD_NUM  : ROCKET_NUM;

  if (method === 'bKash') return [
    { n: 1, text: <>Dial <b>*247#</b> or open the <b>bKash app</b>.</> },
    { n: 2, text: <>Tap <span className="text-[#f0c869] font-bold">"Send Money"</span>.</> },
    { n: 3, text: <>Enter receiver number <span className="text-[#f0c869] font-bold">{num}</span>.</> },
    { n: 4, text: <>Enter amount <span className="text-[#f0c869] font-bold">৳{totalTaka.toFixed(0)}</span>.</> },
    { n: 5, text: <>Enter your bKash PIN to confirm.</> },
    { n: 6, text: <>Paste your <span className="text-[#f0c869] font-bold">Transaction ID</span> below and tap Verify.</> },
  ];
  if (method === 'STC Pay') return [
    { n: 1, text: <>Open the <b>STC Pay app</b>.</> },
    { n: 2, text: <>Tap <span className="text-[#f0c869] font-bold">"Transfer"</span> → "To mobile number".</> },
    { n: 3, text: <>Enter number <span className="text-[#f0c869] font-bold">{num}</span>.</> },
    { n: 4, text: <>Enter amount and confirm with your PIN.</> },
    { n: 5, text: <>Paste your <span className="text-[#f0c869] font-bold">Transaction ID</span> below and tap Verify.</> },
  ];
  return [
    { n: 1, text: <>Open <b>{method}</b> and go to "Send Money".</> },
    { n: 2, text: <>Enter number <span className="text-[#f0c869] font-bold">{num}</span>.</> },
    { n: 3, text: <>Enter amount <span className="text-[#f0c869] font-bold">৳{totalTaka.toFixed(0)}</span>.</> },
    { n: 4, text: <>Paste your <span className="text-[#f0c869] font-bold">Transaction ID</span> below and tap Verify.</> },
  ];
}

interface Props { onSuccess: () => void; }

type Step = 'form' | 'payment';

const UDBBalance = ({ onSuccess }: Props) => {
  const [step, setStep] = useState<Step>('form');
  const [selMethod, setSelMethod] = useState<typeof METHODS[0] | null>(null);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [amount, setAmount]       = useState('');
  const [termsOk, setTermsOk]     = useState(false);
  const [txnId, setTxnId]         = useState('');
  const [addBalance, { isLoading }] = useAddBalanceMutation();

  const usd       = parseFloat(amount) || 0;
  const feeTaka   = usd * RATE * FEE_RATE;
  const totalTaka = usd * RATE + feeTaka;
  const canPay    = usd > 0 && termsOk && !!selMethod;
  const canVerify = txnId.trim().length >= 6;

  const submit = async () => {
    if (!canVerify || !selMethod) return;
    try {
      await addBalance({
        amount: usd,
        paidTaka: Math.round(totalTaka),
        paymentMethod: selMethod.id,
        reference: txnId.trim(),
      }).unwrap();
      onSuccess();
    } catch { /* toast handled in parent */ }
  };

  const panelCls = "rounded-[20px] border border-[var(--db-line)] p-6 db-panel [background:linear-gradient(165deg,rgba(255,255,255,0.038),rgba(255,255,255,0.01))]";
  const inputCls = "w-full h-[52px] px-[18px] rounded-[13px] border border-[var(--db-line2)] bg-[var(--db-input)] text-[var(--db-t0)] text-[15px] outline-none transition-[border-color,box-shadow] focus:border-[var(--db-g5)] focus:shadow-[0_0_0_4px_rgba(31,191,108,0.12)]";
  const labelCls = "block text-[13px] font-medium text-[var(--db-t1)] mb-2";

  /* ── PAYMENT VIEW ─────────────────────────────── */
  if (step === 'payment' && selMethod) {
    const steps = getSteps(selMethod.id, totalTaka);
    const borderColor = selMethod.id === 'bKash' ? 'rgba(226,0,116,0.4)' : 'rgba(31,191,108,0.35)';
    const bgColor     = selMethod.id === 'bKash' ? 'rgba(226,0,116,0.07)' : 'rgba(31,191,108,0.05)';
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="max-w-[560px] mx-auto">
        {/* back */}
        <button onClick={() => setStep('form')}
          className="inline-flex items-center gap-2 text-sm text-[var(--db-t1)] mb-6 hover:text-[var(--db-g3)] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Back to Add Balance
        </button>

        {/* merchant header */}
        <div className="flex items-center gap-3.5 px-5 py-[18px] mb-[18px] rounded-[18px] border border-[var(--db-line)] [background:linear-gradient(165deg,rgba(255,255,255,0.04),rgba(255,255,255,0.012))]">
          <div className="w-12 h-12 rounded-full bg-[#06120c] border border-[var(--db-line2)] flex items-center justify-center">
            <span className="w-8 h-8 rounded-[8px] flex items-center justify-center text-sm font-bold text-[#06150d]"
              style={{ background: 'linear-gradient(155deg,#6ee7a8,#149656 60%,#2dd4cf)' }}>L</span>
          </div>
          <div>
            <div className="font-semibold text-[var(--db-t0)]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>liservice24.com</div>
            <div className="text-[12.5px] text-[var(--db-t2)]">Official payment portal</div>
          </div>
          <div className="ml-auto font-bold text-[26px] text-[var(--db-g4)]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
            ${usd.toFixed(usd % 1 ? 2 : 0)}
          </div>
        </div>

        {/* method tabs */}
        <div className="flex gap-2.5 mb-[18px]">
          {METHODS.slice(0, 2).map(m => (
            <button key={m.id}
              onClick={() => setSelMethod(m)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[13px] border text-sm font-semibold transition-[border-color,background,color] ${selMethod.id === m.id ? 'text-[var(--db-t0)] border-[var(--db-g5)] bg-[rgba(31,191,108,0.08)]' : 'text-[var(--db-t1)] border-[var(--db-line2)] bg-[var(--db-input)]'}`}>
              <span className="w-6 h-6 rounded-[6px] flex items-center justify-center text-[13px] font-bold text-white" style={{ background: m.color }}>{m.ic}</span>
              {m.id}
            </button>
          ))}
        </div>

        {/* steps */}
        <div className="rounded-[18px] px-[22px] mb-[18px]" style={{ border: `1px solid ${borderColor}`, background: bgColor }}>
          {steps.map((s, i) => (
            <div key={s.n} className={`flex gap-3 py-3.5 text-sm leading-[1.55] text-[var(--db-t1)] ${i < steps.length - 1 ? 'border-b border-white/[0.07]' : ''}`}>
              <span className="w-6 h-6 rounded-full bg-white/[0.08] flex items-center justify-center text-[12px] font-bold text-[var(--db-t0)] flex-shrink-0"
                style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{s.n}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>

        {/* txn id */}
        <div className="mb-[18px]">
          <label className={labelCls}>Enter Transaction ID</label>
          <input className={inputCls} type="text" placeholder="e.g. 9F2K7XQ1ZP"
            value={txnId} onChange={e => setTxnId(e.target.value)} />
        </div>

        {/* verify button */}
        <button
          disabled={!canVerify || isLoading}
          onClick={submit}
          className="w-full h-[50px] flex items-center justify-between px-6 rounded-[12px] border border-black/[0.12] text-white font-bold text-[15px] cursor-pointer relative overflow-hidden [background:linear-gradient(90deg,#188A50,#06B913)] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
          <span className="relative z-[1]">{isLoading ? 'Verifying…' : 'Verify Payment'}</span>
          <span className="relative z-[1] w-[38px] h-[38px] rounded-[8px] bg-white flex items-center justify-center ml-4 flex-shrink-0">
            <svg viewBox="0 0 22 18" fill="none" className="w-[19px] h-[15px]">
              {[1.83,5.16,8.50,11.83,15.17,20.17,17.67,15.17,17.67,15.17,12.67,12.67].map((cx,i) => {
                const cys = [8.75,8.75,8.75,8.75,8.75,8.75,6.25,3.75,11.25,13.75,16.25,1.25];
                return <circle key={i} cx={cx} cy={cys[i]} r="1.25" fill="#06B913" />;
              })}
            </svg>
          </span>
        </button>
      </motion.div>
    );
  }

  /* ── FORM VIEW ────────────────────────────────── */
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="grid grid-cols-[1.3fr_1fr] max-[1180px]:grid-cols-1 gap-6 items-start">

      {/* Left: form */}
      <div className={panelCls}>
        {/* method select */}
        <div className="mb-5">
          <label className={labelCls}>Payment Method</label>
          <div className="relative">
            <button onClick={() => setMenuOpen(o => !o)}
              className={`${inputCls} flex items-center justify-between cursor-pointer ${!selMethod ? 'text-[var(--db-t2)]' : ''}`}>
              {selMethod ? (
                <span className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-[6px] flex items-center justify-center text-[13px] font-bold text-white" style={{ background: selMethod.color }}>{selMethod.ic}</span>
                  {selMethod.id}
                </span>
              ) : 'Pick your payment method'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`text-[var(--db-t2)] transition-transform ${menuOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                  className="absolute top-[calc(100%+8px)] left-0 right-0 z-20 bg-[#0e1813] border border-[var(--db-line2)] rounded-[13px] p-1.5 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)]">
                  {METHODS.map(m => (
                    <button key={m.id} onClick={() => { setSelMethod(m); setMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[9px] text-sm text-[var(--db-t1)] hover:bg-[rgba(52,217,126,0.1)] hover:text-[var(--db-t0)] transition-colors">
                      <span className="w-6 h-6 rounded-[6px] flex items-center justify-center text-[13px] font-bold text-white" style={{ background: m.color }}>{m.ic}</span>
                      {m.id}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* amount */}
        <div className="mb-5">
          <label className={labelCls}>Dollar Amount</label>
          <input className={inputCls} type="number" placeholder="Enter amount in Dollar $"
            min="0" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>

        {/* fee */}
        <div className="mb-5">
          <label className={labelCls}>Extra Fee (1.85%)</label>
          <input className={`${inputCls} text-[var(--db-t2)] cursor-not-allowed`} disabled
            value={usd > 0 ? `৳ ${feeTaka.toFixed(2)}` : 'NO EXTRA FEE'} readOnly />
        </div>

        {/* total */}
        <div className="mb-5">
          <label className={labelCls}>Total Price in Taka</label>
          <input className={`${inputCls} text-[var(--db-g3)] font-bold text-[18px] cursor-not-allowed`} disabled
            style={{ fontFamily: "'Space Grotesk',sans-serif" }}
            value={`৳ ${totalTaka.toFixed(2)}`} readOnly />
        </div>

        {/* terms */}
        <div className={`db-check-row flex items-center gap-3 mb-6 cursor-pointer select-none ${termsOk ? 'checked' : ''}`}
          onClick={() => setTermsOk(t => !t)}>
          <span className="db-check-box w-[22px] h-[22px] rounded-[7px] border border-[var(--db-line2)] flex-shrink-0 flex items-center justify-center transition-[background,border-color]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06150d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </span>
          <span className="text-[13.5px] text-[var(--db-t1)]">Accept the <a href="#" className="text-[var(--db-g3)]" onClick={e => e.stopPropagation()}>terms and conditions</a></span>
        </div>

        {/* go to payment */}
        <button disabled={!canPay}
          onClick={() => setStep('payment')}
          className="w-full h-[50px] flex items-center justify-between px-6 rounded-[12px] border border-black/[0.12] text-white font-bold text-[15px] cursor-pointer relative overflow-hidden [background:linear-gradient(90deg,#188A50,#06B913)] disabled:opacity-50 disabled:cursor-not-allowed">
          <span className="relative z-[1]">Go to Payment</span>
          <span className="relative z-[1] w-[38px] h-[38px] rounded-[8px] bg-white flex items-center justify-center ml-4 flex-shrink-0">
            <svg viewBox="0 0 22 18" fill="none" className="w-[19px] h-[15px]">
              {[1.83,5.16,8.50,11.83,15.17,20.17,17.67,15.17,17.67,15.17,12.67,12.67].map((cx,i) => {
                const cys = [8.75,8.75,8.75,8.75,8.75,8.75,6.25,3.75,11.25,13.75,16.25,1.25];
                return <circle key={i} cx={cx} cy={cys[i]} r="1.25" fill="#06B913" />;
              })}
            </svg>
          </span>
        </button>
      </div>

      {/* Right: summary */}
      <div className={`${panelCls} sticky top-6`}>
        <h3 className="font-semibold text-[17px] text-[var(--db-t0)] mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Order Summary</h3>
        <p className="text-[13px] text-[var(--db-t2)] mb-3.5">Live breakdown of your top-up.</p>
        {[
          ['Dollar amount', `$${usd.toFixed(2)}`],
          ['Conversion rate', '৳ 137.00 / $1'],
          ['Extra fee (1.85%)', `৳ ${feeTaka.toFixed(2)}`],
        ].map(([label, val]) => (
          <div key={label} className="flex items-center justify-between py-3 border-b border-[var(--db-line)] text-sm text-[var(--db-t1)]">
            <span>{label}</span>
            <b className="text-[var(--db-t0)]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{val}</b>
          </div>
        ))}
        <div className="flex items-baseline justify-between mt-2 pt-4 border-t border-dashed border-[var(--db-line2)]">
          <span className="text-sm text-[var(--db-t1)]">Total payable</span>
          <b className="text-[30px] font-bold db-grad-text" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>৳ {totalTaka.toFixed(2)}</b>
        </div>
        <div className="flex gap-2.5 mt-[18px] p-3 rounded-[12px] bg-[rgba(45,212,207,0.06)] border border-[rgba(45,212,207,0.18)] text-[12.5px] text-[var(--db-t1)] leading-[1.5]">
          <svg className="text-[var(--db-teal)] flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
          <span>Balance is added after transaction is verified. Most top-ups confirm within 2–5 minutes.</span>
        </div>
      </div>
    </motion.div>
  );
};

export default UDBBalance;
