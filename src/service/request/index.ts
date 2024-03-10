import { BACKEND_ERROR_CODE, createFlatRequest } from '@sa/axios';
import { useKeycloak } from '@josempgon/vue-keycloak';
import { getServiceBaseURL } from '@/utils/service';
import { getToken } from '@/store/modules/auth';

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
      const token = getToken();
      const Authorization = token ? `Bearer ${token}` : null;
      Object.assign(headers, { Authorization });

      return config;
    },
    isBackendSuccess(response) {
      // when the backend response http code is 200, it means the request is success
      return response.status === 200;
    },
    async onBackendFail(response) {
      // when the backend response http code is not 200, it means the request is fail
      // for example: the token is expired, refresh token and retry request
      if (response.status === 401) {
        const { keycloak } = useKeycloak();
        await keycloak.login();
      }

      window.$message?.error(response.data.error.message);
    },
    transformBackendResponse(response) {
      return response.data;
    },
    onError(error) {
      // when the request is fail, you can show error message

      let message = error.message;

      // show backend error message
      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.error.message || message;
      }

      window.$message?.error(message);
    }
  }
);
