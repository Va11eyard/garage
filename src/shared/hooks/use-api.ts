import { useState, useCallback } from 'react'
import { ApiError } from '@/shared/api'

export interface UseApiState<T> {
  data: T | null
  error: ApiError | null
  loading: boolean
}

export interface UseApiReturn<T, Args extends any[]> extends UseApiState<T> {
  execute: (...args: Args) => Promise<T>
  reset: () => void
}

/**
 * Generic hook for API calls
 * Handles loading, error, and data states
 * 
 * @example
 * const { data, loading, error, execute } = useApi(InventoryService.getAllItems)
 * 
 * useEffect(() => {
 *   execute()
 * }, [])
 */
export function useApi<T, Args extends any[]>(
  apiCall: (...args: Args) => Promise<T>
): UseApiReturn<T, Args> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<ApiError | null>(null)
  const [loading, setLoading] = useState(false)

  const execute = useCallback(
    async (...args: Args): Promise<T> => {
      try {
        setLoading(true)
        setError(null)
        const result = await apiCall(...args)
        setData(result)
        return result
      } catch (err) {
        const apiError = err as ApiError
        setError(apiError)
        throw apiError
      } finally {
        setLoading(false)
      }
    },
    [apiCall]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, error, loading, execute, reset }
}

/**
 * Hook for mutations (create, update, delete)
 * Similar to useApi but doesn't auto-execute
 */
export function useMutation<T, Args extends any[]>(
  apiCall: (...args: Args) => Promise<T>
) {
  return useApi(apiCall)
}
