<template>
  <div
    class="rounded-[16px] h-[73px] w-[312] flex flex-row rounded-l-[16px] items-center justify-between gap-3"
  >
    <div
      class="w-[267px] h-[52px] color-btn-gp rounded-[16px] flex flex-row justify-between p-[16px] items-center"
    >
      <div class="text-white font-bold text-sm">Task</div>
      <div class="flex flex-row gap-[16px]">
        <div class="rounded-full button-2 h-[20px] w-[20px] p-[1px]">
          <Icon
            name="material-symbols:close-rounded"
            size="16pz"
            class="m-[1px]"
          />
        </div>
        <div class="rounded-full primary-light h-[20px] w-[20px] p-[1px]">
          <Icon name="material-symbols:edit" class="m-[1.5px]" />
        </div>
      </div>
    </div>
    <div class="w-[40px] h-[40px] rounded-full button-bg-icon-under relative">
        <div class="w-[32px] h-[32px] button-bg-icon-up rounded-full absolute top-[4px] left-[4px] " @click="showModal = true">
            <Icon name="material-symbols:rocket-launch-rounded" size="22px" class="absolute top-[5px] left-[5px] "  />
        </div>
    </div>
  </div>
  <runTask v-model="showModal"/>
</template>
<script setup lang="ts">
import runTask from './modals/runTask.vue';
const showModal = ref(false)

</script>