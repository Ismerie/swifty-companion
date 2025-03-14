import { CLIENT_ID, CLIENT_SECRET } from '@env';
import { authorize, refresh } from 'react-native-app-auth';
import * as SecureStore from 'expo-secure-store';

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

const saveToken = async (tokenData) => {
    await SecureStore.setItemAsync("userToken", JSON.stringify(tokenData));
};

export const getStoredToken = async () => {
    const tokenString = await SecureStore.getItemAsync("userToken");
    return tokenString ? JSON.parse(tokenString) : null;
};

export const logout = async (setToken) => {
    await SecureStore.deleteItemAsync("userToken");
    setToken(false)
};

export const signInWith42 = async (setToken) => {
    try {
        const authState = await authorize(config);
        
        if (authState.accessToken) {
            const tokenData = {
                accessToken: authState.accessToken,
                tokenExpiration: new Date(authState.accessTokenExpirationDate).getTime(),
                //tokenExpiration: new Date(new Date().getTime() - 10000),
                refreshToken: authState.refreshToken,
            };

            await saveToken(tokenData);
            setToken(true)
        }

        return authState.accessToken;
    } catch (error) {
        //console.error('Erreur OAuth2 :', error);
        return null;
    }
};

const refreshAccessToken = async (setToken) => {
    const token = await getStoredToken();
    if (!token || !token.refreshToken) {
        //console.error("Aucun refreshToken disponible !");
        await logout();
        return null;
    }

    try {
        const newAuthState = await refresh(config, {
            refreshToken: token.refreshToken,
        });

        console.log("Token rafraîchi");

        const updatedToken = {
            accessToken: newAuthState.accessToken,
            tokenExpiration: new Date(newAuthState.accessTokenExpirationDate).getTime(),
            refreshToken: newAuthState.refreshToken || token.refreshToken,
        };

        await saveToken(updatedToken);
        setToken(true)
        return updatedToken.accessToken;
    } catch (error) {
        //console.error("Erreur lors du rafraîchissement du token :", error);
        await logout();
        return null;
    }
};

// 🔹 Fonction pour obtenir un token valide avant chaque requête
export const getAccessToken = async (setToken) => {
    const token = await getStoredToken();

    if (!token) {
        console.log("Aucun token stocké, connexion requise.");
        setToken(false)
        return null;
    }

    if (token.accessToken && token.tokenExpiration && new Date().getTime() < token.tokenExpiration) {
        console.log("Token encore valide, utilisation immédiate.");
        return token.accessToken;
    }

    console.log("Token expiré, tentative de rafraîchissement...");
    return await refreshAccessToken(setToken);
};
