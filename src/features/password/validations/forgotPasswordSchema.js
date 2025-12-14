import * as yup from 'yup'

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es requerido')
})
