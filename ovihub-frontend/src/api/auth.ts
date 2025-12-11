import { api } from "./index";

interface LoginData{
   email: string;
   password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  userId: string;
  email: string;
}

async function login(data: LoginData): Promise<LoginResponse> {
   const res = await api.post("/Auth/login", data);
   return res.data;
}
