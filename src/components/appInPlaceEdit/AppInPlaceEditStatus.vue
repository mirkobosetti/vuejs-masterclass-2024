<script setup lang="ts">
const value = defineModel<'in-progress' | 'completed'>()

const emits = defineEmits(['commit'])

const toggleStatus = () => {
  value.value = value.value === 'in-progress' ? 'completed' : 'in-progress'
  emits('commit')
}
</script>

<template>
  <div class="text-2xl cursor-pointer" @click="toggleStatus">
    <Transition mode="out-in" appear>
      <iconify-icon
        icon="lucide:circle-check"
        class="text-green-500"
        v-if="value === 'completed'"
      />
      <iconify-icon icon="lucide:circle-dot" class="text-gray-500" v-else />
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  /* transition: opacity 0.3s; */
  transition: transform 0.1s;
}
.v-enter-from,
.v-leave-to {
  /* opacity: 0; */
  transform: scale(0.8);
}
</style>
