var express = require('express');
var router = express.Router();
const { check , validationResult } = require('express-validator');
const db = require('../models');
const custom = require('../utilities/custom');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var jwtKey = process.env.JWT_SECRET;
var expiresTime = "1d";

router.post('/login',[
    check('email').not().isEmpty().withMessage('email is required')
    .isEmail().withMessage('email is not valid'),
    check('password').not().isEmpty().withMessage('password is required')
    .isLength({ min:8 }).withMessage('password must be 8 characters long'),
],function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        var validatorErrorsArr = errors.array();
        res.status(200).json({ message:custom.formatValidationErrors(validatorErrorsArr),success:false });
    } else{
        db.user.findOne({
            where:{
                email:req.body.email
            }
        }).then(user => {
            var result = bcrypt.compareSync(req.body.password, user.password);
            if(result){
                jwt.sign({
                    firstname:user.firstname,
                    lastname:user.lastname,
                    email:user.email,
                },jwtKey,{expiresIn:expiresTime},(err,token)=>{
                    res.status(200).json({ message:'user login successfully',success:true,data:{token:token} });
                })
            } else {
                res.status(400).json({ message:'user credentials is wrong!',success:false });
            }
        }).catch(error=>{
            res.status(400).json({ message:'sorry user details is not found!',success:false });
        });
    }    
});

router.post('/register',[
    check('firstname').not().isEmpty().withMessage('firstname is required'),
    check('lastname').not().isEmpty().withMessage('lastname is required'),
    check('email').not().isEmpty().withMessage('email is required')
    .isEmail().withMessage('email is not valid')
    .custom(value => {
        if(value){
            return db.user.findOne({
                where:{
                    email:value
                }
            }).then(user => {
                if(user){
                    return Promise.reject('email already registered!')
                }
                return true;
            })
        }
    }),
    check('password').not().isEmpty().withMessage('password is required')
    .isLength({ min:8 }).withMessage('password must be 8 characters long')
    .custom((value, { req }) => {
        if(value !== req.body.confirm_password){
            throw new Error('confirmation password is incorrect')
        } else {
            return value;
        }
    }),
    check('confirm_password').not().isEmpty().withMessage('confirmation is required')
],function(req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        var validatorErrorsArr = errors.array();
        res.status(200).json({ message:custom.formatValidationErrors(validatorErrorsArr),success:false });
    } else{
        db.user.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, saltRounds)
        }).then(user => {
            jwt.sign({
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
            },jwtKey,{expiresIn:expiresTime},(err,token)=>{
                res.status(200).json({ message:'user register successfully',success:true,data:{token:token} });
            })
        }).catch(err => {
            res.status(400).json({ message:err,success:false });
        })
    }    
});

module.exports = router;
