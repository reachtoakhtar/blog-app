/**
 * Created by Akhtar on  25/04/2019.
 */

import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
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
        if (!process.client) {
          window.console.log(context.req)
        }
        return new Promise((resolve, reject) => {
          window.setTimeout(() => {
            vuexContext.commit('setPosts', [
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
            ])
          })
          resolve()
        }, 1000)
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
  })
}

export default createStore
