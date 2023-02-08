import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { checkRole, logOut } from '../http/userAPI';
import { Context } from '../index';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGIONS_ROUTE} from '../utils/consts';

const PageNavbar = observer( () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOutNow = () => {
      logOut()
      user.setUser({})
      user.setIsAuth(false)
      navigate(LOGIN_ROUTE)
    }

    checkRole().then(data => { data.role === 'ADMIN' ? user.setAccess(true) : user.setAccess(false)})

    return (
        <Navbar style={{backgroundColor: 'rgba(0, 139, 139)'}} expand="lg">
        <Container>
          <Navbar.Brand style={{color: 'white'}}>Анкетирование</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{flexGrow: '0'}}>
        {user.isAuth ?
          <Nav className="ml-auto">
            {user.access ?
            <Button variant='outline-light' className='ms-2 mt-2' onClick={()=> navigate(ADMIN_ROUTE)}>Админ панель</Button>
            :
            null}
            <Button variant='outline-light' className='ms-2 mt-2' onClick={()=> navigate(REGIONS_ROUTE)}>Выбор Регионов</Button>
            <Button variant='outline-light' className='ms-2 mt-2' onClick={()=>logOutNow()}>Выйти</Button>
          </Nav>
          
          :
          <Nav className="ml-auto">
            <Button variant='outline-light' className='ms-2 mt-2' onClick={()=> navigate(LOGIN_ROUTE)}>Авторизация</Button>
          </Nav>
            }
          </Navbar.Collapse>
        </Container>
        </Navbar>
    );
})

export default PageNavbar;