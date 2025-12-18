import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationButtonsProps {
  currentPage: number;
  isLoading: boolean;
  hasMore: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function PaginationButtons({
  currentPage,
  isLoading,
  hasMore,
  onPrev,
  onNext,
}: PaginationButtonsProps) {
  if (!(currentPage > 1 || hasMore)) return null;

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <Button
        variant="outline"
        onClick={onPrev}
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
        onClick={onNext}
        disabled={!hasMore || isLoading}
        className="gap-2"
      >
        Înainte
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
