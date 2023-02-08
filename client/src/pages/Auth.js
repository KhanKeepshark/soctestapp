import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { login, registration } from '../http/userAPI';
import { MENU_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import '../components/static/Main.css'

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isName, setIsName] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [checkLogin, setCheckLogin] = useState(false)

  const click = async () => {
    try {
      email.length < 5 ? setIsName(true) : setIsName(false)
      password.length < 5 ? setIsPassword(true) : setIsPassword(false)
      if (email.length >= 5  && password.length >= 5){
        setCheckLogin(true)
        let data;
        if (isLogin){
          data = await login(email, password)
        } else {
          data = await registration(email, password)
        }
        user.setUser(user)
        user.setIsAuth(true)
        navigate(MENU_ROUTE)
      }
    } catch (e){
      alert(e.response.data.message)
    }
    


  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center mt-5'
      // style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 600}} className="p-5">
      {checkLogin ? <p className='mt-2' style={{color: 'red'}}>Неккоректный логин или пароль</p> : null}
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш логин"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {isName ? <p className='mt-2' style={{color: 'red'}}>Логин должен быть не короче 5 символов</p> : null}
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          {isPassword ? <p className='mt-2' style={{color: 'red'}}>Пароль должен быть не короче 5 символов</p> : null}
          <Button variant='outline-success' onClick={click} className='mt-3'>{isLogin ? "Войти" : "Регистрация"}</Button>
          {isLogin ?
            <div className='align-self-end mt-3 pe-1'>
                <NavLink variant='outline-success' to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
            </div>
            :
            <div className='align-self-end mt-3 pe-1'>
                <NavLink variant='outline-success' to={LOGIN_ROUTE}>Авторизоваться</NavLink>
            </div>
          }
        </Form>
      </Card>
    </Container>
  );
})

export default Auth;
