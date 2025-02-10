import axios from 'axios'

export const apiClient = axios.create({
    baseURL: 'https://api.intra.42.fr/v2',
    headers: {
        'Content-Type': 'application/json',
    }
})