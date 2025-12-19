import { type Role } from "@/types/role.types";
import { api } from "./index";

export interface RoleInput {
   name: string;
   description: string;
}

export interface ErrorResponse {
   success: boolean,
   error: string;
}

export async function fetchRolesApi(): Promise<Role[]> {
   const res = await api.get("/api/Role", {
      validateStatus: () => true
   });

   return res.data;
}

export async function createRoleApi(data: RoleInput): Promise<Role> {
   const res = await api.post("/api/Role", data, {

   });

   return res.data;
}

export async function deleteRoleApi(roleId: number): Promise<string | ErrorResponse> {
   const res = await api.delete(`/api/Role/${roleId}`, {
      validateStatus: () => true
   });

   return res.data;
}