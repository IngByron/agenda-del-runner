import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const ServerError = () => {
  return (
    <div className="error-page">
      <Result
        status="500"
        title="500"
        subTitle="Lo sentimos, algo salió mal en el servidor. Intenta más tarde."
        extra={
          <Button type="primary">
            <Link to="/">Volver a la página principal</Link>
          </Button>
        }
      />
    </div>
  );
}

export default ServerError;