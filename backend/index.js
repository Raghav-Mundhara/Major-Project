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
app.options('/upload1', cors());
app.options('/images', cors());
app.options('/images2', cors());
app.options('/clear-images', cors());

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

app.post('/upload1', async (req, res) => {
    try {
        const { data: fileStr, description } = req.body; // Get image data and text data
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            context: `caption=${description}`, // Store the text data in context
        });

        console.log(uploadedResponse);
        res.json({
            msg: 'Image uploaded successfully',
            url: uploadedResponse.secure_url,
            description: description
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong', error: error.message });
    }
});

app.get('/images2', async (req, res) => {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            max_results: 30
        });

        // Map through the resources and retrieve both URL and context (text data)
        const imagesWithText = result.resources.map(resource => ({
            url: resource.secure_url,
            description: resource.context?.custom?.caption || 'No description'
        }));

        res.json(imagesWithText); // Send back the image URLs and descriptions
    } catch (error) {
        console.error('Error fetching images from Cloudinary:', error);
        res.status(500).json({ msg: 'Error fetching images' });
    }
});

app.delete('/clear-images', async (req, res) => {
    try {
        // Delete all images in Cloudinary
        const result = await cloudinary.api.delete_all_resources({
            resource_type: 'image', // Specify resource type
        });

        console.log('Deleted resources:', result);
        res.json({ msg: 'All images deleted successfully', result });
    } catch (error) {
        console.error('Error deleting images:', error);
        res.status(500).json({ msg: 'Error deleting images', error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
