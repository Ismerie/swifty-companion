import { CLIENT_ID, CLIENT_SECRET} from '@env';
import axios from 'axios';

const TOKEN_URL = "https://api.intra.42.fr/oauth/token"
let accessToken = null;
let tokenExpiration = null;

const getAccessToken = async () => {
    if (accessToken && tokenExpiration && new Date() < tokenExpiration) {
        console.log("Token encore valide, réutilisation.");
        return accessToken;
    }

    try {
        console.log("Demande d'un nouveau token...");
        const response = await axios.post(TOKEN_URL, {
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        });

        accessToken = response.data.access_token;
        tokenExpiration = new Date(Date.now() + response.data.expires_in * 1000);

        return accessToken;
    } catch (error) {
        console.error('Erreur lors de la récupération du token:', error.response?.data || error.message);
        throw error;
    }
};

export default getAccessToken;
