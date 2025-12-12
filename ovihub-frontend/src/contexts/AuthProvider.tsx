import { useState, useEffect } from "react";
import { getMeApi } from "@/api/user";
import { AuthContext } from "./AuthContext";
import type { MeResponse } from "@/api/user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<MeResponse | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   const fetchMe = async () => {
      setLoading(true);
      try {
         const me = await getMeApi();
         console.log("Fetched success")
         setUser(me);
      } catch (err) {
         console.log("Userul nu este logat, eroare: ", err);
         setUser(null);
      } finally {
         setLoading(false);
      }
   };

   const logout = () => setUser(null);

   useEffect(() => { fetchMe(); }, []);

   return (
      <AuthContext.Provider value={{ user, loading, fetchMe, logout }}>
         {children}
      </AuthContext.Provider>
   );
};