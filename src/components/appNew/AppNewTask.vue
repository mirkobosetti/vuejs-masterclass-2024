<script lang="ts" setup>
const isOpen = defineModel<boolean>()
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
      </SheetHeader>
      <p>content</p>
    </SheetContent>
  </Sheet>
</template>
