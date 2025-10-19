import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Calendario from './pages/Calendario';
import AdminPanel from './pages/AdminPanel';
import Forbidden from './error_pages/Forbidden'; // Error 403
import NotFound from './error_pages/NotFound'; // Error 404
import ServerError from './error_pages/ServerError'; // Error 500
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

const { Header, Content } = Layout;

// Componente para proteger rutas
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>; 

  if (!user) return <NotFound/>;

  return children;
}

function AppContent() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0 }}>
        <Navbar />
      </Header>
      <Content style={{ padding: '24px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/access-portal-2025" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} /> {/* Captura todas las rutas no definidas */}
        </Routes>
      </Content>
        <Footer />
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}