import React, { useContext, useState } from 'react';
import { ArticleContext } from '../ArticleContext';

export default function FileInput(props) {
    const { setFile, file } = useContext(ArticleContext);
    
    const handleFileChange = (e) => {
        e.preventDefault();
        // let reader = new FileReader();
        let fileUpload = e.target.files[0];
        if (fileUpload) {
            // reader.onloadend = () => setFile(fileUpload.name);
            // reader.readAsDataURL(fileUpload);
            setFile(fileUpload);
        }
    }

    console.log(file);
    
    return (
        <>
            <input 
                name='file'
                // onChange={handleFileChange}
                type="file" 
                accept=".png, .jpg, .jpeg, .gif"
                aria-label='file'
                className='file'
                id='file' 
            />
        </>
    )
    
}