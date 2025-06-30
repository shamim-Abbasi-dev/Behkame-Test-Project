<template>
  
 <div class="w-[360px] h-[950px] mx-auto bg-primary shadow-lg overflow-hidden ">
  
    <NuxtPage />
  </div>
  
</template>
<script setup lang="ts">
onMounted(() => {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')
    ) {
      e.preventDefault()
    }
  })

  window.addEventListener(
    'wheel',
    (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault()
      }
    },
    { passive: false }
  )
})
</script>