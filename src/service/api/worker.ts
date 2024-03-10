import { request } from '@/service/request';
import type { Api } from '@/typings/api';

export function getWorkerList(params: Api.Common.PaginatingCommonParams) {
  return request<Api.Common.PaginatingResponse<Api.Worker.WorkerRecord>>({
    url: '/app/worker',
    method: 'GET',
    data: params
  });
}

export function getWorkerDetailByUserId(userId: string) {
  return request<Api.Worker.WorkerRecord>({
    url: `/app/worker/by-user-id/${userId}`,
    method: 'GET'
  });
}

export function getWorkerDetailByWorkerId(workerId: number) {
  return request<Api.Worker.WorkerRecord>({
    url: `/app/worker/by-worker-id/${workerId}`,
    method: 'GET'
  });
}

export function createWorker(params: Api.Worker.CreateWorkerParams) {
  return request<Api.Worker.WorkerRecord>({
    url: '/app/worker',
    method: 'POST',
    data: params
  });
}

export function updateWorker(id: string, params: Api.Worker.UpdateWorkerParams) {
  return request<Api.Worker.WorkerRecord>({
    url: `/app/worker`,
    method: 'PUT',
    data: params,
    params: { id }
  });
}

export function deleteWorkerByUserId(userId: string) {
  return request({
    url: `/app/worker/by-user-id/${userId}`,
    method: 'DELETE'
  });
}

export function deleteWorkerByWorkerId(workerId: number) {
  return request({
    url: `/app/worker/by-worker-id/${workerId}`,
    method: 'DELETE'
  });
}
