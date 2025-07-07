<template>
  <transition name="slide-up">
    <div
      v-if="modelValue"
      class="fixed inset-0 w-[360px] h-[950px] mx-auto bg-black/50 flex justify-center items-end"
      @click.self="close"
    >
      <div
        ref="modal"
        class="w-full Dark-1 rounded-t-[40px] p-4 text-black touch-none"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="endDrag"
        :style="{ transform: `translateY(${dragOffset}px)` }"
      >
        <div class="flex flex-col justify-center items-center gap-3">
          <div class="text-center">
            <Icon
              name="material-symbols:arrow-drop-down"
              size="2rem"
              style="color: #d9d9d9; text-align: center"
            />
          </div>
          <div class="text-white font-bold text-center">Delete Group</div>
          <div class="text-white font-bold text-center">
            Do you want to delete this group ?
          </div>
        </div>
        <div class="flex flex-row gap-[16px] justify-center align-super">
          <button
            @click="$emit('confirm')"
            class="bg-red-600 text-white rounded-[8px] w-[156px] h-[33px] mt-[10px]"
          >
            Delete
          </button>
          <button
            @click="$emit('cancel')"
            class="primary text-white rounded-[8px] w-[156px] h-[33px] mt-[10px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const startY = ref(0)
const dragOffset = ref(0)

function close(): void {
  emit('update:modelValue', false)
}

function startDrag(e: TouchEvent): void {
  startY.value = e.touches[0].clientY
}

function onDrag(e: TouchEvent): void {
  const delta = e.touches[0].clientY - startY.value
  dragOffset.value = delta > 0 ? delta : 0
}

function endDrag(): void {
  if (dragOffset.value > 100) {
    dragOffset.value = 0
    emit('update:modelValue', false)
  } else {
    dragOffset.value = 0
  }
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