import request from '@/utils/request';

const uri = '/api/user'
export const fetch = ({query}) => {
  const params = Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&');
  return request(
    `${uri}/get?${params}`,
  )
}

export const detail = userId => {
  return request(`${uri}/details?id=${userId}`)
}

export const bulkRecovery = userids => {
  return request(
    `${uri}/recovery`,
    {
      method: 'PUT',
      body: JSON.stringify({userids: userids}),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    }
  )
}
