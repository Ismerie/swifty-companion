import axios from 'axios'
import getAccessToken from './getAccessToken'
import { Dimensions } from 'react-native'

export const apiClient = axios.create({
    baseURL: 'https://api.intra.42.fr/v2',
    headers: {
        'Content-Type': 'application/json',
    }
})

apiClient.interceptors.request.use(async (config) => {
    const accessToken = await getAccessToken();
    console.log("tokeeeeeeeeeeeeeeeeeeeeeeen")
    console.log(accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
}, (error) => {
    return Promise.reject(error);
})

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;
export const spacing = screenWidth / 11