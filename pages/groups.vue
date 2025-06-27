<template>
  <div>
    <div class="flex flex-row justify-between p-[24px] border-b-1 border-color">
      <div class="text-amber-50 text-[16px] font-[600]">Groups</div>
      <NuxtLink>
        <div class="color-btn rounded-full w-[28px] h-[28px] relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25.3"
            height="25.3"
            viewBox="0 0 24 24"
            class="absolute top-[1px] left-[2px]"
          >
            <path
              fill="currentColor"
              d="M7 12h4V8h1v4h4v1h-4v4h-1v-4H7zm4.5-9a9.5 9.5 0 0 1 9.5 9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 2 12.5A9.5 9.5 0 0 1 11.5 3m0 1A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5A8.5 8.5 0 0 0 11.5 4"
            />
          </svg>
        </div>
      </NuxtLink>
    </div>
    <div class="p-[24px]">
      <ButtonGroup/>
        
    </div>
  </div>
</template>
<script lang="ts" setup>

import ButtonGroup from '../components/group'
</script>
