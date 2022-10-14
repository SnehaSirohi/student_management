const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://stud:stud123@cluster0.x7e4ege.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true},
(err)=>{
    if(!err){
        console.log('MongoDB Connection Succeeded')
    }
    else{
        console.log('Error in DB connection: '+ err)
    }
}

);

require('./studentmodel');