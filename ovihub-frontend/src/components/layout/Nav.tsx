// src/components/Layout.tsx (CORECTAT pentru Navbar Sus)


import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Newspaper, CalendarDays, User, Shield, Menu, X} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useState } from "react";

const navLinks = [
  {href: "/news", label: "Anunturi", icon: Newspaper},
  {href: "/events", label: "Evenimente", icon: CalendarDays},
  {href: "/profile", label: "Profil", icon: User},
  {href: "/admin", label: "Admin", icon: Shield}
]

const Nav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>();

  return (
    // 1. Containerul principal
    <>
    <div className="sticky w-full z-50 top-0 bg-slate-700 p-4">
      
      {/* Layout sticky ca sa fie persistent pe orice pagina, si la scroll */}
      <nav className=" flex items-center justify-between text-amber-50">
        {/* Buton Home cu logo website sau Text */}
        <div>
          <Link to="/">
            <Button
              variant={"default"}
              className="text-lg hover:cursor-pointer bg-slate-700 hover:bg-slate-700" // aceiasi culoare si pe hover ca sa ramana static, pe post logo (todo later logo)
              onClick={() => setIsOpen(false)}
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
        <div className="p-1">
          <div className="hidden md:flex">
            Sectiune conectare
          </div>

          {/* Burger button pt mobile view */}
          <div className="md:hidden sm:flex">
            <Button
              variant={"ghost"}
              className="hover:cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

          </div>
        </div>
        
      </nav>

      {/* Afisare meniu navigare expandat, dupa apasare buton */}
      {isOpen && (
        <div className="md:hidden sm:flex ">
          <div className="">
            <div className="flex flex-col space-y-2 text-left">
              {navLinks.map((link) => {
                const Icon = link.icon; // Comopnenta Icon de mai jos de la return in buton, care face referinta la obiectul link din navLink
                                        // adica la icon-ul importat din lucide-react
                const isActive = location.pathname === link.href; // daca suntem pe pagina care corespunde cu obiectul navLink, il facem activ
                                                                  // ca sa ii punem efect de toggle la buton
                return (
                  <Link key={link.href} to={link.href}>
                    <Button
                      variant={"link"}
                      className={cn( // 'cn()' e folosit (merge si fara, dar shadCN mi l-a instalat) ca sa includ mai usor clase conditionale si celelalte de baza
                        "gap-2 hover:cursor-pointer text-amber-50",
                        isActive && "bg-secondary text-primary"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon/>
                      {link.label}
                    </Button>
                  </Link>
                )
              })} 
            </div>
          </div>
        </div>
      )}
      
    </div>
    
    </>
  );
};

export default Nav;