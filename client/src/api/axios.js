import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://ec2-18-212-31-252.compute-1.amazonaws.com:4000/api',
    withCredentials: true
})

export default instance