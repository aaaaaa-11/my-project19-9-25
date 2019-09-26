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