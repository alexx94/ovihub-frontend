// src/pages/Events.tsx

import { useAuth } from "@/hooks/useAuth";

const Events = () => {
  const {user} = useAuth();
  return (
    <div>
      <h1>Evenimente (Events)</h1>
      <p>Lista de evenimente sau calendarul.</p>

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

export default Events;