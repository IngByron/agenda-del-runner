import { useState, useEffect } from 'react';
import './Home.css';
import { CalendarOutlined, TrophyOutlined, AimOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import runnerImage from '../assets/2579814.jpg';

const Home = () => {
  const navigate = useNavigate();

  // Estado para almacenar la posición del mouse
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Función que actualiza la posición del mouse
  const handleMouseMove = (event) => {
    const { clientX: x, clientY: y } = event;
    setMousePosition({ x, y });
  };

  // Uso de useEffect para agregar y eliminar el evento de mousemove
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    
    // Limpiar el evento cuando el componente se desmonte
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Desplazamiento de la imagen con base en la posición del mouse
  const movementFactor = 30; // Cuánto quieres que se mueva la imagen
  const xMovement = (mousePosition.x - window.innerWidth / 2) / movementFactor;
  const yMovement = (mousePosition.y - window.innerHeight / 2) / movementFactor;

  return (
    <div className="home">
      <header className="home-hero">
        <img
          src={runnerImage}
          alt="Portada runner"
          className="home-hero-image"
          style={{
            transform: `translate(${xMovement}px, ${yMovement}px)`, // Movimiento según el mouse
          }}
        />
        <div className="home-hero-overlay">
          <h1>Bienvenido</h1>
          <p>Descubre las próximas carreras en el país</p>
          <button onClick={() => navigate('/calendario')} className="home-hero-button">
            Ver Calendario
          </button>
        </div>
      </header>
      <p className="image-attribution">
        <a href="http://www.freepik.com" target="_blank" rel="noopener noreferrer">
          Designed by pikisuperstar / Freepik
        </a>
      </p>

      <section className="home-about">
        <h2>¿De qué se trata esta página?</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Esta plataforma está diseñada para todos los amantes del running. Aquí podrás encontrar información sobre eventos y carreras que se llevarán a cabo en todo el país.
            </p>
            <p>
              Ya seas principiante o corredor experimentado, aquí tendrás una vista clara y resumida de lo que viene. Podrás planificar tu calendario y mantenerte al tanto de los eventos más importantes.
            </p>
          </div>
          <div className="about-icons">
            <div className="icon-box">
              <CalendarOutlined style={{ fontSize: '50px', color: '#fff' }} />
              <p>Calendario de eventos</p>
            </div>
            <div className="icon-box">
              <AimOutlined style={{ fontSize: '50px', color: '#fff' }} />
              <p>Para todos los niveles</p>
            </div>
            <div className="icon-box">
              <TrophyOutlined style={{ fontSize: '50px', color: '#fff' }} />
              <p>Compite y gana</p>
            </div>
          </div>
        </div>
      </section>


      <section className="home-call-to-action">
        <h3>¿Listo para correr?</h3>
        <button onClick={() => navigate('/calendario')} className="home-cta-button">
          Explorar Carreras
        </button>
      </section>
    </div>
  );
};

export default Home;