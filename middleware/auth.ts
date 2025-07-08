import { useAuthStore } from '~/stores/auth';


export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return;
  const auth = useAuthStore();
 



  if (auth.isAuth && auth.token &&  to.path === '/login') {
    return navigateTo('/groups');
  }

  if (!auth.token && !auth.isAuth) {
    return navigateTo('/' ,{ external: true });
  }
});
