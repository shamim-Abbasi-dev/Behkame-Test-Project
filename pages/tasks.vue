<template>
  <div>
    <div class="flex flex-row justify-between p-[24px] border-b-1 border-color">
      <div class="text-amber-50 text-[16px] font-[600]">Project</div>
     
         <div class=" flex flex-row gap-1" >
          <div class="color-btn rounded-full w-[28px] h-[28px] relative">
        <Icon name="material-symbols-light:add-circle-outline-rounded" size="1.5em"  class="absolute top-[2px] left-[2px]"/>

          </div>
          <NuxtLink class="color-btn rounded-full w-[28px] h-[28px] relative"  to="/groups">
        <Icon name="material-symbols-light:keyboard-return-rounded" size="1.5em"  class="absolute top-[2px] left-[2px]"/>

          </NuxtLink>

        </div>
        <createEditItemModal v-model="showModal" />
      
    </div>
    <div class="p-[24px]">
      <ButtonTask/>
    </div>
    
  </div>
</template>
<script lang="ts" setup>

import ButtonTask from '../components/task.vue'
import CreateGroupModal from '~/components/modals/createEditGroupModal.vue'
import createEditItemModal from '~/components/modals/createEditItemModal.vue'

const showModal = ref(false)
</script>
