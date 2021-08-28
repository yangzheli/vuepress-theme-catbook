<template>
  <MainLayout>
    <template #header>
      <Header></Header>
    </template>

    <template #content>
      <Content></Content>
    </template>
  </MainLayout>
</template>

<script>
import MainLayout from "@theme/components/MainLayout.vue"
import Header from "@theme/components/Header.vue"
import Content from "@theme/components/Content.vue"

export default {
  name: "Home",

  components: {
    MainLayout,
    Header,
    Content,
  },
}
</script>