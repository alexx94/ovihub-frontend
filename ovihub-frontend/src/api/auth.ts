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

//TODO: Logout, register (for new users only, allowed by admin users in backend only)

export { loginApi, logoutApi };