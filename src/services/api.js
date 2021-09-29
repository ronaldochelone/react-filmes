import axios from 'axios'

export const key = 'ed66d729442db86c09619064499c3f80'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;