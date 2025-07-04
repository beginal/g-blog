import api from "../utils/callApi";

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  user?: any;
  needsEmailVerification?: boolean;
}

/**
 * 로그인
 */
export async function login(credentials: AuthCredentials): Promise<AuthResponse> {
  return api.post<AuthResponse>("/api/auth?action=login", credentials, {
    errorMessage: "로그인에 실패했습니다."
  });
}

/**
 * 회원가입
 */
export async function signup(credentials: AuthCredentials): Promise<AuthResponse> {
  return api.post<AuthResponse>("/api/auth?action=signup", credentials, {
    errorMessage: "회원가입에 실패했습니다."
  });
}

/**
 * 로그아웃
 */
export async function logout(): Promise<AuthResponse> {
  return api.post<AuthResponse>("/api/auth?action=logout", undefined, {
    errorMessage: "로그아웃에 실패했습니다."
  });
}

/**
 * 현재 인증 상태 확인
 */
export async function checkAuth(): Promise<{ authenticated: boolean; user: any }> {
  return api.get<{ authenticated: boolean; user: any }>("/api/auth", {
    errorMessage: "인증 상태 확인에 실패했습니다."
  });
}

/**
 * 이미지 업로드
 */
export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("image", file);
  
  return api.post<{ url: string }>("/api/upload", formData, {
    type: "formData",
    errorMessage: "이미지 업로드에 실패했습니다."
  });
}