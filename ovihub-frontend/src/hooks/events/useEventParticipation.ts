import { useState } from "react";
import { registerParticipation, removeParticipation } from "@/api/event-participant";

interface UseEventParticipationProps {
  onSuccess: () => void; // Aici va veni refreshCurrentPage
}

export const useEventParticipation = ({ onSuccess }: UseEventParticipationProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleParticipation = async (postId: number, isJoined: boolean) => {
    setIsSubmitting(true);
    try {
      let response;
      if (isJoined) {
        // --- CAZ: E deja inscris, vrea sa IASA ---
        console.log("Calling API to UNJOIN event:", postId); 
        response = await removeParticipation(postId);
      } else {
        // --- CAZ: Nu e inscris, vrea sa INTRE ---
        console.log("Calling API to JOIN event:", postId);
        response = await registerParticipation(postId);
      }

      if (response && response.success === true) {
        onSuccess(); // Dam refresh la pagina ca sa se aplice schimbarile de participare
      } else {
        console.error("Backend a raspuns, dar success nu e true:", response);
      }
      
    } catch (error) {
      console.error("Eroare la participare:", error);
      // TODO: Setam eroare custom sau toaster
   } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleToggleParticipation,
    isSubmitting
  };
};