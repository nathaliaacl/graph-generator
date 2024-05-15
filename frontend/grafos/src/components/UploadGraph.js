import React, { useState } from 'react';

function UploadGraph() {
    const [file, setFile] = useState(null);

    const onFileChange = event => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/upload_graph', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            alert('Failed to upload the graph');
        }
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>
                Upload Graph
            </button>
        </div>
    );
}

export default UploadGraph;
