var express = require('express') ;
var cors = require('cors') ;
var mongoose = require('mongoose') ;
var bodyParser = require('body-parser') ;
//var mongoosePaginate = require('mongoose-paginate') ;
var app = express() ;
app.use(cors()) ;
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({ extended : false })) ;
const router = express.Router() ;
app.use('/user',router) ;
var userModel = require('./userSchema') ;
const UserModel = userModel.UserModel ;

router.route('/').get(function(req,res){
    let page = req.query.page ;

    const myCustomLabels = {
        totalDocs: 'itemCount',
        docs: 'itemsList',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pageCount',
        pagingCounter: 'slNo',
        meta: 'paginator'
    };

    const option = { 
        page : parseInt(page) ,
        limit : 1 ,
        customLabel : myCustomLabels
    }

    UserModel.paginate({},option,function(err,result){
        if(err){
            console.log(err)
            res.status(500).json({'err':err})
        }else{
            console.log(result)
            res.status(200).json({'data':result});
        }
    })
})

// router.route('/').get(function(req,res){
    
//     UserModel.find(function(err,data){
//         if(err){
//             console.log("error" + err) ;
//             res.status(500).json({'todo' : 'todo not found'}) ;
//         } else {
//             console.log(data);
//             res.status(200).json(data) ;
//         }
//     })

// })

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
        console.log(err);
        res.status(400).json({'err' : err });
    })

})

router.route('/delete/:id').delete(function(req,res){
    console.log('delete req');
    let id = req.params.id ;

    UserModel.findByIdAndDelete(id,function(err,data){
        if(err){
            res.status(404).json({'todo':'not found'})
        }else{
            res.status(200).json({'data':'removed successfully'})   
        }
    })

})


router.route('/:page/:per_page').get(function(req,res){

    let page_num = parseInt(req.params.page);
    let size = parseInt(req.params.per_page) ; 

    let query = {} ;

    query.skip = size * (page_num-1) ;
    query.limit = size ;

    UserModel.find({},null,query,function(err,data){

        if(err){
            console.log('err is : ' + err);
            res.status(400).json({'request' : 'bad request'})
        }
        else{
            res.status(200).json({'requested data' : data })
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



mongoose.connect('mongodb://127.0.0.1:27017/users',{
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