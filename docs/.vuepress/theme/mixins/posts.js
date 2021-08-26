import { sortPosts, parsePostPath } from "../util/post.js";

export default {
    computed: {
        // 对文章进行过滤 (非首页、非类别、非隐藏、路径包含 yyyy-mm-dd 格式日期)
        $filterPosts() {
            return this.$site.pages.filter(page => {
                const { frontmatter: { home, layout, hidden } } = page;
                const date = parsePostPath(page);
                if (date) page.frontmatter.date = date;
                return !home && layout !== 'category' && date && hidden !== true;
            });
        },

        // 根据时间对文章进行排序
        $sortAllPosts() {
            this.$filterPosts.map(post => {

            })
            return sortPosts(this.$filterPosts);
        },

        // 根据年份对文章进行分类
        $getPostsAnnually() {
            const posts = this.$sortAllPosts;
            let arr = {};
            posts.forEach(post => {
                const { date } = post;
                const { year, month, day } = date.split('-');
                if (!arr[year]) arr[year] = [];
                post[date] = Month[month - 1] + day;
                arr[year].push(post);
            })
            return arr;
        },

        // 对文章进行分类
        $categorizePosts() {
            const posts = this.$filterPosts;
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