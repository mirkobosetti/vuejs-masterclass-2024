<script setup lang="ts">
const router = useRouter()

const errorStore = useErrorStore()

const error = ref(errorStore.activeError)
const message = ref('')
const customCode = ref(0)

if (error.value) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}

router.afterEach(() => {
  errorStore.activeError = null
})
</script>

<template>
  <section
    class="mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh]"
  >
    <div>
      <iconify-icon icon="lucide:triangle-alert" class="text-7xl text-destructive" />
      <h1 class="font-extrabold text-7xl text-secondary">{{ customCode }}</h1>
      <p class="text-3xl font-extrabold text-primary">{{ message }}</p>
      <div class="flex flex-col items-center justify-center gap-5 mt-6 font-light">
        <p class="text-lg text-muted-foreground">You'll find lots to explore on the home page.</p>
        <RouterLink to="/">
          <Button class="max-w-36"> Back to homepage </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
