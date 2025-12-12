import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  // FieldDescription,
  FieldGroup,
  FieldLabel,
  // FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { SpinnerCustom } from "./ui/spinner"

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void; 
  isLoading: boolean;
  error?: string;
  className?: string;
}

const LoginForm = ({
  className,
  onSubmit,
  isLoading,
  error,
  ...props
}: LoginFormProps) => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!emailInput || !passwordInput || isLoading) return;

    onSubmit(emailInput, passwordInput)
  }

  return (
    <div className="relative">

      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Autentificare in cont</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Introdu email-ul si parola
            </p>
            <p className="text-red-500 text-sm text-balance">{error}</p>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input 
              value={emailInput} 
              onChange={(e) => setEmailInput(e.target.value)}
              id="email" type="email" placeholder="prenume.nume@365.univ-ovidius.ro" required />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              {/* Forgot your password? field - TODO functionality backend */}
            </div>
            <Input 
              value={passwordInput} 
              onChange={(e) => setPasswordInput(e.target.value)}
              id="password" type="password" required />
          </Field>
          <Field>
            <Button type="submit">Login</Button>
          </Field>
        </FieldGroup>
      </form>

      {isLoading && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center pointer-events-auto">
          <SpinnerCustom/> 
        </div>
      )}
    </div>
  )
}

export default LoginForm;
