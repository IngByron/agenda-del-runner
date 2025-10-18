import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Calendario from './pages/Calendario';
import AdminPanel from './pages/AdminPanel';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0 }}>
        <Navbar />
      </Header>
      <Content style={{ padding: '24px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carreras" element={<AdminPanel />} />
          <Route path="/access-portal-2025" element={<Login />} />
          <Route path="/calendario" element={<Calendario />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Agenda del Runner ©2025
      </Footer>
    </Layout>
  );
}

export default App;
