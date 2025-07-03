<template>
  <transition name="slide-up">
    <div
      v-if="show"
  class="fixed inset-0 w-[360px] h-[950px]  mx-auto bg-black/50  flex justify-center items-end"
  @click.self="$emit('update:show', false)"
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
         

          <div class="text-white text-bold text-center">{{  props.editProject ? 'Edit group' : 'Create group' }}</div>
          <div class="flex flex-row gap-[16px] align-center justify-center">
            <div>
              <label class="color-label text-[14px] " for="name">Name</label>
            </div>
            <div>
              <input
              v-model="form.title"
                type="text"
                class="bg-white/10 rounded-[8px] h-[36px] w-[206] outline-none px-4 text-amber-50"
                name="name"
              />
              <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
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
     @change="handleFileChange"
    
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
          <button @click="submit" class="primary text-white rounded-[8px] h-[49px] w-full mt-[10px]" >{{  props.editProject ? 'Edit' : 'Create' }}</button>

      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const errors = ref<Record<string, string>>({})


const props = defineProps<{
  show: boolean
  editProject?: { id: number; title: string; url: string } | null
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'save', project: { id: number; title: string; url: string }): void
}>()

const form = ref<{ title: string; url: string }>({ title: '', url: '' })

watch(
  () => props.editProject,
  (p) => {
    form.value.title = p?.title ?? ''
    form.value.url   = p?.url   ?? ''
  },
  { immediate: true }
)

/* helpers */
function close () {
  emit('update:show', false)          
}
function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
   
    const file = input.files[0]

    
    form.value.url = URL.createObjectURL(file)

   
  }
}
function validate() {
  errors.value = {}

  if (!form.value.title.trim()) errors.value.title = 'Name is required.'


  return Object.keys(errors.value).length === 0
}
function submit () {
  if (!validate()) return
  const trimmedTitle = form.value.title.trim()
  
  if (!trimmedTitle) return             // simple validation

  emit('save', {
    id: props.editProject?.id ?? Date.now(),           // new or existing id
    title: trimmedTitle,
    url :form.value.url
    
  })                                                   // ❷ return data
  close()
}



const startY = ref(0);
const dragOffset = ref(0);

function startDrag(e: TouchEvent) {
  startY.value = e.touches[0].clientY;
}

function onDrag(e: TouchEvent) {
  const delta = e.touches[0].clientY - startY.value;
  dragOffset.value = delta > 0 ? delta : 0;
}

function endDrag() {
  if (dragOffset.value > 100) {
   
    dragOffset.value = 0;
    emit("update:show", false);
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
