<template>
  <div>
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

    <div class="p-[24px] ">
      
        <div v-if="store.projects.length === 0" class="text-white text-center text-lg">No Group Found</div>
      
      <div v-else class="flex flex-col space-y-3">
        <groupCard 

          v-for="p in store.projects"
          :key="p.id"
          :project="p"
          @edit="openModal(p)"
          @delete="store.deleteProject"
        />
      </div>
    </div>
  </div>
  <div>
    <projectModal
      :show="showModal"
      :modelValue="showModal"
      :editProject="selectedProject"
      @update:show="showModal = $event"
      @save="onSave"
    />
  </div>
</template>
<script lang="ts" setup>
import projectModal from "@/components/modals/createEditGroupModal.vue";
import groupCard from "@/components/card.vue";
import { useAuthStore } from "~/stores/auth";
import { useProjectStore } from "@/stores/project";
import { navigateTo } from "#app";

const store = useProjectStore();
const auth = useAuthStore();

const showModal = ref(false);
interface Project {
  id: number;
  title: string;
  url: string;
}

const selectedProject = ref<Project | null>(null);

function openModal(project: Project | null = null) {
  selectedProject.value = project;
  showModal.value = true;
}

function onSave(project: Project) {
  if (selectedProject.value) {
    store.updateProject(project);
  } else {
    store.addProject({ title: project.title, url: project.url });
  }
  showModal.value = false;
  selectedProject.value = null;
}

function logout() {
  auth.logout();
  navigateTo("/login");
}

onMounted(() => {
  
    store.loadProjectsFromStorage()
 
 
})

</script>
