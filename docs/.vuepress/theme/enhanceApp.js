import posts from "./mixins/posts.js"
import theme from "./mixins/theme.js"

/* eslint-disable no-unused-vars */
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.mixin(posts)
  Vue.mixin(theme)
}