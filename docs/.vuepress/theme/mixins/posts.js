const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块

export default {
    computed: {
        // 获取所有文章 (非首页、非类别、非隐藏)
        $getAllPosts() {
            return this.$site.pages.filter(page => {
                const { frontmatter: { home, layout, hidden } } = page;
                return !home && layout !== 'category' && hidden !== true;
            }).map(page => page.frontmatter);
        },

        // 对文章进行分类
        $categorizePosts() {
            const posts = this.$getAllPosts;
            let arr = {};
            posts.forEach(post => {
                const { categories } = post;
                categories && categories.forEach(category => {
                    if (!arr[category]) arr[category] = [];
                    arr[category].push(post);
                })
            })
            return arr;
        }
    }
}