// src/pages/News.tsx
import { useAuth } from "@/hooks/useAuth";

const News = () => {
  const {user} = useAuth();
  return (
    <div>
      <h1>Flux de Știri (News)</h1>
      <p>Conținutul dinamic pentru noutăți și anunțuri.</p>

      {/* Afisare user din context pentru debug/testing */}
      <div style={{ padding: "1rem", backgroundColor: "#f5f5f5", border: "1px solid #ccc" }}>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p>User is null</p>
      )}
    </div>
    </div>
  );
};

export default News;