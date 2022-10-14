const express = require('express');

var router = express.Router();

router.get('/',(req, res)=>{
    res.render("student/addoredit", {
        viewTitle : "Insert Student Info"
    });
});

router.post('/',(req, res)=>{
    

});


module.exports =  router;