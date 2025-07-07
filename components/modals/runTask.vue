<template>
  <transition name="slide-up">
    <div
      v-if="modelValue"
      class="fixed inset-0 mx-auto h-[950px] w-[360px] bg-black/50 flex items-center justify-center z-50"
      @click.self="close"
    >
      <div
        ref="modal"
        class="Dark-1 w-5/6 rounded-[24px] bg-[#111] p-4 text-white touch-none"
        :style="{ transform: `translateY(${dragOffset}px)` }"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="endDrag"
      >
        <h2 class="text-center font-bold mb-2">Run Task</h2>
        <p class="text-center mb-6">Do you want to run this task?</p>

        <div class="flex gap-4">
          <button
            class="w-full h-[33px] rounded-[8px] bg-green-500"
            @click="confirm"
            :disabled="loading"
          >
            Yes <span v-if="loading">⏳</span>
          </button>
          <button
            class="w-full h-[33px] rounded-[8px] bg-red-600"
            @click="close"
            :disabled="loading"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import type { Task } from '@/stores/task'

const props = defineProps<{
  modelValue: boolean
  task: Task | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'yes'): void
}>()

const loading = ref(false)
const startY = ref(0)
const dragOffset = ref(0)

function close(): void {
  if (!loading.value) emit('update:modelValue', false)
}

function confirm(): void {
  loading.value = true
  emit('yes')
}

function startDrag(e: TouchEvent): void {
  startY.value = e.touches[0].clientY
}

function onDrag(e: TouchEvent): void {
  const delta = e.touches[0].clientY - startY.value
  dragOffset.value = Math.max(delta, 0)
}

function endDrag(): void {
  if (dragOffset.value > 100) close()
  dragOffset.value = 0
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.35s ease, opacity 0.35s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
