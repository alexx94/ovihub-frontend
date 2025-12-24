import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, User, Download } from "lucide-react"; // <--- Am adaugat Download
import { useEventParticipants } from "@/hooks/events/useEventParticipant";

interface EventActionButtonsProps {
  postId: number;
  postTitle: string;
  isJoined: boolean;
  onToggleJoin: (id: number, isUserParticipating: boolean) => void;
}

//TODO: Separat componenta asta interna de cealalta componenta, momentan am 2 componente intr-o singura componenta, nu e readable
// --- Componenta INTERNA (Lista + Export) ---
const ParticipantsListContent = ({ postId, postTitle }: { postId: number, postTitle: string }) => {
  const { participants, isLoading } = useEventParticipants(postId);

  // Helper formatare nume
  const formatName = (email: string) => {
    return email.split('@')[0]
      .split('.')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  // --- FUNCTIA DE EXPORT CSV ---
  const handleExportCsv = () => {
    if (!participants.length) return;

    // 1. Definim Header-ul CSV-ului
    const csvHeader = "Nume,Email\n";

    // 2. Mapam datele in format CSV (separat prin virgula)
    const csvRows = participants.map(user => {
      const name = formatName(user.userEmail);
      return `${name},${user.userEmail}`;
    }).join("\n");

    // 3. Combinam totul
    const csvContent = csvHeader + csvRows;

    // 4. Cream un Blob (fisier virtual)
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // 5. Cream un link invizibil si dam click pe el
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `participanti_${postTitle}_${postId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mt-2">
      {/* Header mic cu numar total si buton export */}
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-sm text-muted-foreground">
          Total: {participants.length} persoane
        </span>
        
        {participants.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-2 text-xs"
            onClick={handleExportCsv}
          >
            <Download className="h-3 w-3" />
            Export CSV
          </Button>
        )}
      </div>

      {participants.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">Nu sunt participanți.</div>
      ) : (
        <ScrollArea className="h-[250px] w-full rounded-md border p-4">
          <div className="space-y-4">
            {participants.map((user) => (
              <div key={user.userId} className="flex items-center gap-3 border-b pb-2 last:border-0">
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-slate-500" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{formatName(user.userEmail)}</span>
                  <span className="text-xs text-muted-foreground">{user.userEmail}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

// --- Componenta PRINCIPALA ---
export const EventActionButtons = ({ 
  postId, 
  postTitle,
  isJoined, 
  onToggleJoin,
}: EventActionButtonsProps) => {
  return (
    <div className="flex gap-2 mt-3 items-center">
      
      {/* BUTON JOIN / UNJOIN */}
      <Button
        variant={isJoined ? "secondary" : "default"}
        className={isJoined 
          ? "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200" 
          : ""
        }
        onClick={(e) => {
          e.stopPropagation();
          onToggleJoin(postId, isJoined);
        }}
      >
        {isJoined ? "Particip" : "Vreau să particip"}
      </Button>

      {/* BUTON + MODAL LISTA */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              console.log("ACTION: VIEW LIST", postId);
            }}
          >
            Lista participanți
          </Button>
        </DialogTrigger>
        
        {/* Continutul Modalului */}
        <DialogContent className="sm:max-w-[450px]" onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Participanți la eveniment</DialogTitle>
          </DialogHeader>
          
          {/* Aici apelam componenta interna care are logica de export */}
          <ParticipantsListContent postId={postId} postTitle={postTitle} />
          
        </DialogContent>
      </Dialog>
      
    </div>
  );
};