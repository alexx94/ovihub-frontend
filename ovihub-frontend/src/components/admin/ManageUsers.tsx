import { useState } from "react";
import { SearchBar } from "../shared/SearchBar";
import { useManageUsers } from "@/hooks/admin/useManageUsers";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FieldLabel } from "../ui/field";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ConfirmDialog } from "../shared/ConfirmDialog";
import { SpinnerCustom } from "../ui/spinner";

const ManageUsers = () => {
   const [isHidden, setIsHidden] = useState<boolean>(true); // mock data pentru testare
   const [userEmail, setUserEmail] = useState<string>("");
   const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
   const {
      roles, userData, 
      fetchUserData, assignRoleToUser, removeRoleFromUser,
      successMessage, errorMessage, loading, setSuccessMessage, setErrorMessage, 
   } = useManageUsers();
   const [selectedRoleId, setSelectedRoleId] = useState<string>('');

   //TODO: Clean up the code a little bit more

   async function handleSearch(searchInput: string) {
      setSuccessMessage('');
      setIsLoadingUser(true);
      setUserEmail(searchInput);
      console.log("Emailul cautat este: ", searchInput);

      const response = await fetchUserData(searchInput);
      if (response?.id) {
         setIsHidden(false);
      }
      else {
         setIsHidden(true);
      }
      
      setIsLoadingUser(false);
   }

   async function handleSubmitRemove(roleId: number) {
      if (!userData) return;
      await removeRoleFromUser(userData.id, roleId);
      setSelectedRoleId('')
      console.log("Sterg rolul cu id: ", roleId);
   }

   async function handleClickAdd() {
      if (!userData) return;
      if (userData.roles.some(role => role.id === Number(selectedRoleId))) {
         setErrorMessage("Userul are deja ")
      }

      await assignRoleToUser({
         userId: userData.id,
         roleId: Number(selectedRoleId),
      });
      console.log("Am adaugat userului rolul cu id: ", selectedRoleId);
   }

   return (
      <div className="space-y-6 relative">
         <h3 className="text-lg font-semibold">
            Gestioneaza utilizatorii
         </h3>
         <div className="flex flex-col gap-4">
            <SearchBar 
               type="email"
               label="Cauta Utilizator prin Email"
               placeHolder="prenume.nume@365.univ-ovidius.ro"
               searchInput={userEmail}
               setSearchInput={setUserEmail}
               onSubmit={handleSearch}
               isLoading={isLoadingUser}
            />
         </div>

         {/* Afisare mesaje succes/eroare deasupra datelor pentru user */}
         {successMessage && (
            <div className="text-sm text-green-600 bg-green-500/10 px-3 py-2 rounded-md">
               {successMessage}
            </div>
         )}
         
         {errorMessage && (
            <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
               {errorMessage}
            </div>
         )}

         {!isHidden &&
            <div className="flex flex-col space-y-4 relative">
               {/* Componenta display date user */}
               <div className="flex flex-col gap-2">
                  <p className="font-semibold">Date utilizator</p>
                  {userData && (
                     <div className="font-mono">
                        <p>Id: {userData.id}</p>
                        <p>Email: {userData.email}</p>
                        <p>Data creare: {userData.createdAt}</p>
                        <p>Ultima conectare: {userData.lastLogin}</p>
                        <p>Domeniu: {userData.domain}</p>
                     </div>
                  )}
               </div>

               {/* Componenta display tabel cu user roles (sa includ si action pe cos de gunoi delete) */}
               <Table className="">
                  <TableCaption>Lista rolurilor utilizatorului selectat.</TableCaption>
                  <TableHeader className="">
                     <TableRow>
                        <TableHead>Nume</TableHead>
                        <TableHead>Descriere</TableHead>
                        <TableHead>Actiuni</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {userData?.roles.map((role) => (
                        <TableRow key={role.id}>
                           <TableCell>{role.name}</TableCell>
                           <TableCell>{role.description}</TableCell>
                           <TableCell>
                              <ConfirmDialog
                                 trigger={
                                    <Trash2 className="p-0.5 text-red-500 rounded-sm hover:bg-red-500 hover:text-white" />
                                 }
                                 title="Esti sigur ca vrei sa continui?"
                                 description="Aceasta actiune nu este reversibila. Apasand 'Continua', rolul selectat se va sterge."
                                 onConfirm={() => {handleSubmitRemove(role.id)}}
                              />
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>


               {/* Componenta asignare roluri cu dropdown si buton +, onClick  */}
               <div className="flex flex-col gap-2">
                     <FieldLabel>Asigneaza un nou rol</FieldLabel>
                     <div className="flex gap-2">
                        <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
                           <SelectTrigger className="flex-1 data-[placeholder]:text-black">
                              <SelectValue 
                                 placeholder="Select a role"
                              />
                           </SelectTrigger>
                           <SelectContent>
                              {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id.toString()}
                                 className="focus:bg-blue-400 focus:text-white hover:bg-blue-400"
                              >
                                 {role.name}
                              </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                        <Button
                           type="button"
                           disabled={
                              !selectedRoleId || userData?.roles.some(role => role.id === Number(selectedRoleId))
                           }
                           className="w-12 flex items-center justify-center rounded-md bg-blue-400 hover:bg-blue-500 hover:shadow-xl hover:cursor-pointer"
                           onClick={handleClickAdd}
                        >
                           <Plus />
                        </Button>
                     </div>
               
               </div>   

               {loading && (
                  <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center pointer-events-auto">
                     <SpinnerCustom/> 
                  </div>
               )}
               
            </div>
         }
         
      </div>
   )
}

export default ManageUsers;