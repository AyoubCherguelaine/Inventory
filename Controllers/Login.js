const express = require('express');
var router = express.Router();
var model = require('../Models/Login');


var chemin = "LoginPhase/";

const LoginGetPage = (req, res, next) => {

    if(!req.session.access)
    res.render(chemin+'Login',{ErrorMessage:""});
  else{
      res.redirect('/Dashboard');
  }

};

const LoginPost = (req, res) => {

    let log = req.body;

    if(! req.session.access){

        model.CheckLogin(log,(result)=>{
            if(result != null){
            req.session.email= log.email;
            req.session.id= result;
            req.session.username= log.username;
            req.session.access= 1;
            res.redirect('/Dashboard');
        }else{
            res.render(chemin+'Login',{ErrorMessage:"Akteb Bien kho !"});
        }
        });

       
    }

};


const SignUpGetPage = (req, res) =>{

    res.render(chemin+'SignUp',{ErrorMessage:""});

}


const SignUpPost = (req, res) =>{

    let sign= req.body;

    model.CheckSignUp(sign,(result)=>{
        req.session.email= sign.email;
        req.session.id= result;
        req.session.username= sign.username;
        req.session.access= 1;
        res.redirect('/Dashboard');
    })

}


module.exports = { LoginGetPage , LoginPost , SignUpGetPage , SignUpPost};