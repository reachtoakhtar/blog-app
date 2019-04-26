<!-- Created by Akhtar on 23/04/19 -->

<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'
import http from '@/services/httpService'

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  methods: {
    onSubmitted(postData) {
      http.post('https://nuxt-blog-mah.firebaseio.com/posts.json', postData)
        .then((result) => {
          window.console.log(result)
        })
        .catch((error) => {
          window.console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
