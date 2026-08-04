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
  /** 按年份 "YYYY" 检索的年度汇总 */
  annualSummaries: Record<string, AnnualSummary>;
  /** 按年份 "YYYY" 检索的月度汇总数组 */
  monthlySummaries: Record<string, MonthlySummary[]>;
  /** 按 "YYYY-MM" 检索的月度数据字典 */
  records: Record<string, MonthData>;
}

export interface TradeDetail {
  orderTime: string;          // 格式化后的时间 "HH:mm:ss" (例如 "10:26:32")
  tradeDate: string;          // 格式化后的日期 "YYYY-MM-DD" (例如 "2026-07-01")
  buySell: 'BUY' | 'SELL';    // 买入 / 卖出
  openClose: 'O' | 'C';       // 开仓 'O' / 平仓 'C'
  quantity: number;           // 成交份数 (买入为正数如 1，卖出为负数如 -1)
  tradePrice: number;         // 成交单价
  fifoPnlRealized: number;    // 平仓已实现 FIFO 盈亏 (未平仓为 0)
}

export interface OptionTradeGroup {
  contractName: string;       // 期权合约名称 (例如 "JPM 02JUL26 335 C")
  trades: TradeDetail[];      // 该期权合约当天按时间排序的买卖成交明细数组
}

/** data.json 根数据结构（可扩展多端点） */
export interface AppData {
  calendar: CalendarData;
  dailyTrades?: Record<string, OptionTradeGroup[]>;
}

