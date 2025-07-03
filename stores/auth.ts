// 
import { defineStore } from 'pinia'

interface AuthState {
  userId: string | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    userId: null,
    token: null
  }),

  actions: {
    /** فراخوانی هنگام لاگین موفق */
    login({ userId, token }: { userId: string; token: string }) {
      this.userId = userId
      this.token  = token
      localStorage.setItem('userId', userId)
      localStorage.setItem('token',  token)
    },

    /** خروج از حساب */
    logout() {
      this.userId = this.token = null
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
    },

    /** بازیابی وضعیت پس از رفرش صفحه */
    hydrate() {
      this.userId = localStorage.getItem('userId')
      this.token  = localStorage.getItem('token')
    }
  }
})
