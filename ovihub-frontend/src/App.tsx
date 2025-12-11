import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import News from "./pages/News";
import Events from "./pages/Events";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

// Declaram endpointurile aplicatiei frontend, direct fara return, pt ca scriem doar expresia din return in aplicatie,
// nu e nevoie sa mai returnam ceva manual, se returneaza direct aia

//TODO: Pagina '/profile' va redirectiona pe cei cu rol 'admin' catre pagina '/admin', si ceilalti
//      care incearca sa acceseze '/admin' sunt redirectionati la '/profile' automat.
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />

        {/* Rute catre celelalte endpointuri */}
        <Route path="profile" element={<Profile />} /> 
        <Route path="news" element={<News />} />
        <Route path="events" element={<Events />} />
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
