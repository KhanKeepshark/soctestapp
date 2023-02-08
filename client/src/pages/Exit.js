import React, { useState } from 'react';
import { Button, Container} from 'react-bootstrap';
import logo from '../images/logo.png'
import '../components/static/Main.css'


const Exit = () => {

  return (
    <div>
        <Container>
                <div class="text-center mobExit h1" style={{height: "100vh", margin: "100px"}}>
                    <img src={logo} alt="Logo" style={{height: "300px"}}/>
                    Спасибо за участие в опросе!
                </div>
        </Container>
    </div>

  );
}

export default Exit;