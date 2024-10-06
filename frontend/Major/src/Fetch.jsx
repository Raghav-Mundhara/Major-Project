import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [images, setImages] = useState([]);

    // Function to fetch images
    const fetchImages = async () => {
        try {
            // Make a request to your backend API endpoint
            const response = await axios.get('http://localhost:3000/images'); // Update this endpoint accordingly
            setImages(response.data); // Assuming response.data contains the image URLs
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
                        <img style={{width:'500px' ,height:'auto'}} src={image} alt={`Uploaded ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
