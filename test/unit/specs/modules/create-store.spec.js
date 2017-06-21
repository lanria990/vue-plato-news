import createStore from 'modules/news/create-store'
import types from 'modules/news/utils/types'
const { actions, mutations } = createStore({})

describe('modules news create-store', () => {
  it('should  reload news list', done => {
    const state = {
      newsMap: [{}, {}]
    }
    const commit = (type, mutation) => {
      mutations[type](state, mutation)
    }
    actions.reloadNewsList({ commit, state })
    setTimeout(() => {
      expect(state.newsMap.length).to.not.equal(2)
      done()
    }, 1500)
  })

  it('should  load news detail', done => {
    const state = {
      newsDetail: {},
      newsMap: [{ id: 1, content: '1234', comments: [] }]
    }
    const commit = (type, mutation) => {
      state.newsDetail = type === types.NEWS_DETAIL ? mutation : null
    }
    actions.getNewsDetail({ state, commit }, { id: 1 })
    setTimeout(() => {
      expect(state.newsDetail.id).to.equal(1)
      expect(state.newsDetail.content).to.equal('1234')
      done()
    }, 500)
  })

  it('should  add comment', done => {
    const state = {
      commentMap: [],
      newsMap: [{ id: 1, content: '1234', comments: [] }]
    }
    const commit = (type, mutation) => {
      if (type === types.ADD_COMMENT) {
        mutations[type](state, mutation)
      }
      if (type === types.NEWS_LIST) {
        mutations[type](state, mutation)
      }
    }
    const commentID = Date.now()
    const newsID = state.newsMap[0].id
    actions.addComment({ state, commit }, {
      id: newsID, comment: { id: commentID, newsid: newsID }
    })
    setTimeout(() => {
      expect(state.commentMap.length).to.not.equal(0)
      const comMap = (state.newsMap.filter(item => item.id === newsID)[0] || {}).comments || []
      expect(comMap.length).to.equal(1)
      done()
    }, 500)
  })

  it('should  load comment', done => {
    const state = {
      commentMap: [],
      newsMap: [{ id: 1, content: '1234', comments: [{}, {}] }]
    }
    const commit = (type, mutation) => {
      mutations[type](state, mutation)
    }
    const newsID = state.newsMap[0].id
    actions.getCommentList({ state, commit }, { id: newsID })
    setTimeout(() => {
      expect(state.commentMap.length).to.equal(2)
      done()
    }, 1500)
  })
})
