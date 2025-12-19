import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { useCreateUser } from "@/hooks/admin/useCreateUser";
import { SpinnerCustom } from "../ui/spinner";

const CreateUser = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { 
    email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
    loading, successMessage, errorMessage,
    registerUser, checkInput
   } = useCreateUser();

  async function handleClick() {
    await registerUser();
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Creeaza un utilizator nou</h3>
      
      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="new-user-email">Email</Label>
          <Input
            id="new-user-email"
            type="email"
            value={email}
            onChange={(e) => {
            const newEmail = e.target.value;
            setEmail(newEmail);
            checkInput(newEmail, password, confirmPassword); // Pass current values
          }}
            placeholder="user@example.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="new-user-password">Password</Label>
          <div className="relative">
            <Input
              id="new-user-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                const newPassword = e.target.value;
                setPassword(newPassword);
                checkInput(email, newPassword, confirmPassword); // Pass current values
              }}
              placeholder="••••••••"
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-user-confirm-password">Confirm Password</Label>
          <div className="relative">
            <Input
              id="new-user-confirm-password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                const newConfirmPassword = e.target.value;
                setConfirmPassword(newConfirmPassword);
                checkInput(email, password, newConfirmPassword); // Pass current values
              }}
              placeholder="••••••••"
              className="pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        <Button 
          onClick={handleClick} // Functie HandleClick creare user (sa verifice ca campurile sunt completate inainte de click) 
          disabled={loading || !email.trim() || !password.trim() || !confirmPassword.trim()}
          className="w-full"
        >
          Create User
        </Button>

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
    </div>
  );
}

export default CreateUser;