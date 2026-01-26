import API_BASE_URL, { API_ENDPOINTS } from '@/config/api';

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
}

export interface LoginData {
  email: string;
  password: string;  
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

class AuthService {
  private getStoredToken(service?: 'disease' | 'crop' | 'fertilizer'): string | null {
    let token: string | null;
    switch (service) {
      case 'disease':
        token = localStorage.getItem('krishi_token_disease');
        break;
      case 'crop':
        token = localStorage.getItem('krishi_token_crop');
        break;
      case 'fertilizer':
        token = localStorage.getItem('krishi_token_fert');
        break;
      default:
        token = localStorage.getItem('krishi_token');
    }
    console.log(`getStoredToken for service=${service}:`, token);
    return token;
  }

  private setStoredToken(token: string, service?: 'disease' | 'crop' | 'fertilizer'): void {
    switch (service) {
      case 'disease':
        localStorage.setItem('krishi_token_disease', token);
        break;
      case 'crop':
        localStorage.setItem('krishi_token_crop', token);
        break;
      case 'fertilizer':
        localStorage.setItem('krishi_token_fert', token);
        break;
      default:
        localStorage.setItem('krishi_token', token);
    }
  }

  private clearStoredToken(service?: 'disease' | 'crop' | 'fertilizer'): void {
    switch (service) {
      case 'disease':
        localStorage.removeItem('krishi_token_disease');
        break;
      case 'crop':
        localStorage.removeItem('krishi_token_crop');
        break;
      case 'fertilizer':
        localStorage.removeItem('krishi_token_fert');
        break;
      default:
        localStorage.removeItem('krishi_token');
    }
  }

  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.signup}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.token) {
        // Store tokens for all services with fixed bearer tokens
        this.setStoredToken('hackathon-secret-token', 'disease');
        this.setStoredToken('team_krishi_crop', 'crop');
        this.setStoredToken('team_krishi_fert', 'fertilizer');
      }

      return result;
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.signin}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.token) {
        // Store tokens for all services with fixed bearer tokens
        this.setStoredToken('hackathon-secret-token', 'disease');
        this.setStoredToken('team_krishi_crop', 'crop');
        this.setStoredToken('team_krishi_fert', 'fertilizer');
      }

      return result;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  logout(): void {
    this.clearStoredToken();
  }

  getAuthHeaders(service?: 'disease' | 'crop' | 'fertilizer'): Record<string, string> {
  // Hardcoded tokens for each service
  const tokens = {
    disease: 'hackathon-secret-token',
    crop: 'team_krishi_crop', 
    fertilizer: 'team_krishi_fert'
  };
  
  if (service && tokens[service]) {
    return { Authorization: `Bearer ${tokens[service]}` };
  }
  
  // Default fallback
  return { Authorization: `Bearer hackathon-secret-token` };
}


  // getAuthHeaders(service?: 'disease' | 'crop' | 'fertilizer'): Record<string, string> {
  //   const token = this.getStoredToken(service);
  //   // if(service == 'disease') 
  //     return token ? { Authorization: `Bearer hackathon-secret-token` } : {};
  //   // if(service == 'crop') return token ? { Authorization: `Bearer team_krishi_crop` } : {};
  //   // if(service == 'fertilizer') return token ? { Authorization: `Bearer team_krishi_fert` } : {};
    
  // }

//   getAuthHeaders(service?: 'disease' | 'crop' | 'fertilizer'): Record<string, string> {
//   const token = this.getStoredToken(service);
//   if (!token) return {}; // respect existing behavior [5]

//   let bearer: string;
//   switch (service) {
//     case 'crop':
//       bearer = 'team_krishi_crop';
//       break;
//     case 'fertilizer':
//       bearer = 'team_krishi_fert';
//       break;
//     case 'disease':
//     default:
//       bearer = 'hackathon-secret-token';
//       break;
//   }

//   return { Authorization: `Bearer ${bearer}` };
// }


  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  getToken(): string | null {
    return this.getStoredToken();
  }
}

export default new AuthService();
