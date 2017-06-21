import 'whatwg-fetch'
const options = {}
export default {
  setOption: opts => {
    Object.assign(options, opts)
  },
  getNewsList: body => {
    return fetch(`${options.source.app_server}/news`, {
      method: 'GET',
      credentials: 'include'
    }).then(function (response) {
      return response.json()
    })
  },
  getNewDetail: ({ id }) => {
    return fetch(`${options.source.app_server}/news/${id}`, {
      method: 'GET',
      credentials: 'include'
    }).then(function (response) {
      return response.json()
    })
  },
  modifyNew: ({ id, body }) => {
    return fetch(`${options.source.app_server}/news/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(body)
    }).then(function (response) {
      return response.json()
    })
  },
  addComment: ({ id, body }) => {
    return fetch(`${options.source.app_server}/comments/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    }).then(function (response) {
      return response.json()
    })
  },
  commentList: ({ id }) => {
    return fetch(`${options.source.app_server}/comments/${id}`, {
      method: 'GET',
      credentials: 'include'
    }).then(function (response) {
      return response.json()
    })
  }

}
