import type { DailyRecord } from '../../types/trading';
import { Modal } from '../common/Modal';

interface DailyDetailModalProps {
  record: DailyRecord | null;
  onClose: () => void;
}

export function DailyDetailModal({ record, onClose }: DailyDetailModalProps) {
  return (
    <Modal isOpen={Boolean(record)} onClose={onClose} maxWidth="max-w-md">
      <Modal.Body>
        <div className="space-y-3 text-slate-300">
          <div className="flex items-center justify-between text-sm border-b border-slate-800 pb-2">
            <span className="text-slate-400">日期</span>
            <span className="font-mono text-slate-100 font-medium">
              {record?.date}
            </span>
          </div>
          {record?.pnl != null && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">当日盈亏</span>
              <span
                className={`font-mono font-bold ${
                  record.pnl > 0
                    ? 'text-emerald-400'
                    : record.pnl < 0
                      ? 'text-rose-400'
                      : 'text-slate-400'
                }`}
              >
                {record.pnl > 0 ? '+' : ''}
                {record.pnl.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
            </div>
          )}
          {record?.note && (
            <div className="text-xs text-slate-400 border-t border-slate-800/80 pt-2.5">
              <span className="text-slate-500 block mb-1">备注说明：</span>
              <p className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800">
                {record.note}
              </p>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
