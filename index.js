const express = require('express');
const cors = require("cors")
const multer = require('multer');
const Image = require("./db/Image")
const config = require('./db/config')
const app = express();
app.use(express.json())
app.use(cors());
const port = process.env.PORT || 3000;
// Set up Multer for file uploads
const storage = multer.memoryStorage(); // Store the image data in memory
const upload = multer({ storage: storage });



app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const image = new Image({
        name: req.body.name,
        data: req.file.buffer,
        contentType: req.file.mimetype,
    });

    try {
        await image.save();
        res.send('Image uploaded successfully.');
    } catch (error) {
        res.status(500).send('Error uploading image.');
    }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening at http://0.0.0.0:${port}`);
});
