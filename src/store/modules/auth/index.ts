import { computed, inject, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { jwtDecode } from 'jwt-decode';
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import type { VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js/dist/types';
import { SetupStoreId } from '@/enum';
import { useRouterPush } from '@/hooks/common/router';
import { localStg } from '@/utils/storage';
import type { JwtPayloadExtra } from '@/typings/jwt';
import { useRouteStore } from '../route';

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const routeStore = useRouteStore();
  const { route, toLogin } = useRouterPush(false);
  const { loading: loginLoading } = useLoading();

  const token = ref(getToken());

  const userInfo: Api.Auth.UserInfo = reactive(getUserInfo());

  /** Is login */
  const isLogin = computed(() => Boolean(token.value));

  /** Reset auth store */
  async function resetStore() {
    const authStore = useAuthStore();

    clearAuthStorage();

    authStore.$reset();

    if (!route.value.meta.constant) {
      await toLogin();
    }

    await routeStore.resetStore();
  }

  return {
    token,
    userInfo,
    isLogin,
    loginLoading,
    resetStore
  };
});

/** Get user info */
export function getUserInfo(): Api.Auth.UserInfo {
  let userInfo = localStg.get('userInfo');
  if (userInfo === null) {
    const payload = jwtDecode<JwtPayloadExtra>(getToken());
    const info = {
      userId: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      userName: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      name: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
      email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      roles: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    };
    localStg.set('userInfo', info);
    userInfo = info;
  }
  return userInfo;
}

export function getToken() {
  const keycloak = inject(VueKeyCloak.KeycloakSymbol) as VueKeycloakInstance;
  return keycloak.token || '';
}

/** Clear auth storage */
export function clearAuthStorage() {
  localStg.remove('userInfo');
}
