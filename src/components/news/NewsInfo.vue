<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsInfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsInfo.add_time | dataFormat }}</span>
      <span>点击{{ newsInfo.click }}次</span>
    </p>
    <hr>
    <div class="content" v-html="newsInfo.content">
    </div>
    <!-- 评论区 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import comment from '../subcomponents/comment.vue'

export default {
  data(){
    return {
      id: this.$route.params.id, // 将URL地址中传递过来的Id值，挂载到data中，方便以后调用
      newsInfo: {} // 新闻对象
    }
  },
  created(){
    this.getNewsInfo()
  },
  methods: {
    getNewsInfo(){
      this.$http.get('api/getnew/'+ this.id).then(result=>{
        if(result.body.status === 0){
          // message是一个数组，里面只有一个对象，对象中包含所有的数据(键值对)
          // 而newsInfo是一个对象，所以要获取message数组的第一个元素
          this.newsInfo = result.body.message[0]
        }else {
          Toast('获取数据失败')
        }
      })
    }
  },
  components: {
    'comment-box': comment
  }
}

</script>

<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  font-size: 16px;
  .title{
    padding: 10px 0;
    text-align: center;
    color: red;
  }
  .subtitle {
    color: #26a2ff;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  .content {
    color: #aaa;
    img {
      width: 100%;
    }
  }
}
</style>