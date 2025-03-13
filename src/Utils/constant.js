import axios from 'axios'
import { Dimensions } from 'react-native'

export const apiClient = axios.create({
    baseURL: 'https://api.intra.42.fr/v2',
    headers: {
        'Content-Type': 'application/json',
    }
})

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;
export const spacing = screenWidth / 11