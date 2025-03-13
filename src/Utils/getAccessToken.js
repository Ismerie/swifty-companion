import { CLIENT_ID, CLIENT_SECRET } from '@env';
import { authorize, refresh } from 'react-native-app-auth';

const config = {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUrl: 'com.igeorge2.app://oauth-callback',
    scopes: ['public'],
    serviceConfiguration: {
        authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
        tokenEndpoint: 'https://api.intra.42.fr/oauth/token',
    },
};

export const signInWith42 = async (setToken) => {
    try {
        const authState = await authorize(config);
        
        if (authState.accessToken) {
            setToken({
                accessToken: authState.accessToken,
                tokenExpiration: new Date(authState.accessTokenExpirationDate),
                //tokenExpiration: new Date(new Date().getTime() - 10000),
                refreshToken: authState.refreshToken,
            })
        }
        return authState.accessToken;
    } catch (error) {
        console.error('Erreur OAuth2 :', error);
    }
};

const refreshAccessToken = async (token, setToken) => {
    if (!token.refreshToken) {
        console.error("Aucun refreshToken disponible !"); {
            setToken(null);
            return null;
        }
    }
    console.log("refresh test");
    try {
        const newAuthState = await refresh(config, {
            refreshToken: token.refreshToken,
        });

        console.log("Token rafraîchi :", newAuthState);

        setToken({
            accessToken: newAuthState.accessToken,
            tokenExpiration: new Date(newAuthState.accessTokenExpirationDate),
            refreshToken: newAuthState.refreshToken || refreshToken,

        })

        return newAuthState.accessToken;
    } catch (error) {
        console.error("Erreur lors du rafraîchissement du token :", error);
        setToken(null);
        return null;
    }
};

export const getAccessToken = async (token, setToken) => {
    if (token.accessToken && token.tokenExpiration && new Date() < token.tokenExpiration) {
        console.log("Token encore valide, réutilisation.");
        return token.accessToken;
    }

    console.log("Token expiré, tentative de rafraîchissement...");
    return await refreshAccessToken(token, setToken);
};
