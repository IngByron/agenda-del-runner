import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';

import { eventos, organizadores } from './mocks';

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  // Formateador de fecha a yyyy-mm-dd
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Filtrar eventos para la fecha seleccionada
  const eventosDelDia = Object.values(eventos).filter(
    (evento) => evento.fecha === formatDate(selectedDate)
  );

  // Abrir modal con evento seleccionado
  const abrirModal = (evento) => {
    setEventoSeleccionado(evento);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setEventoSeleccionado(null);
  };

  return (
    <div className="calendario-container">
      <h1>Calendario de Carreras</h1>
      <p>Selecciona una fecha para ver los eventos programados.</p>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        locale="es-ES"
        className="mi-calendario"
        tileClassName={({ date, view }) => {
          const dateStr = formatDate(date);
          if (view === 'month') {
            const tieneEvento = Object.values(eventos).some(e => e.fecha === dateStr);
            if (tieneEvento) return 'evento-activo';
          }
          return null;
        }}
      />

      <div className="evento-info">
        {eventosDelDia.length > 0 ? (
          eventosDelDia.map((evento, idx) => (
            <div
              key={idx}
              className="evento-item"
              onClick={() => abrirModal(evento)}
              style={{ cursor: 'pointer', marginBottom: '15px', padding: '10px', border: '1px solid #ffcccc', borderRadius: '6px', backgroundColor: '#fff5f5' }}
              title="Haz click para ver detalles"
            >
              <strong>{evento.nombre}</strong><br />
              <small>{evento.hora} - {evento.lugar}, {evento.ciudad}</small>
            </div>
          ))
        ) : (
          <p>No hay eventos para el {selectedDate.toLocaleDateString()}.</p>
        )}
      </div>

      {/* Modal */}
{eventoSeleccionado && (
  <div className="modal-overlay" onClick={cerrarModal}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={cerrarModal} aria-label="Cerrar modal">×</button>
      <h2>{eventoSeleccionado.nombre}</h2>

      <p><strong>Fecha:</strong> {eventoSeleccionado.fecha} {eventoSeleccionado.hora}</p>
      <p><strong>Ciudad:</strong> {eventoSeleccionado.ciudad}</p>
      <p><strong>Lugar:</strong> {eventoSeleccionado.lugar}, {eventoSeleccionado.ciudad}</p>
      <p><strong>Categoría:</strong> {eventoSeleccionado.categoria}</p>
      <p><strong>Distancias:</strong> {eventoSeleccionado.distancia.join(', ')}</p>
      <p><strong>Descripción:</strong> {eventoSeleccionado.descripcion}</p>
      <p><strong>Precio:</strong> {eventoSeleccionado.precio > 0 ? `$${eventoSeleccionado.precio}` : 'Gratis'}</p>
      {eventoSeleccionado.urlInscripcion && (
        <p><a href={eventoSeleccionado.urlInscripcion} target="_blank" rel="noreferrer">Inscribirse aquí</a></p>
      )}

      {/* Info del organizador */}
      {(() => {
        const org = organizadores[eventoSeleccionado.organizadorId];
        if (!org) return null;
        return (
          <>
            <hr style={{ borderColor: '#e41a1aff', margin: '25px 0' }} />
            <h3>Organizador: {org.nombre}</h3>
            <p>{org.descripcion}</p>
            <p><strong>Contacto:</strong> {org.telefono} | {org.email}</p>
            <p><strong>Sitio Web:</strong> {org.paginaWeb && <a href={org.paginaWeb} target="_blank" rel="noreferrer">{org.paginaWeb}</a>}</p>
            {/* Redes sociales dinámicas */}
            <div>
              {org.redes.facebook && (
                <a href={`https://facebook.com/${org.redes.facebook}`} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              )}
              {org.redes.instagram && (
                <a href={`https://instagram.com/${org.redes.instagram}`} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              )}
              {org.redes.twitter && (
                <a href={`https://twitter.com/${org.redes.twitter}`} target="_blank" rel="noreferrer">
                  Twitter
                </a>
              )}
            </div>
          </>
        );
      })()}
    </div>
  </div>
)}

    </div>
  );
};

export default Calendario;
