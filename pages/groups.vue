<template>
  <div>
    <div class="flex flex-row justify-between p-[24px] border-b-1 border-color">
      <div class="text-amber-50 text-[16px] font-[600]">Groups</div>
      
        <div class="color-btn rounded-full w-[28px] h-[28px] relative" >
          
        <Icon name="material-symbols:add-circle-outline-rounded" size="1.5em" class="absolute top-[2px] left-[2px]"/>

        </div>
      
    </div>
    <div class="p-[24px]">
      <ButtonGroup/>
        
    </div>
  </div>
</template>
<script lang="ts" setup>

import ButtonGroup from '../components/group.vue'
</script>
