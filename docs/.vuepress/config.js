const themeConfig = require("./config/themeConfig.js")
const plugins = require("./config/plugins.js")

module.exports = {
    title: "Catbook",
    description: "A simple and out-of-the-box VuePress theme",
    base: "/",
    head: [["link", { rel: "icon", type: "image/x-icon", href: "/home/favicon.ico" }]],
    themeConfig: themeConfig,
    plugins: plugins
}