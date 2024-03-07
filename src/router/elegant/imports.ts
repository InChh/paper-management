/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

import type { RouteComponent } from "vue-router";
import type { LastLevelRouteKey, RouteLayout } from '@elegant-router/types';

import BaseLayout from '@/layouts/base-layout/index.vue';
import BlankLayout from '@/layouts/blank-layout/index.vue';

export const layouts: Record<
  RouteLayout,
  RouteComponent | (() => Promise<RouteComponent>)
> = {
  base: BaseLayout,
  blank: BlankLayout,
};

export const views: Record<
  LastLevelRouteKey,
  RouteComponent | (() => Promise<RouteComponent>)
> = {
  403: () => import('@/views/_builtin/403/index.vue'),
  404: () => import('@/views/_builtin/404/index.vue'),
  500: () => import('@/views/_builtin/500/index.vue'),
  about: () => import('@/views/about/index.vue'),
  home: () => import('@/views/home/index.vue'),
  paper_list: () => import('@/views/paper/list/index.vue'),
  worker_list: () => import('@/views/worker/list/index.vue'),
};
