export interface User {
  id: string;
  email: string;
  name: string;
  restaurantName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  restaurantName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
