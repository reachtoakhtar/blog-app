/**
 * Created by Akhtar on  25/04/2019.
 */

import http from '@/services/httpService'

export default {
  namespaced: true,
  state() {
    return {
      loadedPosts: []
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.loadedPosts = posts
    },
    addPost(state, post) {
      state.loadedPosts.push(post)
    },
    editPost(state, editedPost) {
      const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
      state.loadedPosts[postIndex] = editedPost
    }
  },
  actions: {
    nuxtServerInit(vuexContext, context) {
      http.get('https://nuxt-blog-mah.firebaseio.com/posts.json')
        .then((response) => {
          window.console.log(response)
          const postArray = []
          for (const key in response.data) {
            postArray.push({ ...response.data[key], id: key })
          }
          vuexContext.commit('setPosts', postArray)
        })
        .catch()
    },
    addPost(vuexContext, post) {
      const createdPost = { ...post, updatedDate: new Date() }
      return http.post('https://nuxt-blog-mah.firebaseio.com/posts.json', createdPost)
        .then((response) => {
          vuexContext.commit('addPost', { ...createdPost, id: response.data.name })
        })
        .catch((error) => {
          window.console.log(error)
        })
    },
    editPost(vuexContext, editedPost) {
      return http.put('https://nuxt-blog-mah.firebaseio.com/posts' + editedPost.id + '.json', editedPost)
        .then((response) => {
          vuexContext.commit('editPost', editedPost)
        })
        .catch()
    }
  },
  setPosts(vuexContext, posts) {
    vuexContext.commit('setPosts', posts)
  },
  getters: {
    loadedPosts(state) {
      return state.loadedPosts
    }
  }
}
