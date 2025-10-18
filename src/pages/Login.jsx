// Login.jsx
import React from 'react';

const Login = () => {
  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;  // Exportación por defecto
