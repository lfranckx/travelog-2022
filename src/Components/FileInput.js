import React, { useContext, useState } from 'react';

export default function FileInput(props) {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onloadend = () => setFileName(file.name);
            reader.readAsDataURL(file);
            props.setFieldValue(props.field.name, file);
        }
    }

    console.log(props);

    return (
        <>
            <input
                id='file'
                name={props.field.name}
                type='file'
                accept=".png, .jpg, .jpeg, .gif"
                aria-label='file'
                onChange={handleFileChange}
            />
            {fileName ? <div className='file_name'>{fileName}</div> : null}
        </>
        
    )
}