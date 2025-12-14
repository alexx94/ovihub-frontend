import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonVariant = React.ComponentProps<typeof Button>["variant"];

interface NavItemProps {
   href: string;
   label: string;
   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
   onClick?: () => void;
   buttonVariant?: ButtonVariant;
}

const NavItem = ({ 
   href, 
   label, 
   icon: Icon, 
   onClick, 
   buttonVariant = "link" 
}: NavItemProps) => {
   const location = useLocation();
   const isActive = location.pathname === href;
   
   return (
      <Link to={href}>
         <Button
            variant={buttonVariant}
            className={cn( // 'cn()' e folosit (merge si fara, dar shadCN mi l-a instalat) ca sa includ mai usor clase conditionale si celelalte de baza
               "gap-2 hover:cursor-pointer text-amber-50",
               (isActive && buttonVariant !== "destructive") && "bg-secondary text-primary"
            )}
            onClick={onClick}
         >
            <Icon />
            {label}
         </Button>
      </Link>
   );
};

export default NavItem;