<template>
  <transition name="slide-up">
    <div
      v-if="modelValue"
      class="fixed inset-0 w-[360px] h-[950px] mx-auto bg-black/50 flex justify-center items-end"
      @click.self="emit('update:modelValue', false)"
    >
      <div
        ref="modal"
        class="Dark-1 w-full  rounded-t-[40px] p-4 text-black touch-none"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="endDrag"
        :style="{ transform: `translateY(${dragOffset}px)` }"
      >
        <div class="flex flex-col p-[16px] gap-3">
          <div class="text-center">
            <Icon
              name="material-symbols:arrow-drop-down"
              size="2rem"
              style="color: #d9d9d9; text-align: center"
            />
          </div>

          <div class="text-white text-bold text-center"> {{ isEdit  ? 'Edit task' : 'New task' }}</div>

          <div class="flex flex-row gap-3 align-center justify-between">
            <div>
              <label class="color-label text-[14px]" for="name">Name</label>
            </div>
            <div>
              <input
                v-model="form.name"
                type="text"
                class="bg-white/10 rounded-[8px] h-[36px] w-[206] outline-none px-4 text-amber-50"
                name="name"
              />
              <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
            </div>
          </div>

          <div class="flex flex-row gap-3 align-center justify-between">
            <div>
              <label class="color-label text-[14px]" for="id">ID</label>
            </div>
            <div>
              <input
                v-model="form.id"
                type="number"
                class="bg-white/10 rounded-[8px] h-[36px] w-[206] outline-none px-4 text-amber-50"
                name="id"
              />
              <p v-if="errors.id" class="text-red-500 text-sm">{{ errors.id }}</p>
            </div>
          </div>

          <div class="flex flex-row gap-3 align-center justify-between">
            <div>
              <label class="color-label text-[14px]" for="token">Token</label>
            </div>
            <div>
              <input
                v-model="form.token"
                type="text"
                class="bg-white/10 rounded-[8px] h-[36px] w-[206] outline-none px-4 text-amber-50"
                name="token"
              />
              <p v-if="errors.token" class="text-red-500 text-sm">{{ errors.token }}</p>
            </div>
          </div>

          <div class="flex flex-row gap-3 align-center justify-between">
            <div>
              <label class="color-label text-[14px]" for="ref">REF</label>
            </div>
            <div>
              <input
                v-model="form.ref"
                type="text"
                class="bg-white/10 rounded-[8px] h-[36px] w-[206] outline-none px-4 text-amber-50"
                name="ref"
              />
              <p v-if="errors.ref" class="text-red-500 text-sm">{{ errors.ref }}</p>
            </div>
          </div>

          <div class="flex flex-row gap-3 align-center justify-between">
            <div>
              <label class="color-label text-[14px]" for="trigger">Trigger</label>
            </div>
            <div>
              <input
                v-model="form.trigger"
                type="text"
                class="bg-white/10 rounded-[8px] h-[36px] w-[206] outline-none px-4 text-amber-50"
                name="trigger"
              />
              <p v-if="errors.trigger" class="text-red-500 text-sm">{{ errors.trigger }}</p>
            </div>
          </div>
        </div>

        <button
          class="primary text-white rounded-[8px] h-[49px] w-full mt-[10px]"
          @click="handleSave"
        >
          Submit
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useTaskStore} from '@/stores/task'
import type { Task } from '@/models/task'


const errors = ref<{ [key: string]: string }>({})

const props = defineProps<{
  modelValue: boolean
  projectId: number
  editTask?: Task | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

const store = useTaskStore()

const blank = (projectId: number): Task => ({
  id: 0,
  name: '',
  token: '',
  ref: '',
  trigger: '',
  projectId
})

const form = ref<Task>(blank(props.projectId))
const isEdit = computed(() => !!props.editTask)

watch(
  () => [props.editTask, props.projectId] as const,
  ([task, pid]) => {
    errors.value = {}
    form.value = task ? { ...task } : blank(pid)
  },
  { immediate: true }
)

const validate = (): boolean => {
  errors.value = {};
  if (!form.value.name.trim()) errors.value.name = 'Name is required.';
  if (!form.value.id || form.value.id <= 0) errors.value.id = 'ID must be a positive number.';
  if (!form.value.token.trim()) errors.value.token = 'Token is required.';
  if (!form.value.ref.trim()) errors.value.ref = 'REF is required.';
  if (!form.value.trigger.trim()) errors.value.trigger = 'Trigger is required.';
  return Object.keys(errors.value).length === 0;
}

const handleSave = (): void => {
  if (!validate()) return;
  if (isEdit.value) {
    store.update(form.value);
  } else {
    store.add(form.value);
  }
  emit('update:modelValue', false);
}

const startY = ref(0);
const dragOffset = ref(0);

const startDrag = (e: TouchEvent): void => {
  startY.value = e.touches[0].clientY;
}

const onDrag = (e: TouchEvent): void => {
  const delta = e.touches[0].clientY - startY.value;
  dragOffset.value = Math.max(delta, 0);
}

const endDrag = (): void => {
  if (dragOffset.value > 100) emit('update:modelValue', false);
  dragOffset.value = 0;
}

</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>