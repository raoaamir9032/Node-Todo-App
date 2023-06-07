const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const  requireAuth = require('./Middelwares/userAuth');

require('dotenv').config();

// Initializing express app
const app = express();


app.use(express.json());
app.use(cors());

app.use('/api/user',userRoutes);
app.use('/api/events',requireAuth,eventRoutes);

// Avoiding the strict query warning
mongoose.set('strictQuery', true);


// Connections
const port = process.env.PORT;
const url = process.env.DB_URL;

// Connecting to DB and starting server
mongoose.connect(url).then(
    app.listen(port, () => {
        console.log(`Server started at port: ${port}`);
        console.log("Successfully Connected to Database");
    })
).catch((error)=> console.log(error));


