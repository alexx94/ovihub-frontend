// src/pages/Index.tsx

import { Button } from "@/components/ui/button";
import SectionCard from "@/components/ui/section-card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { CalendarDays, Newspaper, Store } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Newspaper,
    title: "Anunturi",
    description: "Fii la curent cu toate stirile si anunturile oficiale din facultatea ta.",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500"
  },
  {
    icon: CalendarDays,
    title: "Evenimente",
    description: "Descopera noi evenimente studentesti si inscrie-te cu prietenii tai.",
    bgColor: "bg-green-100",
    iconColor: "text-green-500"
  },
  {
    icon: Store,
    title: "Marketplace",
    description: "Vinde si cumpara direct cu studentii din universitatea ta.",
    bgColor: "bg-violet-100",
    iconColor: "text-violet-500"
  }
]

const Index = () => {
  return (
    <>
    <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
    >
      {/* Hero section */}
      <section className="flex-col text-center py-6 space-y-4 bg-radial from-blue-100 to-blue-200 ">
        <div className="p-4">
          <img src="/images/Header-Universitatea-Ovidius.webp" alt="Hero Image"
          className="rounded-2xl w-full"
          />
        </div>
        
        <h1 className="text-4xl font-bold">
          Bine ai venit la <span className="bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Ovihub
          </span>
        </h1>

        <h2 className="text-lg font-light text-gray-500">
          Platforma universitara creeata de studenti, pentru studenti.
        </h2>

        <div>
          <Link to="/login">
            <Button
              variant={"default"}
              className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white hover: hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Conecteaza-te
            </Button>
          </Link>
          
        </div>
      </section>
      
      {/* Features section */}
      <section className="flex flex-col mb-10">
        <div className="text-center p-2 m-16">
          <h1 className="text-2xl font-semibold">Toate informatiile intr-un singur loc</h1>
          <h3 className="text-lg font-light text-gray-500">Ovihub iti ofera acces rapid la toate noutatile si evenimentele universitatii tale.</h3>
        </div>
        <div className="flex flex-col md:flex-row justify-center px-4 gap-8 mb-4">
          {features.map((feature, index) => {
            return (
              <SectionCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                bgColor={feature.bgColor}
                iconColor={feature.iconColor}
              />
            )
          })}
        </div>
      </section>
      
      <Separator />

      {/* Sectiune harta google maps cu universitatea */}
      <section className="flex flex-col items-center m-4">
        <div className="text-2xl text-center">
          <h1>Unde ne gasesti?</h1>
        </div>
        <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d45765.70834630237!2d28.6302903!3d44.1997179!3m2!1i1024!2i768!4f13.1!2m1!1suniversitatea%20ovidius!5e0!3m2!1sro!2sro!4v1765482702965!5m2!1sro!2sro"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
      
    </motion.div>
    </>
    
  );
};

export default Index;