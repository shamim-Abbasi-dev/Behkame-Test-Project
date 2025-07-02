<template>
  <div>
    <div class="flex flex-row justify-between p-[24px] border-b-1 border-color">
      <div class="text-amber-50 text-[16px] font-[600]">Groups</div>
      
        <div class=" flex flex-row gap-1" >
          <div class="color-btn rounded-full w-[28px] h-[28px] relative" @click="createModalShow =true">
        <Icon name="material-symbols-light:add-circle-outline-rounded" size="1.5em"  class="absolute top-[2px] left-[2px]"/>

          </div>
          <div class="color-btn rounded-full w-[28px] h-[28px] relative" @click="logout()">
        <Icon name="material-symbols-light:cancel-outline" size="1.5em"  class="absolute top-[2px] left-[2px]"/>

          </div>

        </div>
      
    </div>
    <div >No Groups</div>
    <div  class="p-[24px]">
      <ButtonGroup/>
        
    </div>
  </div>
  <createEditGroupModal v-model="createModalShow"/>
</template>
<script lang="ts" setup>
import createEditGroupModal from '~/components/modals/createEditGroupModal.vue';
import ButtonGroup from '../components/group.vue'
import { useAuthStore } from '~/stores/auth'
import { navigateTo } from '#app'; 

const auth = useAuthStore();

const createModalShow = ref(false)


function logout(): void {
  auth.isAuth = false;
  navigateTo('/login');
}

</script>
