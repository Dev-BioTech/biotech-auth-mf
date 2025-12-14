import { useState } from 'react'
import { passwordService } from '../services/passwordService'

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const resetPassword = async (token, password) => {
    setLoading(true)
    setError(null)

    try {
      await passwordService.resetPassword(token, password)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al restablecer la contraseña')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { resetPassword, loading, error }
}
