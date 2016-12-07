/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
  	   email: {
            type: 'email',
            required: true
        },
        username: {
        	type: 'string',
            required: true
        },

        name: {
            type: 'string',
            required: true
        },

        password: {
            type: 'string',
            required: true
        },

        mobile: {
            type: 'integer',
            required: true,
            minLength: 10,
            maxLength: 10
        }
    },

    signup: function(input, cb){
        Admin.findOne({email: input.email}).exec(function(err, userFound){
            if(!err && !userFound){
                saltAndHash(input.password, function(hash){
                    input.password = hash;
                    Admin.create(input).exec(function(err, userCreated){
                        if(!err && userCreated){
                            cb(null, userCreated);
                        }else{
                            cb(err);
                        }
                    });
                });
            }else if(!err && userFound){
               cb({message: "User already exist"});
            }else{
                cb(err);
            }
        });
    },

    login: function(input, cb){
	   	Admin.findOne({email: input.email}).exec(function(err, user){
			if(!err && user){
				validatePassword(input.password, user.password, function(res){
				    if(res){
				        cb(null, user);  
				    }else {
				        cb({message:"Oops! Either email id or password seems incorrect."})
				    }
				});
			}else if(!err && !user){
			    cb({message: 'Please enter correct email'});
			}else{
				cb(err);
			}
	   	});
    }
};

// crypto and hashKey
var crypto = require('crypto');

var generateSalt = function(){
       var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
       var salt = '';
       for (var i = 0; i < 10; i++) {
               var p = Math.floor(Math.random() * set.length);
               salt += set[p];
       }
       return salt;
}

var md5 = function(str) {
       return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback){
       var salt = generateSalt();
       callback(salt + md5(pass + salt));
}

var encryptedPassword = function(password){
       var salt = generateSalt();
       var encrypted_password = salt + md5(password + salt);
       return encrypted_password;
}

var validatePassword = function(plainPass, hashedPass, callback){
	if(plainPass && hashedPass){
		var salt = hashedPass.substr(0, 10);
        var validHash = salt + md5(plainPass + salt);
        callback(hashedPass === validHash);
	}else{
		callback (false);
	}
}

