<template>
  <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
    <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
    <input class="mui-numbox-input" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly />
    <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'

export default {
  data(){
    return {}
  },
  props: ['initcount', 'id'],
  mounted(){
    // 初始化数字选择框组件
    mui('.mui-numbox').numbox()
  },
  methods: {
    countChanged(){ // 数量改变了
      // 立即把最新的数量同步到store中，覆盖之前的数据
      this.$store.commit('updateCount', {id: this.id, count: this.$refs.numbox.value})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>