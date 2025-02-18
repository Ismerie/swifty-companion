import axios from 'axios';

const CLIENT_ID = 'u-s4t2ud-e47acc752052c4fa979c83d900fb10f7ce2d36614ef79c3b783a36d99078f901';
const CLIENT_SECRET = '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';
const TOKEN_URL = 'https://api.intra.42.fr/oauth/token';

// Variables globales pour stocker le token et son expiration
let accessToken = null;
let tokenExpiration = null;

const getAccessToken = async () => {
    console.log("Token actuel:", accessToken);
    console.log("Expiration actuelle:", tokenExpiration);

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

        // Stocker le token et son expiration
        accessToken = response.data.access_token;
        tokenExpiration = new Date(Date.now() + response.data.expires_in * 1000); // Conversion en millisecondes

        console.log("Nouveau token obtenu:", accessToken);
        return accessToken;
    } catch (error) {
        console.error('Erreur lors de la récupération du token:', error.response?.data || error.message);
        throw error;
    }
};

export default getAccessToken;
