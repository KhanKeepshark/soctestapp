import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Container, Row} from 'react-bootstrap';
import Maps from '../components/Maps';
import PieChart from '../components/PieChart';
import Q7BarChart from '../components/Q7BarChar';
import Sidebar from '../components/sideBar';



const Admin = () => {
  const [switchPage, setSwitchPage] = useState(false)

  return (
    <div>
      <Row>
        <Col md={2}>
            <Sidebar />
        </Col>
        <Col md={9}>
          <Container className='d-flex flex-column'>
          <ButtonGroup  aria-label="Basic example" className='mt-1'>
            <Button variant="outline-success" onClick={() => setSwitchPage(false)}>Графики</Button>
            <Button variant="outline-success" onClick={() => setSwitchPage(true)}>Карта</Button>
          </ButtonGroup>
          {switchPage ?
            <Maps/>
            :
            <>
            <PieChart/>
            <Q7BarChart/>
            </>
          }
          </Container>
        </Col>
      </Row>  
    </div>

  );
}

export default Admin;