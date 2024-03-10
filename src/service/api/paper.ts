import { request } from '@/service/request';
import type { Api } from '@/typings/api';

export function getPaperList(params: Api.Common.PaginatingCommonParams) {
  return request<Api.Common.PaginatingResponse<Api.Paper.PaperRecord>>({
    url: '/app/paper',
    method: 'GET',
    params
  });
}

export function getPaperDetail(id: string) {
  return request<Api.Paper.PaperRecord>({
    url: `/app/paper/${id}`,
    method: 'GET'
  });
}

export function createPaper(params: Api.Paper.CreateUpdatePaperParams) {
  return request<Api.Paper.PaperRecord>({
    url: '/app/paper',
    method: 'POST',
    data: params
  });
}

export function updatePaper(id: string, params: Api.Paper.CreateUpdatePaperParams) {
  return request<Api.Paper.PaperRecord>({
    url: `/app/paper/${id}`,
    method: 'PUT',
    data: params
  });
}

export function deletePaper(id: string) {
  return request({
    url: `/app/paper/${id}`,
    method: 'DELETE'
  });
}
