import request from "../utils/request"

export const login = ({username, password}) => {
    const data = {username, password}
    return request('/api/authUserLogin/AdminLogin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}