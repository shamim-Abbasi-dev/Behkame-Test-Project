<template>
  <div class="flex justify-center mt-[48px]">
    <NuxtImg src="./public/logoo.png" alt="Logo" width="70px" height="35px" />
    <div class="text-white font-[600]">Hi</div>
  </div>
  <form
    @submir.prevent="onSubmit"
    class="flex flex-col justify-center content-center ml-[25px] mr-[25px] p-[16px] gap-[24px] text-center text-[500] absolute top-[392px]"
  >
    <div>
      <div class="mb-[8px]">
        <label class="color-label  text-[13px]" for="password">Password</label>
      </div>
      <input
        type="password"
        name="password"
        class="color-input px-4 rounded-[8px] outline-none text-amber-50"
      />
    </div>

    <button class="color-btn rounded-[8px] text-[14px] size-btn">Log In</button>
    <div class="">
      <NuxtLink to="/register" class="text-red-600 text-[13px]">
        Reset Factory
      </NuxtLink>
    </div>
  </form>
</template>
<script setup lang="ts"></script>
