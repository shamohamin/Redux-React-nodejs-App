var mongoose = require('mongoose');
var Schema = mongoose.Schema ;

var userSchema = new Schema({
    
    first_name : {
        type : String ,
        require : true
    },
    last_name : {
        type : String 
    },
    age : {
        type : Number
    },
    gender : {
        type : String 
    },
    phone_number : {
        type : Number
    }

})

userSchema.methods.getInfo = function(){

    console.log("fist_name:" + this.first_name + " this_last:" + this.last_name);
    console.log("age:" + this.age+" gender : " + this.gender  );
    console.log(" phone_number : " + this.phone_number); 

}

var UserModel = mongoose.model('UserModel',userSchema);

module.exports = {UserModel};