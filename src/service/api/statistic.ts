import { request } from '@/service/request';

export function getTodayResolveCount() {
  return request<number>({
    url: '/app/statistic/today-resolve-count',
    method: 'get'
  });
}
