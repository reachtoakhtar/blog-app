<!-- Created by Akhtar on 22/04/19 -->

<template>
  <div class="posts-page">
    <PostList isAdmin/>
  </div>
</template>

<script>
import PostList from '@/components/posts/PostList'
export default {
  components: {
    PostList
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
