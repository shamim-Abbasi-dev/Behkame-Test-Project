<template>
  <div class="flex justify-center mt-[48px]">
    <NuxtImg src="./public/logoo.png" alt="Logo" width="70px" height="35px" />
    <div class="text-white font-[600]">Hi</div>
  </div>
  <form
    @submir.prevent="onSubmit"
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
      />
    </div>
    <div>
      <div class="mb-[8px]">
        <label class="color-label text-[13px] size-btn" for="password">Password</label>
      </div>
      <input
        type="password"
        name="password"
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
        class="color-input px-4 rounded-[8px] outline-none text-amber-50"
      />
    </div>
    <button class="color-btn rounded-[8px] text-[14px]">Register</button>
  </form>
</template>
<script setup lang="ts"></script>
