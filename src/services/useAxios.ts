import { PublicClientApplication } from '@azure/msal-browser';
import axios from 'axios';
import router from 'next/router';
import Swal from 'sweetalert2';

interface AxiosOption {
  params?: any;
  // isHideErrorSnackBar?: boolean;
}

// All API calls pass through this component to catch error & trigger snackbar
const useAxios = (options?: AxiosOption) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    params: options?.params,
    withCredentials: true
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 403) {
        const isAlreadyPopUped = window.localStorage.getItem('isAlreadyPopUped');

        if (isAlreadyPopUped !== '1') {
          Swal.fire({
            title: 'Session expired',
            text: 'Please login',
            icon: 'warning',
            confirmButtonText: 'OK',
            didClose() {
              const secret = process.env.NEXT_PUBLIC_AZURE_SECRET;
              const appId = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || '';
              const tenantId = process.env.NEXT_PUBLIC_AZURE_TENANT_ID;

              const msalConfig = {
                auth: {
                  clientId: appId,
                  authority: `https://login.microsoftonline.com/${tenantId}`,
                  clientSecret: secret
                }
              };
              const msalInstance = new PublicClientApplication(msalConfig);

              msalInstance.handleRedirectPromise().then(async () => {
                try {
                  const { accessToken } = await msalInstance.acquireTokenPopup({
                    scopes: ['openid', 'profile'],
                    redirectUri: `${window.location.origin}/oauth/callback`
                  });

                  await axiosInstance.get(`/auth/me`, {
                    headers: {
                      Authorization: `Bearer ${accessToken}`
                    }
                  });

                  window.localStorage.setItem('isAlreadyPopUped', '0');
                  router.reload();
                } catch (e) {
                  //
                }
              });
            },
            allowOutsideClick: false,
            backdrop: false
          });
          window.localStorage.setItem('isAlreadyPopUped', '1');
        }
      }
      throw error;
    }
  );

  return axiosInstance;
};

export default useAxios;
