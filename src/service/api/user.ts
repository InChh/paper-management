import type { Api } from '@/typings/api';
import { request } from '@/service/request';

export function getUserList(params: Api.Common.PaginatingCommonParams) {
  return request<Api.Common.PaginatingResponse<Api.Auth.UserInfo>>({
    url: '/app/user',
    method: 'GET',
    params
  });
}
