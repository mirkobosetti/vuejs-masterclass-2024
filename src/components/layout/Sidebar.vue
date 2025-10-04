<script setup lang="ts">
import { injectionKeys, type MenuInjectionOptions } from '@/utils/injectionKeys'
import { useWindowSize } from '@vueuse/core'

const links = [
  { to: '/', icon: 'lucide:house', title: 'Dashboard' },
  { to: '/projects', icon: 'lucide:building-2', title: 'Projects' },
  { to: '/tasks', icon: 'lucide:badge-check', title: 'My Tasks' }
]

const accountLinks = [
  { to: '/profile', icon: 'lucide:user', title: 'Profile' },
  { to: '/settings', icon: 'lucide:settings', title: 'Settings' },
  { icon: 'lucide:log-out', title: 'Sign out' }
]

const router = useRouter()

const handleActionClicked = async (linkTitle: string) => {
  if (linkTitle === 'Sign out') {
    const { logout } = await import('@/utils/supaAuth')
    const isLoggedOut = await logout()

    if (isLoggedOut) {
      router.push('/login')
    }
  }
}

defineEmits(['taskClicked'])

const { menuOpen, toggleMenu } = inject(injectionKeys.menu) as MenuInjectionOptions
const { width } = useWindowSize()
watchEffect(() => {
  if (width.value >= 1024) {
    menuOpen.value = true
  } else {
    menuOpen.value = false
  }
})
</script>

<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 transition-[width]"
    :class="{ 'w-52': menuOpen, 'w-24': !menuOpen }"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button variant="outline" size="icon" class="w-8 h-8" @click="toggleMenu">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="w-8 h-8">
            <iconify-icon icon="lucide:plus"></iconify-icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="$emit('taskClicked')">Task</DropdownMenuItem>
          <DropdownMenuItem>Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="accountLinks" @actionClicked="handleActionClicked" />
      </div>
    </nav>
  </aside>
</template>
