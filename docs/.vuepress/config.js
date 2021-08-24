const { resolve } = require('path')

module.exports = {
    title: 'Catbook',
    description: 'A simple and out-of-the-box VuePress theme',
    base: '/',
    head: [
        ['link', { rel: 'icon', type: "image/x-icon", href: '/img/logo.ico' }],
        ['script', { src: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.js' }]
    ],
    themeConfig: {
        author: 'yangzheli',
        nav: [
            { text: '鱼', link: '/' },
            { text: '目次', link: '/catalog' },
            { text: 'Github', type: 'url', link: 'https://github.com/Chenyating' },
        ],
        catalogUrl: '/_posts',
        lastUpdated: 'Last Updated',
        smoothScroll: true,
        pageNum: 10,
        footer: ''
    },
    markdown: {
        lineNumbers: true
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve(__dirname, './public'),
            }
        }
    }
}