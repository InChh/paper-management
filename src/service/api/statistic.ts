import { request } from '@/service/request';
import type { Api } from '@/typings/api';

export function getTodayResolveCount() {
  return request<number>({
    url: '/app/statistic/today-resolve-count',
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
