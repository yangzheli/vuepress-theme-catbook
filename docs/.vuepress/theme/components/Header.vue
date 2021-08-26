<template>
  <div class="header-content">
    <a v-if="header.image" href="/" class="header-image">
      <img :src="header.image" alt="avatar" />
    </a>

    <span v-if="header.name" class="header-name">{{ header.name }}</span>

    <span v-if="header.job" class="header-job">{{ header.job }}</span>

    <span v-if="header.msg" class="header-msg">{{ header.msg }}</span>

    <nav class="nav">
      <ul v-for="(category, index) in categories" :key="index" class="nav-list">
        <li class="nav-item">
          <router-link :to="{ path: category.path }">{{ category.title }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",

  computed: {
    data() {
      return this.$page.frontmatter
    },

    header() {
      return this.data.header
    },

    categories() {
      return this.$getCategories
    }
  }
}
</script>

<style lang="stylus" scoped>
.header-content {
  position: absolute;
  text-align: center;

  .header-image img {
    border: none;
    box-sizing: border-box;
    height: 7rem;
    width: 7rem;
    border-radius: 50%;

    &:hover {
      cursor: pointer;
      animation: rotate 2s ease-in-out infinite;
    }
  }

  .header-name {
    display: block;
    color: $headerNameColor;
    font-size: 1.5em;
  }

  .header-job, .header-msg {
    display: block;
    margin-top: 0.2rem;
    color: $headerJobColor;
    font-size: 0.75em;
    font-family: -apple-system, BlinkMacSystemFont, 'Titillium Web', 'Segoe UI', Roboto, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 600;
  }

  .nav {
    margin-top: 1rem;

    .nav-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .nav-item {
      font-weight: 600;
      line-height: 1.4rem;
      display: inline-block;
      zoom: 1;
      opacity: 0.8;

      & a {
        color: $navColor;
        font-size: 90%;

        &:hover, &:focus {
          color: $navHoverColor;
        }
      }
    }
  }
}

@media (min-width: 769px) {
  .header-content {
    margin-top: 8rem;
    margin-bottom: 4rem;
    overflow: hidden;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .header-content {
    margin-top: 3rem;
    width: 100%;

    .nav {
      display: none;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(-3deg);
  }

  50% {
    transform: rotate(0);
  }

  75% {
    transform: rotate(3deg);
  }
}
</style>