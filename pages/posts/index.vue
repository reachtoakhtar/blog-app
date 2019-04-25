<!-- Created by Akhtar on 22/04/19 -->

<template>
  <div class="posts-page">
    <PostList isAdmin :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from '@/components/posts/PostList'
export default {
  components: {
    PostList
  },
  data() {
    return {
      loadedPosts: [
        {
          id: '1',
          title: 'First Post',
          previewText: 'This is our First Post',
          thumbnail: 'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg'
        },
        {
          id: '2',
          title: 'Second Post',
          previewText: 'This is our Second Post',
          thumbnail: 'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg'
        },
        {
          id: '3',
          title: 'Third Post',
          previewText: 'This is our Third Post',
          thumbnail: 'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg'
        }
      ]
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
