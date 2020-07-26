const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const moongose = require('mongoose');
const app = express();

//Connect to DB 
const db = require('./config/keys').MongoUri;

//Connect to Mongo
moongose.connect(db, { useNewUrlParser: true })
.then(() => console.log('Connected to DB'))
.catch(err => console.log(err));

//expressLayouts
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({
    extended: false
}));


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3006;

app.listen(PORT, console.log(`Server start ${PORT}`)); 