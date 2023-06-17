
const mime = require('mime');

const qr = require('qrcode');
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (mime.getType(filePath) === 'text/css') {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Set the views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Render the index page
app.get('/', (req, res) => {
  res.render('index');
});

// Generate QR code and serve it as an image
// Generate QR code and serve it as an image
// Generate QR code and serve it as an image
// Generate QR code and serve it as an image
app.post('/generate', (req, res) => {
  const text = req.body.text;
  const filename = req.body.filename;

  qr.toFile(filename, text, {
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  }, (error) => {
    if (error) {
      console.error('Error generating QR code:', error);
      res.send('Error generating QR code');
    } else {
      console.log(`QR code generated and saved as ${filename}`);
      res.sendFile(filename, { root: __dirname });
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
