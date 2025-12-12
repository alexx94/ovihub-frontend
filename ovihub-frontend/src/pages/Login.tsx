import { GalleryVerticalEnd } from "lucide-react"

import LoginForm from "@/components/login-form"
import { Link, useNavigate } from "react-router-dom"
import { useLogin } from "@/hooks/useLogin"
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const {
    login, isLoading,
    error
  } = useLogin();
  const navigate = useNavigate();
  const {fetchMe} = useAuth();
  
  async function handleLogin(email:string, password: string) {
    const result = await login(email, password);
    if (result && typeof(result) !== "string" && result.success === true) {
      await fetchMe();
      navigate("/"); // pe viitor probabil redirectionez pe profile page sau news
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/"
          className="flex items-center gap-2 font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Ovihub
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm 
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/login-image.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default Login;
