var express = require('express');
var router = express.Router();
const db = require('../models');
const userJwtLogin = require('../middlewares/userjwtlogin');

router.get('/',userJwtLogin, function(req, res, next) {
    db.product.findAll({include:[
        {model:db.product_category}
    ]}).then(products => {
        res.status(200).json({ message:'products details found successfully',success:true,data:{products:products} });
    }).catch(error=>{
        res.status(400).json({ message:'products not found!',success:false });
    });
});

router.get('/:id',userJwtLogin, function(req, res, next) {
    db.product.findByPk(req.params.id).then(product => {
        res.status(200).json({ message:'product details found successfully',success:true,data:{product:product} });
    }).catch(error=>{
        res.status(400).json({ message:'sorry product details is not found!',success:false,data:{} });
    });
});

router.post('/create',userJwtLogin, function(req, res, next) {
    db.product.create({
        name: req.body.name,
        description: req.body.description,
        category_id: req.body.category_id,
        stock: req.body.stock,
        price: req.body.price,
    }).then(product => {
        res.status(200).json({ message:'product details inserted successfully',success:true,data:{product:product.id} });
    }).catch(error => {
        res.status(400).json({ message:'sorry product details is not inserted!',success:false,data:{} });
    })
});

router.put('/update/:id',userJwtLogin, function(req, res, next) {
    db.product.update({
        name: req.body.name,
        description: req.body.description,
        category_id: req.body.category_id,
        stock: req.body.stock,
        price: req.body.price,
    },{
        where:{
            id:req.params.id
        }
    }).then(product => {
        res.status(200).json({ message:'product details updated successfully',success:true,data:{product:product} });
    }).catch(error => {
        res.status(400).json({ message:'sorry product details is not updated!',success:false,data:{} });
    })
});

router.delete('/destroy/:id',userJwtLogin, function(req, res, next) {
    db.product.destroy({
        where:{
            id:req.params.id
        }
    }).then(product => {
        res.status(200).json({ message:'product destroy successfully',success:true,data:{product:product} });
    }).catch(error => {
        res.status(400).json({ message:'sorry product details is not destroy!',success:false,data:{} });
    })
});

module.exports = router;