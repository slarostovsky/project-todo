const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const product = require('./routes/product.route'); 
const mongoose = require('mongoose');

const dev_db_url = 'mongodb://localhost:27017/todo_task_database'; 
const mongoDB = process.env.MONGODB_URI || dev_db_url; 
 mongoose.connect(mongoDB); 

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/todos', product);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
