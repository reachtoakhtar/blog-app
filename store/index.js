import Vuex from 'vuex'
import http from '@/services/httpService'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
        state.loadedPosts[postIndex] = editedPost
      },
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      setToken(state, token) {
        state.token = token
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        try {
          const { data } = await http.get(process.env.baseUrl + '/posts.json')
          const postArray = []
          for (const key in data) {
            if (data) {
              postArray.push({ ...data[key], id: key })
            }
          }
          vuexContext.commit('setPosts', postArray)
        } catch (ex) {
        }
      },
      async addPost(vuexContext, post) {
        try {
          const createdPost = { ...post, updatedDate: new Date() }
          const response = await http.post(process.env.baseUrl + '/posts.json', createdPost)
          vuexContext.commit('addPost', {
            ...createdPost,
            id: response.data.name
          })
          return response
        } catch (ex) {
        }
      },
      async editPost(vuexContext, editedPost) {
        try {
          await http.put(process.env.baseUrl + '/posts/' + editedPost.id + '.json', editedPost)
          vuexContext.commit('editPost', editedPost)
        } catch (ex) {
        }
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      async authenticateUser(vuexContext, authData) {
        const authUrl = authData.isLogin
          ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.firebaseAPIKey
          : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.firebaseAPIKey

        try {
          const response = await http.post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          vuexContext.commit('setToken', response.data.idToken)
          return response
        } catch (ex) {}
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    }
  })
}

export default createStore
