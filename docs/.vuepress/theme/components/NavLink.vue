<template>
  <div v-if="item.theme" class="nav-link theme">
    <img :src="item.icon" :alt="item.theme" />
    <span @click="toggle(item)">{{ item.text }}</span>
  </div>
  <RouterLink
    v-else-if="isInternal"
    class="nav-link"
    :to="link"
    :exact="exact"
    @focusout.native="focusoutAction"
  >{{ item.text }}</RouterLink>
  <a
    v-else
    :href="link"
    class="nav-link external"
    :target="target"
    :rel="rel"
    @focusout="focusoutAction"
  >
    {{ item.text }}
    <OutboundLink v-if="isBlankTarget" />
  </a>
</template>

<script>
import nprogress from "nprogress";
import { isExternal, isMailto, isTel, ensureExt } from "../util";

export default {
  name: "NavLink",

  props: {
    item: {
      required: true
    }
  },

  computed: {
    link() {
      return ensureExt(this.item.link);
    },

    exact() {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(
          rootLink => rootLink === this.link
        );
      }
      return this.link === "/";
    },

    isNonHttpURI() {
      return isMailto(this.link) || isTel(this.link);
    },

    isBlankTarget() {
      return this.target === "_blank";
    },

    isInternal() {
      return !isExternal(this.link) && !this.isBlankTarget;
    },

    target() {
      if (this.isNonHttpURI) {
        return null;
      }
      if (this.item.target) {
        return this.item.target;
      }
      return isExternal(this.link) ? "_blank" : "";
    },

    rel() {
      if (this.isNonHttpURI) {
        return null;
      }
      if (this.item.rel === false) {
        return null;
      }
      if (this.item.rel) {
        return this.item.rel;
      }
      return this.isBlankTarget ? "noopener noreferrer" : null;
    }
  },

  methods: {
    toggle(item) {
      const { theme } = item;
      nprogress.start();
      document.body.setAttribute("theme", theme);
      nprogress.done();
    },

    focusoutAction() {
      this.$emit("focusout");
    }
  }
};
</script>

<style lang="stylus" scoped>
.theme {
  padding: 0 0.8rem;
  line-height: 1.3rem;

  &.router-link-active {
    color: $accentColor;

    &::after {
      content: '';
      width: 0;
      height: 0;
      border-left: 5px solid $accentColor;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      position: absolute;
      top: calc(50% - 2px);
      left: 9px;
    }
  }

  &:hover, &:active {
    color: $accentColor;
  }

  img {
    width: 0.8rem;
    padding: 0 2px;
  }

  span {
    transform: translate(0, -0.1rem);
  }
}
</style>