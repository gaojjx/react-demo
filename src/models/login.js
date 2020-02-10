import * as loginServices from '../services/login'
import { routerRedux } from 'dva'
export default {
    namespace: 'login',
    state: {
        isLogin: false,
        token: null,
        data: {}
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/login') {
                    
                }
            })
            
        }
    },
    reducers: {
        success(state, {payload: {Data}}) {
            console.log(Data)
            return {...state, isLogin: true, success: true, data: Data, token: Data.token}
        },
        fail(state, {payload: {Error}}) {
            console.log(Error)
            return {...state, Error}
        },
        login(state, {payload}) {
            console.log(Object.prototype.toString.call(payload))
            return {...state, payload}
        }
    },
    effects: {
        *auth({payload: {username, password}}, {call, put}) {
            const data = yield call(loginServices.login, {username, password})
            if (data.Success) {
                yield put({
                    type: 'success',
                    payload: data
                })
                localStorage.setItem('token', data.Data.token)
                yield put(routerRedux.push('/record'))
            }
        }
    }
}