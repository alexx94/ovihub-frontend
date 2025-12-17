import { useState, useEffect, useRef, useCallback } from "react";
import { fetchPaginatedPosts } from "../api/posts";
import type { Post, PostType } from "../types/post.types";

interface UsePaginatedPostsResult {
  posts: Post[];
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  hasMore: boolean;
}

export const usePaginatedPosts = (
  postType: PostType
): UsePaginatedPostsResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Cache storage - persistă între renders, dispare la unmount
  const cacheRef = useRef<Map<string, Post[]>>(new Map());

  // Cache key generator
  const getCacheKey = useCallback(
    (page: number) => `${postType}-${page}`,
    [postType]
  );

  const loadPosts = useCallback(
    async (page: number) => {
      const cacheKey = getCacheKey(page);

      // Verificăm cache ÎNAINTE de orice altceva
      const cachedData = cacheRef.current.get(cacheKey);
      if (cachedData) {
        // CACHE HIT - setăm datele instant, fără fetch
        setPosts(cachedData);
        setError(null);
        return;
      }

      // CACHE MISS - facem fetch
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchPaginatedPosts({
          type: postType,
          page,
        });

        // Salvăm în cache
        cacheRef.current.set(cacheKey, response.data);

        // Actualizăm state-ul
        setPosts(response.data);

        // Determinăm dacă mai sunt pagini
        // Dacă primim 0 rezultate, înseamnă că nu mai sunt
        setHasMore(response.data.length > 0);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load posts";
        setError(errorMessage);
        setPosts([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [postType, getCacheKey]
  );

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage, loadPosts]);

  useEffect(() => {
    if (posts.length > 0) {
      // Dacă suntem pe o pagină cu conținut din cache, verifică dacă există pagina următoare în cache
      const nextPageKey = getCacheKey(currentPage + 1);
      const nextPageInCache = cacheRef.current.has(nextPageKey);
      
      if (nextPageInCache) {
        const nextPagePosts = cacheRef.current.get(nextPageKey);
        // Dacă pagina următoare există în cache și are posts, hasMore = true
        setHasMore((nextPagePosts?.length ?? 0) > 0);
      } else {
        // Dacă pagina următoare nu e în cache, presupunem că ar putea exista
        // (vom afla sigur când user-ul apasă Next)
        setHasMore(true);
      }
    }
  }, [posts, currentPage, getCacheKey]);

  const goToNextPage = useCallback(() => {
    if (!isLoading && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isLoading, hasMore]);

  const goToPreviousPage = useCallback(() => {
    if (!isLoading && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [isLoading, currentPage]);

  return {
    posts,
    currentPage,
    isLoading,
    error,
    goToNextPage,
    goToPreviousPage,
    hasMore,
  };
};