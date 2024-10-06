import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' }));

// Handle preflight requests (OPTIONS)
app.options('/upload', cors());

app.post('/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr);
        console.log(uploadedResponse);
        res.json({ msg: 'Image uploaded successfully', url: uploadedResponse.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong', error: error.message });
    }
});
// Assuming you have already set up express and other necessary configurations

app.get('/images', async (req, res) => {
    try {
        // Fetch the list of resources from Cloudinary
        const result = await cloudinary.api.resources({
            type: 'upload', // Specify the type of resources you want to retrieve
            max_results: 30 // Specify how many results to retrieve
        });

        // Extract the secure URLs of the images
        const imageUrls = result.resources.map(resource => resource.secure_url);
        res.json(imageUrls); // Send the image URLs back to the frontend
    } catch (error) {
        console.error('Error fetching images from Cloudinary:', error);
        res.status(500).json({ msg: 'Error fetching images' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
