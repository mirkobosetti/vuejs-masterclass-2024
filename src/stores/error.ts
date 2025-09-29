import type { CustomError } from '@/types/Error'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError>(null)

  const setError = ({ customCode, error }: { customCode: number; error: string }) => {
    activeError.value = Error(error)
    activeError.value.customCode = customCode
  }

  return {
    activeError,
    setError
  }
})
