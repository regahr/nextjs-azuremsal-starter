import { useEffect, useState } from 'react';

import { PublicClientApplication } from '@azure/msal-browser';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import useAxios from './useAxios';

const useAuthService = () => {
  const axiosInstance = useAxios();
  const [currentUser, setCurrentUser] = useState(null);

  const secret = process.env.NEXT_PUBLIC_AZURE_SECRET;
  const appId = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || '';
  const tenantId = process.env.NEXT_PUBLIC_AZURE_TENANT_ID;
  const router = useRouter();

  const msalConfig = {
    auth: {
      clientId: appId,
      // redirectUri: process.env.NEXT_PUBLIC_AZURE_REDIRECT_URL,
      authority: `https://login.microsoftonline.com/${tenantId}`,
      clientSecret: secret
    }
  };
  const logout = () => {
    const msalInstance = new PublicClientApplication(msalConfig);

    msalInstance
      .handleRedirectPromise()
      .then(async () => {
        try {
          await axiosInstance.post(
            `/auth/logout?redirect=${process.env.NEXT_PUBLIC_AZURE_REDIRECT_URL}`
          );
          await msalInstance.logoutRedirect({
            postLogoutRedirectUri: `${process.env.NEXT_PUBLIC_AZURE_REDIRECT_URL}`
          });
        } catch (error) {
          //
        }
      })
      .catch(() => {});
  };

  const login = () => {
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

        router.reload();
      } catch (error) {
        //
      }
    });
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (typeof window !== 'undefined') {
        try {
          const result = await axiosInstance?.get(`/auth/me`);
          setCurrentUser(result?.data?.data);
        } catch (error) {
          Swal.fire({
            title: 'Session expired',
            text: 'Please login',
            icon: 'warning',
            confirmButtonText: 'OK',
            didClose() {
              login();
            },
            allowOutsideClick: false,
            backdrop: false
          });
        }
      }
    };

    fetchCurrentUser();
  }, []);

  return { logout, currentUser, login };
};

export default useAuthService;
