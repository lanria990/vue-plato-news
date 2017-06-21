<template>
  <div class="wrapper">
    <div class="top-bar">
      <a href="javascript:;" class="top-bar-btn-refresh" @click="reloadNewMap()"></a>
    </div>
    <div class="cont">
      <app-loading v-show="loading"></app-loading>
      <div class="wb-list">
        <div class="wb-item clearfix" v-for="item in newsList">
          <router-link :to="{ name: 'detail', params: { id: item.id } }" class="wb-item-hd">
            <div class="wb-item-pic" v-if="!!item.img">
              <img :src="imgPath( item.img )">
            </div>
            <div class="wb-item-news-info">
              <div class="wb-item-tit">{{subTitle(item.title)}}</div>
              <div class="wb-item-wrap">
                <div class="wb-item-time">
                  <span>{{formatDate(item.createTime)}}</span>
                </div>
                <div class="wb-item-comment">
                  <span>{{item.comments.length}}</span>评论
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="loading loading-more" v-show="this.scrollLoading">
        <i v-show="!noMore"></i><span v-show="!noMore">正在加载更多</span>
        <span v-show="noMore">无更多新闻</span>
      </div>
    </div>
  </div>
</template>
<style>
  .wb-item-pic{
    float: left \9;
    padding: 0.26667rem \9;
    margin-right:  2.86667rem \9;
  }

  .wb-item-hd{
    color: #333;
  }

</style>

<script>
  import AppLoading from '../components/loading'

  export default{
    data () {
      return {
        pageNum: 1,
        noMore: false,
        scrollLoading: false
      }
    },
    mapActions: ['getNewsList', 'reloadNewsList'],
    mapGetters: ['newsMap', 'loading'],
    methods: {
      imgPath (file) {
        return require('../' + file)
      },
      formatDate (time) {
        return new Date(+time).format('yyyy-MM-dd hh:mm:ss')
      },
      subTitle (title) {
        return title.length > 30 ? title.substr(0, 30) + '...' : title
      },
      findNewsList () {
        this.getNewsList()
      },
      reloadNewMap () {
        this.pageNum = 1 /* 刷新页面 */
        window.scrollTop = 0
        this.reloadNewsList()
      },
      scrollLoadNewsList () {
        this.noMore = this.newsList.length === this.newsMap.length
        this.scrollLoading = true
        if (!this.noMore) {
          window.clearTimeout(this.scrollClear)
          this.scrollClear = setTimeout(() => {
            this.pageNum++
            this.scrollLoading = false
          }, Math.random() * 500 + 100)
          return
        }
        this.scrollLoading = true
      },
      registerScroll () {
        window.clearTimeout(this.registerScrollClear)
        this.registerScrollClear = setTimeout(() => {
          const scrollTop = Math.max(window.pageYOffset || 0, document.body.scrollTop)
          if (document.documentElement.clientHeight + scrollTop >= document.documentElement.scrollHeight - 100) {
            this.scrollLoadNewsList()
          }
        }, 50)
      }
    },
    computed: {
      newsList () {
        const len = Math.min(8 * this.pageNum, this.newsMap.length)
        return this.newsMap.slice(0, len) // 每页加载8条
      }
    },
    created () {
      console.log('Component news list created')
    },
    destroyed () {
      console.log('Component news list destroyed')
    },
    activated () {
      console.log('Component news list activated ')
      this.findNewsList({})
      window.addEventListener('scroll', this.registerScroll)
    },
    components: { AppLoading }

  }
</script>
<style src="../styles/css/style.css"></style>
