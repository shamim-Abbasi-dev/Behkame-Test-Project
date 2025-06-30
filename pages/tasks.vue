<template>
  <div>
    <div class="flex flex-row justify-between p-[24px] border-b-1 border-color">
      <div class="text-amber-50 text-[16px] font-[600]">Project</div>
     
        <div class="color-btn rounded-full w-[28px] h-[28px] relative"  @click="showModal = true">
          
        <Icon name="material-symbols:add-circle-outline-rounded" size="1.5em" class="absolute top-[2px] left-[2px]"/>

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
