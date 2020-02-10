import * as userServices from '../services/user'

export default {
  namespace: 'user',
  state: {
    list: [],
    number: '',
    name: '',
    active: true,
    type: 0,
    Page: 1,
    PageSize: 5,
    detail: {}
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/user') {
          return dispatch({
            type: 'fetch',
            payload: query
          })
        }
        const regex = /^\/user\/([^\/]+[^\/])$/
        const match = regex.exec(pathname)
        if (match) {
          const userId = match[1]
          return dispatch({
            type: 'detail',
            payload: userId
          })
        }
      })
    }
  },
  reducers: {
    save(state, { payload: {list, query} }) {
      return {...state, list, query}
    },
    detailSave(state, {payload: data}) {
      return {...state, detail: data}
    }
  },
  effects: {
    *fetch({payload: query}, {call, put, select}) {
      const userState = yield select(state => state.user)
      const {active, type, Page, PageSize} = userState
      query = {...query, active, type, Page, PageSize}
      const res = yield call(userServices.fetch, {query});
      if (res.Success) {
        yield put({
          type: 'save',
          payload: {
            list: res.Data,
            query
          },
        });
      }
    },
    *detail({payload: userId}, {call, put}) {
      const data = yield call(userServices.detail, userId)
      yield put({
        type: 'detailSave',
        payload: data
      })
    },
    *bulkRecovery({payload: {userids, query}}, {call, put}) {
      const res = yield call(userServices.bulkRecovery, userids)
      yield put({
        type: 'fetch',
        payload: {query}
      })
    }
  }
}
