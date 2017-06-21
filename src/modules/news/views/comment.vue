<template>
  <div class="wrapper comment">
    <div class="top-bar-left top-bar">
      <a href="javascript:;" class="top-bar-btn-back" @click="back()"></a>
    </div>
    <div class="comment-list">
      <app-loading v-show="loading"></app-loading>
      <div class="comment-item clearfix" v-for="comment in comments">
        <div class="comment-hd clearfix">
          <span class="comment-user">{{comment.userName}}</span>
          <span class="comment-time">{{formatDate(comment.createTime)}}</span>
        </div>
        <p v-html="subContent(comment.content, toggles[comment.i])" ></p>
        <a href="javascript:;" @click="toggle(comment)"  class="show-all"  v-if="comment.content.length > 200">
          {{toggleExpand(toggles[comment.id])}}
        </a>
      </div>
      <comment-input :news-id="$route.params.id"></comment-input>
    </div>
  </div>
</template>
<style>

</style>
<script>
  import AppLoading from '../components/loading'
  import CommentInput from '../components/comment-input'
  export default{
    data () {
      return {
        content: '',
        newsID: this.$route.params.id,
        toggles: {}
      }
    },
    mapActions: ['getCommentList'],
    mapGetters: ['commentMap', 'loading'],
    methods: {
      back () {
        this.$router.back()
      },
      formatDate (time) {
        return new Date(+time).format('yyyy-MM-dd hh:mm:ss')
      },
      toggle (comment) {
        this.toggles[comment.id] = !this.toggles[comment.id]
      },
      toggleExpand (show) {
        return show ? '收起' : '展开'
      },
      subContent (content, show = false) {
        content = content || ''
        return content.length > 200 && !show ? content.substr(0, 199) : content
      },
      findCommentList () {
        this.getCommentList({ id: this.$route.params.id })
      }
    },
    computed: {
      comments () {
        return this.commentMap.map(item => {
          const obj = Object.assign({}, item)
          this.$set(this.toggles, obj.id, false)
          return obj
        })
      }
    },
    created () {
      console.log('Component news comment created')
    },
    destroyed () {
      console.log('Component news comment destroyed')
    },
    activated () {
      console.log('Component news comment activated ')
      this.findCommentList()
    },
    components: { AppLoading, CommentInput }
  }
</script>
<style src="../styles/css/style.css"></style>
