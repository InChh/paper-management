import type { App } from 'vue';
import type { KeycloakConfig } from 'keycloak-js';
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import type { VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js/dist/types';

export function setupKeycloak(app: App<Element>, onReady: () => void) {
  const config: KeycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
  };

  app.use(VueKeyCloak, {
    config,
    init: {
      onLoad: 'login-required'
    },
    onReady(_keycloak) {
      onReady();
    }
  });
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keycloak: VueKeycloakInstance;
  }
}
