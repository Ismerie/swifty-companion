import axios from 'axios';

const CLIENT_ID = 'u-s4t2ud-e47acc752052c4fa979c83d900fb10f7ce2d36614ef79c3b783a36d99078f901'; // Remplace par ton UID
const CLIENT_SECRET = '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'; // Remplace par ton secret token
const TOKEN_URL = 'https://api.intra.42.fr/oauth/token'; // URL de l'API pour obtenir un jeton

// Fonction pour obtenir le token
const getAccessToken = async () => {
  try {
    const response = await axios.post(TOKEN_URL, {
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    // Afficher le token dans la console
    console.log('Access Token:', response.data.access_token);

    // Retourne le token pour une utilisation future
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    throw error;
  }
};

export default getAccessToken;