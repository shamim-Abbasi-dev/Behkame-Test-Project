<template>
  <div
    class="rounded-[16px] color-btn-gp h-[73px] w-[312] flex flex-row rounded-l-[16px] items-center justify-between"
  >
    <div
      class="flex flex-col color-btn rounded-l-[16px] p-[10px] gap-[10px] justify-start h-full"
    >
      <div class="rounded-full primary-light h-[20px] w-[20px] p-[1px]">
        <Icon name="material-symbols:edit" class="m-[1px]" />
      </div>
      <div class="rounded-full button-2 h-[20px] w-[20px] p-[1px]"  @click="showModal = true">
        <Icon name="material-symbols:close-rounded" class="m-[1px]" />
      </div>
    </div>
    <div class="flex flex-row items-center justify-start flex-grow gap-3 pl-5">
      <div>
        <Icon
          name="material-symbols:interests"
          size="2.5em"
          class="text-white"
        />
      </div>
      <div class="text-white text-base">Project</div>
    </div>
    <NuxtLink
      class="w-[16px] h-full primary-light rounded-r-[16px] flex items-center justify-center"
      to="/tasks"
    >
      <Icon
        name="material-symbols:chevron-right-rounded"
        class="text-white"
        size="1.5em"
      />
    </NuxtLink>
  </div>
        <DeleteModal v-model="showModal" />
  
</template>
<script lang="ts" setup>

import { ref } from 'vue'
import DeleteModal from './modals/deleteModal.vue';
const showModal = ref(false)
</script>
