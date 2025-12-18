export interface Role {
   id: number;
   name: string;
   description?: string;
}  

export type Roles = Role['name'];