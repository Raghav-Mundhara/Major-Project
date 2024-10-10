import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [images, setImages] = useState([]);

    // Function to fetch images and descriptions
    const fetchImages = async () => {
        try {
            // Make a request to your backend API endpoint
            const response = await axios.get('http://localhost:3000/images2'); // Ensure this endpoint returns both URLs and descriptions
            setImages(response.data); // Assuming response.data contains an array of objects with 'url' and 'description'
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchImages(); // Call the function on component mount
    }, []);

    return (
        <div className="App">
            <h1>Uploaded Images</h1>
            <div className="image-gallery">
                {images.map((image, index) => (
                    <div key={index} className="image-item">
                        <img style={{ width: '500px', height: 'auto' }} src={image.url} alt={`Uploaded ${index}`} />
                        <p>{image.description || 'No description provided'}</p> {/* Display description */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
