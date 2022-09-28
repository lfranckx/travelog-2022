import '../Styles/Forms.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthApiService from '../Services/AuthApiService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function LoginPage() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmitJwtAuth = async(values) => {
        console.log(values);
        const { username, password } = values;

        AuthApiService.postLogin({ username: username, password: password })
            .then(res => {
                username = '';
                password = '';
                navigate('/');
            })
            .catch( res => {
                username = '';
                password = '';
                setError({ error: res.error })
            });
    }

    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z]).{8,}/;

    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, "Username must be at least 2 characters")
            .max(20, 'Username is too long. Maximum 20 characters')
            .required('* Username is required'),
        password: Yup.string()
            .min(8, 'Password must be longer than 8 characters')
            .max(72, 'Password must be less than 72 characters')
            .matches(REGEX_UPPER_LOWER_NUMBER_SPECIAL, 'Password must have 1 uppercase, 1 lowercase, 1 Number, 1 Special Character')
            .required('* Password is required')
    });

    return (
        <section className='section_content form_section'>
            <h2 className='section_title'>Login</h2>
            <div className='form_wrap'>
                <Formik 
                    initialValues={{ username: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmitJwtAuth}
                >
                    <Form id='form'>
                        <div className='field_wrap'>
                            <label htmlFor='username'>Username</label>
                            <Field 
                                type="text" 
                                name='username' 
                                aria-label='username'
                                className='username'
                                id='username' 
                                required
                            />
                            <ErrorMessage component="div" className='error' name='username' />
                        </div>

                        <div className='field_wrap'>
                            <label htmlFor='password'>Password</label>
                            <Field 
                                autoComplete="on"
                                type="password" 
                                name='password' 
                                aria-label='password'
                                className='password'
                                id='password'
                                required />
                            <ErrorMessage component="div" className='error' name='password' />
                        </div>

                        <div className='field_wrap .btn_wrap'>
                            <button className='btn-secondary' type='submit'>Login</button>
                        </div>

                        {error && <div role={'alert'}><h2 className='error'>{error}</h2></div>}
                    </Form>
                </Formik>
            </div>
        </section>
    );
}