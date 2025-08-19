import { Period, PeriodString } from 'src/shared/value-objects/period.vo';

export class NotCurrentPeriodException extends Error {
  constructor(period: PeriodString) {
    super(
      `Period: ${period} not allowed. Preview is only available for the current period (${Period.fromDate().year}/${Period.fromDate().month}).`,
    );
  }
}
