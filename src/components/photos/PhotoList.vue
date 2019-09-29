<template>
  <div>
    <!-- 顶部滑动区域 -->
    <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item', item.id==0 ? 'mui-active' : '']" v-for="item in imgCategory" :key="item.id" @tap="getPhotoListByCategoryId(item.id)">
						{{ item.title }}
					</a>
				</div>
			</div>
		</div>

		<!-- 图片列表 -->
		<ul class="photo-list">
			<router-link :to="'/home/photoinfo/' + item.id" v-for="item in list" :key="item.id" tag="li">
				<img v-lazy="item.img_url">
				<div class="photo-list-content">
					<h3 class="photo-list-content__title">{{ item.title }}</h3>
					<p class="photo-list-content__body">{{ item.zhaiyao }}</p>
				</div>
			</router-link>
		</ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import mui from '../../lib/mui/js/mui.js';
// 当组件还没渲染好时，就初始化滑动控件，没有意义
// mui('.mui-scroll-wrapper').scroll({
// 	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
// });

export default {
	data(){
		return {
			imgCategory: [], // 所有分类的列表数组
			list: [], // 所有图片列表的数组
		}
	},
	created(){
		this.getImgCategory()
		// 默认进入页面就请求所有图片列表的数据
		this.getPhotoListByCategoryId(0)
	},
  mounted() {
		// 初始化滑动控件
		// 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数，
		// 如果要操作元素了，最后在 mouted 里面，因为这里的DOM元素是最新的
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
	},
	methods: {
		getImgCategory(){
			this.$http.get('api/getimgcategory').then(result => {
				if(result.body.status === 0){
					result.body.message.unshift({ title: "全部", id: 0 })
					this.imgCategory = result.body.message
				}else{
					Toast('获取图片分类失败')
				}
			})
		},
		getPhotoListByCategoryId(cateId){
			// 根据分类id获取图片列表
			this.$http.get('api/getimages/' + cateId).then(result=>{
				if(result.body.status === 0) {
					this.list = result.body.message
				}else{
					Toast('获取图片失败')
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
// 因为谷歌浏览器的新特性，需要设置一下
* {
	touch-action: pan-y;
}

// 图片列表
.photo-list {
	list-style-type: none;
	padding: 10px;
	padding-bottom: 0;
	margin: 0;
	li {
		text-align: center; // 让懒加载的小图标居中
		background-color: #ccc;
		margin-bottom: 10px;
		box-shadow: 0 0 9px #999;
		position: relative;
		img {
			width: 100%;
			vertical-align: middle;
		}
		img[lazy="loading"] {
			width: 40px;
			height: 300px;
			margin: auto;
		}
	}
	// 图片列表项的描述信息
	&-content {
		background-color: rgba(0, 0, 0, 0.3);
		color: #fff;
		text-align: left;
		position: absolute;
		bottom: 0;
		max-height: 84px;
		&__title {
			font-size: 14px;
		}
		&__body {
			font-size: 13px;
		}
	}
}
</style>