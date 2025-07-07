<template>
  <div class="flex justify-center mt-[48px]">
    <img src="../public/logoo.png" alt="Logo" />
  </div>

  
  <div v-if="error" class="bg-red-100 text-red-700 rounded-md shadow-md py-3 m-[16px] text-center">
    {{ error }}
  </div>

 
  <form @submit.prevent="onSubmit" class="flex flex-col justify-center items-center mx-[25px] p-[16px] gap-[24px] text-center text-[500] absolute top-[392px]">
    <div>
      <div class="mb-[8px]">
        <label class="color-label text-[13px]" for="password">Password</label>
      </div>
      <input
        v-model="password"
        type="password"
        name="password"
        class="color-input px-4 rounded-[8px] outline-none text-amber-50"
      />
    </div>

    <button type="submit" class="color-btn rounded-[8px] text-[14px] size-btn">Log In</button>

    <div class="text-red-600 text-[13px] cursor-pointer" @click="resetFactory">
      Reset Factory
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { navigateTo } from 'nuxt/app';


const auth = useAuthStore();
const password = ref<string>('');
const error = ref<string>('');


const onSubmit = (): void => {
  error.value = '';  


  const savedUser = localStorage.getItem('user');
  if (!savedUser) {
    error.value = 'No user found. Please register first.';
    return;
  }

  const parsedUser = JSON.parse(savedUser);


  if (password.value === parsedUser.password) {
    auth.isAuth = true;
    localStorage.setItem('token', parsedUser.access);
    navigateTo('/groups');
  } else {
    error.value = 'Password is incorrect.';
  }
};

const resetFactory = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  navigateTo('/');
};
</script>