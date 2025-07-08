<template>
  <div class="flex h-[73px] w-[312px] items-center gap-3 rounded-[16px]">
    <div class="flex h-[52px] w-[267px] items-center justify-between gap-4 rounded-[16px] p-4 color-btn-gp">
      <span class="text-sm font-bold text-white">{{ task.name }}</span>

      <div class="flex gap-4">
        <button
          type="button"
          class="h-5 w-5 rounded-full p-0.5 button-2"
          @click="showDelete = true"
        >
          <Icon name="material-symbols:close-rounded" size="16" />
        </button>

        <button
          type="button"
          class="h-5 w-5 rounded-full p-0.5 primary-light"
          @click="emit('edit', task)"
        >
          <Icon name="material-symbols:edit" size="16" />
        </button>
      </div>
    </div>

    <button
      type="button"
      class="relative h-10 w-10 cursor-pointer rounded-full button-bg-icon-under"
      @click="$emit('run', task)"
    >
      <span class="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full button-bg-icon-up">
        <Icon name="material-symbols:rocket-launch-rounded" size="22" />
      </span>
    </button>
  </div>

  <ModalsDeleteModal v-model="showDelete" @confirm="confirmDelete" />
</template>

<script setup lang="ts">
import type { Task } from '@/models/task'

const props = defineProps<{ task: Task }>()
const emit = defineEmits<{
  (e: 'edit', t: Task): void
  (e: 'delete', id: number): void
  (e: 'run', t: Task): void
}>()

const showDelete = ref<boolean>(false)

const  confirmDelete =():void => {
  emit('delete', props.task.id)
  showDelete.value = false
}
</script>
