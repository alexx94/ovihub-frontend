// src/pages/News.tsx
import { ROLES } from "@/api/user";
import { PageHeader } from "@/components/shared/PageHeader";
import { PostCard } from "@/components/shared/PostCard";
import { useAuth } from "@/hooks/useAuth";
import { Newspaper } from "lucide-react";


const News = () => {
  const {roles} = useAuth();

  // TODO: Fetch posts from backend via Get Api
  const mockPosts = [
  {
    id: 1,
    title: "Sesiunea de examene - Informații importante",
    description: "Sesiunea de examene din această iarnă se va desfășura în perioada 15 ianuarie - 5 februarie. Toate examenele vor fi susținute în format fizic. Vă rugăm să verificați orarele pe platforma universității.",
    userId: "admin01",
    author: "Secretariat Info",
    tags: ["Examene", "Important"],
    createdAt: "2 ore în urmă",
    images: null,
  },
  {
    id: 2,
    title: "Workshop: Inteligența Artificială în Educație",
    description: "Vă invităm la workshopul dedicat explorării aplicațiilor AI în procesul educațional. Evenimentul va avea loc în Aula Magna și este deschis tuturor studenților și cadrelor didactice.",
    userId: "123",
    author: "Cirlig George",
    tags: ["Workshop", "AI", "Facultatea de Informatică"],
    createdAt: "5 ore în urmă",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
      "https://plus.unsplash.com/premium_photo-1680807869780-e0876a6f3cd5?q=80&w=2071"
    ],
  },
  {
    id: 3,
    title: "Burse de merit - Termen limită prelungit",
    description: "Termenul limită pentru depunerea dosarelor de bursă de merit a fost prelungit până pe data de 20 decembrie. Documentele se depun la secretariatul facultății.",
    userId: "admin02",
    author: "Birou Burse",
    tags: ["Burse", "Financiar"],
    createdAt: "1 zi în urmă",
    images: null,
  },
  {
    id: 4,
    title: "Mobilități Erasmus+ - Sesiune informativă",
    description: "Biroul Erasmus organizează o sesiune informativă despre oportunitățile de mobilitate pentru semestrul următor. Participarea este recomandată tuturor studenților interesați de experiențe internaționale.",
    userId: "eramus_office",
    author: "Biroul Erasmus",
    tags: ["Erasmus", "Internațional"],
    createdAt: "2 zile în urmă",
    images: ["https://images.unsplash.com/photo-1761839257165-44f08ed617c7?q=80&w=2069"],
  },
];

  //TODO: Description posts to only display certain number of chars and then a 'read more' link
  //      which will expand upon clicking, to dislpay the entire content description.

  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Flux de Știri (News)</h1>
      <p>Conținutul dinamic pentru noutăți și anunțuri.</p>

      <div className="flex justify-between">
        <PageHeader
          title="Anunțuri Universitate"
          description="Cele mai recente știri și anunțuri oficiale"
          icon={<Newspaper className="h-6 w-6" />}
        />

        {roles?.includes(ROLES.PROFESSOR) && (
          <>
            {/* Buton pt rol profesor/admin sa il apese ca sa adauge o postare noua, la student e hidden */}
            <div>
              <button className="mt-4 hover:cursor-pointer rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/80"
                onClick={() => {console.log("Add post button clicked")}} //TOD: Handler with modal etc.
              >
                Adauga Postare
              </button>
            </div>
          </>
        )}

      </div>

      {/* Afisez componenta de mock tip card prima data pt testing */}
      <div className="mt-8 space-y-6 md:px-30">
          {mockPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
    </div>
  );
};

export default News;