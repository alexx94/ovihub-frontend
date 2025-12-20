import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { SpinnerCustom } from "../ui/spinner";
import { ConfirmDialog } from "../shared/ConfirmDialog";
import { FormDialog } from "../shared/FormDialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useRoles } from "@/hooks/admin/useRoles";
import type { RoleInput } from "@/api/roles";

const ManageRoles = () => {
   const [roleName, setRoleName] = useState<string>('');
   const [roleDescription, setRoleDescription] = useState<string>('');
   const { 
      roles, loading, setLoading, successMessage, errorMessage,
      createRole, deleteRole,
    } = useRoles();

   async function handleSubmitDelete(roleId: number) {
      setLoading(true);
      await deleteRole(roleId);
   }

   async function handleAddRole() {
      setLoading(true);

      const addedRole: RoleInput = { name: roleName, description: roleDescription };
      await createRole(addedRole);

      console.log(`Rolul: ${roleName}`);
      console.log(`Rolul: ${roleDescription}`);

      setRoleName('');
      setRoleDescription('');
   }


   return (
      <div className="space-y-6">
         <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Gestioneaza Roluri</h3>
            <FormDialog
               trigger={<Button className="hover:cursor-pointer"> <Plus></Plus>Adauga rol </Button>}
               title="Adauga rol"
               description="Completeaza campurile pentru a crea un rol nou"
               onSubmit={handleAddRole}
            >
               <div className="space-y-2">
                  <Label>Nume rol</Label>
                  <Input
                     value={roleName}
                     onChange={(e) => setRoleName(e.target.value)}
                     placeholder="ADMIN"
                     required
                  />
               </div>

               <div className="space-y-2">
                  <Label>Descriere</Label>
                  <Textarea
                     value={roleDescription}
                     onChange={(e) => setRoleDescription(e.target.value)}
                     placeholder="Descriere rol"
                     required
                  />
               </div>
            </FormDialog>
         </div>
         

         {/* Componenta tabel pentru vizualizare date despre roluri */}
         <div className="">
            <Table className="">
               <TableCaption>Lista rolurilor pe care userii le pot avea.</TableCaption>
               <TableHeader className="">
                  <TableRow>
                     <TableHead>Nume</TableHead>
                     <TableHead>Descriere</TableHead>
                     <TableHead>Actiuni</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {roles.map((role) => (
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
                              onConfirm={() => {handleSubmitDelete(role.id)}}
                           />
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>

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

         {loading && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center pointer-events-auto">
            <SpinnerCustom/> 
          </div>
        )}
      </div>
   )
}

export default ManageRoles;