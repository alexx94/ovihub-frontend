// src/pages/Admin.tsx

import AssignUserRoles from "@/components/admin/AssignUserRoles";
import CreateUser from "@/components/admin/CreateUser";
import ManageRoles from "@/components/admin/ManageRoles";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ROLES } from "@/api/user";
import { type Roles } from "@/types/role.types";
import { useEffect, useState } from "react";

const Admin = () => {
  const [roles, setRoles] = useState<Roles[]>([]);
  //TODO: Admin Api that interacts with User and Role API, and hook for it here

  useEffect(() => {
    const loadRoles = async () => {
      //TODO: data = fetchRoles()
      const data = ["ADMIN", "PROFESSOR", "STUDENT"];
      setRoles(data);
    };
    loadRoles();
  }, []);

  return (
    <div className="border-2 border-red-500 container mx-auto py-8 px-4">
      <PageHeader 
        title="Panou Admin"
        description="Gestioneaza userii si rolurile"
      />

      <Card className="mt-6">
          <CardContent className="pt-6">
            <Tabs defaultValue="create-user">
              <TabsList className="flex w-full overflow-x-auto no-scrollbar grid-cols-3 mb-6">
                <TabsTrigger value="create-user" className="shrink-0">Create User</TabsTrigger>
                <TabsTrigger value="manage-roles" className="shrink-0">Manage Roles</TabsTrigger>
                <TabsTrigger value="assign-roles" className="shrink-0">Assign Roles</TabsTrigger>
              </TabsList>
              
              <TabsContent value="create-user">
                <CreateUser />
              </TabsContent>
              
              <TabsContent value="manage-roles">
                <ManageRoles onRolesChange={setRoles} />
              </TabsContent>
              
              <TabsContent value="assign-roles">
                <AssignUserRoles roles={roles} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
    </div>
  );
};

export default Admin;