<script lang="ts" setup>
import type { CreateNewTask } from '@/types/CreateNewForm'

const isOpen = defineModel<boolean>()

const createTask = async (formData: CreateNewTask) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log(formData))
    }, 2000)
  })
}
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>

      <div class="px-4">
        <FormKit type="form" @submit="createTask" submit-label="Create Task">
          <FormKit type="text" name="name" id="name" label="Name" placeholder="Enter task name" />
          <FormKit
            type="select"
            name="for"
            id="for"
            label="For"
            placeholder="Select a user"
            :options="[{ label: 'Item name', value: 1 }]"
          />
          <FormKit
            type="textarea"
            name="description"
            id="description"
            label="Description"
            placeholder="Task description"
          />
          <FormKit
            type="select"
            name="project"
            id="project"
            label="Porject"
            placeholder="Select a project"
            :options="[{ label: 'Item name', value: 1 }]"
          />
        </FormKit>
      </div>
    </SheetContent>
  </Sheet>
</template>
