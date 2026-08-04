import type { DailyRecord, OptionTradeGroup } from '../../types/trading';
import { Modal } from '../common/Modal';

interface DailyDetailModalProps {
  record: DailyRecord | null;
  tradeGroups?: OptionTradeGroup[];
  onClose: () => void;
}

function formatCurrency(val: number, showSign = false) {
  if (Math.abs(val) < 0.001) return '$0.00';
  const formatted = Math.abs(val).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (val > 0) return showSign ? `+${formatted}` : formatted;
  if (val < 0) return `-${formatted}`;
  return formatted;
}

function parseContractName(name: string) {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    const symbol = parts[0];
    const details = parts.slice(1).join(' ');
    return { symbol, details };
  }
  return { symbol: name, details: '' };
}

export function DailyDetailModal({
  record,
  tradeGroups,
  onClose,
}: DailyDetailModalProps) {
  const totalTradesCount = tradeGroups
    ? tradeGroups.reduce((acc, g) => acc + g.trades.length, 0)
    : 0;

  return (
    <Modal isOpen={Boolean(record)} onClose={onClose} maxWidth="max-w-lg">
      <Modal.Body>
        <div className="space-y-4 text-slate-300">
          {/* Header section: Date & Day PnL */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                交易日
              </div>
              <div className="font-mono text-xl font-bold text-slate-100 mt-0.5">
                {record?.date}
              </div>
              {tradeGroups && tradeGroups.length > 0 && (
                <div className="text-xs text-slate-400 mt-1">
                  {tradeGroups.length} 个期权合约 · 共 {totalTradesCount} 笔成交
                </div>
              )}
            </div>

            {record?.pnl != null && (
              <div className="text-right">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-0.5">
                  当日盈亏
                </div>
                <span
                  className={`inline-block font-mono text-lg font-bold px-2.5 py-0.5 rounded-lg border ${
                    record.pnl > 0
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : record.pnl < 0
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {formatCurrency(record.pnl, true)}
                </span>
              </div>
            )}
          </div>

          {/* Note section if present */}
          {record?.note && (
            <div className="text-xs text-slate-400 bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
              <span className="text-slate-500 font-medium block mb-1">
                备注说明：
              </span>
              <p className="text-slate-300 leading-relaxed">{record.note}</p>
            </div>
          )}

          {/* Intraday trades section */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2.5">
              <span>日内期权成交明细</span>
            </div>

            {tradeGroups && tradeGroups.length > 0 ? (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {tradeGroups.map((group) => {
                  const { symbol, details } = parseContractName(
                    group.contractName
                  );
                  const groupTotalPnl = group.trades.reduce(
                    (sum, t) => sum + (t.fifoPnlRealized || 0),
                    0
                  );

                  return (
                    <div
                      key={group.contractName}
                      className="bg-slate-900/80 rounded-xl border border-slate-800/80 overflow-hidden"
                    >
                      {/* Group Header */}
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-800/40 border-b border-slate-800/60">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-100 font-mono text-sm bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                            {symbol}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {details}
                          </span>
                        </div>
                        {groupTotalPnl !== 0 && (
                          <div className="text-xs font-mono font-semibold">
                            <span
                              className={
                                groupTotalPnl > 0
                                  ? 'text-emerald-400'
                                  : 'text-rose-400'
                              }
                            >
                              {formatCurrency(groupTotalPnl, true)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Trade executions list */}
                      <div className="divide-y divide-slate-800/40">
                        {group.trades.map((trade, tIdx) => {
                          const isBuy = trade.buySell === 'BUY';
                          const isOpen = trade.openClose === 'O';
                          const qty = Math.abs(trade.quantity);

                          return (
                            <div
                              key={`${trade.orderTime}-${tIdx}`}
                              className="flex items-center justify-between px-3.5 py-2 text-xs"
                            >
                              {/* Left: Time & Direction/Action Tag */}
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-slate-400">
                                  {trade.orderTime}
                                </span>
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                                    isBuy
                                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                      : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                                  }`}
                                >
                                  {trade.buySell}
                                </span>
                              </div>

                              {/* Middle & Right: Qty/Price & Realized PnL */}
                              <div className="flex items-center gap-4">
                                <div className="text-right font-mono">
                                  <span className="text-slate-200">
                                    {qty} 张
                                  </span>
                                  <span className="text-slate-500 mx-1">@</span>
                                  <span className="text-slate-300">
                                    ${trade.tradePrice.toFixed(2)}
                                  </span>
                                </div>

                                <div className="w-20 text-right font-mono font-semibold">
                                  {isOpen && trade.fifoPnlRealized === 0 ? (
                                    <span className="text-slate-500">--</span>
                                  ) : (
                                    <span
                                      className={
                                        trade.fifoPnlRealized > 0
                                          ? 'text-emerald-400'
                                          : trade.fifoPnlRealized < 0
                                            ? 'text-rose-400'
                                            : 'text-slate-400'
                                      }
                                    >
                                      {formatCurrency(
                                        trade.fifoPnlRealized,
                                        true
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800/60 border-dashed">
                无日内期权成交明细
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
