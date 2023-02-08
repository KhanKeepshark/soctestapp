import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AskFormData from './form/askForm';
import UserForm from './form/userForm';

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserForm(),
        askData: new AskFormData()
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);

