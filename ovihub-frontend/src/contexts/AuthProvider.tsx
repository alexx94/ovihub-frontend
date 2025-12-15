import { useState, useEffect } from "react";
import { getMeApi, getMyRolesApi } from "@/api/user";
import { AuthContext } from "./AuthContext";
import { logoutApi } from "@/api/auth";
import type { MeResponse, Roles } from "@/api/user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<MeResponse | null>(null);
   const [roles, setRoles] = useState<Roles[] | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   const fetchMe = async () => {
      setLoading(true);
      try {
         const [me, myRoles] = await Promise.all([
            getMeApi(),
            getMyRolesApi(),
         ]);

         console.log("Fetched success")
         setUser(me);
         setRoles(myRoles);
         console.log(myRoles);
      } catch (err) {
         console.log("Auth invalid sau neautentificat, eroare: ", err);
         setUser(null);
         setRoles([]);
      } finally {
         setLoading(false);
      }
   };

   const logout = () => {
      setLoading(true);
      logoutApi();
      setUser(null);
      setRoles(null);
      setLoading(false);
      console.log("S-a facut logout log check 2/2");
   };

   useEffect(() => { fetchMe(); }, []);

   return (
      <AuthContext.Provider value={{ user, roles, loading, fetchMe, logout }}>
         {children}
      </AuthContext.Provider>
   );
};