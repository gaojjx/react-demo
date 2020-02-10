import request from '../utils/request'

const uri = `/api/record`

export const fetch = ({type = 0}) => {
    const url = `${uri}/get?type=${type}`
    return request(url)
}

export const query = query => {
    const params = Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')
    const url = `${uri}/get?${params}`
    return request(url)
}

export const update = recordid => {
    return request(
        `${uri}/endUsingBox`,
        {
            method: 'PUT',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({recordid})
        }
    )
}

export const create = record => {
    return request(
        `${uri}/post`,
        {
            method: 'POST',
            body: JSON.stringify(record),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
    )
}

export const bulkDelete = recordIds => {
    return request(
        `${uri}/bulkDetele`,
        {
            method: 'PUT',
            body: JSON.stringify({recordidlist: [...recordIds]}),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
    )
}

export const openBox = openBoxModel => {
    return request(
        `${uri}/open`,
        {
            method: 'POST',
            body: JSON.stringify(openBoxModel),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
    )
}