<template>
  <transition name="slide-up">
    <div
      v-if="modelValue"
      class="fixed inset-0 w-[360px] h-[950px] mx-auto bg-black/50 flex justify-center items-end"
      @click.self="$emit('update:modelValue', false)"
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

          <div class="text-white text-bold text-center">New Items</div>
          
          <div class="flex flex-row gap-3 align-center justify-between">
            <div>
              <label class="color-label text-[14px]" for="name">Name</label>
            </div>
            <div>
              <input
                type="text"
                class="bg-white/10 rounded-[8px] h-[36px] w-[206] outline-none px-4 text-amber-50"
                name="name"
              />
            </div>
          </div>
          <div class="flex flex-row gap-3 align-center justify-between">
            <div>
              <label class="color-label text-[14px]" for="id">ID</label>
            </div>
            <div>
              <input
                type="text"
                class="bg-white/10 rounded-[8px] h-[36px] w-[206] outline-none px-4 text-amber-50"
                name="id"
              />
            </div>
          </div>
          <div class="flex flex-row gap-3 align-center justify-between">
            <div>
              <label class="color-label text-[14px]" for="token">Token</label>
            </div>
            <div>
              <input
                type="text"
                class="bg-white/10 rounded-[8px] h-[36px] w-[206] outline-none px-4 text-amber-50"
                name="token"
              />
            </div>
          </div>
          <div class="flex flex-row gap-3 align-center justify-between">
            <div>
              <label class="color-label text-[14px]" for="ref">REF</label>
            </div>
            <div>
              <input
                type="text"
                class="bg-white/10 rounded-[8px] h-[36px] w-[206] outline-none px-4 text-amber-50"
                name="ref"
              />
            </div>
            
          </div>
          <div class="flex flex-row gap-3 align-center justify-between">
            <div>
              <label class="color-label text-[14px]" for="trigger">Trigger</label>
            </div>
            <div>
              <input
                type="text"
                class="bg-white/10 rounded-[8px] h-[36px] w-[206] outline-none px-4 text-amber-50"
                name="trigger"
              />
            </div>
            
          </div>
        </div>
        <button
          class="primary text-white rounded-[8px] h-[49px] w-full mt-[10px]"
        >
          Submit
        </button>
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
