import apiClient from '../../../shared/utils/apiClient'
import { tokenManager } from '../../../shared/utils/tokenManager'

export const registerService = async (userData) => {
  // Modo de prueba: simular registro exitoso
  const mockResponse = {
    token: 'mock-jwt-token-' + Date.now(),
    user: {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: 'user',
      createdAt: new Date().toISOString()
    }
  }
  tokenManager.setToken(mockResponse.token)
  return mockResponse
  
  // Descomentar cuando la API esté lista:
  // const response = await apiClient.post('/auth/register', userData)
  // tokenManager.setToken(response.data.token)
  // return response.data
}
