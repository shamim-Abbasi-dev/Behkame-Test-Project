<template>
   <div v-if="loading" class="flex justify-center items-center h-screen text-white text-lg">
      Loading...
    </div>
  <div v-else>
    
    <div class="flex justify-between border-b p-6">
      <h1 class="text-amber-50 text-lg font-semibold">{{ projectTitle }}</h1>

      <div class="flex gap-1">
      
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

      
        <NuxtLink to="/groups" class="color-btn relative h-7 w-7 rounded-full">
          <Icon
            name="material-symbols-light:keyboard-return-rounded"
            size="1.5em"
            class="absolute inset-0 m-auto"
          />
        </NuxtLink>
      </div>
    </div>

    <div class="p-6 space-y-4">
      <TaskCard
        v-for="t in tasks"
        :key="t.id"
        :task="t"
        @edit="openModal"
        @delete="handleDelete"
        @run="openRunModal"
      />
      <p v-if="!tasks.length" class="text-white text-center text-lg">
        No tasks yet.
      </p>
    </div>

    <ModalsCreateEditTaskModal
      :key="modalKey"
      :model-value="showModal"
      @update:model-value="showModal = $event"
      :project-id="projectId"
      :edit-task="editingTask"
    />
    <ModalsRunTask
      v-model="showRunModal"
      :task="selectedTask"
      @yes="runTask"
      @close="showRunModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useTaskStore} from "@/stores/task";
import { useProjectStore } from "@/stores/project";
import { useAuthStore } from "@/stores/auth";
import type { Task } from '@/models/task'
import type { Project } from '@/models/project'


definePageMeta({
    middleware: 'auth',
});
const loading = ref(true);
const modalKey = ref(0);
const route = useRoute();
const projectId = Number(route.params.projectId);
const taskStore = useTaskStore();
const projectStore = useProjectStore();
const auth = useAuthStore();


const projectTitle = computed((): string => {
  return (
    projectStore.projects.find((p) => p.id === projectId)?.title || "Project"
  );
});


const selectedTask = ref<Task | null>(null);
const showRunModal = ref(false);
const showModal = ref<boolean>(false);
const editingTask = ref<Task | null>(null);

onMounted(async() => {
 await auth.hydrate();
 await useTaskStore().load(projectId);
  loading.value = false;
});

const tasks = taskStore.tasksByProject(projectId);


const openModal = (task: Task | null = null): void => {
  editingTask.value = task;
  modalKey.value++;
  showModal.value = true;
}

const openRunModal = (task: Task): void => {
  selectedTask.value = task;
  showRunModal.value = true;
}

const handleDelete = (id: number): void => {
  taskStore.deleteTask(id, projectId);
}

const runTask = async (): Promise<void> => {
  if (!selectedTask.value) return;
  showRunModal.value = false;

  const task = selectedTask.value;
  if (!auth.token) {
    alert("Token not exist , please login");
    return;
  }

  try {
    const response = await fetch(
      `https://git.nshub.net/api/v4/projects/${task.projectId}/trigger/pipeline`,
      {
        method: "POST",
        headers: {
          "PRIVATE-TOKEN": auth.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: task.token,
          ref: task.ref,
          "variables[DEPLOY]": task.trigger,
        }),
      }
    );
    if (!response.ok) {
      alert("Deploy failed");
    } else {
      alert("Deploy started successfully");
    }
  } catch (err) {
    alert("Error: " + err);
  }
}

</script>
<style>


</style>