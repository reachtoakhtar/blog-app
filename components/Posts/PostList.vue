<!-- Created by Akhtar on 23/04/19 -->

<template>
  <section class="post-list">
    <PostPreview
      id="1"
      title="Post Title"
      previewText="Preview Text"
      thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"/>
    <PostPreview
      id="2"
      title="Post Title 2"
      previewText="Preview Text"
      thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"/>
    <PostPreview
      id="3"
      title="Post Title 3"
      previewText="Preview Text"
      thumbnail="https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"/>
  </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'

export default {
  components: {
    PostPreview
  }
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
