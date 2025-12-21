import { useState, useCallback } from "react";
import { updatePost, deletePost } from "../api/posts";
import type { Post } from "../types/post.types";

interface UsePostMutationsProps {
   onSuccessEdit: () => void;
   onSuccessDelete: () => void;
}

export const UsePostMutations = ({
    onSuccessEdit, 
    onSuccessDelete 
}: UsePostMutationsProps) => {
   const [isProcessing, setIsProcessing] = useState<boolean>(false);
   const [mutationError, setMutationError] = useState<string>('');

   const handleEdit = useCallback(async (originalPost: Post, newTitle: string, newDescription: string) => {
      console.log("Original Post: ", originalPost);
      console.log("Titlul nou: ", newTitle);
      console.log("Descrierea noua: ", newDescription);

      try {
      setIsProcessing(true);
      setMutationError('');

      // Call API Update catre backend
      const response = await updatePost(originalPost.id, {
         title: newTitle,
         description: newDescription,
         postType: originalPost.postType
      });

      console.log('Postarea actualizata: ', response);
      onSuccessEdit();
      } catch (err) {
      const errorMessage =
            err instanceof Error ? err.message : "Failed to Edit post";
      setMutationError(errorMessage)
      } finally {
      setIsProcessing(false);
      }
   }, [onSuccessEdit]);

   const handleDelete = useCallback(async (postId: number) => {
      try {
         setIsProcessing(true);
         setMutationError('');

         console.log("Deleted post: ", postId);
         const response = await deletePost(postId);
         console.log(response);
         onSuccessDelete();
      }   catch (err) {
         const errorMessage =
            err instanceof Error ? err.message : "Failed to Edit post";
         setMutationError(errorMessage)
      } finally {
         setIsProcessing(false);
      }
   }, [onSuccessDelete])

   return {
      handleEdit,
      handleDelete,
      isProcessing,
      mutationError,
   }
}