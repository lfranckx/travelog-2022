import './Styles/App.scss';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicOnlyRoute from './Routes/Utils/PublicRoutes';
import PrivateRoutes from './Routes/Utils/PrivateRoutes';

import TokenService from './Services/TokenService';
import IdleService from './Services/IdleService';
import AuthApiService from './Services/AuthApiService';

import Header from './Components/Header';
import Homepage from './Routes/Homepage';
import ArticlePage from './Routes/ArticlePage';
import AuthorPage from './Routes/AuthorPage';
import LoginPage from './Routes/LoginPage';
import SignUpPage from './Routes/SignUpPage';
import ProfilePage from './Routes/ProfilePage';
import PostArticlePage from './Routes/PostArticlePage';
import EditArticlePage from './Routes/EditArticlePage';
import CreateProfilePage from './Routes/CreateProfilePage';
import EditProfilePage from './Routes/EditProfilePage';

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
          <Route exact path='/' element={<Homepage/>} />
          <Route path='/article/:articleId' element={<ArticlePage />} />
          <Route path='/author/:username' element={<AuthorPage/>} />

          <Route element={<PrivateRoutes />} >
            <Route path={'/profile/:username'} element={<ProfilePage />} />
          </Route>

          <Route element={<PublicOnlyRoute />} >
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/post-article' element={<PostArticlePage />} />
            <Route path='/edit-article' element={<EditArticlePage />} />
            <Route path='/create-profile' element={<CreateProfilePage />} />
            <Route path='/edit-profile' element={<EditProfilePage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;