<template>
  <MainLayout>
    <template #header>
      <Header></Header>
    </template>

    <template #content>
      <Content :isCategory="true"></Content>
    </template>
  </MainLayout>
</template>

<script>
import MainLayout from "@theme/components/MainLayout.vue"
import Header from "@theme/components/Header.vue"
import Content from "@theme/components/Content.vue"

export default {
  name: "Categories",

  components: {
    MainLayout,
    Header,
    Content
  }
}
</script>