import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Typography,
  message,
  Table,
  Space,
  Select,
  Tag,
} from "antd";
import { signOut } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../firebase/config";
import { Helmet } from "react-helmet";
import {
  addOrganizador,
  getOrganizadores,
  updateOrganizador,
  deleteOrganizador,
} from "../firebase/organizadores";
import {
  addEvento,
  getEventos,
  updateEvento,
  deleteEvento,
} from "../firebase/eventos";
import moment from "moment";
import "./AdminPanel.css";

const { Title, Text } = Typography;
const { Option } = Select;

const AdminPanel = () => {
  const { user } = useAuth();

  // Estados para modales
  const [isOrgModalVisible, setOrgModalVisible] = useState(false);
  const [isEventModalVisible, setEventModalVisible] = useState(false);
  const [isOrgViewVisible, setOrgViewVisible] = useState(false);
  const [isEventViewVisible, setEventViewVisible] = useState(false);

  // Formularios
  const [orgForm] = Form.useForm();
  const [eventForm] = Form.useForm();

  // Listas
  const [organizadoresList, setOrganizadoresList] = useState([]);
  const [eventosList, setEventosList] = useState([]);

  // Búsqueda de organizadores
  const [searchOrg, setSearchOrg] = useState("");

  // Para editar
  const [editingOrg, setEditingOrg] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch inicial
  useEffect(() => {
    fetchOrganizadores();
    fetchEventos();
  }, []);

  const fetchOrganizadores = async () => {
    const orgs = await getOrganizadores();
    setOrganizadoresList(orgs);
  };

  const fetchEventos = async () => {
    const evs = await getEventos();

    // Formatear fechas
    const formattedEventos = evs.map((evento) => ({
      ...evento,
      fecha: evento.fecha ? moment(evento.fecha.toDate()) : null,
    }));

    // Ordenar: Activos primero, más recientes arriba
    const sortedEventos = formattedEventos.sort((a, b) => {
      const isPastA = a.fecha && moment(a.fecha).isBefore(moment(), "day");
      const isPastB = b.fecha && moment(b.fecha).isBefore(moment(), "day");

      // Activos primero
      if (isPastA !== isPastB) return isPastA ? 1 : -1;

      // Entre los mismos estados, más recientes primero
      return moment(b.fecha).valueOf() - moment(a.fecha).valueOf();
    });

    setEventosList(sortedEventos);
  };

  // Abrir / cerrar modales
  const showOrgModal = () => setOrgModalVisible(true);
  const hideOrgModal = () => {
    setOrgModalVisible(false);
    orgForm.resetFields();
    setEditingOrg(null);
  };

  const showEventModal = () => setEventModalVisible(true);
  const hideEventModal = () => {
    setEventModalVisible(false);
    eventForm.resetFields();
    setEditingEvent(null);
  };

  const showOrgView = () => setOrgViewVisible(true);
  const hideOrgView = () => setOrgViewVisible(false);
  const showEventView = () => setEventViewVisible(true);
  const hideEventView = () => setEventViewVisible(false);

  // Crear / Editar Organizador
  const submitOrg = async (values) => {
    try {
      if (editingOrg) {
        await updateOrganizador(editingOrg.id, values);
        message.success("Organizador actualizado correctamente!");
      } else {
        const id = await addOrganizador(values);
        message.success(`Organizador creado con éxito! ID: ${id}`);
      }
      hideOrgModal();
      fetchOrganizadores();
    } catch (error) {
      message.error("Error al guardar el organizador");
      console.error(error);
    }
  };

  // Crear / Editar Evento
  const submitEvent = async (values) => {
    try {
      const formattedDate = values.fecha ? values.fecha.toDate() : null;
      const distanciasArray = values.distancia
        ? values.distancia.split(",").map((d) => d.trim())
        : [];

      const eventData = {
        ...values,
        fecha: formattedDate,
        distancia: distanciasArray,
      };

      if (editingEvent) {
        await updateEvento(editingEvent.id, eventData);
        message.success("Evento actualizado correctamente!");
      } else {
        const id = await addEvento(eventData);
        message.success(`Evento creado con éxito! ID: ${id}`);
      }

      hideEventModal();
      fetchEventos();
    } catch (error) {
      message.error("Error al guardar el evento");
      console.error(error);
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success("Sesión cerrada correctamente");
    } catch (error) {
      console.error(error);
      message.error("Error al cerrar sesión");
    }
  };

  // Editar
  const editOrganizador = (record) => {
    setEditingOrg(record);
    orgForm.setFieldsValue(record);
    showOrgModal();
  };

  const editEvento = (record) => {
    setEditingEvent(record);
    eventForm.setFieldsValue({
      ...record,
      fecha: record.fecha ? moment(record.fecha) : null,
    });
    showEventModal();
  };

  // Eliminar
  const deleteOrganizadorHandler = async (id) => {
    try {
      await deleteOrganizador(id);
      message.success("Organizador eliminado");
      fetchOrganizadores();
    } catch (error) {
      message.error("Error al eliminar organizador: ",error);
    }
  };

  const deleteEventoHandler = async (id) => {
    try {
      await deleteEvento(id);
      message.success("Evento eliminado");
      fetchEventos();
    } catch (error) {
      message.error("Error al eliminar evento:",error);
    }
  };

  // Columnas
  const orgColumns = [
    { title: "Nombre", dataIndex: "nombre" },
    { title: "Email", dataIndex: "email" },
    { title: "Teléfono", dataIndex: "telefono" },
    {
      title: "Acciones",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => editOrganizador(record)}>
            Editar
          </Button>
          <Button
            type="link"
            danger
            onClick={() => deleteOrganizadorHandler(record.id)}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const eventoColumns = [
    { title: "Nombre", dataIndex: "nombre" },
    {
      title: "Fecha",
      dataIndex: "fecha",
      render: (fecha) =>
        fecha ? moment(fecha).format("YYYY-MM-DD") : "No disponible",
      sorter: (a, b) => moment(a.fecha).valueOf() - moment(b.fecha).valueOf(),
    },
    { title: "Ciudad", dataIndex: "ciudad" },
    {
      title: "Estado",
      render: (_, record) => {
        const isPast =
          record.fecha && moment(record.fecha).isBefore(moment(), "day");
        return (
          <Tag color={isPast ? "red" : "green"}>
            {isPast ? "Finalizado" : "Activo"}
          </Tag>
        );
      },
      filters: [
        { text: "Activo", value: "activo" },
        { text: "Finalizado", value: "finalizado" },
      ],
      onFilter: (value, record) => {
        const isPast =
          record.fecha && moment(record.fecha).isBefore(moment(), "day");
        return value === "activo" ? !isPast : isPast;
      },
    },
    {
      title: "Acciones",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => editEvento(record)}>
            Editar
          </Button>
          <Button
            type="link"
            danger
            onClick={() => deleteEventoHandler(record.id)}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  // Filtrado de organizadores
  const filteredOrganizadores = organizadoresList.filter(
    (org) =>
      org.nombre?.toLowerCase().includes(searchOrg.toLowerCase()) ||
      org.email?.toLowerCase().includes(searchOrg.toLowerCase())
  );

  return (
    <div className="admin-container">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="admin-header">
        <Title level={2} className="admin-title">
          Panel de Administración
        </Title>
        {user && (
          <Text className="admin-user">Sesión iniciada como: {user.email}</Text>
        )}
        <Button
          type="primary"
          onClick={handleLogout}
          style={{ marginLeft: "16px" }}
        >
          Cerrar sesión
        </Button>
      </div>

      <div className="admin-cards">
        <Card title="Crear Organizador" bordered={false} className="admin-card">
          <Button type="primary" onClick={showOrgModal}>
            Abrir formulario
          </Button>
        </Card>
        <Card title="Crear Evento" bordered={false} className="admin-card">
          <Button type="primary" onClick={showEventModal}>
            Abrir formulario
          </Button>
        </Card>
        <Card title="Ver Organizadores" bordered={false} className="admin-card">
          <Button type="primary" onClick={showOrgView}>
            Abrir lista
          </Button>
        </Card>
        <Card title="Ver Eventos" bordered={false} className="admin-card">
          <Button type="primary" onClick={showEventView}>
            Abrir lista
          </Button>
        </Card>
      </div>

      {/* Modal Crear / Editar Organizador */}
      <Modal
        title={editingOrg ? "Editar Organizador" : "Crear Organizador"}
        open={isOrgModalVisible}
        onCancel={hideOrgModal}
        footer={null}
      >
        <Form form={orgForm} layout="vertical" onFinish={submitOrg}>
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="descripcion" label="Descripción">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="telefono" label="Teléfono">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="paginaWeb" label="Página Web">
            <Input />
          </Form.Item>
          <Form.Item name="logoUrl" label="URL Logo">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Crear / Editar Evento */}
      <Modal
        title={editingEvent ? "Editar Evento" : "Crear Evento"}
        open={isEventModalVisible}
        onCancel={hideEventModal}
        footer={null}
      >
        <Form form={eventForm} layout="vertical" onFinish={submitEvent}>
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="descripcion" label="Descripción">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="fecha" label="Fecha">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="hora" label="Hora">
            <Input type="time" />
          </Form.Item>
          <Form.Item name="lugar" label="Lugar">
            <Input />
          </Form.Item>
          <Form.Item name="ciudad" label="Ciudad">
            <Input />
          </Form.Item>
          <Form.Item name="categoria" label="Categoría">
            <Input />
          </Form.Item>
          <Form.Item name="distancia" label="Distancias (separadas por coma)">
            <Input />
          </Form.Item>
          <Form.Item
            name="organizadorId"
            label="Organizador"
            rules={[{ required: true, message: "Selecciona un organizador" }]}
          >
            <Select
              showSearch
              placeholder="Selecciona un organizador"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              allowClear
            >
              {organizadoresList.map((org) => (
                <Option key={org.id} value={org.id}>
                  {org.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="precio" label="Precio">
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
          <Form.Item name="urlInscripcion" label="URL de Inscripción">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Ver Organizadores */}
      <Modal
        title="Lista de Organizadores"
        open={isOrgViewVisible}
        onCancel={hideOrgView}
        footer={null}
        width={800}
      >
        <Input
          placeholder="Buscar organizador por nombre o email..."
          value={searchOrg}
          onChange={(e) => setSearchOrg(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Table
          dataSource={filteredOrganizadores}
          columns={orgColumns}
          rowKey="id"
        />
      </Modal>

      {/* Modal Ver Eventos */}
      <Modal
        title="Lista de Eventos"
        open={isEventViewVisible}
        onCancel={hideEventView}
        footer={null}
        width={1000}
      >
        <Table dataSource={eventosList} columns={eventoColumns} rowKey="id" />
      </Modal>
    </div>
  );
};

export default AdminPanel;
