import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import TokenService from '../../Services/TokenService';

export default function PrivateRoutes() {
    const loggedIn = true;
    return (
        // TokenService.hasAuthToken()
            loggedIn
            ? <Outlet />
            : <Navigate 
                to={'/'} />
    );
}