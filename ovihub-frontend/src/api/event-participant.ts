import { api } from "./index";

const BASE_URL = '/api/EventParticipant';

export interface EventParticipantDto {
   eventPostId: number,
   userId: string,
   userEmail: string,
}

export const registerParticipation = async (postId: number) => {
   const response = await api.post(`${BASE_URL}/register/${postId}`);
   return response.data;
}

export const removeParticipation = async (postId: number) => {
   const response = await api.delete(`${BASE_URL}/unregister/${postId}`);
   return response.data;
}

export const fetchParticipants = async (postId: number): Promise<EventParticipantDto[]> => {
   const response = await api.get(`${BASE_URL}/post/${postId}`);
   console.log(response.data.message);
   return response.data.message;
}