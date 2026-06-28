import { useState } from "react";
import { motion } from "framer-motion";
import { useAddBalanceMutation } from "../../../redux/features/balance/balance.api";
import {
  useGetPaymentConfigQuery,
  useGetPaymentMethodsQuery,
} from "../../../redux/features/payment/paymentMethod.api";
import Loading from "../../../utils/Loading";

interface PayMethod {
  _id: string;
  name: string;
  color: string;
  iconUrl?: string;
  qrCode?: string;
  number: string;
  steps: string[];
}

function MethodIcon({ m, size = 24 }: { m: PayMethod; size?: number }) {
  const isUrl =
    m.iconUrl &&
    (m.iconUrl.startsWith("http") ||
      m.iconUrl.startsWith("/") ||
      m.iconUrl.startsWith("data:"));
  if (isUrl) {
    return (
      <span
        className="rounded-md overflow-hidden flex items-center justify-center shrink-0"
        style={{ width: size, height: size, background: m.color }}
      >
        <img
          src={m.iconUrl}
          alt={m.name}
          style={{ width: size, height: size, objectFit: "contain" }}
        />
      </span>
    );
  }
  return (
    <span
      className="rounded-md flex items-center justify-center text-[13px] font-bold text-white shrink-0"
      style={{ width: size, height: size, background: m.color }}
    >
      {m.name?.charAt(0)?.toUpperCase() ?? "?"}
    </span>
  );
}

function buildSteps(method: PayMethod, totalTaka: number) {
  return method.steps.map((s, i) => ({
    n: i + 1,
    text: s
      .replace(/\{number\}/g, method.number)
      .replace(/\{amount\}/g, `৳${totalTaka.toFixed(0)}`),
  }));
}

interface Props {
  onSuccess: () => void;
}
type Step = "form" | "payment";

