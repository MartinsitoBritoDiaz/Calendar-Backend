const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Express server
const app = express();

//Database 
dbConnection(); 

//CORS
app.use(cors());

//Public Directory
app.use( express.static('public') );

// Reading and Matching the body request
 app.use( express.json() );

//Endpoints
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/event'));


//Listen requests
const PORT = process.env.PORT || 3000 
app.listen( PORT , () => {
    console.log(`Server running in port ${  process.env.PORT }`);
});
