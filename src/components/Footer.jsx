import React from 'react';
import './Footer.css';
import { InstagramOutlined, GithubOutlined, TwitterOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd'; 

const Footer = () => {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {currentYear} Agenda del Runner</p>
        <p>Esta web fue hecha con ❤️ por un runner para los runners</p>
        <Row justify="center" align="middle">
          <Col>
            <a href="https://www.instagram.com/eldiariodelrunner" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={{ fontSize: '24px', color: '#c9d7f7', marginRight: '15px' }} />
            </a>
          </Col>
          {/* <Col>
            <a href="https://github.com/tu_usuario" target="_blank" rel="noopener noreferrer">
              <GithubOutlined style={{ fontSize: '24px', color: '#c9d7f7' }} />
            </a>
          </Col> */}
        </Row>
      </div>
    </footer>
  );
}

export default Footer;