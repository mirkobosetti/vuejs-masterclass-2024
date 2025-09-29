<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'

const projects = ref<Tables<'projects'>[] | null>(null)
;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)
  else projects.value = data
})()
</script>

<template>
  <div>
    <h1>Projects page</h1>
    <RouterLink to="/">Go to Home</RouterLink>
    <ul v-if="projects">
      <li v-for="project in projects" :key="project.id">
        <RouterLink :to="{ name: '/projects/[id]', params: { id: project.id } }">
          {{ project.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
