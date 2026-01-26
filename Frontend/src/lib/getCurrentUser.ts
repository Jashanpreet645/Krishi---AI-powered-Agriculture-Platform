import API_BASE_URL, { API_ENDPOINTS } from '@/config/api';
import authService from '@/services/authService';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export const getCurrentUser = async (): Promise<User | null> => {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.auth.me}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.error('Failed to fetch user:', response.status, response.statusText);
        return null;
      }
      const result = await response.json();
      if (result.user) {
        return result.user;
      }
      console.log('No user data in response:', result);
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
}
