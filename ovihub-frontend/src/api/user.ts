import { api } from "./index";

export interface MeResponse {
  id: string;
  email: string;
  createdAt: string;
  lastLogin: string;
  domain: string;
}


export interface UserProfile {
  id: number;
  createdAt: string;
  updatedAt: string;
  setupCompleted: boolean;
  displayName: string;
  firstName: string;
  lastName: string;
  pictureUrl: string | null;
  phoneNumber: string | null;
}

export const ROLES = {
   ADMIN: "ADMIN",
   PROFESSOR: "PROFESSOR",
   STUDENT: "STUDENT",
} as const;

export type Roles = typeof ROLES[keyof typeof ROLES];


async function getMeApi(): Promise<MeResponse> {
   const res = await api.get("/api/User/me", {
      validateStatus: () => true
   });
   return res.data;
}

async function getMyProfileApi(): Promise<UserProfile> {
   const res = await api.get("/api/User/me/profile", {
      validateStatus: () => true
   });
   return res.data;
}

async function getMyRolesApi(): Promise<Roles[]> {
   const res = await api.get("api/User/me/roles", {
      validateStatus: () => true
   });
   return res.data;
}

//todo: inclus aici si own roles, ca sa setam si roles in AuthContext pt ProtectedRoutes
//      sau se poate face separat role.ts, vedem***

export {getMeApi, getMyProfileApi, getMyRolesApi};
