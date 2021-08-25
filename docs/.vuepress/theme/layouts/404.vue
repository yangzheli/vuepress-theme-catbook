<template>
  <section class="fourzerofour">
    <div>
      <img src="/home/cat-404.jpg" width="300px" />

      <blockquote>{{ getMsg() }}</blockquote>Go
      <RouterLink to="/">home</RouterLink>:)
    </div>
  </section>
</template>

<script>
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`
];

export default {
  methods: {
    getMsg() {
      return msgs[Math.floor(Math.random() * msgs.length)];
    }
  }
};
</script>

<style lang="stylus" scoped>
.fourzerofour {
  text-align: center;
  font-size: 1.3rem;
  margin-top: 7rem;
}
</style>
