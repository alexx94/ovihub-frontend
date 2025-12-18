import { useState } from "react";
import { createPost, uploadPostImages } from "@/api/posts";
import type { CreatePostData, Post } from "@/types/post.types";

interface UseCreatePostResult {
  isUploading: boolean;
  error: string | null;
  uploadProgress: number;
  submitPost: (data: CreatePostFormData) => Promise<Post | null>;
  resetError: () => void;
  resetUploadState: () => void;
} 

export interface CreatePostFormData {
  title: string;
  description: string;
  type: "News" | "StudentEvent";
  files: File[];
}

export const useCreatePost = (): UseCreatePostResult => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const submitPost = async (formData: CreatePostFormData): Promise<Post | null> => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      let imagesIds: number[] = [];

      // Pas 1: Upload imagini (daca exista)
      if (formData.files.length > 0) {
        setUploadProgress(10);
        
        try {
          const uploadResponse = await uploadPostImages(formData.files);
          imagesIds = uploadResponse.map(postImage => postImage.id);
          setUploadProgress(50);
        } catch (imgError) {
          throw new Error(
            imgError instanceof Error 
              ? `Eroare la încărcarea imaginilor: ${imgError.message}` 
              : "Eroare la încărcarea imaginilor"
          );
        }
      } else {
        setUploadProgress(50);
      }

      // Pas 2: Creeaza post-ul cu URL-urile imaginilor
      const postData: CreatePostData = {
        title: formData.title,
        description: formData.description,
        postType: formData.type,
        ...(imagesIds.length > 0 && { postImageIds: imagesIds})
      };

      setUploadProgress(75);

      const createdPost = await createPost(postData);
      
      setUploadProgress(100);
      setIsUploading(false);

      return createdPost;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "A apărut o eroare la crearea postării";
      setError(errorMessage);
      setIsUploading(false);
      setUploadProgress(0);
      //TODO: Call api pentru Delete fotografii (in caz ca exista fotografii incarcate)
      //      Daca nu, sa fac scheduledJob in Supabase sa dea clean la datele orfane (ruleaza noaptea)
      return null;
    }
  };

  const resetError = () => {
    setError(null);
  };

  const resetUploadState = () => {
    setError(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  return {
    isUploading,
    error,
    uploadProgress,
    submitPost,
    resetError,
    resetUploadState,
  };
};