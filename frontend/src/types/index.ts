export interface User {
  id: string;
  name: string;
  phone: string;
}

export interface LoginData {
  name: string;
  phone: string;
}

export interface RegisterData {
  name: string;
  phone: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  category_id: string;
}

export interface Prompt {
  _id: string;
  user_id: string;
  category_id: string | { _id: string; name: string };
  sub_category_id: string | { _id: string; name: string };
  prompt: string;
  response: string;
  created_at: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user: User;
}

export interface ApiError {
  message: string;
  status: number;
}