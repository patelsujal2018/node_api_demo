var express = require('express');
var router = express.Router();
const db = require('../models');
const userJwtLogin = require('../middlewares/userjwtlogin');

router.get('/',userJwtLogin, function(req, res, next) {
    db.product_category.findAll().then(categories => {
        res.status(200).json({ message:'categories details found successfully',success:true,data:{categories:categories} });
    }).catch(error=>{
        res.status(400).json({ message:'categories not found!',success:false });
    });
});

router.get('/:id',userJwtLogin, function(req, res, next) {
    db.product_category.findByPk(req.params.id).then(category => {
        res.status(200).json({ message:'category details found successfully',success:true,data:{category:category} });
    }).catch(error=>{
        res.status(400).json({ message:'sorry category details is not found!',success:false,data:{} });
    });
});

router.post('/create',userJwtLogin, function(req, res, next) {
    db.product_category.create({
        name: req.body.name,
        parent: req.body.parent,
    }).then(category => {
        res.status(200).json({ message:'category details inserted successfully',success:true,data:{category:category.id} });
    }).catch(error => {
        res.status(400).json({ message:'sorry category details is not inserted!',success:false,data:{} });
    })
});

router.put('/update/:id',userJwtLogin, function(req, res, next) {
    db.product_category.update({
        name: req.body.name,
        parent: req.body.parent,
    },{
        where:{
            id:req.params.id
        }
    }).then(category => {
        res.status(200).json({ message:'category details updated successfully',success:true,data:{category:category} });
    }).catch(error => {
        res.status(400).json({ message:'sorry category details is not updated!',success:false,data:{} });
    })
});

router.delete('/destroy/:id',userJwtLogin, function(req, res, next) {
    db.product_category.destroy({
        where:{
            id:req.params.id
        }
    }).then(category => {
        res.status(200).json({ message:'category details destroy successfully',success:true,data:{category:category} });
    }).catch(error => {
        res.status(400).json({ message:'sorry category details is not destroy!',success:false,data:{} });
    })
});

module.exports = router;