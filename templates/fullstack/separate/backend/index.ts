const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Hello from Separated Express Backend'));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
