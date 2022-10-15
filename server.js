require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const studentcontroller = require('./controllers/studentcontroller');

var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.use('/student', studentcontroller);

app.listen(3000, ()=> {
    console.log('Express server started at port : 3000');
});