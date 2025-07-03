<template>
  <div class="flex justify-center mt-[48px]">
    <NuxtImg src="./public/logoo.png" alt="Logo" width="70px" height="35px" />
    <div class="text-white font-[600]">Hi</div>
  </div>
  <div
    v-if="errors.length"
    class="bg-red-100 text-red-700 p-3 m-6 rounded text-sm"
  >
    <ul>
      <li v-for="err in errors" :key="err">• {{ err }}</li>
    </ul>
  </div>

  <!-- Success message -->
  <div
    v-if="successMessage"
    class="bg-green-100 text-green-700 p-3 m-6 rounded text-sm"
  >
    {{ successMessage }}
  </div>

  <form
    @submit.prevent="onSubmit"
    class="flex flex-col justify-center content-center ml-[25px] mr-[25px] p-[16px] gap-[24px] text-center text-[500] absolute top-[293px]"
  >
    <div>
      <div class="mb-[8px]">
        <label class="color-label text-[13px]" for="token">Access Token</label>
      </div>
      <input
        type="text"
        class="color-input rounded-[8px] outline-none px-4 text-amber-50"
        name="acessToken"
        v-model="formData.access"
      />
    </div>
    <div>
      <div class="mb-[8px]">
        <label class="color-label text-[13px] size-btn" for="password"
          >Password</label
        >
      </div>
      <input
        type="password"
        name="password"
        v-model="formData.password"
        class="color-input px-4 rounded-[8px] outline-none text-amber-50"
      />
    </div>

    <div>
      <div class="mb-[8px]">
        <label class="color-label text-[13px]" for="passwod-repeat"
          >Repeat password</label
        >
      </div>
      <input
        type="password"
        name="passwod-repeat"
        v-model="formData.re_password"
        class="color-input px-4 rounded-[8px] outline-none text-amber-50"
      />
    </div>
    <button class="h-[36px] color-btn rounded-[8px] text-[14px]" type="submit">
      Register
    </button>
  </form>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

interface RegisterForm {
  access: string
  password: string
  re_password: string
}

const formData = reactive<RegisterForm>({
  access: '',
  password: '',
  re_password: '',
})

const errors = ref<string[]>([])
const successMessage = ref('')

const onSubmit = async () => {
  errors.value = []
  successMessage.value = ''

  // 1. basic validation
  if (!formData.access || !formData.password || !formData.re_password) {
    errors.value.push('All fields are required.')
    return
  }
  if (formData.password !== formData.re_password) {
    errors.value.push('Passwords do not match.')
    return
  }

  // 2. duplicate user check
  const existing = localStorage.getItem('user')
  if (existing && JSON.parse(existing).access === formData.access) {
    errors.value.push('Access token already exists.')
    return           
  }


  const user = {
    access: formData.access,
    password: formData.password,
    token: formData.access,
  }
  localStorage.setItem('user', JSON.stringify(user))

  successMessage.value = 'Registration successful! Redirecting…'
  setTimeout(() => navigateTo('/login'), 1200)
}
</script>

