import { logger } from './logger';

export interface User {
  id: string;
  email: string;
  username: string;
  full_name?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  full_name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class AuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    // localStorage'dan token'ları yükle
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('access_token');
      this.refreshToken = localStorage.getItem('refresh_token');
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Registration failed');
      }

      const authData: AuthResponse = await response.json();
      this.setTokens(authData.access_token, authData.refresh_token);
      logger.info('User registered successfully');
      return authData;
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }

      const authData: AuthResponse = await response.json();
      this.setTokens(authData.access_token, authData.refresh_token);
      logger.info('User logged in successfully');
      return authData;
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    this.clearTokens();
    logger.info('User logged out');
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.accessToken) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token geçersiz, refresh deneyelim
          const refreshed = await this.refreshTokens();
          if (refreshed) {
            return this.getCurrentUser();
          }
        }
        // 400, 404 veya diğer hatalar için de null dön
        logger.error(`Failed to get user info: ${response.status} ${response.statusText}`);
        return null;
      }

      return await response.json();
    } catch (error) {
      logger.error('Get current user error:', error);
      return null;
    }
  }

  async refreshTokens(): Promise<boolean> {
    if (!this.refreshToken) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: this.refreshToken }),
      });

      if (!response.ok) {
        this.clearTokens();
        return false;
      }

      const authData: AuthResponse = await response.json();
      this.setTokens(authData.access_token, authData.refresh_token);
      return true;
    } catch (error) {
      logger.error('Token refresh error:', error);
      this.clearTokens();
      return false;
    }
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  private clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }
}

export const authService = new AuthService(); 