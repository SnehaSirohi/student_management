const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/',(req, res)=>{
    res.render("student/addoredit", {
        viewTitle : "Insert Student Info"
    });
});

router.post('/',(req, res)=>{
    if (req.body._id == '')
        insertrecord(req, res);
        else
        updaterecord(req, res); 
});

function insertrecord(req, res){
    var student = new Student();
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.description = req.body.description;
    student.save((err, doc)=>{
        if(!err){
            res.redirect('student/list');
        }
        else{
            if(err.name == 'Validation'){
                handleValidationError(err, req.body);
                res.render("student/addoredit", {
                    viewTitle : "Insert Student Info",
                    student: req.body
                });
            }
            console.log('Error  during record insertion : ' + err);
        }
    });
}

function updaterecord(res, req){
    Student.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc)=>{
        if(!err){
            res.redirect('student/list');

        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("student/addoredit",{
                    viewTitle: 'Update Student',
                    student: req.body
                })

            }
            else{
                console.log('Error in update record' + err);
            }
        }
    });
}

router.get('/list',(req, res)=>{
    Student.find((err, docs) =>{
        if(!err){
            res.render('student/list',{
                list : docs 
            });
        }
        else{
            console.log('Error in retrieving information' + err);
        }
        
    }).lean();
});

function handleValidationError(err, body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;

            default:
                break;
        }
    }
}

router.get('/:id',(req, res) => {
    Student.findById(req.params.id, (err, doc)=>{
        if(!err) {
            res.render( "student/addoredit", {
                viewTitle: "Update Student",
                student : doc
            })
        }
    }).lean();
});

router.get('/delete/:id',(req, res) => {
    Student.findByIdAndRemove(req.params.id,(err, doc) =>{
        if(!err){
            res.redirect('/student/list');
        }
        else{
            console.log('Error in deleting' + err);
        }
    })
})

module.exports =  router;