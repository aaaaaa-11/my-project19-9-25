<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在组件中使用 -->
      <!-- 将来谁调用此组件，就该向里面传递一个 lunbotuList -->
      <!-- 此时，lunbotuList 应该是父组件向子组件传值 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <!-- 可以根据参数 isfull 是否为真设置图片宽度是否100% -->
        <!-- 还可以这样写 :class="isfull ? 'full' : ''" -->
        <img :src="item.img_url" alt="" :class="{ full: isfull }">
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!-- 商品详情页中的轮播图丑，因为 -->
  <!-- 1. 首页中的图片，都是用来 100% 的宽 -->
  <!-- 2. 商品详情页中的轮播图，如果也使用宽为100%的话，图片会变形 -->
  <!-- 3. 商品详情页轮播图期望高度 100%，但是宽度为自适应 -->
  <!-- 4. 经分析：首页中的轮播图和详情页中的轮播图，分歧点应该是 宽度为100%还是自适应 -->
  <!-- 5. 既然使用轮播图的其他方面没有冲突，只是宽度有分歧，那么可以定义一个属性，让轮播图的调用者，手动指定是否为 100% 的宽度 -->
</template>

<script>
export default {
  data(){
    return {
      // lunbotyList: []
    }
  },
  props: ["lunbotuList", "isfull"]
}
</script>

<style lang="scss" scoped>
// 轮播图
.mint-swipe {
  width: 100%;
  height: 200px;
  .mint-swipe-item { // 轮播图的item
    text-align: center;
    img {
      height: 100%;
    }
  }
  .full {
    width: 100%;
  }
}
</style>