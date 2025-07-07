<template>
  <div class="rounded-[16px] color-btn-gp h-[73px] w-[312px] flex flex-row rounded-l-[16px] items-center justify-between">
    <div class="flex flex-col color-btn rounded-l-[16px] p-[10px] gap-[10px] justify-start h-full">
      <div class="rounded-full primary-light h-[20px] w-[20px] p-[1px]" @click="handleEdit">
        <Icon name="material-symbols:edit" class="m-[1px]" />
      </div>
      <div class="rounded-full button-2 h-[20px] w-[20px] p-[1px]" @click="showDeleteModal = true">
        <Icon name="material-symbols:close-rounded" class="m-[1px]" />
      </div>
    </div>

    <div class="flex flex-row items-center justify-start flex-grow gap-3 pl-5">
      <div class="image-wrapper w-10 h-10 rounded-md overflow-hidden">
        <img 
          v-if="project.url" 
          :src="project.url" 
          @error="onImageError" 
          alt="Group icon" 
          class="object-cover w-full h-full"
        />
        <div v-else class="default-icon flex justify-center items-center w-full h-full text-gray-400 text-3xl">
          <img src="../public/icon.png" alt="icon" />
        </div>
      </div>
      <div class="text-white text-base">{{ project.title }}</div>
    </div>

    <div @click="goToTasks" class="w-[16px] h-full primary-light rounded-r-[16px] flex items-center justify-center">
      <Icon name="material-symbols:chevron-right-rounded" class="text-white" size="1.5em" />
    </div>
  </div>

  <DeleteModal v-model="showDeleteModal" @confirm="confirmDelete" @cancel="showDeleteModal = false" />
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

const router = useRouter()
const hasError = ref<boolean>(false)
const showDeleteModal = ref<boolean>(false)

function goToTasks(): void {
  router.push(`/tasks/${props.project.id}`)
}

function handleEdit(): void {
  emit('edit', props.project)
}

function confirmDelete(): void {
  emit('delete', props.project.id)
  showDeleteModal.value = false
}

function onImageError(): void {
  hasError.value = true
  props.project.url = ''
}
</script>