<template>
<!-- 问题：因为父组件发起请求获取数据是异步操作，所以不知道什么时候能拿到max_count值，但是，总归有一刻，能拿到真正的max_count -->
<!-- 可以使用watch监听父组件传递过来的max_count值，不管watch会被触发几次，最后一次，肯定是一个合法的 max_count 值 -->
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
    <input class="mui-numbox-input" type="number" value="1" @change="countChanged" ref="numbox" />
    <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'

export default {
  data(){
    return {}
  },
  props: ['max_count'],
  mounted(){
    mui('.mui-numbox').numbox()
  },
  methods: {
    countChanged(){
      // mui中提供了方法获取numbox中的值
      // var count = mui('.mui-numbox').numbox().getValue()
      this.$emit('getcount', parseInt(this.$refs.numbox.value))
    }
  },
  watch: {
    'max_count': function(newVal, oldVal){
      mui('.mui-numbox').numbox().setOption('max', newVal)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>