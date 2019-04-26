/**
 * Created by Akhtar on  25/04/2019.
 */

import http from '@/services/httpService'

export default {
  namespaced: true,
  state: {
    loadPosts: []
  },
  mutations: {
    setPosts(state, posts) {
      state.loadPosts = posts
    }
  },
  actions: {
    nuxtServerInit(vuexContext, context) {
      http.get('https://nuxt-blog-mah.firebaseio.com/posts.json')
        .then((response) => {
          const postArray = []
          for (const key in response.data) {
            postArray.push({ ...response.data[key], id: key })
          }
          vuexContext.commit('setPosts', postArray)
          window.console.log(postArray)
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
