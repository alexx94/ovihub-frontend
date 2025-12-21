import { api } from "./index"; // axios instance-ul tău
import type { 
  Post,
  CreatePostData,
  BackendPost,
  BackendPostImage,
  PostImage, 
  PaginatedPostsParams, 
  PaginatedPostsResponse 
} from "../types/post.types";
type UpdatePostData = Omit<CreatePostData, "postImageIds">;

/**
 * Transformă răspunsul backend-ului pentru a extrage doar câmpurile necesare din images
 */
const transformPostImages = (images: BackendPostImage[]): PostImage[] => {
  return images.map((img) => ({
    id: img.id,
    url: img.url,
    position: img.position,
  }));
};

/**
 * Transformă un post individual pentru a curăța datele
 */
const transformPost = (post: BackendPost): Post => {
  return {
    ...post,
    images: transformPostImages(post.images || []),
  };
};

/**
 * Fetch paginated posts from backend
 * 
 * @param params - type (News/StudentEvent) și page number
 * @returns Promise cu lista de posturi și current page
 */
export const fetchPaginatedPosts = async (
  params: PaginatedPostsParams
): Promise<PaginatedPostsResponse> => {
  try {
    const response = await api.get<BackendPost[]>("/api/Post/paginated", {
      params: {
        type: params.type,
        page: params.page,
        limit: params.limit || 3, // Momentan nu permitem setarea limit-ului din frontend, e 1 default ca sa se observe paginatia
      },
    });

    // Transformă datele pentru a include doar câmpurile necesare
    const transformedData = response.data.map(transformPost);

    console.log("Fetching Posts: ", Date.now())

    return {
      data: transformedData,
      currentPage: params.page,
    };
  } catch (error) {
    console.error("Error fetching paginated posts:", error);
    throw error;
  }
};

export const createPost = async (data: CreatePostData): Promise<Post> => {
  console.log("Date de input POST: ", data)
  const response = await api.post<Post>("/api/Post", data);
  return response.data;
};

export const uploadPostImages = async(files: File[]): Promise<PostImage[]> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post<PostImage[]>("/api/post-image/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export const updatePost = async (
  id: number, 
  data: UpdatePostData
): Promise<Post> => {
  const response = await api.put<Post>(`/api/Post/${id}`, data);
  return response.data;
};

export const deletePost = async (id: number): Promise<string> => {
  const response = await api.delete(`/api/Post/${id}`);
  return response.data;
};