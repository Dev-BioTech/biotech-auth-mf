# 🔐 BioTech Auth - Authentication Microfrontend

Authentication and user management module for the BioTech ERP.

## 🚀 Features

- **Login and Registration**: Authentication forms
- **Session Management**: JWT tokens with cookies
- **User Profiles**: View and edit
- **Roles and Permissions**: Role-based access control
- **Password Recovery**: Complete flow
- **Form Validation**: With Yup and React Hook Forms

## 🛠️ Technologies

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite%20+%20Module%20Federation-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7.51.3-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Yup](https://img.shields.io/badge/Yup-Validation-FF6B6B?style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?style=for-the-badge)
![js-cookie](https://img.shields.io/badge/js--cookie-Token%20Management-FFCA28?style=for-the-badge)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-443E38?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## 📦 Installation

```bash
npm install
npm run dev # Port 5001
```

## 🔌 Exposed Components

### For the Shell
```javascript
// LoginForm
import('authMF/Login')

// RegisterForm
import('authMF/Register')

// UserProfile
import('authMF/UserProfile')

// AuthStore
import('authMF/AuthStore')
```

## 📁 Structure

```
src/
├── features/
│ ├── login/
│ │ ├── components/
│ │ │ └── LoginForm.jsx
│ │ ├── hooks/
│ │ │ └── useLogin.js
│ │ ├── services/
│ │ │ └── loginService.js
│ │ └── validations/
│ │ └── loginSchema.js
│ ├── register/
│ │ ├── components/
│ │ ├── hooks/
│ │ └── services/
│ └── profile/
│ ├── components/
│ └── hooks/
├── shared/
│ ├── store/
│ │ └── authStore.js
│ ├── utils/
│ │ ├── apiClient.js
│ │ └── tokenManager.js
│ └── constants/
└── App.jsx
```

## 🔑 Authentication Flow

1. User enters credentials
2. Validation with Yup
3. POST request to `/auth/login`
4. Token saved in cookie
5. Redirect to dashboard
6. Token included in request headers

## 🌍 Endpoints API

```javascript
POST /api/auth/login // Login
POST /api/auth/register // Registration
GET /api/auth/profile // Profile
PUT /api/auth/profile // Update profile
POST /api/auth/logout // Logout
POST /api/auth/refresh // Refresh token
```

## 🎨 Store Usage

```javascript
import { useAuthStore } from 'authMF/AuthStore'

const { user, isAuthenticated, setAuth, logout } = useAuthStore()

// Login
setAuth(userData, token)

// Logout
logout()
```

## 🔒 Token Management

```javascript
// tokenManager.js
setToken(token) // Save token
getToken() // Get token
removeToken() // Remove token
```

## 📝 Validations

### Login Schema
```javascript
{ 
email: string().email().required(), 
password: string().min(6).required()
}
```

### Registration Scheme
```javascript
{ 
name: string().required(), 
email: string().email().required(), 
password: string().min(6).required(), 
confirmPassword: string().oneOf([ref('password')])
}
```

## 🔐 Available Roles

```javascript
export const ROLES = {
ADMIN: 'Administrator',
MANAGER: 'Manager',
VETERINARIAN: 'Veterinarian',
OPERATOR: 'Operator',
VIEWER: 'Viewer'
}
```

## 🚀 Deploy

```bash
npm run build
vercel --prod
```

## 🧪 Testing

```bash
npm run test # Unit Tests
npm run test:e2e # E2E Tests
```

## 📄 Environment Variables

```env
VITE_API_GATEWAY_URL=http://localhost:8000/api
VITE_TOKEN_EXPIRY=7d
```

## 🤝 Shell Integration

```javascript
// In biotech-shell/vite.config.js
remotes: { 
authMF: { 
external: 'http://localhost:5001/assets/remoteEntry.js', 
from: 'vite', 
format: 'esm' 
}
}
```

## 📞 Contact

- Email: auth@biotech.com
```