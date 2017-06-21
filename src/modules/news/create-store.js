import mockDB from './mock/news.json'
import { NEWS_LIST, NEWS_DETAIL, COMMENT_LIST, ADD_COMMENT, NEWS_ADD, NEWS_LOADING } from './utils/types'

export default ({ scope, ...options }) => {
  const state = {
    newsMap: mockDB,
    loading: false,
    newsDetail: {},
    commentMap: []
  }

  const news = {
    add: () => {
      return {
        id: Date.now(),
        title: `loading add news ${Math.random().toString() * 1000}`,
        img: '',
        content: `<p>${Date.now()}</p>`,
        createTime: Date.now(),
        comments: []
      }
    }
  }

  const getters = {
    newsMap: state => state.newsMap,
    loading: state => state.loading,
    newsDetail: state => state.newsDetail,
    commentMap: state => state.commentMap
  }

  const actions = {
    getNewsList ({ commit, state }) {
      commit(NEWS_LOADING, true)
      setTimeout(() => {
        commit(NEWS_LOADING, false)
        commit(NEWS_LIST, state.newsMap)
      }, Math.random() * 1000 + 500)
    },
    reloadNewsList ({ commit, state }) {
      commit(NEWS_ADD, news.add())
      setTimeout(() => {
        commit(NEWS_LOADING, false)
        commit(NEWS_LIST, state.newsMap)
      }, Math.random() * 1000 + 500)
    },
    getNewsDetail ({ commit, state }, { id }) {
      commit(NEWS_DETAIL, state.newsMap.filter(item => item.id === +id)[0] || {})
    },
    addComment ({ commit, state }, payload) {
      commit(ADD_COMMENT, payload)
      commit(NEWS_LIST, { map: state.commentMap, types: 'comments', comment: payload.comment }) // 更新
    },
    getCommentList ({ commit, state }, { id }) {
      commit(NEWS_LOADING, true)
      setTimeout(() => {
        commit(NEWS_LOADING, false)
        commit(COMMENT_LIST, state.newsMap.filter(item => item.id === +id)[0] || {})
      }, Math.random() * 100 + 500)
    }
  }

  const mutations = {
    [NEWS_LIST] (state, mutation) {
      if (mutation.types === 'comments') {
        const newsMap = state.newsMap.map(item => {
          if (item.id === +mutation.comment.newsid) {
            item.comments = mutation.map
          }
          return item
        })
        state.newsMap = newsMap
        return
      }
      state.newsMap = mutation
    }, [NEWS_ADD] (state, mutation) {
      state.newsMap = [mutation].concat(state.newsMap)
    }, [NEWS_LOADING] (state, mutation) {
      state.loading = mutation
    }, [NEWS_DETAIL] (state, mutation) {
      state.newsDetail = mutation
    }, [COMMENT_LIST] (state, mutation) {
      state.commentMap = mutation.comments || []
    }, [ADD_COMMENT] (state, mutation) {
      state.commentMap = [mutation.comment].concat(state.commentMap)
    }
  }
  return { state, getters, actions, mutations }
}
