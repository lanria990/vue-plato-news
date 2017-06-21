<template>
  <div class="comment-input">
    <div class="comment-input-box">

      <div class="expandingArea">
        <!-- 用js将用户输入内容同时放到pre下的span标签里，以达到输入框自适应高度的效果-->
        <pre><span></span><br></pre>
        <textarea class="adaptive_box comment-text" placeholder="写评论" maxlength="300" v-model="content"></textarea>
        <!--剩余可输入字符数-->
        <span class="num">{{300-content.length}}</span>
      </div>

      <div class="btn-send-box">
        <a href="javascript:;" class="btn-send" @click="send">发送</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: ['newsId'],
    data () {
      return {
        content: ''
      }
    },
    methods: {
      filter (content) {
        /* xss 关键词过滤 */
        return content
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/#/g, '&#35;')
          .replace(/\$/g, '&#36;')
          .replace(/(共产党)|(习近平)|(地域狗)|(MMP)/ig, '***')
      },
      send () {
        if (this.contentValid) {
          this.$store.dispatch('news/addComment', {
            comment: {
              'id': Date.now(),
              'newsid': this.newsId,
              'content': this.filter(this.content.trim()),
              'userName': '匿名用户',
              'createTime': Date.now()
            }
          })
          this.clear()
        }
      },
      clear () {
        this.content = ''
      }
    },
    computed: {
      contentValid () {
        return this.content.trim().length > 0 && this.content.trim().length <= 300
      }
    },
    created () {
      console.log('Component comment  input created')
    },
    destroyed () {
      console.log('Component comment  input destroyed')
    }
  }
</script>
