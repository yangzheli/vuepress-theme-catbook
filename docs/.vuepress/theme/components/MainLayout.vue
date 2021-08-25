<template>
  <main class="home">
    <header class="header">
      <slot name="header"></slot>
    </header>

    <div class="content">
      <slot name="content"></slot>
    </div>
  </main>
</template>

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
  }

  .content {
    padding: 0.5rem;
  }
}

@media (min-width: 769px) {
  .home {
    max-width: $homePageWidth;
    padding-top: 2.5rem;

    header {
      width: 18rem;
      height: 100%;
      min-height: 100%;
    }

    .content {
      margin-left: 20rem;
    }
  }
}

@media (max-width: 768px) {
  .home {
    padding-top: 16rem;
    min-height: 75%;
    max-width: 92%;

    header {
      width: 100%;
      height: 9rem;
    }
  }
}
</style>