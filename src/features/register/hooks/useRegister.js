import { useState } from 'react'
import { registerService } from '../services/registerService'
import { useAuthStore } from '../../../shared/store/authStore'

export const useRegister = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const setAuth = useAuthStore((state) => state.setAuth)

  const register = async (userData) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await registerService(userData)
      setAuth(response.user, response.token)
      return response
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al registrar usuario'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { register, loading, error }
}
