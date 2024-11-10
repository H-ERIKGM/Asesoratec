import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.asesoratec.click/api',
    withCredentials: true
})

export default instance