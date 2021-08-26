import { getTimestamp } from "./index.js";

const Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 根据时间对文章进行排序 (最新的在前面)
export function sortPosts(posts) {
    posts.sort((pre, next) => {
        const d1 = pre.date, d2 = next.date;
        if (d1 && d2) return getTimestamp(d2) - getTimestamp(d1);
        else if (d1 && !d2) return -1;
        return 1;
    })
    return posts;
}

// 从 post 路径中解析出年月
export function parsePostPath(post) {
    const { path } = post;
    const match = path.match(/(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})/);
    if (!match || !match.groups) return null;
    const { year, month, day } = match.groups;
    return year + ' ' + Month[month - 1];
    // const arr = path.match(/(?<=\d{4}-\d{1,2}-\d{1,2}-)[a-zA-Z-]+/)
}