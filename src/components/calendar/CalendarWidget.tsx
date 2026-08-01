import { Suspense, use, useState } from 'react';
import { TradingCalendar } from 'react-trading-calendar';

import type { AppData } from '../../types/trading';

interface CalendarWidgetProps {
  dataPromise: Promise<AppData>;
}

function CalendarWidgetInner({ dataPromise }: CalendarWidgetProps) {
  const data = use(dataPromise);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const monthKey = `${year}-${String(month).padStart(2, '0')}`;
  const monthData = data.calendar.records[monthKey] ?? {
    dailyRecords: [],
    weeklySummaries: [],
  };

  return (
    <TradingCalendar
      year={year}
      month={month}
      dailyRecords={monthData.dailyRecords}
      weeklySummaries={monthData.weeklySummaries}
      monthlySummaries={data.calendar.monthlySummaries}
      annualSummary={data.calendar.annualSummary}
      theme="dark"
      colorScheme="greenUpRedDown"
      title="大飞的实盘交易记录"
      statusText="实时"
      sectionTitle="交易记录"
      currency="美元 (USD)"
      updateText="每日实时更新"
      onMonthChange={(y, m) => {
        setYear(y);
        setMonth(m);
      }}
    />
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
