// src/components/Layout.tsx (CORECTAT pentru Navbar Sus)


import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Newspaper, CalendarDays, User, Shield} from 'lucide-react';
import { cn } from "@/lib/utils";

const navLinks = [
  {href: "/news", label: "Anunturi", icon: Newspaper},
  {href: "/events", label: "Eveniment", icon: CalendarDays},
  {href: "/profile", label: "Profil", icon: User},
  {href: "/admin", label: "Admin", icon: Shield}
]

const Layout = () => {
  const location = useLocation();

  return (
    // 1. Containerul principal
    <div className="">
      
      {/* Layout sticky ca sa fie persistent pe orice pagina, si la scroll */}
      <nav className="sticky top-0 bg-slate-700 p-4 mb-4 flex items-center justify-between">
        {/* Buton Home cu logo website sau Text */}
        <div>
          <Link to="/">
            <Button
              variant={"default"}
              className="text-lg hover:cursor-pointer bg-slate-700 hover:bg-slate-700" // aceiasi culoare si pe hover ca sa ramana static, pe post logo (todo later logo)
              >
              Ovihub
            </Button>
          </Link>
        </div>
        
        {/* Navigation Bar, paginile accesibile de user, hidden cand e pe mobil, display flex pe dispozitive mari */}
        <div className="hidden items-center gap-4 md:flex p-1">
          {navLinks.map((link) => {
            const Icon = link.icon; // Comopnenta Icon de mai jos de la return in buton, care face referinta la obiectul link din navLink
                                    // adica la icon-ul importat din lucide-react
            const isActive = location.pathname === link.href; // daca suntem pe pagina care corespunde cu obiectul navLink, il facem activ
                                                              // ca sa ii punem efect de toggle la buton
            return (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn( // 'cn()' e folosit (merge si fara, dar shadCN mi l-a instalat) ca sa includ mai usor clase conditionale si celelalte de baza
                    "gap-2 hover:cursor-pointer",
                    isActive && "bg-secondary text-primary"
                  )}
                >
                  <Icon/>
                  {link.label}
                </Button>
              </Link>
            )
          })} 
        </div>

        {/* Sectiunea de conectare, Login / User-icon si eventual cheita de settings */}
        <div className="bg-yellow-300 p-1">
          Sectiune Conectare
        </div>
        
      </nav>

      {/*Aici se încarcă conținutul paginii curente (Zona dinamică) */}
      <main className="px-5">
        <Outlet /> 
      </main>
      
    </div>
  );
};

export default Layout;