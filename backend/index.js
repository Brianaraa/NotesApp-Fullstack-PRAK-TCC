const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const noteRouter = require('./router'); // Mengambil route dari router.js

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Mengizinkan Frontend mengakses API
app.use(bodyParser.json()); // Memproses data JSON yang dikirim Frontend

// Mengarahkan request /notes ke router.js
app.use('/notes', noteRouter);

app.get('/', (req, res) => {
    res.send('API Notes App Berjalan Lancar! Gunakan /notes untuk melihat data.');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});