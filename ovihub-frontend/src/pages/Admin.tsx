import AssignUserRoles from "@/components/admin/AssignUserRoles";
import CreateUser from "@/components/admin/CreateUser";
import ManageRoles from "@/components/admin/ManageRoles";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  //TODO: S-ar putea sa fie mai ok sa fac fetch cand incarc componenta ADMIN pentru roles,
  //      ca sa nu faca fetch de mai multe ori cand navig intre sectiuni, dar asta e ok 
  //      momentan, pe viitor ca imbunatatire pt eficienta.

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
                <ManageRoles />
              </TabsContent>
              
              <TabsContent value="assign-roles">
                <AssignUserRoles />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
    </div>
  );
};

export default Admin;