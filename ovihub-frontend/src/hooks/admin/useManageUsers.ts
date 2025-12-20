import { useState } from "react";
import { useRoles } from "./useRoles";
import { findByEmailApi, type UserResponseDto } from "@/api/user";
import { type AssignedRoleDto, assignRoleApi, type ErrorResponse, type MessageRoleResponse, removeRoleApi } from "@/api/user-role";
import axios from "axios";

export const useManageUsers = () => {
   const { roles } = useRoles();
   const [userData, setUserData] = useState<UserResponseDto | null>(null);
   const [successMessage, setSuccessMessage] = useState<string>('');
   const [errorMessage, setErrorMessage] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);

   const fetchUserData = async (email: string) => {
      try {
         setLoading(true);
         setErrorMessage("");

         if (!email.trim()) {
            setErrorMessage("Emailul este obligatoriu.");
            setLoading(false);
            console.log("Aici e eroare si problema");
            return;
         }

         const response = await findByEmailApi(email);
         console.log("Raspuns backend este: " , response);

         if (response.id) {
            setUserData(response);
            return response;
         }
         else {
            setUserData(null);
            return null;
         }
      } catch (error) {
         if (axios.isAxiosError(error)) {
            setErrorMessage(error.response?.data?.error || "Eroare la returnarea datelor utilizatorului.");
         } else {
            setErrorMessage("Eroare neasteptata la returnarea datelor utilizatorului.");
          }
         console.log(errorMessage);
      } finally {
         setLoading(false);
      }
   }

   const removeRoleFromUser = async (userId: string, roleId: number) => {
      try {
         setLoading(true);
         setErrorMessage('');
         setSuccessMessage('');

         await removeRoleApi(userId, roleId);

         if (userData?.email) {
            await fetchUserData(userData.email);
         }

         setSuccessMessage("Rolul a fost eliminat cu succes.");
      } catch (error) {
         if (axios.isAxiosError(error)) {
            setErrorMessage(
            error.response?.data?.error || "Eroare la eliminarea rolului."
            );
         } else {
            setErrorMessage("Eroare neașteptată la eliminarea rolului.");
         }
      } finally {
         setLoading(false);
      }
   }

   const assignRoleToUser = async (data: AssignedRoleDto) => {
      try {
         setLoading(true);
         setErrorMessage('');
         setSuccessMessage('');

         const response: MessageRoleResponse | ErrorResponse =
            await assignRoleApi(data);

         // error response
         if ('success' in response && response.success === false) {
            setErrorMessage(response.error);
            return;
         }

         // success response
         if ('message' in response) {
            setSuccessMessage("Rol atribuit cu succes.");

            if (userData?.email) {
            await fetchUserData(userData.email);
            }

            return response;
         }
      } catch (error) {
         if (axios.isAxiosError(error)) {
            setErrorMessage(
            error.response?.data?.error || "Eroare la atribuirea rolului."
            );
         } else {
            setErrorMessage("Eroare neașteptată la atribuirea rolului.");
         }
      } finally {
         setLoading(false);
      }
   }

   return {
      roles,
      userData, setUserData,
      loading, setLoading,
      successMessage, setSuccessMessage,
      errorMessage, setErrorMessage,
      fetchUserData,
      assignRoleToUser,
      removeRoleFromUser,
   }
}