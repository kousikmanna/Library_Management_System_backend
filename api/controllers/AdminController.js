/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var JWT = require('jsonwebtoken');
module.exports = {
	signup: function(req, res){
 		var input = req.body;
 		if(input.email && input.password){
 			Admin.signup(input, function(err, userCreated){
	 			if(!err && userCreated){
	 				res.json(userCreated);
	 			}else{
	 				res.status(500).json(err);
	 			}
	 		});
 		}else{
 			res.status(500).json({message:"Please fill input field"});
 		}
 	},

 	login: function(req, res){
 		sails.log.debug('login', req.body);
 		var input = req.body;
 		if(input.email && input.password){
 			Admin.login(input, function(err, user){
 				if(!err && user){
 					delete user.password;
 					var token = JWT.sign(user, 'secret');   
                    user.token = token; 
 					res.json(user);
 				}else{
 					res.status(500).json(err);
 				}
 			});
 		}else{
 			res.status(500).json({message: 'Email or Password is missing, Please fill all the fields'});
 		}
 	},

};

