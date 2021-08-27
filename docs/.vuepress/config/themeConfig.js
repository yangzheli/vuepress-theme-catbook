module.exports = {
  author: "yangzheli",
  nav: [
      { text: "Home", link: "/" },
      {
          text: "Theme",
          ariaLabel: "Theme Menu",
          items: [
              { text: "light", theme: "light", icon: "/home/s.png" },
              { text: "dark", theme: "dark", icon: "/home/m.png" }
          ]
      },
      { text: "About", link: "/about/" }
  ],
  pageNum: 10,
  smoothScroll: true,
  footer: "",
  sidebar: "auto",
  sidebarDepth: 2,
  repo: "https://github.com/yangzheli/vuepress-theme-catbook",
  editLinks: true,
  editLinkText: "在 Github 上编辑",
  lastUpdated: "上次更新",
  nextLinks: true,
  prevLinks: true,
  copyright: true
}