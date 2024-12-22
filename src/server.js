// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(express.json());

// โหลดข้อมูลจากไฟล์ JSON
app.get('/data', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      res.json(JSON.parse(data)); // ส่งข้อมูลกลับไปยัง frontend
    }
  });
});

// บันทึกข้อมูลลงในไฟล์ JSON
app.post('/data', (req, res) => {
  const newData = req.body;

  // เขียนข้อมูลลงไฟล์
  fs.writeFile('data.json', JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      res.status(500).send('Error writing file');
    } else {
      res.status(200).send('Data saved successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
