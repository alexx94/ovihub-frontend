import { api } from "./index";

export interface ErrorResponse {
   success: boolean;
   error: string;
}

export interface AssignedRoleDto {
   userId: string;
   roleId: number;
}

export interface MessageRoleResponse {
   message: string;
}

export async function assignRoleApi(data: AssignedRoleDto): Promise<MessageRoleResponse | ErrorResponse> {
   const res = await api.post("/api/UserRole/assign", data, {

   });

   return res.data;
}

export async function removeRoleApi(userId: string, roleId: number): Promise<MessageRoleResponse | ErrorResponse> {
   const res = await api.delete("/api/UserRole/remove", {
      params: { userId, roleId }
   });

   return res.data;
}

