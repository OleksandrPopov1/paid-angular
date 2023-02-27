export interface IStatisticStatus {
  count: number;
  status: string;
}

export interface IStatistic {
  total_count: number;
  statuses: IStatisticStatus[];
}
