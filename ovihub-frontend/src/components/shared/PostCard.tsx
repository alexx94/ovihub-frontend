import { MoreHorizontal, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/post.types";
import { useState } from "react";

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  const MAX_CHARS = 100;
  const [expanded, setExpanded] = useState<boolean>(false);

  // Format date pentru afișare
  const formattedDate = new Date(post.createdAt).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Sortează imaginile după position înainte de afișare
  const sortedImages = [...post.images].sort((a, b) => a.position - b.position);


  return (
    <article
      className={cn(
        "rounded-xl border border-border bg-white p-6 shadow-elegant transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="bg-linear-to-tr from-blue-500 to-slate-400 text-white">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-foreground">{post.author}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </div>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Content Description */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
        <p className="mt-2 text-muted-foreground leading-relaxed whitespace-pre-line">
          {expanded
            ? post.description
            : post.description.slice(0, MAX_CHARS)
          }
          {!expanded && post.description.length > MAX_CHARS && "..."}
        </p>
        {post.description.length > MAX_CHARS && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-sm font-medium text-primary hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Images carousel - Larger, responsive sizing */}
      {sortedImages.length > 0 && (
        <div className="mt-4 flex justify-center">
          {/* 
            Responsive breakpoints:
            - Mobile (default): max-w-full (takes full width)
            - Tablet (sm): max-w-2xl 
            - Desktop (lg): max-w-4xl (much larger)
          */}
          <Carousel className="w-full max-w-full sm:max-w-2xl lg:max-w-4xl">
            <CarouselContent>
              {sortedImages.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="overflow-hidden rounded-lg">
                    {/* 
                      Fixed height responsive:
                      - Mobile: h-56 (224px)
                      - Tablet: h-80 (320px)
                      - Desktop md: h-96 (384px)
                      - Desktop lg: h-128 (512px)
                      - Desktop xl: h-160 (640px)
                    */}
                    <div className="relative h-56 sm:h-80 md:h-96 lg:h-128 xl:h-160 w-full">
                      <img
                        src={image.url}
                        alt={`${post.title} - imagine ${image.position + 1}`}
                        className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {sortedImages.length > 1 && (
              <>
                {/* Navigation buttons - also responsive positioning */}
                <CarouselPrevious className="-left-3 sm:-left-4 md:-left-6 lg:-left-12" />
                <CarouselNext className="-right-3 sm:-right-4 md:-right-6 lg:-right-12" />
              </>
            )}
          </Carousel>
        </div>
      )}
    </article>
  );
}