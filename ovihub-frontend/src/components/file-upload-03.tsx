import { File as FileIcon, Trash, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCreatePost } from "@/hooks/useCreatePost";
import type { Post } from "@/types/post.types";

interface FileUpload03Props {
  onSuccess?: (post: Post) => void;
  onCancel?: () => void;
}

export default function FileUpload03({ onSuccess, onCancel }: FileUpload03Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postType, setPostType] = useState<"News" | "StudentEvent" | "">("");

  const { isUploading, error, uploadProgress, submitPost, resetError } = useCreatePost();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) =>
      setFiles((prev) => {
        const combined = [...prev, ...acceptedFiles];
        return combined.slice(0, 10);
      }),
    maxFiles: 10,
    multiple: true,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxSize: 50 * 1024 * 1024,
  });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPostType("");
    setFiles([]);
    resetError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !postType) {
      return;
    }

    try {
      const result = await submitPost({
        title: title.trim(),
        description: description.trim(),
        type: postType as "News" | "StudentEvent",
        files: files,
      });

      if (result) {
        // Reset form DUPĂ ce primim răspunsul
        resetForm();
        
        // Apoi notifică părintele
        if (onSuccess) {
          onSuccess(result);
        }
      }
    } catch (err) {
      // Eroarea e deja handled în hook, dar poți adăuga extra logic aici
      console.error("Form submission error:", err);
    }
  };

  const handleCancel = () => {
    resetForm();
    
    if (onCancel) {
      onCancel();
    }
  };

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile.name !== fileName));
  };

  const filesList = files.map((file) => (
    <li key={file.name} className="relative">
      <Card className="relative p-4">
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Remove file"
            disabled={isUploading}
            onClick={() => removeFile(file.name)}
          >
            <Trash className="h-5 w-5" aria-hidden={true} />
          </Button>
        </div>
        <CardContent className="flex items-center space-x-3 p-0">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
            <FileIcon className="h-5 w-5 text-foreground" aria-hidden={true} />
          </span>
          <div>
            <p className="font-medium text-foreground">{file.name}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </CardContent>
      </Card>
    </li>
  ));

  return (
    <div className="flex items-center justify-center p-10">
      <Card className="sm:mx-auto sm:max-w-xl">
        <CardHeader>
          <CardTitle>Încarcă o postare</CardTitle>
          <CardDescription>
            Selectează tipul postării (Anunț, Eveniment)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-destructive">Eroare</p>
                  <p className="text-sm text-destructive/90">{error}</p>
                </div>
              </div>
            )}

            {uploadProgress === 100 && !error && (
              <div className="mb-4 rounded-md border border-green-500/50 bg-green-500/10 p-3 flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-600">Succes</p>
                  <p className="text-sm text-green-600/90">Postarea a fost creată cu succes!</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <Label htmlFor="title" className="font-medium">
                  Titlu
                </Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="ex. Anunț sesiune !"
                  className="mt-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isUploading}
                  required
                />
              </div>
              
              <div className="col-span-full sm:col-span-3">
                <Label htmlFor="post-type" className="font-medium">
                  Tip postare
                </Label>
                <Select 
                  value={postType} 
                  onValueChange={(value) => setPostType(value as "News" | "StudentEvent")}
                  disabled={isUploading}
                  required
                >
                  <SelectTrigger
                    id="post-type"
                    name="post-type"
                    className="mt-2 w-full"
                    aria-required
                  >
                    <SelectValue placeholder="Selectează tipul" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="News">Anunț</SelectItem>
                    <SelectItem value="StudentEvent">Eveniment</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-2 text-sm text-muted-foreground">
                  Selectează tipul postării pe care o faci.
                </p>
              </div>

              <div className="col-span-full">
                <Label htmlFor="description" className="font-medium">
                  Conținut
                </Label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  maxLength={30000}
                  placeholder="Scrie o descriere..."
                  className="mt-2 w-full rounded-md border p-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isUploading}
                  required
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  Lungime maximă: 30.000 caractere. ({description.length}/30000)
                </p>
              </div>

              <div className="col-span-full">
                <Label htmlFor="file-upload-2" className="font-medium">
                  Încărcare fișier(e)
                </Label>
                <div
                  {...getRootProps()}
                  className={cn(
                    isDragActive
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                      : "border-border",
                    isUploading && "opacity-50 cursor-not-allowed",
                    "mt-2 flex justify-center rounded-md border border-dashed px-6 py-20 transition-colors duration-200"
                  )}
                >
                  <div>
                    <FileIcon
                      className="mx-auto h-12 w-12 text-muted-foreground/80"
                      aria-hidden={true}
                    />
                    <div className="mt-4 flex text-muted-foreground">
                      <p>Drag and drop sau </p>
                      <label
                        htmlFor="file-upload-2"
                        className="relative cursor-pointer rounded-sm pl-1 font-medium text-primary hover:text-primary/80 hover:underline hover:underline-offset-4"
                      >
                        <span>alege fișier(e)</span>
                        <input
                          {...getInputProps({ multiple: true })}
                          id="file-upload-2"
                          name="file-upload-2"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          disabled={isUploading}
                        />
                      </label>
                      <p className="pl-1">pentru încărcare</p>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-5 text-muted-foreground sm:flex sm:items-center sm:justify-between">
                  <span>Se pot încărca doar imagini (până la 10 fișiere)</span>
                  <span className="pl-1 sm:pl-0">Dimensiune maximă: 50MB</span>
                </p>
                {filesList.length > 0 && (
                  <>
                    <h4 className="mt-6 font-medium text-foreground">
                      Fișier(e) de încărcat
                    </h4>
                    <ul role="list" className="mt-4 space-y-4">
                      {filesList}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {isUploading && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Se încarcă...</span>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <Separator className="my-6" />
            <div className="flex items-center justify-end space-x-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={handleCancel}
                disabled={isUploading}
              >
                Anulează
              </Button>
              <Button 
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
                disabled={isUploading || !title.trim() || !description.trim() || !postType}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se încarcă...
                  </>
                ) : (
                  "Publică"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}