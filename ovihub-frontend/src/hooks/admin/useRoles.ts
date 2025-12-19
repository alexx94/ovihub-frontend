import { fetchRolesApi, createRoleApi, deleteRoleApi, type RoleInput } from "@/api/roles";
import { useEffect, useState } from "react";
import { type Role } from "@/types/role.types";
import axios from "axios";

export const useRoles = () => {
   const [roles, setRoles] = useState<Role[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [successMessage, setSuccessMessage] = useState<string | null>(null);
   const [errorMessage, setErrorMessage] = useState<string | null>(null);

   const createRole = async (role: RoleInput) => {
      try {
         setLoading(true);
         if (!role.name.trim()) {
            setErrorMessage("Numele este obligatoriu.");
            setLoading(false);
            return;
         };

         if (!role.description.trim()) {
            setErrorMessage("Descrierea este obligatorie.");
            setLoading(false);
            return;
         }

         role.name = role.name.toUpperCase();

         console.log("Creating role...");
         const response = await createRoleApi(role);
         console.log("Role created:", response);
         setSuccessMessage("Rol creat cu succes!");
         fetchRoles();
      } catch (error) {
         if (axios.isAxiosError(error)) {
            setErrorMessage(error.response?.data?.error || "Eroare la crearea rolului.");
         } else {
            setErrorMessage("Eroare neasteptata la crearea rolului.");
          }
      } finally {
         setLoading(false);
      }
      
   }

   const deleteRole = async (roleId: number) => {
      try {
         setLoading(true);
         console.log("Deleting role...");
         const response = await deleteRoleApi(roleId);

         if (typeof response === "object" && "error" in response) {
            setErrorMessage(response.error || "Eroare la stergerea rolului.");
            return;
         }

         console.log("Role deleted: ", response);
         setSuccessMessage("Rol sters cu succes!");
         fetchRoles();
      } catch (error) {
         if (axios.isAxiosError(error)) {
            setErrorMessage(error.response?.data?.error || "Eroare la stergerea rolului.");
         } else {
            setErrorMessage("Eroare neasteptata la stergerea rolului.");
          }
      } finally {
         setLoading(false);
      }
   }

   const fetchRoles = async () => {
      setLoading(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      console.log("Fetching roles...");
      const response = await fetchRolesApi();
      if (!response) {
         setErrorMessage("Eroare la preluarea rolurilor.");
         setLoading(false);
         return;
      }
      
      setRoles(response);
      setLoading(false);
   }

   
   useEffect(() => {
      const loadRoles = async () => {
         await fetchRoles();
      };
      loadRoles();
   }, []);

   return {
      roles, setRoles,        
      loading, setLoading,
      successMessage,
      errorMessage,
      fetchRoles,
      createRole,
      deleteRole,
   };
}