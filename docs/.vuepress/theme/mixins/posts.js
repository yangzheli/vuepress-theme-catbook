import { sortPosts, parsePostPath } from "../util/post.js"

const Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default {
    computed: {
        // 对文章进行过滤 (非首页、非类别、非隐藏、路径包含 yyyy-mm-dd 格式日期)
        $filterPosts() {
            return this.$site.pages.filter((page) => {
                const { frontmatter: { home, layout, hidden } } = page
                const date = parsePostPath(page)
                if (date) page.frontmatter.date = date
                return !home && layout !== "category" && date && hidden !== true
            })
        },

        // 获取文章所有分类
        $getCategories() {
            return this.$site.pages.filter((page) => {
                const { layout } = page.frontmatter
                return layout === "category"
            })
        },

        // 根据时间对文章进行排序
        $sortPosts() {
            return sortPosts(this.$filterPosts)
        },

        // 根据年份对文章进行分类
        $annualPosts() {
            const posts = this.$sortPosts
            let arr = {}
            posts.forEach((post) => {
                const { date } = post.frontmatter
                const [year, month, day] = date.split("-")
                if (!arr[year]) arr[year] = []
                post.frontmatter.date = Month[month - 1] + " " + day
                arr[year].push(post)
            })
            return arr
        },

        // 对文章进行分类
        $categorizePosts() {
            const posts = this.$sortPosts
            let arr = {}
            posts.forEach((post) => {
                const { categories, date } = post.frontmatter
                categories && categories.forEach((category) => {
                    if (!arr[category]) arr[category] = []
                    const [year, month, day] = date.split("-")
                    post.frontmatter.date = Month[month - 1] + " " + day + ", " + year
                    arr[category].push(post)
                })
            })
            return arr
        }
    }
}