<!-- Created by Akhtar on 22/04/19 -->

<template>
  <div class="posts-page">
    <PostList is-admin :posts="loadedPosts" />
  </div>
</template>

<script>
export default {
  middleware: 'log',
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>

<style scoped>
.post-list {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
