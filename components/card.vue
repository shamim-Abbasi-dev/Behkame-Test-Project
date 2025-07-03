<template>
  <div
    class="rounded-[16px] color-btn-gp h-[73px] w-[312] flex flex-row rounded-l-[16px] items-center justify-between"
  >
    <div
      class="flex flex-col color-btn rounded-l-[16px] p-[10px] gap-[10px] justify-start h-full"
    >
      <div class="rounded-full primary-light h-[20px] w-[20px] p-[1px]" @click="handleEdit()">
        <Icon name="material-symbols:edit" class="m-[1px]" />
      </div>
      <div class="rounded-full button-2 h-[20px] w-[20px] p-[1px]" @click="showDeleteModal = true" >
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
        {{ project.url }}
      </div>
      <div class="text-white text-base">{{ project.title }}</div>
    </div>
    <div @click="goToTasks"
      class="w-[16px] h-full primary-light rounded-r-[16px] flex items-center justify-center"
      to="/tasks"
    >
      <Icon
        name="material-symbols:chevron-right-rounded"
        class="text-white"
        size="1.5em"
      />
    </div>
  </div>
        <DeleteModal  v-model="showDeleteModal" 
    @confirm="confirmDelete" 
    @cancel="showDeleteModal = false" />
  
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DeleteModal from './modals/deleteModal.vue'

const props = defineProps<{
  project: { id: number; title: string; url: string }
}>()

const emit = defineEmits<{
  (e: 'edit', project: typeof props.project): void
  (e: 'delete', projectId: number): void
}>()

const showDeleteModal = ref(false)

const router = useRouter()

function goToTasks() {
  router.push(`/tasks/${props.project.id}`)
}

function handleEdit() {
  emit('edit', props.project)
}

function confirmDelete() {
  emit('delete', props.project.id)
  showDeleteModal.value = false
}
</script>
