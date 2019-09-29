### 因为实在没什么东西写，所以写一点拓展
## 【主流开源协议之间的区别？】（https://www.zhihu.com/question/19568896/answer/20907890）

## 提交代码到远程仓库
1. git add .
2. git commit -m "提交信息"
3. git push

## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabber 区域，使用的是 MUI 的 Tabber.html
  + 在制作 购物车 小图标时：
   + 先把 扩展图标的 css 样式，copy到项目中
   + copy 扩展字体库 ttf文件到项目中
   + 为 购物车图标 添加样式：mui-icon mui-icon-extra mui-icon-extra-cart
3. 要在 中间区域 放置一个 router-view 来展示路由匹配到的组件

## 改造 tabber 为 router-link

## 设置路由高亮

## 点击 tabber 中的路由链接，展示对应的路由组件

## 制作首页轮播图

## 加载首页轮播图数据
1. 获取数据，使用 vue-resource
2. 使用 vue-resource 中的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 上
4. 通过 v-for 循环渲染到每个 item 项

## 改造九宫格区域样式

## 为组件添加动画

## 改造 新闻资讯 路由链接

## 新闻资讯页面制作
1. 绘制界面，使用 mui中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中每一项改造为 router-link，同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情组件页面， NewsInfo.vue
3. 在路由模块中，将 新闻详情 的组件地址和 页面对应起来

## 实现 新闻详情 的页面布局和详情渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先导入comment组件
  +  `import comment from './comment.vue'`
3. 在父组件中，使用 'components'属性，导入comment组件，注册为自己的子组件
4. 将注册的子组件的名称以 标签 的形式，在页面中引用

## 获取所有的评论数据，渲染到页面中

## 实现点击加载更多评论的功能
1. 为 加载更多 按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让 pageIndex++，然后重新调用 this.getComment() 重新获取新一页的数据
3. 为了防止 新数据 覆盖 老数据的情况，我们在点击加载更多时，每当获取到更多数据时，要把老数据 调用数组的 concat 方法，拼接上新数组

## 发表评论
1. 把文本框做双向绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast用户写点东西
4. 通过 vue-resource 发送一个请求，把评论内容提交给 服务器
5. 当发表评论ok后，重新刷新列表，以查看最新的评论
  + 如果调用 getComments方法，重新刷新列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
  + 换一种思路：当评论成功后，在客户端，手动拼接出一个最新评论对象，然后，调用数组的 unshift方法，把最新的评论，追加到data中的 comments 的开头，就可实现刷新列表的需求

## 改造 图片分享按钮 为 路由链接 并显示对应的 组件页面

## 绘制 图片列表 组件页面结构并美化样式
1. 制作顶部的滑动条
2. 制作底部的的图片列表
### 制作顶部滑动条的坑
1. 需要借助于 MUI 中的 tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过官方文档，可知这是JS组件，需要被初始化：
  + 导入 mui.js
  + 调用官方提供的方式初始化
  ……………………………………………………
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  …………………………………………………………
4. 如果初始化滑动条时，导入 mui.js报错：Uncatch TypeError: 'caller', 'callee'...may not be accessed on strict mode
  + 所以可能是 mui.js 中用到了 'caller'等，但是webpack打包好的bundle.js中，默认启用严格模式，所以两者冲突
  + 解决方案：1. 把mui.js中的非严格模式代码改掉，但是不现实；2. 把webpack打包时的严格模式禁掉。
  + 显然选择第二种。移除严格模式，使用插件：@babel/plugin-transform-modules-commonjs @babel/plugin-transform-strict-mode
5. 刚进入 图片分享页面时，滑动条无法正常工作，因为初始化滑动条必须要在DOM元素加载完毕后，所以可以把滑动条初始化代码放到 mounted 钩子函数中
6. 当 滑动条 调式ok后，tabbar无法正常工作了，这时，需要给每个tabbar按钮的样式中 mui-tab-item 重命名
7. 获取所有分类，并渲染分类列表

### 制作图片列表区域
1. 图片列表需要使用懒加载技术，可以使用 Mit-UI 提供的组件“lazy-load”
2. 根据“lazy-load”使用文档使用
3. 渲染图片列表数据

### 实现了 图片列表的 懒加载改造和样式美化

## 实现了 点击图片 跳转到 图片详情页
1. 在改造 li 为 router-link 时，需要使用 tag 属性指定要渲染为 哪种元素

## 实现详情页面的布局，同时获取数据渲染页面

## 实现图片详情中 缩略图的功能
1. 使用 插件 vue-preview 插件
2. 获取所有的图片列表，然后使用 v-for指令渲染数据
3. 注意：img标签上的class不能去掉（以前是这样，现在不知道了，可以自己试试）
4. 注意：每个图片数据对象中，必须有 w 和 h 属性（获取回来的数据没有，需要自己添加）

## 绘制 商品列表 页面基本结构并美化

## 尝试在手机上 进行项目的预览和测试
1. 要保证手机正常运行
2. 保证 手机 和 开发项目的电脑 处于同一个WIFI环境中，也就是说手机可以访问到电脑的IP
3. 打开项目的 package.json 文件，在dev脚本中，添加一个 --host指令，把当前电脑的WIFI IP地址，设置为 --host指令值
  + 如何查看IP：cmd -> ipconfig
4. 