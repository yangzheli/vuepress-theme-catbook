export default {
    mounted() {
        const theme = localStorage.getItem("theme") || "light"
        document.body.setAttribute("theme", theme)
    }
}