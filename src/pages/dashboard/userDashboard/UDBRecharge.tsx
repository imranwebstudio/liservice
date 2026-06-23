import { motion } from 'framer-motion';
import { useGetBalanceByUserIdQuery } from '../../../redux/features/balance/balance.api';

const STATUS: Record<string, [string, string]> = {
  approved: ['#6ee7a8', 'Approved'],
  pending:  ['#f0c869', 'Pending'],
  rejected: ['#f4677a', 'Rejected'],
};

const METHOD_COLORS: Record<string, [string, string]> = {
  bkash:   ['#e2136e', 'b'],
  nagad:   ['#ec1c24', 'N'],
  'stc pay': ['#4f008c', 'S'],
  rocket:  ['#8f228c', 'R'],
};

const COLS = ['#', 'Method', 'Amount', 'Status', 'Date'];

const UDBRecharge = () => {
  const { data, isLoading } = useGetBalanceByUserIdQuery(undefined);
  const recharges: any[] = data?.data?.balanceRequest ?? [];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="db-table-wrap rounded-[20px] overflow-hidden border border-[var(--db-line)] [background:linear-gradient(165deg,rgba(255,255,255,0.03),rgba(255,255,255,0.008))]">
        {isLoading ? (
          <div className="py-16 text-center text-[var(--db-t2)] text-sm">Loading history…</div>
        ) : recharges.length === 0 ? (
          <div className="py-[72px] text-center text-[var(--db-t2)]">
            <b className="block text-[19px] text-[var(--db-t1)] mb-2" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>No recharges yet</b>
            Add balance to start ordering services.
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {COLS.map((h, i) => (
                  <th key={h} className="text-[11px] tracking-[0.1em] uppercase font-semibold text-[var(--db-t2)] px-[22px] py-4 bg-white/[0.02] border-b border-[var(--db-line)]"
                    style={{ textAlign: i >= 2 ? 'right' : 'left' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recharges.map((r: any, i: number) => {
                const [statusColor, statusLabel] = STATUS[r.status] ?? STATUS.pending;
                const mKey = (r.paymentMethod ?? '').toLowerCase();
                const [mc, mi] = METHOD_COLORS[mKey] ?? ['#34d97e', r.paymentMethod?.[0] ?? '?'];
                const border = i < recharges.length - 1 ? '1px solid var(--db-line)' : 'none';
                return (
                  <tr key={r._id ?? i} className="hover:bg-white/[0.022] transition-colors">
                    <td className="px-[22px] py-4 text-sm text-[var(--db-t2)]" style={{ borderBottom: border, fontFamily: "'Space Grotesk',sans-serif" }}>
                      #{r._id?.slice(-4) ?? String(i + 1).padStart(4, '0')}
                    </td>
                    <td className="px-[22px] py-4" style={{ borderBottom: border }}>
                      <span className="inline-flex items-center gap-2.5 text-sm font-medium text-[var(--db-t0)]">
                        <span className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0"
                          style={{ background: mc }}>
                          {mi}
                        </span>
                        {r.paymentMethod ?? '—'}
                      </span>
                    </td>
                    <td className="px-[22px] py-4 text-sm font-semibold text-[var(--db-t0)] text-right" style={{ borderBottom: border, fontFamily: "'Space Grotesk',sans-serif" }}>
                      ${(r.amount ?? 0).toFixed(2)}
                    </td>
                    <td className="px-[22px] py-4 text-right" style={{ borderBottom: border }}>
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-[11px] py-[5px] rounded-full"
                        style={{ color: statusColor, background: `${statusColor}1e` }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-[22px] py-4 text-sm text-[var(--db-t1)] text-right" style={{ borderBottom: border }}>
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default UDBRecharge;
