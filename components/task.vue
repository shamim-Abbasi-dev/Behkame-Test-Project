<template>
  <div
    class="rounded-[16px] h-[73px] w-[312px] flex flex-row rounded-l-[16px] items-center justify-between gap-3"
  >
    <div
      class="w-[267px] h-[52px] color-btn-gp rounded-[16px] flex flex-row justify-between p-[16px] items-center"
    >
      <div class="text-white font-bold text-sm">{{ task.name }}</div>
      <div class="flex flex-row gap-[16px]">
        <div
          class="rounded-full button-2 h-[20px] w-[20px] p-[1px]"
          @click="showDelete = true"
        >
          <Icon
            name="material-symbols:close-rounded"
            size="16px"
            class="m-[1px]"
          />
        </div>
        <div
          class="rounded-full primary-light h-[20px] w-[20px] p-[1px]"
          @click="emit('edit', task)"
        >
          <Icon name="material-symbols:edit" class="m-[1.5px]" />
        </div>
      </div>
    </div>
    <div class="w-[40px] h-[40px] rounded-full button-bg-icon-under relative">
      <div
        class="w-[32px] h-[32px] button-bg-icon-up rounded-full absolute top-[4px] left-[4px]"
      >
        <Icon
          name="material-symbols:rocket-launch-rounded"
          size="22px"
          class="absolute top-[5px] left-[5px]"
        />
      </div>
    </div>
  </div>

  <DeleteModal
    v-model="showDelete"
    @confirm="confirmDelete"
    @cancel="showDelete = false"
  />
  <runTask />
</template>
<script setup lang="ts">
import runTask from "./modals/runTask.vue";
import DeleteModal from "./modals/deleteModal.vue";
import type { Task } from "@/stores/task";
const props = defineProps<{ task: Task }>();
const emit = defineEmits<{
  (e: "edit", t: typeof props.task): void;
  (e: "delete", id: number): void;
}>();

const showDelete = ref(false);
function confirmDelete() {
  emit("delete", props.task.id);
  showDelete.value = false;
}
</script>
