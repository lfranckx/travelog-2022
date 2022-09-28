import React from 'react';

export default function FileInput(props) {

    const handleFileChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.readAsDataURL(file);
            props.setFieldValue('image', file);
        }
    }

    return (
        <>
            <input
                id='file'
                name={props.field.name}
                type='file'
                accept="image/*"
                aria-label='image'
                onChange={handleFileChange}
            />
        </>
        
    )
}