import { request } from '@/service/request';
import type { Api } from '@/typings/api';

export function getTodayResolveCount() {
  return request<number>({
    url: '/app/statistic/today-resolve-count',
    method: 'get'
  });
}

export function getTotalResolveCount() {
  return request<number>({
    url: '/app/statistic/total-resolve-count',
    method: 'get'
  });
}

export function getMonthlyResolveCount() {
  return request<number>({
    url: '/app/statistic/monthly-resolve-count',
    method: 'get'
  });
}

export function getMonthlyResoveDetail(
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth() + 1
) {
  return request<Api.Statistic.DailyResolveCount[]>({
    url: '/app/statistic/monthly-resolve-detail',
    params: { year, month },
    method: 'get'
  });
}

export function getWorkerStatisticInfo(params: Api.Statistic.StatisticParams) {
  return request<Api.Common.PaginatingResponse<Api.Statistic.WorkerStatisticInfo>>({
    url: '/app/statistic/worker-resolve-count',
    method: 'get',
    params
  });
}
