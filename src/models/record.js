import * as recordServices from '../services/record'

export default {
    namespace: 'record',
    state: {
        list: [],
        studentnumber: '',
        cabinetnumber: 0,
        startedtime: null,
        history: false,
        type: 0,
        Page: 1,
        PageSize: 10,
        total: 0,
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/record') {
                    dispatch({
                        type: 'fetch',
                        payload: query
                    })
                }
            })
        }
    },
    reducers: {
        save(state, {payload: {list, total, Page, PageSize, type}}) {
            return {...state, list, total, Page, PageSize, type}
        }
    },
    effects: {
        *fetch({payload: {type = 0, Page = 1}}, {call, put, select}) {
            const data = yield call(recordServices.fetch, {type})
            yield put({
                type: 'save',
                payload: {
                    list: data.Data,
                    type
                }
            })
        },
        *query({payload: {query}}, {call, put}) {
            const data = yield call(recordServices.query, query)
            yield put({
                type: 'save',
                list: data
            })
        },
        *update({payload: {recordId, query}}, {call, put}) {
            yield call(recordServices.update, recordId)
            yield put({
                type: 'fetch',
                payload: query
            })
        },
        *create({payload: {record, query}}, {call, put}) {
            yield call(recordServices.create, record)
            yield put({
                type: 'fetch',
                payload: query
            })
        },
        *bulkDelete({payload: {recordidlist, query}}, {call, put}) {
            yield call(recordServices.bulkDelete, recordidlist)
            yield put({ type: 'fetch', payload: query} )
        },
        *openBox({payload: {openBoxModel, query}}, {call, put}) {
            yield call(recordServices.openBox, openBoxModel)
            yield put({ type: 'fetch', payload: query} )
        }
    }
}