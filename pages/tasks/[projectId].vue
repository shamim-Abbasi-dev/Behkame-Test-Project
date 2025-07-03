<template>
  <div>
    <!-- هِدر صفحه -->
    <div class="flex justify-between border-b p-6">
      <h1 class="text-amber-50 text-lg font-semibold">{{ projectTitle }}</h1>

      <div class="flex gap-1">
        <!-- دکمه اضافه -->
        <button
          class="color-btn relative h-7 w-7 rounded-full"
          @click="openModal()"
        >
          <Icon
            name="material-symbols-light:add-circle-outline-rounded"
            size="1.5em"
            class="absolute inset-0 m-auto"
          />
        </button>

        <!-- بازگشت -->
        <NuxtLink to="/groups" class="color-btn relative h-7 w-7 rounded-full">
          <Icon
            name="material-symbols-light:keyboard-return-rounded"
            size="1.5em"
            class="absolute inset-0 m-auto"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- لیست تسک‌ها -->
    <div class="p-6 space-y-4">
      <TaskCard
        v-for="t in tasks"
        :key="t.id"
        :task="t"
        @edit="openModal"
        @delete="handleDelete"
      />
      <p v-if="!tasks.length" class="text-gray-400 text-center">No tasks yet.</p>
    </div>

    <!-- مودال -->
    <TaskModal
      :model-value="showModal"
      @update:model-value="showModal = $event"
      :project-id="projectId"
      :edit-task="editingTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TaskCard from '../../components/task.vue'
import TaskModal from '../../components/modals/createEditTaskModal.vue'
import { useTaskStore, type Task } from '@/stores/task'
import { useProjectStore } from '@/stores/project' 

const route = useRoute()
const projectId = Number(route.params.projectId)
const store = useTaskStore()
const projectStore = useProjectStore() 

const projectTitle = computed((): string => {
  return projectStore.projects.find(p => p.id === projectId)?.title || 'Project'
})

const showModal = ref<boolean>(false)
const editingTask = ref<Task | null>(null)

onMounted(() => {
  store.load(projectId)
})

const tasks = computed(() => store.tasksByGroup(projectId))

function openModal(task: Task | null = null): void {
  editingTask.value = task
  showModal.value = true
}

function handleDelete(id: number): void {
  store.deleteTask(id, projectId)
}
</script>
