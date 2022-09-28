import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthApiService from '../Services/AuthApiService';
import { ArticleContext } from '../ArticleContext';
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

export default function SignUpPage() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useContext(ArticleContext);

    const handleSubmitJwtAuth = async(values) => {
        console.log(values);
        const { first_name, last_name, email, username, password } = values;
        const newUser = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            username: username,
            password: password
        }

        AuthApiService.postUser(newUser)
            .then(res => {
                AuthApiService.postAuthor({
                    username: username,
                    name: first_name + ' ' + last_name,
                    about: '',
                    profile_image: ''
                })
                .then(res => {
                    setUser(res);
                    AuthApiService.postLogin({
                        username: username,
                        password: password
                    })
                    .then(user => {
                        username = '';
                        password = '';
                        navigate('/');
                    })
                })
            })
    }

    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z]).{8,}/;

    const SignUpSchema = Yup.object().shape({
        first_name: Yup.string()
            .min(2, "First name must be at least 2 characters")
            .max(20, 'First name is too long. Maximum 20 characters')
            .required('First name is required'),
        last_name: Yup.string()
            .min(2, "Last name must be at least 2 characters")
            .max(20, 'Last name is too long. Maximum 20 characters')
            .required('Last name is required'),
        email: Yup.string().email("* Whoops this doesn't look like an email.").required("* Email is Required"),
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
            <h2 className='section_title'>Sign Up</h2>
            <div className='form_wrap'>
                <Formik 
                    initialValues={{ first_name: '', last_name: '', email: '', username: '', password: '' }}
                    validationSchema={SignUpSchema}
                    onSubmit={handleSubmitJwtAuth}
                >
                    <Form id='form'>

                        <div className='field_wrap'>
                            <label htmlFor='first_name'>First Name</label>
                            <Field 
                                type="text" 
                                name='first_name' 
                                aria-label='first_name'
                                className='first_name'
                                id='first_name' 
                                required
                            />
                            <ErrorMessage component="div" className='error' name='first_name' />
                        </div>

                        <div className='field_wrap'>
                            <label htmlFor='last_name'>Last Name</label>
                            <Field 
                                type="text" 
                                name='last_name' 
                                aria-label='last_name'
                                className='last_name'
                                id='last_name' 
                                required
                            />
                            <ErrorMessage component="div" className='error' name='last_name' />
                        </div>

                        <div className='field_wrap'>
                            <label htmlFor='email'>Email</label>
                            <Field 
                                type="text" 
                                name='email' 
                                aria-label='email'
                                className='email'
                                id='email' 
                                required
                            />
                            <ErrorMessage component="div" className='error' name='email' />
                        </div>

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