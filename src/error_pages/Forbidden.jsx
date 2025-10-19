import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className="error-page">
      <Result
        status="403"
        title="403"
        subTitle="Lo sentimos, no tienes permiso para acceder a esta página."
        extra={
          <Button type="primary">
            <Link to="/">Volver a la página principal</Link>
          </Button>
        }
      />
    </div>
  );
}

export default Forbidden;