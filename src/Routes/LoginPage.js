import '../Styles/LoginPage.scss';
import React, { useState, useContext } from 'react';
import AuthApiService from '../Services/AuthApiService';

export default function LoginPage() {
    const [error, setError] = useState(null);

    const handleSubmitJwtAuth = ev => {
        ev.preventDefault();
        setError({ error: null });
        // const { username, password} = ev.target;
        console.log(ev.target);
    }

    return (
        <section className='section_content' id='login_section'>
            <h2 className='section_title'>Login</h2>
            <div className='form_wrap'>
                <form id='login_form' onSubmit={handleSubmitJwtAuth}>
                {error && <div role={'alert'}><h2 className='error'>{error}</h2></div>}

                    <div className='field_wrap'>
                        <label htmlFor='username'>Username</label>
                        <input 
                            type="text" 
                            name='username' 
                            aria-label='username'
                            className='username'
                            id='username' 
                            required
                        />
                    </div>

                    <div className='field_wrap'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            autoComplete="on"
                            type="password" 
                            name='password' 
                            aria-label='password'
                            className='password'
                            id='password'
                            required />
                    </div>

                    <div className='field_wrap .btn_wrap'>
                        <button className='btn-secondary'>Login</button>
                    </div>
                </form>
            </div>
        </section>
    )
}