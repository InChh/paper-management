/**
 * Create service config by current env
 *
 * @param env The current env
 */
export function createServiceConfig(env: Env.ImportMeta) {
  const config: App.Service.ServiceConfigItem = {
    baseURL: env.VITE_SERVICE_BASE_URL,
    proxyPattern: createProxyPattern()
  };

  return config;
}

/**
 * get backend service base url
 *
 * @param env - the current env
 * @param isProxy - if use proxy
 */
export function getServiceBaseURL(env: Env.ImportMeta, isProxy: boolean) {
  const { baseURL } = createServiceConfig(env);

  return {
    baseURL: isProxy ? createProxyPattern() : baseURL
  };
}

/**
 * Get proxy pattern of backend service base url
 *
 * @param key If not set, will use the default key
 */
function createProxyPattern(key?: string) {
  if (!key) {
    return '/proxy-default';
  }

  return `/proxy-${key}`;
}
