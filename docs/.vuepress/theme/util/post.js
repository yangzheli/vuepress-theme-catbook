import { getTimestamp } from "./index.js"

// 根据时间对文章进行排序 (最新的在前面)
export function sortPosts(posts) {
    posts.sort((pre, next) => {
        const d1 = pre.frontmatter.date, d2 = next.frontmatter.date
        if (d1 && d2) return getTimestamp(d2) - getTimestamp(d1)
        else if (d1 && !d2) return -1
        return 1
    })
    return posts
}

// 从 post 路径中解析出日期
export function parsePostPath(post) {
    const { path } = post
    const match = path.match(/(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})/)
    if (!match || !match.groups) return null
    const { year, month, day } = match.groups
    if (!(year && month && day)) return null
    return year + "-" + month + "-" + day
}