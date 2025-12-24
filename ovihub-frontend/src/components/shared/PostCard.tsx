import { Calendar, MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/post.types";
import { useState } from "react"; // <--- 1. IMPORT USE REF
import type { Roles } from "@/types/role.types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel } from "../ui/dropdown-menu";
import { DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { EventActionButtons } from "../posts/event-buttons";

interface PostCardProps {
  post: Post;
  roles: Roles[] | null;
  className?: string;
  handleEdit: (originalPost: Post, title: string, description: string) => void;
  handleDelete: (postId: number) => void;
  handleSignUp?: (postId: number, isUserParticipating: boolean) => void;
}

export function PostCard({ post, roles, handleEdit, handleDelete, handleSignUp, className }: PostCardProps) {
  const MAX_CHARS = 100;
  const [expanded, setExpanded] = useState<boolean>(false);
  const formattedDate = new Date(post.createdAt).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const sortedImages = [...post.images].sort((a, b) => a.position - b.position);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
  const [editTitle, setEditTitle] = useState<string>(post.title);
  const [editDescription, setEditDescription] = useState<string>(post.description);
  const cleanTitle = editTitle.trim();
  const cleanDescription = editDescription.trim();
  const hasChanges = (cleanTitle !== post.title.trim() || cleanDescription !== post.description.trim()) && (
                      cleanTitle.length > 0 && cleanDescription.length > 0
                    )
  const isUserParticipating = 'isJoined' in post ? !!post.isJoined : false;

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
              {post.author.split(" ").map((n) => n[0]).join("")}
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

        {/* TODO: Butonul cu optiuni editare postare sa fie modular, sa il fac componenta separata asta
            si cu dialogurile alea
        */}
        {/* Buton Optiuni Postare */}
        {roles?.some(role => ["ADMIN", "PROFESSOR"].includes(role)) && 
         <>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" aria-label="Open menu" size="icon-sm">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-50" align="end">
                <DropdownMenuLabel>Optiuni postare</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={() => setShowEditDialog(true)}
                    className="hover:bg-blue-400 hover:text-white rounded-sm hover:cursor-pointer"  
                  >
                    <div className="flex gap-2 p-1">
                       <Pencil className="p-1" />
                       Editeaza postarea
                    </div>  
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}
                    className="hover:bg-red-400 text-red-400 hover:text-white rounded-sm hover:cursor-pointer"  
                  >
                    <div className="flex gap-2 p-1 ">
                       <Trash2 className="p-1 " />
                       Sterge postarea
                    </div> 
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog dupa selectarea unei optiuni pentru postare */}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogContent 
                className="sm:max-w-[600px]" 
                onOpenAutoFocus={(e) => e.preventDefault() // Ca sa nu selecteze automat primul input, cauzeaza warning in HTML dar nu e problema
              }> 
                <DialogHeader>
                  <DialogTitle>Editeaza postarea</DialogTitle>
                  <DialogDescription>
                    Introdu noile informatii ale postarii si apasa 'Salveaza' pentru confirmare.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup className="pb-3">
                  <Field>
                    <FieldLabel htmlFor="post-title">Titlu postare</FieldLabel>
                    <Input 
                      id="post-title" 
                      name="post-title" 
                      value={editTitle}
                      autoComplete="off"
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </Field>
                </FieldGroup>
                <FieldGroup className="pb-3">
                  <Field>
                    <FieldLabel htmlFor="post-description">Descriere postare</FieldLabel>
                    <Textarea 
                      id="post-description" 
                      name="post-description" 
                      value={editDescription} 
                      maxLength={30000} // limita de caractere pe care o avem la postari
                      placeholder="Scrie detaliile postarii..."
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        // Reset values to previous
                        setEditTitle(post.title);
                        setEditDescription(post.description);
                      }}
                    >
                        Anuleaza
                    </Button>
                  </DialogClose>
                  <Button 
                    disabled={!hasChanges}
                    type="button"
                    onClick={() => {
                      console.log('Date postare', post);
                      handleEdit(post, editTitle, editDescription)
                      setShowEditDialog(false);
                    }}
                  >
                    Salveaza
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Sterge postarea</DialogTitle>
                  <DialogDescription>
                    Urmeaza sa stergi postarea '{post.title}'. Aceasta operatiune este ireversibila, doresti sa continui?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Anuleaza</Button>
                  </DialogClose>
                  <Button 
                    type="button"
                    onClick={() => {
                      handleDelete(post.id);
                      setShowDeleteDialog(false);
                    }}
                  >
                    Continua
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
          </>
        }
      </div>

      {(post.postType === 'StudentEvent' && roles?.some(role => ["ADMIN", "PROFESSOR", "STUDENT"].includes(role))) && (
        <div className="flex gap-2 mt-3 items-center">
          
          <EventActionButtons 
            postId={post.id}
            postTitle={post.title}
            isJoined={isUserParticipating}
            onToggleJoin={(id) => {
              if (handleSignUp) handleSignUp(id, isUserParticipating);
              else console.error('Nu se poate apela handleSignUp()');
            }}
          />
          
        </div>
      )}
      
      {/* Afisare continut postare */}
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

      {/* Afisare imagini postare */}
      {sortedImages.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Carousel className="w-full max-w-full sm:max-w-2xl lg:max-w-4xl">
            <CarouselContent>
              {sortedImages.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="overflow-hidden rounded-lg">
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