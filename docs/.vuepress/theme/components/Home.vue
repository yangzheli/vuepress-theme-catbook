<template>
  <main class="home" :aria-labelledby="header.image !== null ? 'header-image' : null">
    <header class="header">
      <a v-if="header.image" href="/" class="header-image">
        <img :src="$withBase(header.image)" alt="avatar" />
      </a>

      <span v-if="header.name !== null" class="header-name">{{ header.name || 'name' }}</span>

      <span v-if="header.job !== null" class="header-job">{{ header.job || 'job' }}</span>

      <span v-if="header.msg !== null" class="header-msg">{{ header.msg || 'msg' }}</span>

      <nav v-for="item in [1,2,3]" class="nav">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="/test">test</a>
          </li>
        </ul>
      </nav>
    </header>

    <div class="archive">
      <p class="archive-year">{{posts}}</p>
      <li>
        <time class="archive-date" datetime>Apr 30</time>
        <div class="archive-title">
          <a href="/">test</a>
        </div>
      </li>
    </div>
  </main>
</template>

<script>
export default {
  name: "Home",

  computed: {
    data() {
      return this.$page.frontmatter;
    },

    header() {
      return this.data.header;
    },

    posts(){
      return this.$page;
    }
  }
};
</script>

<style lang="stylus" scoped>
.home {
  position: relative;
  display: block;
  max-width: $homePageWidth;
  margin: ($navbarHeight + 1rem) auto;

  header {
    position: absolute;
    z-index: 1;
    top: 0;
    width: 18rem;
    min-height: 32rem;
    padding: 8rem 0;
    background-color: $headerBg;
    text-align: center;
    border-radius: $borderRadius;
    box-shadow: 0 0 2px 2px $shadowColor;

    .header-image img {
      border: none;
      box-sizing: border-box;
      height: 7rem;
      width: 7rem;
      border-radius: 50%;

      &:hover {
        cursor: pointer;
        animation: jiggle 2s ease-in-out infinite;
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

  .archive {
    min-height: 32rem;
    padding: 8rem 2rem;
    margin-left: 18rem;
    background-color: $contentBg;
    color: $archiveColor;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        margin-bottom: 0.6rem;
      }
    }

    & a {
      text-decoration: none;
      color: $archive_title;

      &:hover, &:focus {
        color: $archive_title_hover;
      }
    }

    .archive-date {
      text-transform: uppercase;
    }

    .archive-title {
      word-wrap: normal;
    }

    .archive-type {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .archive-year {
      font-size: 1.2rem;
      margin-top: 1.4rem;
      margin-bottom: 0.6rem;
    }
  }
}
</style>