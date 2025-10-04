<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const { profile } = storeToRefs(useAuthStore())

const isDarkMode = useDark()
const toggleDarkMode = useToggle(isDarkMode)
</script>

<template>
  <nav class="h-16 border-b bg-muted/40 flex gap-2 justify-between px-6 items-center">
    <form class="relative h-fit w-full max-w-96">
      <iconify-icon
        class="absolute top-[50%] translate-y-[-50%] left-2.5 text-muted-foreground"
        icon="lucide:search"
      ></iconify-icon>
      <Input class="w-full pl-8 bg-background" type="text" placeholder="Search ..." />
    </form>

    <div class="flex items-center gap-4">
      <Button variant="ghost" size="icon" class="w-8 h-8" @click="toggleDarkMode()">
        <Transition name="scale" mode="out-in">
          <iconify-icon v-if="isDarkMode" icon="lucide:moon" class="text-lg"></iconify-icon>
          <iconify-icon v-else icon="lucide:sun" class="text-lg"></iconify-icon>
        </Transition>
      </Button>

      <div class="w-8">
        <DropdownMenu v-if="profile">
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </nav>
</template>
