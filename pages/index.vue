<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest news!</h1>
    </section>
    <section class="featured-posts">
      <PostPreview
        id = "1"
        title = "Post Title"
        previewText = "Preview Text"
        thumbnail = "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg" />
      <PostPreview
        id = "2"
        title = "Post Title 2"
        previewText = "Preview Text"
        thumbnail = "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg" />
      <PostPreview
        id = "3"
        title = "Post Title 3"
        previewText = "Preview Text"
        thumbnail = "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg" />
    </section>
  </div>
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
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/images/main-background.jpg');
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
