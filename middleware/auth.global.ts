import { useAuthStore } from '~/stores/auth';


export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return;
  const auth = useAuthStore();
 

  const publicPages = ['/'  ,'/login'];

  if (publicPages.includes(to.path)) {
    return; 
  }

  if (auth.isAuth && auth.token &&  to.path === '/login') {
    return navigateTo('/groups');
  }

  if (!auth.token && !publicPages.includes(to.path) && !auth.isAuth) {
    return navigateTo('/' ,{ external: true });
  }
});
