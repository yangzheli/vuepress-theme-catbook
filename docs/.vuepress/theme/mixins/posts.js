export default {
    computed: {
        // 根据标签获取所有文章 
        $getAllPosts(category) {
            return this.$site.pages.filter(page => {
                const { frontmatter: { categories, home } } = page;
                return !home;
            }).map(page => page.frontmatter);
        },

        $getAllCategories() {
            let arr = [];
            this.$site.pages.forEach(page => {
                const { frontmatter: { categories } } = page;
                categories && categories.forEach(category => {
                    if (arr.indexOf(category) === -1) arr.push(category);
                })
            })
            console.log(arr)
            return arr;
        }
    }
}