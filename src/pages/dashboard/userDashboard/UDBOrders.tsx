import { motion } from 'framer-motion';
import { useGetPendingServiceByUserIdQuery } from '../../../redux/features/service/service.api';

const STATUS: Record<string, [string, string]> = {
  done:     ['#6ee7a8', 'Completed'],
  pending:  ['#f0c869', 'Pending'],
  rejected: ['#f4677a', 'Rejected'],
};

const COLS = ['#', 'Service', 'Qty', 'Amount', 'Status', 'Date'];

const UDBOrders = () => {
  const { data, isLoading } = useGetPendingServiceByUserIdQuery(undefined);
  const orders: any[] = data?.data ?? [];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="db-table-wrap rounded-[20px] overflow-hidden border border-[var(--db-line)] [background:linear-gradient(165deg,rgba(255,255,255,0.03),rgba(255,255,255,0.008))]">
        {isLoading ? (
          <div className="py-16 text-center text-[var(--db-t2)] text-sm">Loading orders…</div>
        ) : orders.length === 0 ? (
          <div className="py-[72px] text-center text-[var(--db-t2)]">
            <b className="block text-[19px] text-[var(--db-t1)] mb-2" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>No orders yet</b>
            Browse services and place your first order.
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {COLS.map((h, i) => (
                  <th key={h} className="text-[11px] tracking-[0.1em] uppercase font-semibold text-[var(--db-t2)] px-[22px] py-4 bg-white/[0.02] border-b border-[var(--db-line)]"
                    style={{ textAlign: i >= 3 ? 'right' : 'left' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o: any, i: number) => {
                const [color, label] = STATUS[o.status] ?? STATUS.pending;
                const border = i < orders.length - 1 ? '1px solid var(--db-line)' : 'none';
                return (
                  <tr key={o._id ?? i} className="hover:bg-white/[0.022] transition-colors">
                    <td className="px-[22px] py-4 text-sm text-[var(--db-t2)]" style={{ borderBottom: border, fontFamily: "'Space Grotesk',sans-serif" }}>
                      #{o._id?.slice(-4) ?? String(i + 1).padStart(4, '0')}
                    </td>
                    <td className="px-[22px] py-4 text-sm font-medium text-[var(--db-t0)] max-w-[380px]" style={{ borderBottom: border }}>
                      {o.serviceId?.name ?? 'Service'}
                      <small className="block text-[12px] text-[var(--db-t2)] font-normal mt-0.5">
                        {o.serviceId?.category ?? '—'}
                      </small>
                    </td>
                    <td className="px-[22px] py-4 text-sm text-[var(--db-t1)]" style={{ borderBottom: border }}>
                      {o.quantity?.toLocaleString() ?? '—'}
                    </td>
                    <td className="px-[22px] py-4 text-sm font-semibold text-[var(--db-t0)] text-right" style={{ borderBottom: border, fontFamily: "'Space Grotesk',sans-serif" }}>
                      ${(o.price ?? 0).toFixed(2)}
                    </td>
                    <td className="px-[22px] py-4" style={{ borderBottom: border }}>
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-[11px] py-[5px] rounded-full"
                        style={{ color, background: `${color}1e` }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
                        {label}
                      </span>
                    </td>
                    <td className="px-[22px] py-4 text-sm text-[var(--db-t1)] text-right" style={{ borderBottom: border }}>
                      {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
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

export default UDBOrders;
