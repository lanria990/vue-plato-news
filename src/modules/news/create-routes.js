export default () => {
  return [{
    path: '/',
    exact: true,
    component: () => System.import('./views/index')
  }, {
    path: '/news/:id',
    name: 'detail',
    component: () => System.import('./views/detail')
  }, {
    path: '/news/:id/comment',
    name: 'comment',
    component: () => System.import('./views/comment')
  }]
}
