<template>
  <main
    class="home"
    :aria-labelledby="header.image !== null ? 'header-image' : null"
  >
    <header class="header">
      <div class="header-content">
        <a v-if="header.image" href="/" class="header-image">
          <img :src="header.image" alt="avatar" />
        </a>

        <span v-if="header.name" class="header-name">{{ header.name }}</span>

        <span v-if="header.job" class="header-job">{{ header.job }}</span>

        <span v-if="header.msg" class="header-msg">{{ header.msg }}</span>

        <nav class="nav">
          <ul
            v-for="(category, index) in categories"
            :key="index"
            class="nav-list"
          >
            <li class="nav-item">
              <a href="/test">{{ category }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="content">
      <div class="archive">
        <!-- <p class="archive-year">{{ posts }}</p> -->
        <li v-for="(item, index) in posts" :key="index">
          <time class="archive-date" datetime>{{ item.date }}</time>
          <div class="archive-title">
            <a :href="item.permalink">{{ item.title }}</a>
          </div>
        </li>
      </div>
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

    posts() {
      return this.$getAllPosts;
    },

    categories() {
      return this.$getAllCategories;
    },
  },
};
</script>

<style lang="stylus" scoped>
.home {
  position: relative;
  display: block;
  z-index: 0;
  min-height: 40rem;
  margin: ($navbarHeight + 1rem) auto;
  padding-bottom: 2rem;
  background: $contentBg;
  border-radius: 15px;
  box-shadow: 0 0 2px 2px $shadowColor;

  header {
    position: absolute;
    z-index: 1;
    top: 0;
    background-color: $headerBg;
    border-radius: $borderRadius;
    box-shadow: 0 0 2px 2px $shadowColor;

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

  .content {
    padding: 0.5rem;

    .archive {
      color: $archiveColor;

      li {
        margin-bottom: 0.6rem;
        padding: 0;
        list-style: none;

        & a {
          text-decoration: none;
          color: $archiveTitleColor;

          &:hover, &:focus {
            color: $archiveTitleHover;
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
  }
}

@media (min-width: 769px) {
  .home {
    max-width: $homePageWidth;
    padding-top: 2.5rem;
  }

  header {
    width: 18rem;
    height: 100%;
    min-height: 100%;

    .header-content {
      margin-top: 8rem;
      margin-bottom: 4rem;
      overflow: hidden;
      width: 100%;
    }
  }

  .content {
    margin-left: 20rem;

    .archive {
      max-width: 30rem;
      margin-top: 5rem;
    }
  }
}

@media (max-width: 768px) {
  .home {
    padding-top: 16rem;
    min-height: 75%;
    max-width: 92%;
  }

  header {
    width: 100%;
    height: 9rem;

    .header-content {
      margin-top: 3rem !important;
      width: 100%;
    }
  }

  .nav {
    display: none;
  }

  .archive {
    margin-top: 2rem;
    margin-left: 1.2rem;
    margin-right: 1.2rem;
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