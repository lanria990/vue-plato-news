import service from './services'
import { NEWS_LIST, NEWS_DETAIL, COMMENT_NEWS, COMMENT_LIST, ADD_COMMENT } from './types'

export default ({ scope, ...options }) => {
  service.setOption(options)

  const state = {
    newsMap: []
  }

  const getters = {
    newsMap: state => state.newsMap,
    hasPublish: state => state.newsMap.filter(item => item.userName === '235022').length > 0
  }

  const actions = {
    getNewsList ({ commit }, { body, then, err }) {
      return service.getNewsList(body).then(...then).then(data => {
        commit(NEWS_LIST, data)
      }).catch(...err)
    },
    getNewDetail ({ commit }, { body, then, err }) {
      return service.getNewsList(body).then(...then).then(data => {
        commit(NEWS_LIST, data)
      }).catch(...err)
    },
    addComment ({ commit }, { body, then, err }) {
      return service.addComment(body).then(...then).then(data => {
        commit(ADD_COMMENT, data)
      }).catch(...err)
    },
    CommentList ({ commit }, { body, then, err }) {
      return service.commentList(body).then(...then).then(data => {
        commit(COMMENT_LIST, data)
      }).catch(...err)
    }
  }

  const mutations = {
    [NEWS_LIST] (state, mutation) {
      state.weiboList = mutation
    }, [NEWS_DETAIL] (state, mutation) {
      Object.assign(state, mutation)
    }, [COMMENT_NEWS] (state, mutation) {
      state = Object.assign({}, state, mutation)
    }, [COMMENT_LIST] (state, mutation) {
      state = Object.assign({}, state, mutation)
    }, [ADD_COMMENT] (state, mutation) {
      state = Object.assign({}, state, mutation)
    }
  }
  return { state, getters, actions, mutations }
}
