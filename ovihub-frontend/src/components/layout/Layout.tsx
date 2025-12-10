// src/components/Layout.tsx (CORECTAT pentru Navbar Sus)


//TODO: Modificat pe aici, sa am separat Layout, si separat Navbar
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    // 1. Containerul principal
    <div className="layout-container">
      
      {/* 2. Header/Navbar (Element Persistent) */}
      {/* Îl plasăm deasupra zonei dinamice */}
      <nav className="bg-slate-700 p-4 mb-4 flex justify-between md">
        {/* Folosim link-uri inline pentru un meniu orizontal */}
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>HOME</Link>

        <div className="space-x-4">
         <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>PROFILE</Link>
         <Link to="/news" style={{ color: 'white', textDecoration: 'none' }}>NEWS</Link>
         <Link to="/events" style={{ color: 'white', textDecoration: 'none' }}>EVENTS</Link>
         <Link to="/admin" style={{ color: 'red', textDecoration: 'none' }}>ADMIN</Link>
        </div>
        
      </nav>

      {/* 3. Aici se încarcă conținutul paginii curente (Zona dinamică) */}
      <main className="px-5">
        <Outlet /> 
      </main>
      
    </div>
  );
};

export default Layout;