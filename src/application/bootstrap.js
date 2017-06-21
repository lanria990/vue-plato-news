import { configure, use, run } from 'platojs/system'

import logger from 'modules/logger'
import persist from 'modules/persist'
import i18n from 'modules/i18n'
import validator from 'modules/validator'
import core from 'modules/core'

import Root from './views/root'

import news from 'modules/news'
/**
 * 全局配置
 */
configure({
  // 项目名称
  name: 'coding',
  // 项目版本号
  version: '1.0.0',
  // 系统自动将 component 挂载到 element
  element: '#app',
  component: Root
})

/**
 * Use Modules
 */

/**
 * 调试相关
 */
__DEV__ && use(logger)

/**
 * 被依赖的模块，移除可能会影响部分功能
 */
use(i18n)
use(validator)

/**
 * 普通模块
 */
// use(xxx, { prefix: 'xxx' })
// use(yyy, { prefix: 'yyy' })
// use(zzz, { prefix: 'zzz' })
use(news)
/**
 * 核心模块
 */
use(core)
use(persist)

/**
 * Run Modules
 */

run(({ router }) => {
  __PROD__ || console.log('%c[PLATO] %cLet\'s go!',
    'font-weight: bold', 'color: green; font-weight: bold')

  /**
   * Let's go!
   */
  router.afterEach(() => {
    // 解决 iOS 焦点 BUG
    const activeElement = document.activeElement
    if (activeElement && activeElement.nodeName !== 'BODY') {
      activeElement.blur()
    }
  })
})
