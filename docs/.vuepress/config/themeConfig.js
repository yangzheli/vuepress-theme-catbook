module.exports = {
  author: 'yangzheli',
  nav: [
      { text: 'Home', link: '/' },
      {
          text: 'Theme',
          ariaLabel: 'Theme Menu',
          items: [
              { text: 'Light', link: '/' },
              { text: 'Dark', link: '/' }
          ]
      },
      { text: 'About', link: '/about/'},
      { text: 'Github', link: 'https://github.com/yangzheli/vuepress-theme-catbook' }
  ],
  pageNum: 10,
  smoothScroll: true,
  footer: '',
  sidebar: 'auto',
  sidebarDepth: 2,
  editLinks: true,
  lastUpdated: '上次更新',
  nextLinks: true,
  prevLinks: true
}