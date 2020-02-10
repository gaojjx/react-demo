import * as userServices from '../services/users'
export default {
    namespace: 'users',
    state: {
        list: [],
        page: 1,
        total: 0,
        pageSize: 3,
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/users') {
                    dispatch({
                        type: 'fetch',
                        payload: query
                    })
                }
            })
        }
    },
    reducers: {
        save(state, {payload: {data: list, total, page, pageSize}}) {
            return {...state, list, total, page, pageSize}
        }
    },
    effects: {
        *fetch({ payload: { page = 1, pageSize = 3 } }, { call, put }) {
          const { data, total } = yield call(userServices.fetch, { page, pageSize });
          yield put({ type: 'save', payload: { data, total: parseInt(total), page, pageSize } });
        },
        *remove({payload: id}, {call, put, select}) {
            yield call(userServices.remove, id)
            const {page, pageSize} = yield select(state => {
                return {page: state.users.page, pageSize: state.users.pageSize}
            })
            yield put({ type: 'fetch', payload: { page, pageSize }})
        },
        *bulkDelete({payload: recordidlist}, {call, put, select}) {
            yield call(userServices.bulkDelete, recordidlist)
            const {page, pageSize} = yield select(state => {
                const {page, pageSize} = state.users
                return {page, pageSize}
            })
            yield put({ type: 'fetch', payload: {page, pageSize}})
        }
      },
}