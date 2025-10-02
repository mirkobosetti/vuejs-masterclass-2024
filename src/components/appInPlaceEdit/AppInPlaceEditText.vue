<script setup lang="ts">
const value = defineModel()
</script>

<template>
  <input
    type="text"
    class="w-full p-1 bg-transparent focus:outline-none focus:bg-gray-800 focus:rounded-md"
    v-model="value"
  />
</template>
