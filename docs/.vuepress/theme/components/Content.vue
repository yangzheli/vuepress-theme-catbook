<template>
  <div class="archive">
    <!-- <p class="archive-year">{{ posts }}</p>  -->
    <li v-for="(item, index) in posts" :key="index">
      <time class="archive-date" datetime>{{ item.date }}</time>
      <div class="archive-title">
        <a :href="item.permalink">{{ item.title }}</a>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "Content",

  computed: {
    posts() {
      return this.$getAllPosts;
    }
  }
};
</script>

<style lang="stylus" scoped>
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

@media (min-width: 769px) {
  .archive {
    max-width: 30rem;
    margin-top: 5rem;
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