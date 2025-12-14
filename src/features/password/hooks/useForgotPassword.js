import { useState } from 'react'
import { passwordService } from '../services/passwordService'

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const sendResetEmail = async (email) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await passwordService.forgotPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar el correo')
    } finally {
      setLoading(false)
    }
  }

  return { sendResetEmail, loading, error, success }
}
