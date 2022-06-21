const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./db.js');
const app = express();
const routes = require('./routes/routes.js');
 const route  = require('./routes/routes');
app.use(bodyParser.json());
app.use(cors({ origin: 'http//localhost:3000' }));
app.listen(3000, () => console.log('server is succesfully started at port :3000'));
app.use('/employee', routes);

