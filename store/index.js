import Vuex from 'vuex'
import Cookie from 'js-cookie'
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
      },
      clearToken(state, token) {
        state.token = null
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
          const response = await http.post(process.env.baseUrl + '/posts.json?auth=' + vuexContext.state.token, createdPost)
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
          await http.put(process.env.baseUrl + '/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
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
          const token = response.data.idToken
          const tokenExpirationDate = new Date().getTime() + Number.parseInt(response.data.expiresIn) * 1000

          localStorage.setItem('token', token)
          localStorage.setItem('tokenExpirationDate', tokenExpirationDate)

          Cookie.set('jwt', token)
          Cookie.set('tokenExpirationDate', tokenExpirationDate)

          return response
        } catch (ex) {}
      },
      initAuth(vuexContext, request) {
        let token
        let tokenExpirationDate

        if (request) {
          if (!request.headers.cookie) {
            return
          }
          const jwtCookie = request.headers.cookie.split(';')
            .find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }

          token = jwtCookie.split('=')[1]
          tokenExpirationDate = request.headers.cookie.split(';')
            .find(c => c.trim().startsWith('tokenExpirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          tokenExpirationDate = localStorage.getItem('tokenExpirationDate')
        }

        if (new Date() > +tokenExpirationDate || !token) {
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken')

        Cookie.remove('jwt')
        Cookie.remove('tokenExpirationDate')

        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpirationDate')
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}

export default createStore
