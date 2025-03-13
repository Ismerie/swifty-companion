import { useEffect } from 'react';
import { apiClient } from './constant';
import { getAccessToken } from './getAccessToken';

export const useSetupApiClient = (token, setToken) => {
    useEffect(() => {
        const requestInterceptor = apiClient.interceptors.request.use(
            async (config) => {
                const accessToken = await getAccessToken(token, setToken);

                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                } else {
                    console.warn("Pas de token disponible, redirection vers Welcome");
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            apiClient.interceptors.request.eject(requestInterceptor);
        };
    }, [token]); 
};
