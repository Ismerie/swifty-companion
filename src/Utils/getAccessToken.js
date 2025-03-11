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

let accessToken = null;
let tokenExpiration = null;
let refreshToken = null;

export const signInWith42 = async () => {
    try {
        const authState = await authorize(config);
        
        console.log(authState);
        
        accessToken = authState.accessToken;
        tokenExpiration = new Date(authState.accessTokenExpirationDate);
        refreshToken = authState.refreshToken;
        
        return accessToken;
    } catch (error) {
        console.error('Erreur OAuth2 :', error);
    }
};

const refreshAccessToken = async () => {
    if (!refreshToken) {
        console.error("Aucun refreshToken disponible !");
        return null;
    }

    try {
        const newAuthState = await refresh(config, {
            refreshToken: refreshToken,
        });

        console.log("Token rafraîchi :", newAuthState);

        accessToken = newAuthState.accessToken;
        tokenExpiration = new Date(newAuthState.accessTokenExpirationDate);
        refreshToken = newAuthState.refreshToken || refreshToken;

        return accessToken;
    } catch (error) {
        console.error("Erreur lors du rafraîchissement du token :", error);
        return null;
    }
};

export const getAccessToken = async () => {
    if (accessToken && tokenExpiration && new Date() < tokenExpiration) {
        console.log("Token encore valide, réutilisation.");
        return accessToken;
    }

    console.log("Token expiré, tentative de rafraîchissement...");
    return await refreshAccessToken();
};


// const TOKEN_URL = "https://api.intra.42.fr/oauth/token"
// let accessToken = null;
// let tokenExpiration = null;

// const getAccessToken = async () => {
//     if (accessToken && tokenExpiration && new Date() < tokenExpiration) {
//         console.log("Token encore valide, réutilisation.");
//         return accessToken;
//     }

//     try {
//         console.log("Demande d'un nouveau token...");
//         const response = await axios.post(TOKEN_URL, {
//             grant_type: 'client_credentials',
//             client_id: CLIENT_ID,
//             client_secret: CLIENT_SECRET,
//         });

//         accessToken = response.data.access_token;
//         tokenExpiration = new Date(Date.now() + response.data.expires_in * 1000);

//         return accessToken;
//     } catch (error) {
//         console.error('Erreur lors de la récupération du token:', error.response?.data || error.message);
//         throw error;
//     }
// };

