import axios from 'axios';

const CLIENT_ID = 'u-s4t2ud-e47acc752052c4fa979c83d900fb10f7ce2d36614ef79c3b783a36d99078f901';
const CLIENT_SECRET = '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';

const TOKEN_URL = 'https://api.intra.42.fr/oauth/token';

// Variables globales pour stocker le token et son expiration
let accessToken = null;
let tokenExpiration = null;

const getAccessToken = async () => {

    // Vérifier si le token est encore valide
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
        tokenExpiration = new Date(Date.now() + response.data.expires_in * 1000); // Conversion en millisecondes

        return accessToken;
    } catch (error) {
        console.error('Erreur lors de la récupération du token:', error.response?.data || error.message);
        throw error;
    }
};

export default getAccessToken;
