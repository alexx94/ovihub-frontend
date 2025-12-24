import { useEffect, useState } from 'react';
import { User, Mail, Phone, Edit2, Save, X, Loader2 } from 'lucide-react';

// Importuri Componente Shadcn Reale
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AxiosError } from 'axios';

// Import Componenta ta Custom
// !!! Verifică calea unde ai salvat componenta PageHeader !!!
import { PageHeader } from "@/components/shared/PageHeader"; 
import { useAuth } from '@/hooks/useAuth';
import { getMyProfileApi, updateUserProfile, type EditProfileInfoDto, type UserResponseDto } from '@/api/user';
import type { ProblemDetails } from '@/types/error.types';


//TODO: Rewrite this so that it is modular and clean, its a mess now
const Profile = () => {
  // Date din hook
  const { roles } = useAuth();
  
  // 1. STATE-URI COMPLETE
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State pentru logica de editare
  const [isEditing, setIsEditing] = useState(false); // E deschis formularul?
  const [isSaving, setIsSaving] = useState(false);   // Se trimite request-ul? (Pt spinner)

  // State pentru formular
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Regex si Validare
  const PHONE_REGEX = /^07\d{8}$/;
  const isPhoneValid = phoneNumber.trim() === "" || PHONE_REGEX.test(phoneNumber);

  // 2. FETCH INITIAL
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMyProfileApi();
        setUser(data);

        if (data.userProfile?.phoneNumber) {
          setPhoneNumber(data.userProfile.phoneNumber);
        }
      } catch (error) {
        console.error("Nu s-a putut incarca profilul: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Helpers
  const getInitials = (first?: string, last?: string) => 
    `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase();

  // 3. HANDLERS CORECTATE

  // A. Start Editare - Resetează inputul la valorile actuale
  const handleStartEditing = () => {
      setPhoneNumber(user?.userProfile?.phoneNumber || "");
      setError(null);
      setIsEditing(true);
      setIsSaving(false);
  };

  // B. Cancel - Închide formularul fără salvare
  const handleCancel = () => {
    setPhoneNumber(user?.userProfile?.phoneNumber || "");
    setError(null);
    setIsEditing(false);
    setIsSaving(false);
  };

  // C. Save - Logica de salvare
  const handleSave = async () => {
    // 0. Resetăm erorile anterioare
    setError(null);

    if (!user || !user.userProfile) return;

    // 1. Validare Frontend
    const trimmedPhone = phoneNumber.trim();
    if (trimmedPhone !== "" && !PHONE_REGEX.test(trimmedPhone)) {
        setError("Numărul de telefon nu este valid. Trebuie să fie de forma 07xxxxxxxx.");
        return;
    }

    // AICI E SCHIMBAREA CHEIE: Setăm isSaving, NU isEditing
    setIsSaving(true);
    
    try {
      const payload: EditProfileInfoDto = {
        phoneNumber: trimmedPhone === "" ? null : trimmedPhone
      };

      const updatedProfile = await updateUserProfile(payload);

      // Succes: Actualizăm user-ul local
      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          userProfile: updatedProfile
        };
      });

      console.log("Salvat cu succes!");
      setIsEditing(false); // Închidem formularul doar la succes

    } catch (err: unknown) {
      console.error("Eroare update:", err);

      const axiosError = err as AxiosError<ProblemDetails>;
      // 2. Parsare Eroare Backend
      if (axiosError.response?.data?.errors) {
         const backendErrors = axiosError.response.data.errors;
         
         if (backendErrors["PhoneNumber"]) {
             setError(backendErrors["PhoneNumber"][0]);
         } else {
             setError("Datele introduse nu sunt valide.");
         }
      } 
      else if (axiosError.response?.status === 400) {
          setError("Date invalide. Verifică informațiile introduse.");
      }
      else {
          setError("A apărut o eroare la salvare. Încearcă din nou.");
      }
      // NOTĂ: Dacă apare eroare, NU facem setIsEditing(false), lăsăm userul să vadă eroarea.
    } finally {
      setIsSaving(false); // Oprim spinner-ul indiferent de rezultat
    }
  };


  // Loading state (Pagina initiala)
  if (loading) {
    return (
        <div className="flex h-[50vh] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-20 py-8 space-y-8">
      
      {/* 1. HEADER PAGINA */}
      <PageHeader 
        title="Profilul Meu" 
        description="Gestionează setările contului și informațiile de contact."
        icon={<User className="h-6 w-6" />}
      />

      <div className="flex flex-col md:px-40 gap-6">

        {/* 2. CARD IDENTITATE */}
        <Card className="lg:col-span-2 border-l-4 border-l-blue-400">
          <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-6">
            
            <Avatar className="h-24 w-24 border-2">
              <AvatarFallback className="text-2xl font-bold bg-linear-to-tr from-blue-500 to-slate-400 text-white">
                {getInitials(user?.userProfile?.firstName, user?.userProfile?.lastName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
              <h2 className="text-3xl font-bold tracking-tight">
                {user?.userProfile?.firstName} {user?.userProfile?.lastName}
              </h2>
              
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {roles?.map((role) => (
                  <Badge key={role} variant="secondary" className="px-3 py-1">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 3. CARD INFORMATII PROFIL */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" /> 
              Date de Contact
            </CardTitle>
            
            {/* Butoane Actiuni Header Card */}
            {!isEditing ? (
              // FOLOSIM FUNCTIA DEDICATA PENTRU START
              <Button onClick={handleStartEditing} variant="outline" size="sm" className="gap-2">
                <Edit2 className="h-4 w-4" /> Editează
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  onClick={handleCancel} 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:bg-destructive/10"
                  disabled={isSaving} // Blocat doar cat se salveaza
                >
                  <X className="h-4 w-4 mr-1" /> Anulează
                </Button>
                
                {/* Butonul Salvează - Disabled dacă formatul e greșit sau se încarcă */}
                <Button 
                  onClick={handleSave} 
                  size="sm" 
                  disabled={!isPhoneValid || isSaving}
                >
                  {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                      <>
                        <Save className="h-4 w-4 mr-1" /> Salvează
                      </>
                  )}
                </Button>
              </div>
            )}
          </CardHeader>
          <Separator />
          
          <CardContent className="space-y-6 pt-6">
            
            {/* Email - Read Only */}
            <div className="grid gap-2">
              <Label>Email Universitar</Label>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md border text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user?.email}</span>
              </div>
            </div>

            {/* Telefon - Editable */}
            <div className="grid gap-2">
              <Label className={error ? "text-destructive" : ""}>Număr de Telefon</Label>
              <div className="relative">
                 {isEditing ? (
                   <div className="flex flex-col gap-2">
                     <div className="relative flex items-center">
                        <Phone className="absolute left-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          value={phoneNumber} 
                          onChange={(e) => {
                              setPhoneNumber(e.target.value);
                              setError(null); 
                          }}
                          className={`pl-9 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          placeholder="07xx xxx xxx"
                          // AICI ERA PROBLEMA: Folosim isSaving, NU isEditing
                          disabled={isSaving} 
                        />
                     </div>
                     
                     <p className="text-[0.8rem] text-muted-foreground">
                       * Numărul trebuie să înceapă cu '07' și să aibă 10 cifre.
                     </p>

                     {error && (
                        <p className="text-sm font-medium text-destructive mt-1">
                            {error}
                        </p>
                     )}
                   </div>
                 ) : (
                   <div className="flex items-center gap-2 p-3 rounded-md border bg-transparent">
                     <Phone className="h-4 w-4 text-muted-foreground" />
                     <span className={!phoneNumber ? "text-muted-foreground italic" : ""}>
                       {phoneNumber || "Nu este specificat un număr de telefon"}
                     </span>
                   </div>
                 )}
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;