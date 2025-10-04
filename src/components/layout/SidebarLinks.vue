<script setup lang="ts">
import { injectionKeys, type MenuInjectionOptions } from '@/utils/injectionKeys'

interface LinkProps {
  to?: string
  icon: string
  title: string
}

defineProps<{
  links: LinkProps[]
}>()

const emits = defineEmits<{
  actionClicked: [string]
}>()

const emitActionClicked = (linkTitle: string) => {
  emits('actionClicked', linkTitle)
}

const { menuOpen } = inject(injectionKeys.menu) as MenuInjectionOptions
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground cursor-pointer"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      active-class="bg-accent text-accent-foreground font-medium"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">
        {{ link.title }}
      </span>
    </RouterLink>

    <button
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground cursor-pointer"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      v-else
      @click="emitActionClicked(link.title)"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">
        {{ link.title }}
      </span>
    </button>
  </template>
</template>
