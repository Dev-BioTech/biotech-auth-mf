import apiClient from '../../../shared/utils/apiClient'
import { tokenManager } from '../../../shared/utils/tokenManager'

export const loginService = {
  login: async (credentials) => {
    // Credenciales de prueba temporales
    if (credentials.email === 'user@biotech.com' && credentials.password === 'admin@biotech.com') {
      const mockResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 1,
          name: 'Usuario de Prueba',
          email: 'user@biotech.com',
          role: 'user',
          createdAt: new Date().toISOString()
        }
      }
      tokenManager.setToken(mockResponse.token)
      return mockResponse
    }
    
    // Si no son las credenciales de prueba, usar la API real
    const response = await apiClient.post('/auth/login', credentials)
    tokenManager.setToken(response.data.token)
    return response.data
  }
}