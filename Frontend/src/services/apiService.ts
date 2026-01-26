import API_BASE_URL, { API_ENDPOINTS } from '@/config/api';
import authService from './authService';

export interface CropRecommendationData {
  Temperature: number;
  Moisture: number;
  Rainfall: number;
  PH: number;
  Nitrogen: number;
  Phosphorous: number;
  Potassium: number;
  Carbon: number;
  Soil: string;
}

export interface FertilizerRecommendationData {
  Crop: string;
  Temperature: number;
  Moisture: number;
  Rainfall: number;
  PH: number;
  Nitrogen: number;
  Phosphorous: number;
  Potassium: number;
  Carbon: number;
  Soil: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

class ApiService {
  // private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  //   try {
  //     const data = await response.json();
      
  //     if (!response.ok) {
  //       return {
  //         success: false,
  //         message: data.message || `HTTP error! status: ${response.status}`,
  //         error: data.error
  //       };
  //     }

  //     return {
  //       success: true,
  //       message: data.message || 'Success',
  //       data: data
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: 'Failed to parse response',
  //       error: error instanceof Error ? error.message : 'Unknown error'
  //     };
  //   }
  // }

  
//   private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
//   console.log("Response status:", response.status);
//   console.log("Response headers:", response.headers);
  
//   try {
//     // Handle 204 No Content
//     if (response.status === 204) {
//       return {
//         success: true,
//         message: 'Request completed successfully (no content)',
//         data: {} as T
//       };
//     }

//     // Try to get response text first to debug
//     const responseText = await response.text();
//     console.log("Raw response text:", responseText);
    
//     // Parse JSON if not empty
//     let data;
//     if (responseText) {
//       data = JSON.parse(responseText);
//     } else {
//       data = {};
//     }

//     if (!response.ok) {
//       return {
//         success: false,
//         message: data.message || `HTTP error! status: ${response.status}`,
//         error: data.error
//       };
//     }

//     return {
//       success: true,
//       message: data.message || 'Success',
//       data: data
//     };
//   } catch (error) {
//     console.error("Response parsing error:", error);
//     return {
//       success: false,
//       message: 'Failed to parse response',
//       error: error instanceof Error ? error.message : 'Unknown error'
//     };
//   }
// }

private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  console.log("=== RESPONSE DEBUG ===");
  console.log("Status:", response.status);
  console.log("Status Text:", response.statusText);
  console.log("OK:", response.ok);
  console.log("Headers:", [...response.headers.entries()]);
  
  try {
    // Check if response is ok first
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get response as text first to see what we're dealing with
    const responseText = await response.text();
    console.log("Raw response text:", responseText);
    console.log("Response text length:", responseText.length);

    // If empty response
    if (!responseText || responseText.trim().length === 0) {
      return {
        success: false,
        message: 'Empty response from server',
        error: 'No content received'
      };
    }

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
      console.log("Parsed JSON data:", data);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return {
        success: false,
        message: 'Invalid JSON response from server',
        error: 'Failed to parse JSON'
      };
    }

    // Return success with the parsed data
    return {
      success: true,
      message: 'Success',
      data: data
    };

  } catch (error) {
    console.error("Response handling error:", error);
    return {
      success: false,
      message: 'Failed to process response',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}



  private getRequestHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      ...authService.getAuthHeaders()
    };
  }

  // async getCropRecommendation(data: any): Promise<ApiResponse<any>> {
  //   const url = `${API_BASE_URL}${API_ENDPOINTS.features.cropRecommend}`;
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     ...authService.getAuthHeaders('crop')
  //   };

  //   console.log("req headers", headers);
  //   console.log("req method", 'POST');
  //   console.log("req url", url);

  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers,
  //       credentials: 'include',
  //       body: JSON.stringify(data),
  //     });

  //     console.log("res", response.status, response.statusText);

  //     const result = await this.handleResponse(response);
  //     console.log("res data", result);

  //     return result;
  //   } catch (error) {
  //     console.log("err", error instanceof Error ? error.message : 'Unknown error');
  //     return {
  //       success: false,
  //       message: 'Network error. Please check your connection.',
  //       error: error instanceof Error ? error.message : 'Unknown error'
  //     };
  //   }
  // }

//   async getCropRecommendation(data: any): Promise<ApiResponse<any>> {
//   const url = `${API_BASE_URL}${API_ENDPOINTS.features.cropRecommend}`;
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer team_krishi_crop' // Hardcoded
//   };

//   console.log("req headers", headers);
//   console.log("req method", 'POST');
//   console.log("req url", url);

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers,
//       credentials: 'include',
//       body: JSON.stringify(data),
//     });

//     console.log("res", response.status, response.statusText);
//     const result = await this.handleResponse(response);
//     console.log("res data", result);

//     return result;
//   } catch (error) {
//     console.log("err", error instanceof Error ? error.message : 'Unknown error');
//     return {
//       success: false,
//       message: 'Network error. Please check your connection.',
//       error: error instanceof Error ? error.message : 'Unknown error'
//     };
//   }
// }

async getCropRecommendation(data: any): Promise<ApiResponse<any>> {
  const url = `${API_BASE_URL}${API_ENDPOINTS.features.cropRecommend}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer team_krishi_crop'
  };

  console.log("req headers", headers);
  console.log("req method", 'POST');
  console.log("req url", url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      // Remove this line: credentials: 'include',
      body: JSON.stringify(data),
    });

    console.log("res", response.status, response.statusText);
    const result = await this.handleResponse(response);
    console.log("res data", result);

    return result;
  } catch (error) {
    console.log("err", error instanceof Error ? error.message : 'Unknown error');
    return {
      success: false,
      message: 'Network error. Please check your connection.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}



  // async getFertilizerRecommendation(data: any): Promise<ApiResponse<any>> {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.features.fertilizerRecommend}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     return await response.json();
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: 'Network error. Please check your connection.',
  //       error: error instanceof Error ? error.message : 'Unknown error'
  //     };
  //   }
  // }

//   

async getFertilizerRecommendation(data: any): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.features.fertilizerRecommend}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer team_krishi_fert' // Hardcoded
      },
      body: JSON.stringify(data),
    });
    
    return await this.handleResponse(response); // Use consistent handler
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please check your connection.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}



// async detectPlantDisease(imageFile: File): Promise<ApiResponse<any>> {
//   const formData = new FormData();
//   formData.append('image', imageFile);

//   const headers: HeadersInit = {
//     ...authService.getAuthHeaders(), // This should include Authorization: Bearer <token>
//   };

//   const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.features.diseaseDetect}`, {
//     method: 'POST',
//     headers, // Only Authorization header, NOT Content-Type
//     body: formData,
//   });
//   return await response.json();
// }

  async checkHealth(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.health}`, {
        method: 'GET',
      });

      return this.handleResponse(response);
    } catch (error) {
      return {
        success: false,
        message: 'Cannot connect to server',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async detectPlantDisease(imageFile: File): Promise<ApiResponse<any>> {
  const formData = new FormData();
  formData.append('image', imageFile);

  const headers: HeadersInit = {
    Authorization: 'Bearer hackathon-secret-token' // Hardcoded for disease detection
  };

  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.features.diseaseDetect}`, {
    method: 'POST',
    headers,
    body: formData,
  });
  return await response.json();
}



}

export default new ApiService();
