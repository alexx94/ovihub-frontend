import { fetchParticipants, type EventParticipantDto } from "@/api/event-participant";
import { useState, useEffect } from "react";

export interface ParticipantUser {
  userId: string;
  email: string;
}

export const useEventParticipants = (postId: number) => {
  const [participants, setParticipants] = useState<EventParticipantDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        // --- MOCK DATA PENTRU PREZENTARE ---
        await new Promise((resolve) => setTimeout(resolve, 500)); // Mic delay sa se vada loaderul
        const response = await fetchParticipants(postId);

        if (isMounted) {
          setParticipants(response);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [postId]);

  return { participants, isLoading };
};