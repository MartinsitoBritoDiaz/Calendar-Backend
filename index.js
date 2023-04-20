const express = require('express');
require('dotenv').config();

//Express server
const app = express();

//Public Directory
app.use( express.static('public') );

// Reading and Matching the body request
 app.use( express.json() );

//Endpoints
app.use('/api/auth', require('./routes/auth'));
//TODO: user / CRUD


//Listen requests
app.listen( process.env.PORT, () => {
    console.log(`Server running in port ${  process.env.PORT }`);
});
