<script setup lang="ts">
const value = defineModel<'in-progress' | 'completed'>()

const emits = defineEmits(['commit'])

const { readonly = false } = defineProps<{
  readonly?: boolean
}>()

const toggleStatus = () => {
  if (readonly) return

  value.value = value.value === 'in-progress' ? 'completed' : 'in-progress'
  emits('commit')
}
</script>

<template>
  <div class="text-2xl" :class="{ 'cursor-pointer': !readonly }" @click="toggleStatus">
    <Transition name="scale" mode="out-in" appear>
      <iconify-icon
        icon="lucide:circle-check"
        class="text-green-500"
        v-if="value === 'completed'"
      />
      <iconify-icon icon="lucide:circle-dot" class="text-gray-500" v-else />
    </Transition>
  </div>
</template>
