import { useAuthStore } from '~/stores/auth';


export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return;
  const auth = useAuthStore();
  const userString = localStorage.getItem('user');
  const token = userString ? JSON.parse(userString).access : null;
  const passwordAccess = localStorage.getItem('password'); 

  const publicPages = ['/'];

  if (publicPages.includes(to.path)) {
    return; 
  }

  if (auth.isAuth && token &&  to.path === '/login') {
    return navigateTo('/groups');
  }

  if (!token && !publicPages.includes(to.path) && !auth.isAuth) {
    return navigateTo('/' ,{ external: true });
  }
});