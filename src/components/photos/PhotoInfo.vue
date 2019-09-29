<template>
  <div class="photoinfo-container">
    <!-- 标题 -->
    <h3>{{ photoinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dataFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>
    <hr>
    <!-- 缩略图区域 -->
    <div class="thumbs">
      <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>

    <!-- 图片内容区域 -->
    <div class="img-content" v-html="photoinfo.content">
    </div>
    <!-- 评论区 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue';

export default {
  data(){
    return {
      id: this.$route.params.id, // 从路由中获取到的图片Id
      photoinfo: {}, // 图片详情
      list: []
    }
  },
  created(){
    this.getPhotoInfo()
    this.getThumbs()
  },
  methods: {
    getPhotoInfo(){
      // 获取图片详情
      this.$http.get('api/getimageInfo/' + this.id).then(result => {
        if(result.body.status === 0) {
          this.photoinfo = result.body.message[0]
        }
      })
    },
    getThumbs(){ // 获取缩略图
      this.$http.get('api/getthumimages/' + this.id).then(result => {
        if(result.body.status === 0){
          // 循环每个图片数据，补全图片的宽和高
          result.body.message.forEach((item,idx)=>{
            item.msrc = item.src
            item.w = 600
            item.h = 400
          })
          // 把完整的数据保存到 list 中
          this.list = result.body.message
        }
      })
    },
    handleClose () {
    }
  },
  components: {
    'cmt-box': comment
  }
}
</script>

<style lang="scss">
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 16px;
    margin: 20px 0;
    text-align: center;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
  }
  .img-content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs {
    figure {
      margin: 5px;
      width: 30%;
      float: left;
      img {
        width: 100%;
        box-shadow: 0 0 9px #999;
      }
    }
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
}
</style>