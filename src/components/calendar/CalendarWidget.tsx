import { Suspense, use, useState } from 'react';
import { TradingCalendar } from 'react-trading-calendar';

import type { AppData, DailyRecord, MonthData } from '../../types/trading';
import { DailyDetailModal } from './DailyDetailModal';

interface CalendarWidgetProps {
  dataPromise: Promise<AppData>;
}

const EMPTY_MONTH_DATA: MonthData = { dailyRecords: [], weeklySummaries: [] };

function CalendarWidgetInner({ dataPromise }: CalendarWidgetProps) {
  const appData = use(dataPromise);
  const { annualSummaries, monthlySummaries, records } = appData.calendar;
  const dailyTrades = appData.dailyTrades;

  const [{ year, month }, setDate] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() + 1 };
  });

  const [selectedRecord, setSelectedRecord] = useState<DailyRecord | null>(
    null,
  );

  const monthKey = `${year}-${String(month).padStart(2, '0')}`;
  const { dailyRecords, weeklySummaries } =
    records[monthKey] ?? EMPTY_MONTH_DATA;

  const handleMonthChange = (nextYear: number, nextMonth: number) => {
    const targetSummaries = monthlySummaries[nextYear] ?? [];
    const hasData = targetSummaries.some(
      (s) => s.month === nextMonth && s.pnl != null,
    );
    if (hasData) {
      setDate({ year: nextYear, month: nextMonth });
    }
  };

  const handleDateClick = (record: DailyRecord) => {
    setSelectedRecord(record);
  };

  const selectedTradeGroups = selectedRecord?.date
    ? dailyTrades?.[selectedRecord.date]
    : undefined;

  return (
    <>
      <TradingCalendar
        year={year}
        month={month}
        dailyRecords={dailyRecords}
        weeklySummaries={weeklySummaries}
        monthlySummaries={monthlySummaries[year] ?? []}
        annualSummary={annualSummaries[year]}
        theme="dark"
        colorScheme="greenUpRedDown"
        title="大飞的实盘交易记录"
        statusText="实时"
        sectionTitle="交易记录"
        currency="美元 (USD)"
        updateText="每日实时更新"
        onMonthChange={handleMonthChange}
        onDateClick={handleDateClick}
      />

      <DailyDetailModal
        record={selectedRecord}
        tradeGroups={selectedTradeGroups}
        onClose={() => setSelectedRecord(null)}
      />
    </>
  );
}

function CalendarWidgetSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-[#0b1322] h-130">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-800/80">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full bg-slate-700 animate-pulse"
            />
          ))}
        </div>
        <div className="mx-auto h-3.5 w-40 rounded bg-slate-800 animate-pulse" />
      </div>
      <div className="p-6 space-y-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 rounded bg-slate-800/60 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function CalendarWidget({ dataPromise }: CalendarWidgetProps) {
  return (
    <div className="relative z-10 w-full px-4">
      <div className="w-full max-w-4xl mx-auto drop-shadow-2xl">
        <Suspense fallback={<CalendarWidgetSkeleton />}>
          <CalendarWidgetInner dataPromise={dataPromise} />
        </Suspense>
      </div>
    </div>
  );
}
