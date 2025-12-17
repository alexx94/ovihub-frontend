import { MoreHorizontal, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/post.types";

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
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
        "rounded-xl border border-border bg-card p-6 shadow-elegant transition-all duration-300 hover:shadow-lg",
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
        <p className="mt-2 text-muted-foreground leading-relaxed">
          {post.description}
        </p>
      </div>

      {/* Images carousel - compact size */}
      {sortedImages.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Carousel className="w-full max-w-sm">
            <CarouselContent>
              {sortedImages.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={image.url}
                      alt={`${post.title} - imagine ${image.position + 1}`}
                      className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {sortedImages.length > 1 && (
              <>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </>
            )}
          </Carousel>
        </div>
      )}
    </article>
  );
}