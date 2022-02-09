const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/', routesHandler);

const PORT = 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});