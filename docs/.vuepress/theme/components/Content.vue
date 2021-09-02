<template>
  <div class="archive">
    <div v-for="(value, key) in archives" :key="key">
      <p :class="isCategory ? 'archive-type' : 'archive-year'">{{ value }}</p>
      <li v-for="(item, index) in posts[value]" :key="index">
        <time class="archive-date">{{ item.frontmatter.date }}</time>
        <div class="archive-title">
          <a :href="item.path || item.frontmatter.permalink">{{item.frontmatter.title}}</a>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",

  props: {
    isCategory: Boolean
  },

  computed: {
    archives() {
      if (!this.isCategory) return this.sortPostsYear
      const path = this.$route.path
      const match = path.match(/(?<=\/)[\w]+/g)
      return [match[match.length - 1]]
    },

    posts() {
      return this.isCategory ? this.$categorizePosts : this.$annualPosts
    },

    sortPostsYear() {
      return Object.keys(this.$annualPosts).sort((a, b) => b - a)
    }
  }
}
</script>

<style lang="stylus" scoped>
.archive {
  color: $archiveColor;

  .archive-year {
    font-size: 1.2rem;
    margin-top: 1.4rem;
    margin-bottom: 0.6rem;
  }

  .archive-type {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

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

      a {
        color: #46bd87;

        &:hover {
          color: #87cdbd;
        }
      }
    }
  }
}

@media (min-width: 769px) {
  .archive {
    max-width: 30rem;
    margin: 5rem;

    .archive-date {
      float: right;
    }
  }
}

@media (max-width: 768px) {
  .archive {
    margin-top: 2rem;
    margin-left: 1.2rem;
    margin-right: 1.2rem;
  }
}
</style>