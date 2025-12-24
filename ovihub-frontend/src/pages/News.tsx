// src/pages/News.tsx
// import { ROLES } from "@/api/user";
import { PageHeader } from "@/components/shared/PageHeader";
import { PostCard } from "@/components/shared/PostCard";
import { useAuth } from "@/hooks/useAuth";
import { usePaginatedPosts } from "@/hooks/usePaginatedPosts";
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PaginationButtons } from "@/components/shared/PaginationButtons";
import { usePostMutations } from "@/hooks/usePostMutations";

const News = () => {
  const { roles } = useAuth();
  const {
    posts,
    currentPage,
    isLoading: isContentLoading,
    error: paginationError,
    goToNextPage,
    goToPreviousPage,
    hasMore,
    refreshCurrentPage,
    reloadAll,
  } = usePaginatedPosts("News"); 
  const {
    handleEdit, handleDelete,
    isProcessing,
    mutationError
  } = usePostMutations({
    onSuccessEdit: refreshCurrentPage,
    onSuccessDelete: reloadAll,
  });
  
  return (
    <div className="container mx-auto px-4 md:px-20 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <PageHeader
          title="Anunturi"
          description="Cele mai recente stiri si noutati"
          icon={<Newspaper className="h-6 w-6" />}
        />

        {roles?.includes("PROFESSOR") && (
          <div>
            <Link to={"/upload"}>
              <Button
                className="mt-4 hover:cursor-pointer"
                onClick={() => {
                  console.log("Add post button clicked");
                  
                }} 
              >
                Adaugă Anunt
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Pagination Controls - Always visible except on very first load */}
      {!isContentLoading && !paginationError && (
        <PaginationButtons
          currentPage={currentPage}
          isLoading={isContentLoading}
          hasMore={hasMore}
          onPrev={goToPreviousPage}
          onNext={goToNextPage}
        />
      )}

      {/* Error State */}
      {(paginationError || mutationError) && (
        <div
          className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive"
          role="alert"
        >
          <p className="font-semibold">Eroare la actualizarea postărilor</p>
          <p className="font-semibold">Dati refresh paginii si incercati din nou</p>
          <p className="text-sm">{paginationError}</p>
          <p className="text-sm">{mutationError}</p>
        </div>
      )}

      {/* Loading State */}
      {(isContentLoading || isProcessing) && (
        <div className="mt-8 flex flex-col items-center justify-center space-y-4 py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Se încarcă postările...</p>
        </div>
      )}

      {/* Content - Posts */}
      {!(isContentLoading || isProcessing) && !paginationError && (
        <>
          {posts.length > 0 ? (
            <div className="mt-8 space-y-6 md:px-30">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PostCard 
                    post={post} 
                    roles={roles} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete}  
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 flex flex-col items-center justify-center space-y-3 py-12 text-center">
              <Newspaper className="h-16 w-16 text-muted-foreground/50" />
              <p className="text-lg font-medium text-muted-foreground">
                Nu sunt postări disponibile pe această pagină
              </p>
              <p className="text-sm text-muted-foreground">
                {currentPage > 1 
                  ? "Utilizați butonul 'Înapoi' pentru a reveni la pagina anterioară"
                  : "Reveniți mai târziu pentru a vedea noutăți"
                }
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default News;