<template>
  <transition name="slide-up">
    <div
      v-if="modelValue"
      class="fixed inset-0 w-[360px] h-[950px]  mx-auto bg-black/50  flex justify-center items-end"
      @click.self="$emit('update:modelValue', false)"
    >
      <div
        ref="modal"
        class="w-full  Dark-1 rounded-t-[40px] p-4 text-black touch-none"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="endDrag"
        :style="{ transform: `translateY(${dragOffset}px)` }"
      >
        <div class="flex flex-col justify-center  items-center gap-3 ">
            <div class="text-center ">
                 <Icon
            name="material-symbols:arrow-drop-down"
            size="2rem"
            style="color: #d9d9d9;text-align: center;"
            
          />
            </div>
         

          <div class="text-white text-bold text-center">Creat Group</div>
          <div class="flex flex-row gap-[16px] align-center justify-center">
            <div>
              <label class="color-label text-[14px] " for="name">Name</label>
            </div>
            <div>
              <input
                type="text"
                class="bg-white/10 rounded-[8px] h-[36px] w-[206] outline-none px-4 text-amber-50"
                name="name"
              />
            </div>
          </div>
          <hr class="w-full Dark-3">
          <div class="h-[113px] w-[206px] border border-dashed rounded-[8px] border-white flex items-center justify-center">
            <div class="relative">
  <input
    type="file"
    id="fileInput"
    name="fileName"
    class="hidden"
  />
  <label
    for="fileInput"
    class="w-[110px] h-[33px] rounded-[8px] primary-light-color Dark-3-bg text-white flex items-center justify-center cursor-pointer"
  >
    Upload icon
  </label>
</div>
          </div>
        </div>
          <button class="primary text-white rounded-[8px] h-[49px] w-full mt-[10px]" > Creat</button>

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
    // Close modal if pulled down far enough
    dragOffset.value = 0;
    emit("update:modelValue", false);
  } else {
    // Snap back if not far enough
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
