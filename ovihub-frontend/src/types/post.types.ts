// types/post.types.ts

export type PostType = "News" | "StudentEvent";

/**
 * Image data as returned by backend (with extra fields we don't need)
 */
export interface BackendPostImage {
  id: number;
  url: string;
  position: number;
  postId: number | null;
  filePath: string | null;
  status: string | null;
}

/**
 * Image data after transformation (only fields we need)
 */
export interface PostImage {
  id: number;
  url: string;
  position: number;
}

/**
 * Post data as returned by backend
 */
export interface BackendPost {
  id: number;
  title: string;
  description: string;
  postType: PostType;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userEmail: string;
  author: string;
  images: BackendPostImage[];
}
/**
 * Post data input (what is sent to backend for processing as DTO)
 */
export interface CreatePostData {
  title: string;
  description: string;
  postType: PostType;
  postImageIds?: number[];
}


/**
 * Post data after transformation (clean for frontend use)
 */
export interface Post {
  id: number;
  title: string;
  description: string;
  postType: PostType;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userEmail: string;
  author: string;
  images: PostImage[];
}

export interface PaginatedPostsParams {
  type: PostType;
  page: number;
  limit?: number;
}

export interface PaginatedPostsResponse {
  data: Post[];
  currentPage: number;
}