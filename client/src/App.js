import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import PageNavbar from './components/Navbar';
import { check } from './http/userAPI';

const App = observer(() => {
  const {user} = useContext(Context)

  useEffect(()=> {
    check().then(data =>{
      user.setUser(true)
      user.setIsAuth(true)
    })
  })

  return (
    <BrowserRouter>
      <PageNavbar />
      <AppRouter />
    </BrowserRouter> 
  );
})

export default App;
