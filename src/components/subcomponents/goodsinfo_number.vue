<template>
  <div class="mui-numbox" data-numbox-min='0' data-numbox-max='10'>
    <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
    <input class="mui-numbox-input" type="number" />
    <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'

export default {
  mounted(){
    mui('.mui-numbox').numbox()
  }
}
</script>

<style lang="scss" scoped>

</style>