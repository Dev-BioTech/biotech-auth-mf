import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const passwordService = {
  async forgotPassword(email) {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email })
    return response.data
  },

  async resetPassword(token, password) {
    const response = await axios.post(`${API_URL}/auth/reset-password`, { 
      token, 
      password 
    })
    return response.data
  }
}
