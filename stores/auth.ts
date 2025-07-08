
// import { defineStore } from "pinia";
// import { useProjectStore } from "@/stores/project";
// import { useTaskStore } from "@/stores/task";

// interface AuthState {
//   isAuth: boolean;
//   token: string | null;
// }

// export const useAuthStore = defineStore("auth", {
//   state: (): AuthState => ({
//     isAuth: false,
//     token: null,
//   }),

//   actions: {

//     logout():void {
//       this.token = null;
//       this.isAuth = false;

//       localStorage.removeItem("token");

//       useProjectStore().$reset();
//       useTaskStore().$reset();
//     },

//     hydrate() :void {
//       const token = localStorage.getItem("token");
//       const isAuth = localStorage.getItem("isAuth") === "true";

//       this.token = token;
//       this.isAuth = isAuth && !!token;
//     },
//   },
// });
import { defineStore } from "pinia";
import { useProjectStore } from "@/stores/project";
import { useTaskStore } from "@/stores/task";

interface AuthState {
  isAuth: boolean;
  token: string | null;
}

export const useAuthStore = defineStore("auth", () => {
 
  const isAuth = ref(false);
  const token = ref<string | null>(null);


  const logout = (): void => {
    token.value = null;
    isAuth.value = false;

    localStorage.removeItem("token");

    useProjectStore().reset();
    useTaskStore().reset();
  };

  const hydrate = (): void => {
    const storedToken = localStorage.getItem("token");
    const storedIsAuth = localStorage.getItem("isAuth") === "true";

    token.value = storedToken;
    isAuth.value = storedIsAuth && !!storedToken;
  };

  return {
    isAuth,
    token,
    logout,
    hydrate,
  };
});
