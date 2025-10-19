import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Calendario from './pages/Calendario';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

const { Header, Content } = Layout;

// Componente para proteger rutas
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>; // Puedes poner un spinner

  if (!user) return <Navigate to="/access-portal-2025" />;

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
