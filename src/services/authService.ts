
import { toast } from "sonner";

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock API implementation - In a real app, this would connect to your Node.js backend
class AuthService {
  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "auth_user";
  private readonly USERS_STORAGE = "mock_users";
  
  // Initialize mock users storage if it doesn't exist
  private initStorage() {
    if (!localStorage.getItem(this.USERS_STORAGE)) {
      localStorage.setItem(this.USERS_STORAGE, JSON.stringify([]));
    }
  }

  // Get users from mock storage
  private getUsers(): RegisterData[] {
    this.initStorage();
    return JSON.parse(localStorage.getItem(this.USERS_STORAGE) || "[]");
  }

  // Save a user to mock storage
  private saveUser(user: RegisterData) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.USERS_STORAGE, JSON.stringify(users));
  }

  // Find a user by email
  private findUserByEmail(email: string): RegisterData | undefined {
    return this.getUsers().find(user => user.email === email);
  }

  // Generate a mock JWT token
  private generateToken(email: string): string {
    // In a real app, this would be a proper JWT from your backend
    return `mock_jwt_token_${email}_${Date.now()}`;
  }

  // Register a new user
  async register(data: RegisterData): Promise<AuthResponse> {
    // In a real app, this would be a fetch call to your API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Check if user already exists
          if (this.findUserByEmail(data.email)) {
            reject(new Error("User with this email already exists"));
            return;
          }

          // Create new user with id and creation date
          const newUser: User = {
            id: `user_${Date.now()}`,
            email: data.email,
            name: data.name,
            created_at: new Date().toISOString()
          };

          // Save user to mock storage
          this.saveUser(data);

          // Generate token
          const token = this.generateToken(data.email);

          // Save auth data to localStorage
          localStorage.setItem(this.TOKEN_KEY, token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(newUser));

          resolve({ user: newUser, token });
        } catch (error) {
          reject(error);
        }
      }, 800); // Simulate API delay
    });
  }

  // Login a user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // In a real app, this would be a fetch call to your API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Find user
          const user = this.findUserByEmail(credentials.email);
          
          // Check if user exists and password matches
          if (!user || user.password !== credentials.password) {
            reject(new Error("Invalid email or password"));
            return;
          }

          // Create user object (excluding password)
          const userData: User = {
            id: `user_${Date.now()}`, // Mock ID
            email: user.email,
            name: user.name,
            created_at: new Date().toISOString()
          };

          // Generate token
          const token = this.generateToken(credentials.email);

          // Save auth data to localStorage
          localStorage.setItem(this.TOKEN_KEY, token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(userData));

          resolve({ user: userData, token });
        } catch (error) {
          reject(error);
        }
      }, 800); // Simulate API delay
    });
  }

  // Logout a user
  async logout(): Promise<void> {
    // In a real app, this would invalidate the token on the server
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        resolve();
      }, 300);
    });
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // Get current user
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch (error) {
      return null;
    }
  }

  // Get current token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Verify token (simulated)
  async verifyToken(): Promise<boolean> {
    // In a real app, this would validate the token with your API
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = this.isAuthenticated();
        resolve(isValid);
      }, 300);
    });
  }
}

export const authService = new AuthService();
