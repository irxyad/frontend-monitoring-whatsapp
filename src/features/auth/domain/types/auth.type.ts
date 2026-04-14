export interface AuthUser {
  username: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}
