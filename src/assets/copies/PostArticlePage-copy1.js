import React, { useContext, useState } from 'react';
import { ArticleContext } from '../../ArticleContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FileInput from '../../Components/FileInput';

export default function PostArticlePage() {
    const [error, setError] = useState(null);
    const { user } = useContext(ArticleContext);

    const handleSubmitPost = async(values) => {
        setError(null);
        console.log(values);

        const { file, title, description, body } = values;
        console.log('file', file);

        const newArticle = {
            title: title,
            description: description,
            body: body,
            author: user.name,
            username: user.username,
            image_url: "",
            profile_image: user.profile_image
        }
    }

    // const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

    const postSchema = Yup.object().shape({
        file: Yup.mixed()
            .test('fileSize', 'File is too large. Max 1 MB', value => value && value.size <= 1000000)
            // .test('fileType', 'Incorrect file type. Acceptable formats are .png, .jpg, .jpeg, and .gif.', value => {
            //     SUPPORTED_FORMATS.includes(value.type);
            // })
            .required('You need to provide an image file.'),
        title: Yup.string()
            .min(4, '* Title is too short. Minimum 4 characters.')
            .max(300, '* Title is too long.')
            .required('* You need to name your article.'),
        description: Yup.string()
            .min(6, '* Your description seems a little short.')
            .max(300, '* Please shorten your description')
            .required('* Description is required.'),
        body: Yup.string()
            .min(12, '* Please include a little more to your story')
            .max(3000, '* Maximum characters is 3000')
            .required('* Your story is required')
    })

    return (
        <section className='section_content form_section' id='post_article_section'>
            <h2 className='section_title'>Write an Article</h2>
            <Formik
                initialValues={{ file: '', title: '', description: '', body: ''}} 
                validationSchema={postSchema}
                onSubmit={handleSubmitPost}
                render={({
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    handleBlur,
                    isValid,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <Form id='form'>
                        <div className='field_wrap post_article__fieldset'>
                            <label htmlFor='file'>Select an image to upload</label>
                            <Field 
                                name='file'
                                component={FileInput}
                                title='Upload'
                                setFieldValue={setFieldValue}
                                handleBlur={handleBlur}
                            />
                            <ErrorMessage component="div" className='error' name='file' />
                        </div>

                        <div className='field_wrap post_article__fieldset'>
                            <label htmlFor='title'>What is the title of your article?</label>
                            <Field 
                                type='text'
                                name='title'
                                aria-label='title'
                                className='title'
                                placeholder='Title'
                            />
                            <ErrorMessage component="div" className='error' name='title' />
                        </div>

                        <div className='field_wrap post_article__fieldset'>
                            <label htmlFor='description'>Write a short description</label>
                            <Field 
                                type='text'
                                name='description'
                                aria-label='description'
                                className='description'
                                placeholder='Describe what your article is about'
                            />
                            <ErrorMessage component="div" className='error' name='description' />
                        </div>

                        <div className='field_wrap post_article__fieldset'>
                            <label htmlFor='body'>Tell your story...</label>
                            <Field
                                as='textarea'
                                rows='20'
                                name="body"
                                aria-label='body'
                                className='body'
                                placeholder='Start here'
                            />
                            <ErrorMessage component="div" className='error' name='body' />
                        </div>

                        <div className='field_wrap .btn_wrap'>
                            <button className='btn-secondary' type='submit'>Submit</button>
                        </div>

                        {error && <div role={'alert'}><h2 className='error'>{error}</h2></div>}
                    </Form>
                )}
            />
        </section>
    )
}