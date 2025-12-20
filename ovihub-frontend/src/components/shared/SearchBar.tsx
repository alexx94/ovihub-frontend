import { Input } from "../ui/input"
import { Field, FieldLabel } from "../ui/field"
import { Search } from "lucide-react"
import { SpinnerCustom } from "../ui/spinner";
import { Button } from "../ui/button";

interface SearchBarProps{
   type: string;
   label: string;
   placeHolder: string;
   searchInput: string;
   setSearchInput(value: string): void;
   onSubmit: (input: string) => void; 
   isLoading: boolean;
}

export function SearchBar(
   {
      type,
      label,
      placeHolder,
      searchInput,
      setSearchInput,
      onSubmit,
      isLoading,
   }: SearchBarProps,
) {

   //TODO: De verificat daca ce am jos aici include inputul sa fie valid inainte de request,
   //      si sa adaug si butonul de Search cu lupa, care sa fie activ doar daca e completat
   //      formul 
   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (!searchInput.trim() || isLoading) return;

      onSubmit(searchInput);
  }

   return (
      <>
         <form className="" onSubmit={handleSubmit}>
            <Field>
            <FieldLabel htmlFor={label}>{label}</FieldLabel>
            <div className="flex gap-2">
               <Input 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  id={type} type={type} placeholder={placeHolder} required 
               />
               <Button
                  type="submit"
                  disabled={!searchInput.trim() || isLoading}
                  className="w-12 flex items-center justify-center rounded-md bg-blue-400 hover:bg-blue-500 hover:shadow-xl
                     hover:cursor-pointer
                  "
               >
                  <Search />
               </Button>
            </div>
          </Field>
         </form>

         {isLoading && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center pointer-events-auto">
               <SpinnerCustom/> 
            </div>
         )}
      </>
   )
}