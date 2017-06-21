import createStore from './create-store'
import createRoutes from './create-routes'
import './utils/index'

export default (context, options = {}) => {
  options = {
    scope: 'news',
    prefix: '/',
    ...options
  }

  return {
    store: createStore(options),
    routes: createRoutes(context, options),
    options
  }
}
