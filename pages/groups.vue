<template>
  <div
    v-if="loading"
    class="flex justify-center items-center h-screen text-white text-lg"
  >
    Loading...
  </div>
  <div v-else>
    <div class="flex flex-row justify-between p-[24px] border-b-1 border-color">
      <div class="text-amber-50 text-[16px] font-[600]">Groups</div>

      <div class="flex flex-row gap-1">
        <div
          class="color-btn rounded-full w-[28px] h-[28px] relative"
          @click="openModal()"
        >
          <Icon
            name="material-symbols-light:add-circle-outline-rounded"
            size="1.5em"
            class="absolute top-[2px] left-[2px]"
          />
        </div>
        <div
          class="color-btn rounded-full w-[28px] h-[28px] relative"
          @click="logout()"
        >
          <Icon
            name="material-symbols-light:cancel-outline"
            size="1.5em"
            class="absolute top-[2px] left-[2px]"
          />
        </div>
      </div>
    </div>

    <div class="p-[24px]">
      <div
        v-if="projectStore.projects.length === 0"
        class="text-white text-center text-lg"
      >
        No Group Found
      </div>

      <div v-else class="flex flex-col space-y-3">
        <GroupCard
          v-for="p in projectStore.projects"
          :key="p.id"
          :project="p"
          @edit="openModal(p)"
          @delete="projectStore.deleteProject"
        />
      </div>
    </div>
  </div>
  <div>
    <ModalsCreateEditGroupModal
      :key="modalKey"
      :show="showModal"
      :modelValue="showModal"
      :editProject="selectedProject"
      @update:show="showModal = $event"
      @save="onSave"
    />
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: 'auth',
});
import { useAuthStore } from "~/stores/auth";
import { useProjectStore } from "@/stores/project";

const auth = useAuthStore();
const projectStore = useProjectStore();

const modalKey = ref(0);
const loading = ref(true);
const showModal = ref(false);


interface Project {
  id: number;
  title: string;
  url: string;
}

const selectedProject = ref<Project | null>(null);

const openModal = (project: Project | null = null): void => {
  selectedProject.value = project;
  modalKey.value++;
  showModal.value = true;
}

const onSave = (project: Project): void => {
  if (selectedProject.value) {
    projectStore.updateProject(project);
  } else {
    projectStore.addProject({ title: project.title, url: project.url });
  }
  showModal.value = false;
  selectedProject.value = null;
}

const logout = (): void => {
  auth.logout()
  navigateTo("/login");
}

onMounted(async () => {
  await auth.hydrate();
  await projectStore.load();
  loading.value = false;
});
</script>
