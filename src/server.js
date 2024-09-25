const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle code compilation
app.post('/compile', (req, res) => {
  const { code } = req.body;

  // Save the code to a temporary file
  const tempFilePath = path.join(__dirname, 'temp.ino');
  fs.writeFileSync(tempFilePath, code);

  // Compile the code using Arduino CLI
  exec(`arduino-cli compile --fqbn arduino:avr:uno ${tempFilePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compiling code: ${error}`);
      return res.status(500).json({ success: false, message: stderr });
    }
    res.json({ success: true, message: stdout });
  });
});

// Endpoint to handle code upload to Arduino
app.post('/upload', (req, res) => {
  const { port } = req.body;

  // Upload the compiled code to the Arduino board
  exec(`arduino-cli upload -p ${port} --fqbn arduino:avr:uno ${path.join(__dirname, 'temp.ino')}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error uploading code: ${error}`);
      return res.status(500).json({ success: false, message: stderr });
    }
    res.json({ success: true, message: stdout });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
