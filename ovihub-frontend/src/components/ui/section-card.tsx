import type { LucideIcon } from "lucide-react";

interface SectionCardProps {
   icon: LucideIcon;
   title: string;
   description: string;
   bgColor?: string;
   iconColor?: string;
}

const SectionCard = ({
  icon: Icon,
  title,
  description,
  bgColor="bg-blue-100",
  iconColor="text-blue-600"
}: SectionCardProps) => {

   return (
   <div className="w-full md:max-w-md bg-neutral-primary-soft p-4 border border-default rounded-2xl shadow-xs">
      
      <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center border border-border`}>
        <Icon className={`w-6 h-6 ${iconColor}`}  />
      </div>

      <h5 className="mt-4 text-2xl font-medium tracking-tight text-heading">
        {title}
      </h5>

      <p className="text-muted-foreground font-light">
        {description}
      </p>
    </div>
  );
};


export default SectionCard;