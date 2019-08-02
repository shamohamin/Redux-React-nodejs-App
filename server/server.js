var express = require('express') ;
var cors = require('cors') ;
var mongoose = require('mongoose') ;
var bodyParser = require('body-parser') ;
var app = express() ;
app.use(cors()) ;
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({ extended : false })) ;
const router = express.Router() ;
app.use('/user',router) ;
var UserModel = require('./userSchema') ;
UserModel = UserModel.UserModel ;

router.route('/').get(function(req,res){
    
    UserModel.find(function(err,data){
        if(err){
            console.log("error" + err) ;
            res.status(500).json({'todo' : 'todo not found'}) ;
        } else {
            res.status(200).json(data) ;
        }
    })

})

router.route('/add').post(function(req,res){

    var user = new UserModel({
        
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        age : req.body.age,
        gender : req.body.gender,
        phone_number : req.body.phone_number

    })

    user.save()
    .then(data => {
        user.getInfo();
        res.status(200).json({'data':'saved'})
    })
    .catch(err => {
        res.status(400).json({'err' : err });
    })

})

router.route('/delete/:id').get(function(req,res){

    let id = req.params.id ;

    UserModel.findByIdAndRemove(id,function(err,data){
        if(err)
            res.status(404).json({'data':'not found'})
        else{
            res.status(200).json({'data':'removed successfully'})
        }    
    })

})

router.route('/update/:id').post(function(req,res){

    let id = req.params.id ;

    UserModel.findById(id,function(err,data){

        if(err){
            
            res.status(404).json({'data' : 'not found'})

        }else{
            
            data.first_name = req.body.first_name
            data.last_name = req.body.last_name
            data.age = req.body.age
            data.gender = req.body.gender
            data.phone_number = req.body.phone_number
            
            data.save((err,data) => {
                if(err){
                    res.status(400).json({'data' :'saved faild'}) ;
                }else{
                    console.log("data is :" + data) ;
                    res.status(200).json({'data':'updated'}) ;
                }

            })
        }

    })

})



mongoose.connect('mongodb://127.0.0.1:27017/user',{
    useNewUrlParser : true
})

var connection = mongoose.connection ; 

connection.once('open',function(){
    console.log("connection is established")
})

var server = app.listen(4001,function(){
    var host = server.address().address ; 
    var port = server.address().port ; 
    console.log("http ://localHost/%s/%s",host,port);
})