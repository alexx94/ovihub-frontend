import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Create New User</h3>
      
      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="new-user-email">Email</Label>
          <Input
            id="new-user-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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

        <Button 
          onClick={() => {return 1}} 
          disabled={loading || !email.trim() || !password.trim()}
          className="w-full"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <UserPlus className="h-4 w-4 mr-2" />
          )}
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
      </div>
    </div>
  );
}

export default CreateUser;