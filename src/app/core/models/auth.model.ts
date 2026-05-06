export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