const UDBBalance = ({ onSuccess }: Props) => {
  const [step, setStep] = useState<Step>("form");
  const [selMethod, setSelMethod] = useState<PayMethod | null>(null);
  const [amount, setAmount] = useState("");
  const [termsOk, setTermsOk] = useState(false);
  const [txnId, setTxnId] = useState("");

  const { data: methodsData, isLoading: loadingMethods } =
    useGetPaymentMethodsQuery(undefined);
  const { data: configData, isLoading: loadingConfig } =
    useGetPaymentConfigQuery(undefined);
  const [addBalance, { isLoading }] = useAddBalanceMutation();

  const methods: PayMethod[] = methodsData?.data ?? [];
  const RATE = configData?.data?.rate ?? 137;
  const FEE_RATE = configData?.data?.feeRate ?? 0.0185;

  const usd = parseFloat(amount) || 0;
  const feeTaka = usd * RATE * FEE_RATE;
  const totalTaka = usd * RATE + feeTaka;
  const canPay = usd > 0 && termsOk;
  const canVerify = !!selMethod && txnId.trim().length >= 6;

  const goToPayment = () => {
    if (!selMethod && methods.length > 0) setSelMethod(methods[0]);
    setStep("payment");
  };

  const submit = async () => {
    if (!canVerify || !selMethod) return;
    try {
      await addBalance({
        amount: usd,
        paidTaka: Math.round(totalTaka),
        paymentMethod: selMethod.name,
        reference: txnId.trim(),
      }).unwrap();
      onSuccess();
    } catch {
      /* toast handled in parent */
    }
  };

  const panelCls =
    "rounded-[20px] border border-(--db-line) p-6 db-panel [background:linear-gradient(165deg,rgba(255,255,255,0.038),rgba(255,255,255,0.01))]";
  const inputCls =
    "w-full h-13 px-4.5 rounded-[13px] border border-(--db-line2) bg-(--db-input) text-(--db-t0) text-[15px] outline-none transition-[border-color,box-shadow] focus:border-(--db-g5) focus:shadow-[0_0_0_4px_rgba(31,191,108,0.12)]";
  const labelCls = "block text-[13px] font-medium text-(--db-t1) mb-2";

  if (loadingMethods || loadingConfig) return <Loading />;

  /* ── PAYMENT VIEW ─────────────────────────────── */
  if (step === "payment") {
    const active = selMethod ?? methods[0] ?? null;
    const steps = active ? buildSteps(active, totalTaka) : [];
    const borderColor = active ? `${active.color}55` : "rgba(31,191,108,0.35)";
    const bgColor = active ? `${active.color}12` : "rgba(31,191,108,0.05)";

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[560px] mx-auto"
      >
        {/* back */}
        <button
          onClick={() => setStep("form")}
          className="inline-flex items-center gap-2 text-sm text-(--db-t1) mb-6 hover:text-(--db-g3) transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Add Balance
        </button>

        {/* merchant header */}
        <div className="flex items-center gap-3.5 px-5 py-[18px] mb-4.5 rounded-[18px] border border-(--db-line) [background:linear-gradient(165deg,rgba(255,255,255,0.04),rgba(255,255,255,0.012))]">
          <div className="w-12 h-12 rounded-full bg-[#06120c] border border-(--db-line2) flex items-center justify-center">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-[#06150d]"
              style={{
                background:
                  "linear-gradient(155deg,#6ee7a8,#149656 60%,#2dd4cf)",
              }}
            >
              L
            </span>
          </div>
          <div>
            <div
              className="font-semibold text-(--db-t0)"
              style={{ fontFamily: "'Space Grotesk',sans-serif" }}
            >
              liservice24.com
            </div>
            <div className="text-[12.5px] text-(--db-t2)">
              Official payment portal
            </div>
          </div>
          <div
            className="ml-auto font-bold text-[26px] text-(--db-g4)"
            style={{ fontFamily: "'Space Grotesk',sans-serif" }}
          >
            ${usd.toFixed(usd % 1 ? 2 : 0)}
          </div>
        </div>

        {/* method tabs */}
        {methods.length > 1 && (
          <div className="flex gap-2.5 mb-4.5 flex-wrap">
            {methods.map((m) => (
              <button
                key={m._id}
                onClick={() => setSelMethod(m)}
                className={`flex-1 min-w-27.5 flex items-center justify-center gap-2 py-3 rounded-[13px] border text-sm font-semibold transition-[border-color,background,color] ${active?._id === m._id ? "text-(--db-t0) border-(--db-g5) bg-[rgba(31,191,108,0.08)]" : "text-(--db-t1) border-(--db-line2) bg-(--db-input)"}`}
              >
                <MethodIcon m={m} size={24} />
                {m.name}
              </button>
            ))}
          </div>
        )}

        {/* QR code */}
        {active?.qrCode && (
          <div className="mb-4.5 flex flex-col items-center gap-2">
            <p className="text-[13px] text-(--db-t2) self-start">
              Scan QR to pay
            </p>
            <img
              src={active.qrCode}
              alt={`${active.name} QR`}
              className="w-44 h-44 rounded-xl border border-(--db-line2) object-contain bg-white p-2"
            />
          </div>
        )}
        {/* steps */}
        {active && (
          <div
            className="rounded-[18px] px-5.5 mb-4.5"
            style={{ border: `1px solid ${borderColor}`, background: bgColor }}
          >
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`flex gap-3 py-3.5 text-sm leading-[1.55] text-(--db-t1) ${i < steps.length - 1 ? "border-b border-white/7" : ""}`}
              >
                <span
                  className="w-6 h-6 rounded-full bg-white/8 flex items-center justify-center text-[12px] font-bold text-(--db-t0) shrink-0"
                  style={{ fontFamily: "'Space Grotesk',sans-serif" }}
                >
                  {s.n}
                </span>
                <span>{s.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* txn id */}
        <div className="mb-4.5">
          <label className={labelCls}>Enter Transaction ID</label>
          <input
            className={inputCls}
            type="text"
            placeholder="e.g. 9F2K7XQ1ZP"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
          />
        </div>

        {/* verify button */}
        <button
          disabled={!canVerify || isLoading}
          onClick={submit}
          className="w-full h-12.5 flex items-center justify-between px-6 rounded-xl border border-black/12 text-white font-bold text-[15px] cursor-pointer relative overflow-hidden [background:linear-gradient(90deg,#188A50,#06B913)] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <span className="relative z-1">
            {isLoading ? "Verifying…" : "Verify Payment"}
          </span>
          <span className="relative z-1 w-9.5 h-9.5 rounded-lg bg-white flex items-center justify-center ml-4 shrink-0">
            <svg viewBox="0 0 22 18" fill="none" className="w-4.75 h-3.75">
              {[
                1.83, 5.16, 8.5, 11.83, 15.17, 20.17, 17.67, 15.17, 17.67,
                15.17, 12.67, 12.67,
              ].map((cx, i) => {
                const cys = [
                  8.75, 8.75, 8.75, 8.75, 8.75, 8.75, 6.25, 3.75, 11.25, 13.75,
                  16.25, 1.25,
                ];
                return (
                  <circle key={i} cx={cx} cy={cys[i]} r="1.25" fill="#06B913" />
                );
              })}
            </svg>
          </span>
        </button>
      </motion.div>
    );
  }

  /* ── FORM VIEW ────────────────────────────────── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-[1.3fr_1fr] max-[1180px]:grid-cols-1 gap-6 items-start"
    >
      {/* Left: form */}
      <div className={panelCls}>
        {/* amount */}
        <div className="mb-5">
          <label className={labelCls}>Dollar Amount</label>
          <input
            className={inputCls}
            type="number"
            placeholder="Enter amount in Dollar $"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* fee */}
        <div className="mb-5">
          <label className={labelCls}>
            Extra Fee ({(FEE_RATE * 100).toFixed(2)}%)
          </label>
          <input
            className={`${inputCls} text-(--db-t2) cursor-not-allowed`}
            disabled
            value={usd > 0 ? `৳ ${feeTaka.toFixed(2)}` : "NO EXTRA FEE"}
            readOnly
          />
        </div>

        {/* total */}
        <div className="mb-5">
          <label className={labelCls}>Total Price in Taka</label>
          <input
            className={`${inputCls} text-(--db-g3) font-bold text-[18px] cursor-not-allowed`}
            disabled
            style={{ fontFamily: "'Space Grotesk',sans-serif" }}
            value={`৳ ${totalTaka.toFixed(2)}`}
            readOnly
          />
        </div>

        {/* terms */}
        <div
          className={`db-check-row flex items-center gap-3 mb-6 cursor-pointer select-none ${termsOk ? "checked" : ""}`}
          onClick={() => setTermsOk((t) => !t)}
        >
          <span className="db-check-box w-5.5 h-5.5 rounded-[7px] border border-(--db-line2) shrink-0 flex items-center justify-center transition-[background,border-color]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#06150d"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="text-[13.5px] text-(--db-t1)">
            Accept the{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--db-g3) underline underline-offset-2"
              onClick={(e) => e.stopPropagation()}
            >
              terms and conditions
            </a>
          </span>
        </div>

        <button
          disabled={!canPay}
          onClick={goToPayment}
          className="w-full h-12.5 flex items-center justify-between px-6 rounded-xl border border-black/12 text-white font-bold text-[15px] cursor-pointer relative overflow-hidden [background:linear-gradient(90deg,#188A50,#06B913)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-1">Go to Payment</span>
          <span className="relative z-1 w-9.5 h-9.5 rounded-lg bg-white flex items-center justify-center ml-4 shrink-0">
            <svg viewBox="0 0 22 18" fill="none" className="w-4.75 h-3.75">
              {[
                1.83, 5.16, 8.5, 11.83, 15.17, 20.17, 17.67, 15.17, 17.67,
                15.17, 12.67, 12.67,
              ].map((cx, i) => {
                const cys = [
                  8.75, 8.75, 8.75, 8.75, 8.75, 8.75, 6.25, 3.75, 11.25, 13.75,
                  16.25, 1.25,
                ];
                return (
                  <circle key={i} cx={cx} cy={cys[i]} r="1.25" fill="#06B913" />
                );
              })}
            </svg>
          </span>
        </button>
      </div>

      {/* Right: summary */}
      <div className={`${panelCls} sticky top-6`}>
        <h3
          className="font-semibold text-[17px] text-(--db-t0) mb-1"
          style={{ fontFamily: "'Space Grotesk',sans-serif" }}
        >
          Order Summary
        </h3>
        <p className="text-[13px] text-(--db-t2) mb-3.5">
          Live breakdown of your top-up.
        </p>
        {[
          ["Dollar amount", `$${usd.toFixed(2)}`],
          ["Conversion rate", `৳ ${RATE.toFixed(2)} / $1`],
          [
            `Extra fee (${(FEE_RATE * 100).toFixed(2)}%)`,
            `৳ ${feeTaka.toFixed(2)}`,
          ],
        ].map(([label, val]) => (
          <div
            key={label}
            className="flex items-center justify-between py-3 border-b border-(--db-line) text-sm text-(--db-t1)"
          >
            <span>{label}</span>
            <b
              className="text-(--db-t0)"
              style={{ fontFamily: "'Space Grotesk',sans-serif" }}
            >
              {val}
            </b>
          </div>
        ))}
        <div className="flex items-baseline justify-between mt-2 pt-4 border-t border-dashed border-(--db-line2)">
          <span className="text-sm text-(--db-t1)">Total payable</span>
          <b
            className="text-[30px] font-bold db-grad-text"
            style={{ fontFamily: "'Space Grotesk',sans-serif" }}
          >
            ৳ {totalTaka.toFixed(2)}
          </b>
        </div>
        <div className="flex gap-2.5 mt-4.5 p-3 rounded-xl bg-[rgba(45,212,207,0.06)] border border-[rgba(45,212,207,0.18)] text-[12.5px] text-(--db-t1) leading-normal">
          <svg
            className="text-(--db-teal) shrink-0 mt-0.5"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>
            Balance is added after transaction is verified. Most top-ups confirm
            within 2–5 minutes.
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default UDBBalance;
