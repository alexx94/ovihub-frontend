import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import News from "./pages/News";
import Events from "./pages/Events";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { AuthProvider } from "@/contexts/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoutes";

// Declaram endpointurile aplicatiei frontend, direct fara return, pt ca scriem doar expresia din return in aplicatie,
// nu e nevoie sa mai returnam ceva manual, se returneaza direct aia

//TODO: Pagina '/profile' va redirectiona pe cei cu rol 'admin' catre pagina '/admin', si ceilalti
//      care incearca sa acceseze '/admin' sunt redirectionati la '/profile' automat.
const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>

        {/* Protected Routes (it includes layout for 0 glitching and better UX) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="news" element={<News />} />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route element={<Layout />}>
          {/* Public Routes with layout aswell */}
          <Route index element={<Index />} />
          <Route path="events" element={<Events />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* Public Route that doesn't need layout */}
        <Route path="login" element={<Login />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
