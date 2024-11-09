import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://18.212.31.252:4000/api',
    withCredentials: true
})

export default instance