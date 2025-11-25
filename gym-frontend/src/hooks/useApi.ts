import { useState, useEffect, useCallback } from 'react';

interface UseApiOptions<T, P extends any[] = any[]> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  immediate?: boolean;
  immediateParams?: P;
}

export function useApi<T, P extends any[] = any[]>(
  apiFunction: (...args: P) => Promise<T>,
  options: UseApiOptions<T, P> = {}
) {
  const { onSuccess, onError, immediate = false, immediateParams = [] as unknown as P } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const execute = useCallback(async (...args: P) => {
    console.log('useApi: execute called', { immediate, args });
    setLoading(true);
    setError(null);
    
    try {
      console.log('useApi: calling API function');
      const result = await apiFunction(...args);
      console.log('useApi: API call successful', result);
      setData(result);
      onSuccess?.(result);
      return result;
    } catch (err: any) {
      console.log('useApi: API call failed', err);
      setError(err);
      onError?.(err);
      throw err;
    } finally {
      console.log('useApi: setting loading to false');
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError]);

  useEffect(() => {
    console.log('useApi: useEffect triggered', { immediate });
    if (immediate) {
      console.log('useApi: executing immediately');
      execute(...immediateParams);
    }
  }, [execute, immediate]);

  console.log('useApi: returning state', { data, loading, error });

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute
  };
}
