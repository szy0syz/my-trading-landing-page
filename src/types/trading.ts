import type {
  AnnualSummary,
  DailyRecord,
  MonthlySummary,
  WeeklySummary,
} from 'react-trading-calendar';

export type { DailyRecord, WeeklySummary, MonthlySummary, AnnualSummary };

/** 单月交易记录明细与周汇总 */
export interface MonthData {
  dailyRecords: DailyRecord[];
  weeklySummaries: WeeklySummary[];
}

/** 日历区域完整数据 */
export interface CalendarData {
  annualSummary: AnnualSummary;
  monthlySummaries: MonthlySummary[];
  /** 按 "YYYY-MM" 检索的月度数据字典 */
  records: Record<string, MonthData>;
}

/** data.json 根数据结构（可扩展多端点） */
export interface AppData {
  calendar: CalendarData;
}
