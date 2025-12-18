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
import ProtectedPage from "./routes/ProtectedPage";
import { ROLES } from "./api/user";
import Upload from "./pages/Upload";

// Declaram endpointurile aplicatiei frontend, direct fara return, pt ca scriem doar expresia din return in aplicatie,
// nu e nevoie sa mai returnam ceva manual, se returneaza direct aia

//TODO: Pagina '/profile' va redirectiona pe cei cu rol 'admin' catre pagina '/admin', si ceilalti
//      care incearca sa acceseze '/admin' sunt redirectionati la '/profile' automat.
const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="news" element={<News />} />  
            <Route path="events" element={<Events />} />
            <Route path="profile" element={<Profile />} />            
            <Route path="admin" element={
              // Asta e cam redundant ca e practic la fel ca ProtectedRoute, dar cu children nu Outlet
              // Solutia cea mai simpla cred ca ramane sa randez efectiv la fiecare pagina componenta de Layout, si aia e
              // ca sa nu mai depind de ea ca aici

              // Sau sa fac protected route pt fiecare caz posibil (orice combinatie de
              // allowed roles, are un set de protected routes si aia e, fara probleme,
              // atat ca arata app.tsx mai 'mare', dar e perfect functioal si corect)
              <ProtectedPage allowedRoles={[ROLES.ADMIN]}>
                <Admin />
              </ProtectedPage>
            } />
          </Route>
        </Route>
          

        {/* Public Routes */}
        <Route element={<Layout />}>
          {/* Public Routes with layout aswell */}
          <Route index element={<Index />} />
          <Route path="upload" element={<Upload />} />
        </Route>

        {/* Public Route that doesn't need layout */}
        <Route path="login" element={<Login />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
