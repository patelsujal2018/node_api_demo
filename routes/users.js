var express = require('express');
var router = express.Router();
const db = require('../models');
const userJwtLogin = require('../middlewares/userjwtlogin');

router.get('/',userJwtLogin, function(req, res, next) {
    db.user.findAll().then(users => {
        //res.status(200).json({ message:'user details found successfully',data:users });
        res.status(200).json({ message:'user details found successfully',success:true,data:{users:users} });
    }).catch(error=>{
        //res.status(400).json({ message:'sorry user details is not found!' });
        res.status(400).json({ message:'user credentials is wrong!',success:false });
    });
});

router.get('/:id',userJwtLogin, function(req, res, next) {
    db.user.findByPk(req.params.id).then(user => {
        res.status(200).json({ message:'user details found successfully',data:user });
    }).catch(error=>{
        res.status(400).json({ message:'sorry user details is not found!' });
    });
});

router.post('/search',userJwtLogin, function(req, res, next) {
    db.user.findOne({
        where:{
            email:req.body.email
        }
    }).then(user => {
        res.status(200).json({ message:'user details found successfully',data:user });
    }).catch(error=>{
        res.status(400).json({ message:'sorry user details is not found!' });
    });
});

router.post('/create',userJwtLogin, function(req, res, next) {
    db.user.create({
        email: req.body.email
    }).then(user => {
        res.status(200).json({ message:'user details inserted successfully',data:user.id });
    }).catch(error => {
        res.status(400).json({ message:'sorry user details is not inserted!' });
    })
});

router.put('/update/:id',userJwtLogin, function(req, res, next) {
    db.user.update({
        email: req.body.email
    },{
        where:{
            id:req.params.id
        }
    }).then(user => {
        res.status(200).json({ message:'user details updated successfully',data:user.id });
    }).catch(error => {
        res.status(400).json({ message:'sorry user details is not updated!' });
    })
});

router.delete('/destroy/:id',userJwtLogin, function(req, res, next) {
    db.user.destroy({
        where:{
            id:req.params.id
        }
    }).then(user => {
        res.status(200).json({ message:'user details destroy successfully' });
    }).catch(error => {
        res.status(400).json({ message:'sorry user details is not destroy!' });
    })
});

module.exports = router;
