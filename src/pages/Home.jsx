import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom'; // Si usas React Router

const Home = () => {
  const navigate = useNavigate(); // Para redirigir al calendario

  return (
    <div className="home">
      <header className="home-hero">
        <img 
          src="https://www.w3schools.com/html/pic_trulli.jpg" 
          alt="Portada runner"
          className="home-hero-image"
        />
        <div className="home-hero-overlay">
          <h1>Calendario Runner</h1>
          <p>Descubre las próximas carreras en tu país</p>
          <button onClick={() => navigate('/calendario')} className="home-hero-button">
            Ver Calendario
          </button>
        </div>
      </header>

      <section className="home-about">
        <h2>¿De qué se trata esta página?</h2>
        <p>
          Esta plataforma está diseñada para todos los amantes del running.
          Aquí podrás encontrar información actualizada sobre eventos y carreras
          que se llevarán a cabo en todo el país.
        </p>
        <p>
          Ya seas principiante o corredor experimentado, aquí tendrás una vista clara y resumida de lo que viene,
          podrás planificar tu calendario y mantenerte al tanto de los eventos más importantes.
        </p>
        <p>
          Esta página no recibe retribución económica alguna, ya que está creada con el propósito de formar una comunidad agradable 
          de corredores para todos. Sin embargo, cualquier donación será bienvenida para ayudar a mantener el sitio operativo y a que
          podamos continuar informando sobre los eventos de running en el país.
        </p>
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
