<script lang="ts" setup>
import type { CreateNewTask } from '@/types/CreateNewForm'
import { createTaskQuery, profilesQuery, projectsQuery } from '@/utils/supaQueries'

const isOpen = defineModel<boolean>()

type selectOptionsType = { label: string; value: string | number }

const selectOptions = ref({
  projects: [] as selectOptionsType[],
  profiles: [] as selectOptionsType[]
})

const getProjectsOptions = async () => {
  const { data: allProjects } = await projectsQuery

  if (!allProjects) return

  allProjects.forEach((project) => {
    selectOptions.value.projects.push({ label: project.name, value: project.id })
  })
}

const getProfilesOptions = async () => {
  const { data: allProfiles } = await profilesQuery

  if (!allProfiles) return

  allProfiles.forEach((profile) => {
    selectOptions.value.profiles.push({ label: profile.full_name, value: profile.id })
  })
}

const getOptions = async () => {
  await Promise.all([getProjectsOptions(), getProfilesOptions()])
}

getOptions()

const createTask = async (formData: CreateNewTask) => {
  const task = {
    ...formData,
    collaborators: [formData.profile_id]
  }

  const { error } = await createTaskQuery(task)

  if (error) {
    console.error('Error creating task:', error.message)
    return
  }

  isOpen.value = false
}
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>

      <div class="px-4">
        <FormKit
          type="form"
          @submit="createTask"
          submit-label="Create Task"
          :config="{
            validationVisibility: 'submit'
          }"
        >
          <FormKit
            type="text"
            name="name"
            id="name"
            label="Name"
            placeholder="Enter task name"
            validation="required|length:1,255"
          />
          <FormKit
            type="select"
            name="profile_id"
            id="profile_id"
            label="User"
            placeholder="Select a user"
            :options="selectOptions.profiles"
            validation="required"
          />
          <FormKit
            type="textarea"
            name="description"
            id="description"
            label="Description"
            placeholder="Task description"
            validation="length:0,500"
          />
          <FormKit
            type="select"
            name="project_id"
            id="project_id"
            label="Project"
            placeholder="Select a project"
            :options="selectOptions.projects"
            validation="required"
          />
        </FormKit>
      </div>
    </SheetContent>
  </Sheet>
</template>
