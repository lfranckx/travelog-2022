import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import TokenService from '../../Services/TokenService';

export default function PublicOnlyRoute({ component, ...props }) {
    const Component = component;
    return (
        <Route 
            {...props}
            render={componentProps => (
                TokenService.hasAuthToken()
                    ? <Navigate to={'/'} />
                    : <Component {...componentProps} />
            )}
        />
    )
}