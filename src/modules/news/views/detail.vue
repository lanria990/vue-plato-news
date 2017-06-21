<template>
  <div class="wrapper detail">
    <div class="top-bar-left top-bar">
      <a href="javascript:;" class="top-bar-btn-back" @click="back()"></a>
    </div>
    <div class="head">
      <h1 class="title">{{newsDetail.title}}</h1>
      <div class="info">
        <span class="time">{{formatDate(newsDetail.createTime)}}</span>
      </div>
    </div>
    <div class="content">
      <div class="photo" v-if="!!newsDetail.img">
        <img :src="imgPath( newsDetail.img )">
      </div>
      <div v-html="newsDetail.content"></div>
    </div>
    <div class="comment-btn-box">
      <a href="javascript:;" class="comment-num">评论数:<span>{{newsDetail.comments && newsDetail.comments.length || 0}}</span></a>
      <router-link :to="{ name: 'comment', params: { id: newsDetail.id } }" class="add-comment">发布评论</router-link>
    </div>
  </div>
</template>
<style>
  .content{
    padding-bottom: 1.2rem; /* 解决文字被遮挡的问题*/
  }
</style>
<script>
  export default{
    mapActions: ['getNewsDetail'],
    mapGetters: ['newsDetail'],
    methods: {
      imgPath (file) {
        return require('../' + file)
      },
      formatDate (time) {
        return new Date(+time).format('yyyy-MM-dd hh:mm:ss')
      },
      back () {
        this.$router.back()
      },
      findNewsDetail () {
        this.getNewsDetail(this.$route.params)
      }
    },
    created () {
      console.log('Component news detail created')
    },
    destroyed () {
      console.log('Component news detail destroyed')
    },
    activated () {
      console.log('Component news detail activated ')
      this.findNewsDetail()
    },
    components: {}
  }
</script>
<style src="../styles/css/style.css"></style>
