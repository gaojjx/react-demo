import request from '../utils/request'
export const fetch = ({page = 1, pageSize = 5}) => {
   return request(`/api/users?_page=${page}&limit=${pageSize}`)
}

export const remove = id => {
    return request(`api/users/${id}`, {
        method: 'DELETE'
    })
}

export const bulkDelete = recordidlist => {
    console.log(recordidlist)
    
}