<template>
  <transition name="slide-up">
    <div
      v-if="modelValue"
      class="fixed inset-0 w-[360px] h-[950px] mx-auto bg-black/50 flex justify-center items-center z-50"
      @click.self="$emit('update:modelValue', false)"
    >
      <div
        ref="modal"
        class="Dark-1 w-5/6 rounded-[24px]  p-4 text-black touch-none bg-[#111]"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="endDrag"
        :style="{ transform: `translateY(${dragOffset}px)` }"
      >
        <!-- Modal Content -->
        <div class="flex flex-col gap-3">
          <div class="text-center text-white font-bold">
          Run Task
          </div>

          <div class="text-white  text-center">Do you want to run this task ?</div>

        
<div class="flex flex-row gap-4"> <button class="bg-green-500 text-white rounded-[8px] h-[33px] w-full mt-[10px]">
           Yes
          </button>
          
          <button class="bg-red-600 text-white rounded-[8px] h-[33px] w-full mt-[10px]">
            No
          </button></div>
         
          
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ref } from "vue";

defineProps({
  modelValue: Boolean,
});
defineEmits(["update:modelValue"]);

const startY = ref(0);
const dragOffset = ref(0);

function startDrag(e) {
  startY.value = e.touches[0].clientY;
}

function onDrag(e) {
  const delta = e.touches[0].clientY - startY.value;
  dragOffset.value = delta > 0 ? delta : 0;
}

function endDrag() {
  if (dragOffset.value > 100) {
    dragOffset.value = 0;
    emit("update:modelValue", false);
  } else {
    dragOffset.value = 0;
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
