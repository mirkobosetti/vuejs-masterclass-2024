<script setup lang="ts">
const route = useRoute()

const slug = (route.params as { slug: string }).slug
</script>

<template>
  <div>
    <h1>Project {{ slug }}</h1>
    <RouterLink to="/projects">Go to Projects</RouterLink>
  </div>
</template>

<style scoped></style>
