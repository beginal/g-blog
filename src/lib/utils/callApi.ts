interface CallApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  headers?: HeadersInit;
  type?: 'json' | 'formData' | 'text';
  errorMessage?: string;
}


class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * 기본 API 호출 함수
 */
async function callApi<T = any>(
  url: string,
  options: CallApiOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    data,
    headers = {},
    type = 'json',
    errorMessage
  } = options;

  const config: RequestInit = {
    method,
    headers: {
      ...headers,
    },
  };

  // Content-Type 설정 및 body 처리
  if (data && method !== 'GET') {
    if (type === 'json') {
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
      };
      config.body = JSON.stringify(data);
    } else if (type === 'formData') {
      // FormData는 Content-Type을 자동으로 설정
      config.body = data;
    } else if (type === 'text') {
      config.headers = {
        ...config.headers,
        'Content-Type': 'text/plain',
      };
      config.body = data;
    }
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      
      throw new ApiError(
        errorData.error || errorData.message || errorMessage || `Request failed with status ${response.status}`,
        response.status,
        errorData
      );
    }

    // 204 No Content 처리
    if (response.status === 204) {
      return {} as T;
    }

    // Response 타입에 따른 처리
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const result = await response.json();
      // data 필드가 있으면 추출, 없으면 전체 반환
      return result.data !== undefined ? result.data : result;
    } else if (contentType?.includes('text/')) {
      return await response.text() as unknown as T;
    } else {
      return await response.blob() as unknown as T;
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // 네트워크 에러 등
    throw new Error(errorMessage || '네트워크 오류가 발생했습니다.');
  }
}

/**
 * API 메서드별 헬퍼 함수
 */
export const api = {
  get: <T = any>(url: string, options?: Omit<CallApiOptions, 'method' | 'data'>) => 
    callApi<T>(url, { ...options, method: 'GET' }),
    
  post: <T = any>(url: string, data?: any, options?: Omit<CallApiOptions, 'method' | 'data'>) => 
    callApi<T>(url, { ...options, method: 'POST', data }),
    
  put: <T = any>(url: string, data?: any, options?: Omit<CallApiOptions, 'method' | 'data'>) => 
    callApi<T>(url, { ...options, method: 'PUT', data }),
    
  delete: <T = any>(url: string, options?: Omit<CallApiOptions, 'method' | 'data'>) => 
    callApi<T>(url, { ...options, method: 'DELETE' }),
    
  patch: <T = any>(url: string, data?: any, options?: Omit<CallApiOptions, 'method' | 'data'>) => 
    callApi<T>(url, { ...options, method: 'PATCH', data }),
};

export default api;