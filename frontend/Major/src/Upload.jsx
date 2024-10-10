import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState(''); // State to manage the description
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // For showing preview of the image
  };

  const handleTextChange = (e) => {
    setDescription(e.target.value); // Update the description state
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image to upload');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile); // Convert the file to base64 string
    reader.onloadend = async () => {
      const base64String = reader.result;

      try {
        const response = await axios.post('http://localhost:3000/upload1', {
          data: base64String,
          description: description // Send description along with the image data
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true // Necessary to send credentials such as cookies
        });

        setUploadStatus(response.data.msg);
        console.log('Uploaded:', response.data);
      } catch (error) {
        console.error('There was an error uploading the image!', error);
        setUploadStatus('Error uploading image');
      }
    };
  };

  return (
    <div className="App">
      <h2>Upload an Image</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div>
          <h3>Image Preview:</h3>
          <img src={preview} alt="Selected" style={{ width: '300px', height: 'auto' }} />
        </div>
      )}

      <div>
        <label htmlFor="description">Enter a description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleTextChange}
          placeholder="Add a description"
        />
      </div>

      <button onClick={handleUpload}>Upload Image</button>

      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default Upload;
