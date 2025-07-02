import { defineStore } from 'pinia';

interface AuthState {
  isAuth: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuth: false,
  }),
 
});