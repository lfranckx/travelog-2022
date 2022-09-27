import './Styles/App.scss';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './Routes/Homepage';
import Header from './Components/Header';
import ArticlePage from './Routes/ArticlePage';
import AuthorPage from './Routes/AuthorPage';
import LoginPage from './Routes/LoginPage';

import PublicOnlyRoute from './Routes/Utils/PublicRoute';
import PrivateRoutes from './Routes/Utils/PrivateRoutes';

import TokenService from './Services/TokenService';
import IdleService from './Services/IdleService';
import AuthApiService from './Services/AuthApiService';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);

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
        {error && <h2 className='error'>There was an error in the server.</h2>}
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/article/:articleId' element={<ArticlePage />} />
          <Route path='/author/:username' element={<AuthorPage/>} />
          
        </Routes>
      </main>
    </div>
  );
}

export default App;