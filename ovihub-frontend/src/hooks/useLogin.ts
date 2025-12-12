import { useState } from "react";
import { loginApi } from "../api/auth";
import type { LoginResponse } from "../api/auth";
// includes both login ok and error responses into one

const useLogin = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string>("");
   const [data, setData] = useState<LoginResponse | null>(null);

   const login = async (email: string, password: string) => {
      setIsLoading(true);
      if (!email.includes("365.univ-ovidius.ro")) {
         await new Promise(resolve => setTimeout(resolve, 75)); // delay ca sa apara spinner, sa para mai engaging
         setError("Foloseste emailul universitar de 365");
         setIsLoading(false);
         return;
      }

      setError("");

      const response = await loginApi({email, password});
      setData(response);
      setIsLoading(false);
      if (!response.success) setError(response.error ?? "Eroare la autentificare");
      return response;      
   };

   return {
      login,
      isLoading,
      error, setError,
      data
   };
};

export { useLogin };