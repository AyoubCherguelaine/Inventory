var DB= require('./Database');


function CheckLogin(body,callback){

    let q = 'select UserId as id from user where username="' + body.username + '" and password="' + body.password + '" ';

    DB.connection.query(q,function(err,result){

        if(err) throw err;
        if(result.length>0){
            callback(result[0].id);
        }else{
            callback(null);
        }

    });

}   

function AddUser(body,callback){

    let q= "insert into user(username, email, password) values('"+body.username+"','"+body.email+"','"+body.password+"');";

    DB.connection.query(q, function(err,result){

        if(err)throw err;
        else{
            CheckLogin(body,callback);
        }

    })


}


//test module function

//                ---checked---

//var body = {username:'Ayoub',password:'12345678',email:'cherguelainea@gmail.com'};

//Add user test check
// AddUser(body,(result)=>{
//     console.log('id of  user :' + result);
// })

// login test  

//                ---checked---

// CheckLogin(body,(result)=>{

//     console.log('id of user :' + result);
// })



// sign up   


function CheckSignUp(body,callback) {

    let q = "select UserId from User where email='" + body.email+"' or username= '" + body.username+"' ";

    DB.connection.query(q,(err , result)=>{

        if(err) throw err;
        if(result.length>0){
            // deja installer

            console.log("deja vu !!");
            callback("undefined")
        }else{
            //nice to meet u 
            // add

            console.log("welcome");
            AddUser(body,callback);
            // return id 

        }

    })

}

// sign up check test  

//                ---checked---
// var body = {username:'billel',password:'12345678',email:'TemmarBillel@gmail.com'};

// CheckSignUp(body,(result)=>{

//     console.log("id : " + result);
// })



module.exports = {CheckLogin,AddUser,CheckSignUp};