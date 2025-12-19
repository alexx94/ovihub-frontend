import { api } from "./index";

interface LoginData{
   email: string;
   password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  error?: string;
  token?: string;
  userId?: string;
  email?: string;
}

export interface RegisterData {
   email: string;
   password: string;
   confirmPassword: string;
}

export interface RegisterResponse {
   success: boolean;
   error?: string;
   message?: string;
}

async function loginApi(data: LoginData): Promise<LoginResponse> {
   const res = await api.post("/Auth/login", data, {
      validateStatus: () => true
   });
   return res.data;
};

async function logoutApi(): Promise<string> {
   const res = await api.post("/Auth/logout", {

   });
   return res.data;
};

async function registerApi(data: RegisterData): Promise<RegisterResponse> {
   const res = await api.post("/Auth/register", data, {
      validateStatus: () => true
   });
   return res.data;
}

//TODO: Logout, register (for new users only, allowed by admin users in backend only)

export { loginApi, logoutApi, registerApi };