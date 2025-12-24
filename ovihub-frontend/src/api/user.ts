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

export interface EditProfileInfoDto {
  phoneNumber: string | null;
}


async function getMeApi(): Promise<MeResponse> {
   const res = await api.get("/api/User/me", {
      validateStatus: () => true
   });
   console.log("Fetching user roles: ", Date.now())
   return res.data;
}

async function getMyProfileApi(): Promise<UserResponseDto> {
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

async function updateUserProfile(dto: EditProfileInfoDto): Promise<UserProfile> {
  const response = await api.put<UserProfile>("/api/User/me/profile", dto);
  return response.data;
}

export { getMeApi, getMyProfileApi, getMyRolesApi, findByEmailApi, updateUserProfile, type Roles };