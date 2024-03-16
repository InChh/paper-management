/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

import type { GeneratedRoute } from '@elegant-router/types';

export const generatedRoutes: GeneratedRoute[] = [
  {
    name: '403',
    path: '/403',
    component: 'layout.base$view.403',
    meta: {
      title: '403',
      i18nKey: 'route.403',
      constant: true,
    },
  },
  {
    name: '404',
    path: '/404',
    component: 'layout.base$view.404',
    meta: {
      title: '404',
      i18nKey: 'route.404',
      constant: true,
    },
  },
  {
    name: '500',
    path: '/500',
    component: 'layout.base$view.500',
    meta: {
      title: '500',
      i18nKey: 'route.500',
      constant: true,
    },
  },
  {
    name: 'home',
    path: '/home',
    component: 'layout.base$view.home',
    meta: {
      title: 'home',
      icon: 'bx:home',
      i18nKey: 'route.home',
    },
  },
  {
    name: 'paper',
    path: '/paper',
    component: 'layout.base',
    meta: {
      title: 'paper',
      icon: 'mingcute:paper-line',
      i18nKey: 'route.paper',
    },
    children: [
      {
        name: 'paper_list',
        path: '/paper/list',
        component: 'view.paper_list',
        meta: {
          title: 'paper_list',
          icon: 'grommet-icons:list',
          i18nKey: 'route.paper_list',
        },
      },
    ],
  },
  {
    name: 'worker',
    path: '/worker',
    component: 'layout.base',
    meta: {
      title: 'worker',
      icon: 'octicon:people-16',
      i18nKey: 'route.worker',
    },
    children: [
      {
        name: 'worker_list',
        path: '/worker/list',
        component: 'view.worker_list',
        meta: {
          title: 'worker_list',
          icon: 'grommet-icons:list',
          i18nKey: 'route.worker_list',
        },
      },
    ],
  },
];
