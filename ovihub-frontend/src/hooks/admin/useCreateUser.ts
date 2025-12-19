import { useState } from "react";
import { registerApi } from "@/api/auth";

export const useCreateUser = () => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [confirmPassword, setConfirmPassword] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);
   const [successMessage, setSuccessMessage] = useState<string | null>(null);
   const [errorMessage, setErrorMessage] = useState<string | null>(null);

   const registerUser = async () => {
      setLoading(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      await new Promise(resolve => setTimeout(resolve, 200));
      const isValid = checkInput(email, password, confirmPassword);
      if (!isValid) {
         console.log("Input invalid"); 
         setLoading(false);
         return;
      }

      console.log("Input valid"); 
      const response = await registerApi({email, password, confirmPassword});
      if (!response.success) {
         setErrorMessage(response.error ?? "Eroare la crearea utilizatorului.");
      } else {
         setSuccessMessage("Utilizator creat cu succes!");
      }

      setLoading(false); 
      refreshInputs();
   }

   const checkInput = (email: string, password: string, confirmPassword: string): boolean => {
      if (!email || !password || !confirmPassword) {
         setErrorMessage("Email și parola sunt obligatorii.");
         return false;
      }

      if (!email.includes("365.univ-ovidius.ro")) {
         setErrorMessage("Folosește emailul universitar de 365.");
         return false;
      }

      if (password.length < 8) {
         setErrorMessage("Parola trebuie să aibă minim 8 caractere.");
         return false;
      }

      if (password !== confirmPassword) {
         setErrorMessage("Parolele nu se potrivesc.");
         return false;
      }

      setErrorMessage(null);
      return true;
   }

   const refreshInputs = () => {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
   }

   return {
      email, setEmail,
      password, setPassword,
      confirmPassword, setConfirmPassword,
      loading,
      successMessage,
      errorMessage,
      registerUser,
      checkInput,
   }
};
 