import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import "./Login.css";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // obtiene el usuario logueado
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar el mensaje de error

  useEffect(() => {
    if (user) {
      // Si existe sesión, redirige automáticamente al panel de administración
      navigate("/dashboard"); // la ruta de tu panel
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    try {
      // Intentar iniciar sesión con Firebase usando el correo
      await signInWithEmailAndPassword(auth, values.username, values.password);
      
      // Si la autenticación es exitosa, redirige al dashboard
      navigate("/dashboard");
    } catch (error) {
      // Captura el error y actualiza el estado del mensaje
      console.error(error);
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found"
      ) {
        setErrorMessage("Usuario o contraseña incorrectos");
      } else {
        setErrorMessage("Error al iniciar sesión");
      }
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        <Title level={3} className="login-title">
          Iniciar sesión
        </Title>

        <Form
          name="login_form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="Correo electrónico"
            rules={[
              { required: true, message: "Por favor ingresa tu correo" },
              { type: "email", message: "Correo no válido" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="correo@ejemplo.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              size="large"
            />
          </Form.Item>

          {/* Mostrar el mensaje de error aquí */}
          {errorMessage && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              {errorMessage}
            </div>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
