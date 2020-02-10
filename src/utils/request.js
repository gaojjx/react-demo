import { routerRedux } from "dva";

const checkStatus = response => {
    if (response.status >= 200 && response.status < 500) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
}

export default function(url, options = {}) {
    if (url !== '/api/authUserLogin/AdminLogin') {
        const token = localStorage.getItem('token')
        if (!token) {
            routerRedux.push('/login')
        }
        if (!options.headers) {
            options.headers = {
                Authorization: token
            }
        } else {
            options.headers = {
                ...options.headers,
                Authorization: token
            }
        }
    }
    return fetch(url, options)
    .then(checkStatus)
    .then(res => res.json())
    .then(json => {
        if (Object.prototype.toString.call(json).slice(8, -1) === 'String') {
            return JSON.parse(json)
        } else {
            return json
        }
    })
}