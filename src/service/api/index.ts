import { request } from '@/service/request';

export * from './route';
export * from './paper';
export * from './worker';

export function initApplication() {
  return request({
    url: '/abp/application-configuration ',
    method: 'GET'
  });
}
