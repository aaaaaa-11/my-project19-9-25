<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>
    <hr>
    <div class="goodsdesc-content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      id: this.$route.params.id,
      info: {}
    }
  },
  created(){
    this.getInfo()
  },
  methods: {
    getInfo(){ // 获取图文介绍
      this.$http.get('api/goods/getdesc/' + this.id).then(result => {
        if(result.body.status === 0){
          this.info = result.body.message[0]
        }
      })
    }
  }
}
</script>

<style lang="scss">
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 14px;
    color: #26a2ff;
    text-align: center;
    padding: 10px 0;
  }
  img {
    width: 100%;
  }
}
</style>