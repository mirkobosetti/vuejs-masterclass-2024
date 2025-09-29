import type { CustomError, ExtendedPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null)

  const setError = ({
    customCode,
    error
  }: {
    customCode: number
    error: string | PostgrestError
  }) => {
    console.error('Error captured in store:', { customCode, error })

    if (typeof error === 'string') {
      activeError.value = Error(error)
      activeError.value.customCode = customCode
      return
    }

    activeError.value = error
    ;(activeError.value as ExtendedPostgrestError).statusCode = customCode
  }

  return {
    activeError,
    setError
  }
})
