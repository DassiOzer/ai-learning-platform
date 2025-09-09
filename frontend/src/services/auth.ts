import api from './api';
import { LoginData, RegisterData, AuthResponse } from '../types';

export const authService = {
  // התחברות
  login: async (loginData: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', loginData);
    return response.data;
  },

  // הרשמה
  register: async (registerData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', registerData);
    return response.data;
  }
};