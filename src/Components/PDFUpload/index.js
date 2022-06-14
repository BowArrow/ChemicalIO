import React, { useMemo, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './style.css';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '100px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    backgroundColor: '#fafafa',
    color: '#397da2',
    outline: 'none',
    transition: 'backgroundColor .24s ease-in-out',
    textAlign: 'center'
};

const focusedStyle = {
    backgroundColor: '#6fb5ee'
};

const acceptStyle = {
    backgroundColor: '#c6ffe4'
};

const rejectStyle = {
    backgroundColor: '#ffa8ba'
}

function PDFUpload(props) {
    const [selectedFile, setSelectedFile] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
            setSelectedFile(acceptedFiles[0])
    }, [])

    const onClickHandler = () => {
        const data = new FormData();
        data.append('file', selectedFile)
        try {
            let result = axios.post('http://localhost:5000/pdfupload', data, {

            })
            .then(res => {
                console.log(result);
            })
        } catch (err) {
            console.error(err.response.data)
        }
        
    }

    const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({ accept: { 'application/pdf': ['.pdf'] }, onDrop });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <div>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop PDF files here, or click to select files</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
            <div className='text-center'>
                <button type='button' className='button-main' onClick={onClickHandler}>Upload</button>
            </div>
        </div>
    )

}

export default PDFUpload;