import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';

import { getEventos } from '../firebase/eventos';
import { getOrganizadores } from '../firebase/organizadores';
import moment from 'moment';

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [organizadores, setOrganizadores] = useState({});

  // Formateador de fecha a yyyy-mm-dd
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Cargar eventos y organizadores desde Firestore
  useEffect(() => {
    const fetchData = async () => {
      const eventosData = await getEventos(); // [{id, ...}]
      setEventos(eventosData);

      const orgsData = await getOrganizadores(); // [{id, ...}]
      // Convertimos a objeto para buscar rápido por id
      const orgsMap = {};
      orgsData.forEach(org => {
        orgsMap[org.id] = org;
      });
      setOrganizadores(orgsMap);
    };

    fetchData();
  }, []);

  // Filtrar eventos para la fecha seleccionada
  const formatFirestoreDate = (timestamp) => {
    const date = timestamp.toDate(); // convertir a JS Date
    return date.toISOString().split('T')[0];
  };

  const eventosDelDia = eventos.filter(evento => {
      if (!evento.fecha) return false;
      let fechaEvento;
      if (evento.fecha.toDate) {
        fechaEvento = formatFirestoreDate(evento.fecha);
      } else {
        fechaEvento = evento.fecha;
      }
      return fechaEvento === formatDate(selectedDate);
    });


  // Abrir modal con evento seleccionado
  const abrirModal = (evento) => setEventoSeleccionado(evento);

  // Cerrar modal
  const cerrarModal = () => setEventoSeleccionado(null);

  return (
    <div className="calendario-container">
      <h1>Calendario de Carreras</h1>
      <p>Selecciona una fecha para ver los eventos conocidos.</p>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        locale="es-ES"
        className="mi-calendario"
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const tieneEvento = eventos.some(e => {
              if (!e.fecha) return false;
              let fechaEvento;
              if (e.fecha.toDate) { // Timestamp de Firestore
                fechaEvento = formatFirestoreDate(e.fecha);
              } else {
                fechaEvento = e.fecha;
              }
              return fechaEvento === formatDate(date);
            });

            // Verificar si la fecha del evento es anterior a la fecha actual
            const isEventPassed = eventos.some(e => {
              if (!e.fecha) return false;
              let fechaEvento;
              if (e.fecha.toDate) {
                fechaEvento = formatFirestoreDate(e.fecha);
              } else {
                fechaEvento = e.fecha;
              }
              // Compara la fecha del evento con la fecha actual
              return fechaEvento === formatDate(date) && moment(fechaEvento).isBefore(moment(), 'day');
            });

            if (isEventPassed) return 'evento-pasado'; // Evento pasado (rojo)
            if (tieneEvento) return 'evento-activo'; // Evento futuro
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
              style={{
                cursor: 'pointer',
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid black',
                borderRadius: '6px',
                backgroundColor: '#fff5f5'
              }}
              title="Haz click para ver detalles"
            >
              <strong>{evento.nombre}</strong>
              <pre/>
              <small>{moment(evento.fecha.toDate()).format('DD/MM/YYYY')} - {evento.lugar}, {evento.ciudad}</small>
              <em><pre>Clica aquí para más información</pre></em>
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
            <p>
              <strong>Fecha:</strong>{" "}
              {eventoSeleccionado.fecha ? moment(eventoSeleccionado.fecha.toDate()).format('YYYY-MM-DD') : "No disponible"}{" "}
              {eventoSeleccionado.hora || ""}
            </p>
            <p><strong>Ciudad:</strong> {eventoSeleccionado.ciudad}</p>
            <p><strong>Lugar:</strong> {eventoSeleccionado.lugar}</p>
            <p><strong>Categoría:</strong> {eventoSeleccionado.categoria}</p>
            <p><strong>Distancias:</strong> {eventoSeleccionado.distancia.join(', ')}</p>
            <p><strong>Descripción:</strong> {eventoSeleccionado.descripcion}</p>
            <p><strong>Precio:</strong> {eventoSeleccionado.precio > 0 ? `$${eventoSeleccionado.precio}` : 'Gratis'}</p>
            <p><strong>Inscripciones:</strong> {eventoSeleccionado.urlInscripcion && <a href={eventoSeleccionado.urlInscripcion} target="_blank" rel="noreferrer">Click aquí</a>}</p>

            {/* Info del organizador */}
            {(() => {
              const org = organizadores[eventoSeleccionado.organizadorId];
              if (!org) return null;
              return (
                <>
                  <hr style={{ borderColor: '#000000ff', margin: '25px 0' }} />
                  <h3>Organizador: {org.nombre}</h3>
                  <p>{org.descripcion}</p>
                  <p><strong>Celular:</strong> {org.telefono}</p>
                  <p><strong>Email:</strong> {org.email}</p>
                  <p><strong>Sitio Web / Red Social:</strong> {org.paginaWeb && <a href={org.paginaWeb} target="_blank" rel="noreferrer">{org.paginaWeb}</a>}</p>
                  {/* <div>
                    {org.redes?.facebook && (
                      <a href={`https://facebook.com/${org.redes.facebook}`} target="_blank" rel="noreferrer">
                        Facebook
                      </a>
                    )}
                    {org.redes?.instagram && (
                      <a href={`https://instagram.com/${org.redes.instagram}`} target="_blank" rel="noreferrer">
                        Instagram
                      </a>
                    )}
                    {org.redes?.twitter && (
                      <a href={`https://twitter.com/${org.redes.twitter}`} target="_blank" rel="noreferrer">
                        Twitter
                      </a>
                    )}
                  </div> */}
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