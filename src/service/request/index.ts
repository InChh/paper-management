import { createFlatRequest } from '@sa/axios';
import { getToken } from '@josempgon/vue-keycloak';
import { getServiceBaseURL } from '@/utils/service';

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);

export const request = createFlatRequest<any>(
  {
    baseURL,
    xsrfCookieName: 'XSRF-TOKEN'
  },
  {
    async onRequest(config) {
      const { headers } = config;

      // set token
      const token = await getToken();
      const Authorization = token ? `Bearer ${token}` : null;
      Object.assign(headers, { Authorization });

      return config;
    },
    isBackendSuccess(response) {
      // when the backend response http code is 200, it means the request is success
      return response.status === 200;
    },
    async onBackendFail(_response) {
      // when the backend response http code is not 200, it means the request is fail
      // for example: the token is expired, refresh token and retry request
    },
    transformBackendResponse(response) {
      return response.data;
    },
    async onError(error) {
      // when the request is fail, you can show error message

      let message = error.message;

      if (error.response) {
        message = error.response.data.error.message;
      }

      window.$message?.error(message);
    }
  }
);
