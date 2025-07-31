import { YearMonth } from '../types/year-month.type';

export function isBeforeCurrentPeriod(period: YearMonth) {
  const now = new Date();
  const periodDate = new Date(period);
  const nowYearMonth = now.getFullYear() * 100 + now.getMonth() + 1;
  const periodYearMonth =
    periodDate.getFullYear() * 100 + periodDate.getMonth() + 1;

  return periodYearMonth < nowYearMonth;
}
