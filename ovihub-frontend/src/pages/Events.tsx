// src/pages/News.tsx
import { ROLES } from "@/api/user";
import { PageHeader } from "@/components/shared/PageHeader";
import { PostCard } from "@/components/shared/PostCard";
import { useAuth } from "@/hooks/useAuth";
import { usePaginatedPosts } from "@/hooks/usePaginatedPosts";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const News = () => {
  const { roles } = useAuth();
  
  const {
    posts,
    currentPage,
    isLoading,
    error,
    goToNextPage,
    goToPreviousPage,
    hasMore,
  } = usePaginatedPosts("StudentEvent");

  //TODO: Description posts to only display certain number of chars and then a 'read more' link
  //      which will expand upon clicking, to display the entire content description.

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <PageHeader
          title="Evenimente studentesti"
          description="Participa la evenimente studentesti cu prietenii"
          icon={<Calendar className="h-6 w-6" />}
        />

        {roles?.includes(ROLES.PROFESSOR) && (
          <div>
            <Button
              className="mt-4"
              onClick={() => {
                console.log("Add post button clicked");
              }} //TODO: Handler with modal etc.
            >
              Adaugă Eveniment
            </Button>
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div
          className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive"
          role="alert"
        >
          <p className="font-semibold">Eroare la încărcarea postărilor</p>
          <p className="font-semibold">Dati refresh paginii si incercati din nou</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="mt-8 flex flex-col items-center justify-center space-y-4 py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Se încarcă postările...</p>
        </div>
      )}

      {/* Content - Posts */}
      {!isLoading && !error && (
        <>
          {posts.length > 0 ? (
            <div className="mt-8 space-y-6 md:px-30">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 flex flex-col items-center justify-center space-y-3 py-12 text-center">
              <Calendar className="h-16 w-16 text-muted-foreground/50" />
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

          {/* Pagination Controls - Always visible except on very first load */}
          {(currentPage > 1 || posts.length > 0) && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="default"
                onClick={goToPreviousPage}
                disabled={currentPage === 1 || isLoading}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Înapoi
              </Button>

              <span className="text-sm font-medium text-muted-foreground">
                Pagina {currentPage}
              </span>

              <Button
                variant="outline"
                size="default"
                onClick={goToNextPage}
                disabled={!hasMore || isLoading}
                className="gap-2"
              >
                Înainte
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default News;