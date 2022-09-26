import './Styles/App.scss';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './Routes/Homepage';
import Header from './Components/Header';
import ArticlePage from './Routes/ArticlePage';

import TokenService from './Services/TokenService';
import IdleService from './Services/IdleService';
import AuthApiService from './Services/AuthApiService';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.clear();
    IdleService.setIdleCallback(logoutFromIdle);
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken();
      })
    }

    return () => {
      IdleService.unRegisterIdleResets();
      TokenService.clearCallbackBeforeExpiry();
    }
  }, []);

  const logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    setLoggedIn(false);
  }

  return (
    <div className="App">
      <Header />

      <main className='main'>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/article/:articleId' element={<ArticlePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;