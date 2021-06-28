import axios from 'axios'
import { Message } from 'element-ui'
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/api' : '/api'

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/api' : '/api'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        Message({
            message: '服务端异常',
            type: 'error'
        })
        return Promise.reject(res)
    }
    if (res.status != 200) {
        if (res.data.message) {
            Message({
                message: res.data.message,
                type: 'error'
            })
        }
        
        return Promise.reject(res.data)
    }

    return res.data
})

export default axios