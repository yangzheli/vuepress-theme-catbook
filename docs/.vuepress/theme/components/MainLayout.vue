<template>
  <main>
    <div class="home">
      <header class="header">
        <slot name="header"></slot>
      </header>

      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>

    <div class="footer">{{ footer }}</div>
  </main>
</template>

<script>
export default {
  name: "MainLayout",

  computed: {
    footer() {
      return (
        this.$site.themeConfig.footer ||
        "MIT Licensed | Copyright © 2021-present yangzheli"
      )
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/mixin.styl"

main {
  z-index: 0;
  margin: $navbarHeight auto;
  padding: 0;


  .home {
    position: relative;
    min-height: 45rem;
    bg-color($contentBg);

    header {
      position: absolute;
      z-index: 1;
      top: 0;
      border-radius: 15px;
      shadow($shadowColor);
    }

    .content {
      padding: 0.5rem;
      border-radius: 15px;
      shadow($shadowColor);
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid #eaecef;
    border-color($border);
    text-align: center;
    font-color($htmlColor);
  }
}

@media (min-width: 769px) {
  main {
    max-width: $homePageWidth;
    padding-top: 2.5rem;

    header {
      width: 18rem;
      height: 100%;
      min-height: 100%;
    }

    .content {
      min-height: 45rem;
      margin-left: 18.5rem;
    }
  }
}

@media (max-width: 768px) {
  main {
    padding-top: 2.5rem;
    min-height: 75%;
    max-width: 92%;

    .home{
    padding-top: 9rem;
      
      header {
        width: 100%;
        height: 9rem;
      }

      .content {
        min-height: 35rem;
        padding-top: 5rem;
      }
    }
  }
}
</style>