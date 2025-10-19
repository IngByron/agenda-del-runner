import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="error-page">
      <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, la página que buscas no existe."
        extra={
          <Button type="primary">
            <Link to="/">Volver a la página principal</Link>
          </Button>
        }
      />
    </div>
  );
}

export default NotFound;