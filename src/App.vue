<template>
  <div class="app-container">
    <!-- 顶部 Header 区域 -->
    <mt-header class="myheader" fixed title="页面顶部">
			<span @click="goback" slot="left" v-show="flag">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>

    <!-- 中间 router-view 区域 -->
		<transition>
			<router-view></router-view>
		</transition>

    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
		<router-link class="mui-tab-item-lib" to="/home">
			<span class="mui-icon mui-icon-home"></span>
			<span class="mui-tab-label">首页</span>
		</router-link>
			<router-link class="mui-tab-item-lib" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-lib" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-lib" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
	data(){
		return {
			flag: false // 控制 返回 组件的显示/隐藏
		}
	},
	methods: {
		goback(){ // 返回上一页
			this.$router.go(-1)
		}
	},
	created(){ // 页面一加载就判断当前页面是否为首页，然后再确定是否显示 返回组件
		if(this.$route.path === '/home'){
			this.flag = false
		}else {
			this.flag = true;
		}
	},
	watch: { // 监听路由变化，如果为首页，隐藏返回组件，否则显示
		'$route.path': function(newVal){
			if(newVal === '/home'){
				this.flag = false;
			}else {
				this.flag = true
			}
		}
	}
}

</script>

<style lang="scss" scoped>
.app-container {
	overflow-x: hidden;
  padding-top: 40px;
	padding-bottom: 50px;
	.myheader {
		z-index: 99;
	}
}

.v-enter {
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to {
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active, .v-leave-active {
	transition: all .5s ease;
}

// 改类名，解决tabbar无法切换问题
.mui-bar-tab .mui-tab-item-lib.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-lib {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-lib .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-lib .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>