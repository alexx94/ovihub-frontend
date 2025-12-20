import { api } from "./index";
import { type Role, type Roles } from "@/types/role.types";

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

export interface UserResponseDto {
   id: string;
    email: string;
    createdAt: string;   
    lastLogin: string | null;
    domain: string;
    userProfile: UserProfile | null;
    roles: Role[];
}

//TODO: Roles ar trebui sa fie dinamice, incarcate din backend, nu hardcodate aici
//      Am facut un type in Role.types.ts pentru ele, asta e versunea veche, comentata
// export const ROLES = {
//    ADMIN: "ADMIN",
//    PROFESSOR: "PROFESSOR",
//    STUDENT: "STUDENT",
// } as const;

// export type Roles = typeof ROLES[keyof typeof ROLES];


async function getMeApi(): Promise<MeResponse> {
   const res = await api.get("/api/User/me", {
      validateStatus: () => true
   });
   console.log("Fetching user roles: ", Date.now())
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
   console.log("Fetching user roles: ", Date.now())
   return res.data;
}

async function findByEmailApi(email: string): Promise<UserResponseDto> {
   const res = await api.get("/api/User", {
      params: { email }
   });
   return res.data;
}

//todo: inclus aici si own roles, ca sa setam si roles in AuthContext pt ProtectedRoutes
//      sau se poate face separat role.ts, vedem***

export {getMeApi, getMyProfileApi, getMyRolesApi, findByEmailApi};
