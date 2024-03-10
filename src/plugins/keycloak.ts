import type { App } from 'vue';
import type { KeycloakConfig } from 'keycloak-js';
import { vueKeycloak } from '@josempgon/vue-keycloak';
import { initApplication } from '@/service/api';

export function setupKeycloak(app: App<Element>, onReady: () => void) {
  const config: KeycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
  };

  app.use(vueKeycloak, {
    config
  });
  app.config.globalProperties.$keycloak.onReady = (_: boolean) => {
    initApplication().then(_res => {
      onReady();
    });
  };
}
