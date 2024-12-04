export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthResponseData {
  payload: User;
  access: string;
  refresh: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse extends ApiResponse<AuthResponseData> {}

export interface RefreshTokenResponse
  extends ApiResponse<{
    access: string;
    refresh: string;
  }> {}
