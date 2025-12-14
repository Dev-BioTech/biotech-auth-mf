import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useResetPassword } from '../hooks/useResetPassword'
import { resetPasswordSchema } from '../validations/resetPasswordSchema'

export default function ResetPasswordForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { resetPassword, loading, error } = useResetPassword()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(resetPasswordSchema)
  })

  const onSubmit = async (data) => {
    try {
      await resetPassword(token, data.password)
      navigate('/login')
    } catch (err) {
      console.error('Reset password error:', err)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <p className="text-red-600">Token inválido o expirado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-green-100">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
            >
              <Lock className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-green-900 mb-2"
            >
              Nueva Contraseña
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-green-600"
            >
              Ingresa tu nueva contraseña
            </motion.p>
          </div>

          {!isSuccess ? (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-green-900 mb-2">Nueva Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-700 transition-all"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Password Requirements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                {passwordRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      req.met ? 'bg-green-500' : 'bg-gray-200'
                    }`}>
                      {req.met && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`transition-all ${
                      req.met ? 'text-green-700' : 'text-green-600'
                    }`}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Confirm Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-green-900 mb-2">Confirmar Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                      confirmPassword && !doPasswordsMatch
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-green-200 focus:border-transparent'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-700 transition-all"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {confirmPassword && !doPasswordsMatch && (
                  <p className="text-red-600 mt-2">Las contraseñas no coinciden</p>
                )}
              </motion.div>

              <motion.button
                type="submit"
                disabled={!isPasswordValid || !doPasswordsMatch}
                whileHover={isPasswordValid && doPasswordsMatch ? { scale: 1.02 } : {}}
                whileTap={isPasswordValid && doPasswordsMatch ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl shadow-lg transition-all ${
                  isPasswordValid && doPasswordsMatch
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Lock className="w-5 h-5" />
                Restablecer Contraseña
              </motion.button>
            </form>
          ) : (
            /* Success Message */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-green-600" />
              </motion.div>
              <h3 className="text-green-900 mb-2">¡Contraseña Restablecida!</h3>
              <p className="text-green-600">
                Tu contraseña ha sido actualizada exitosamente. Redirigiendo al inicio de sesión...
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-green-600 mt-6"
        >
          © 2024 BioTech Farm Management. Todos los derechos reservados.
        </motion.p>
      </motion.div>
    </div>
  )
}
