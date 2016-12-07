/**
 * User.js
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
        },

        name: {
            type: 'string',
        },

        mobile: {
            type: 'integer',
            minLength: 10,
            maxLength: 10
        },

        transactions: {
            collection: 'Transaction',
            via : 'user'
        },

        books: {
            collection: 'Book',
            via : 'user'
        },
   },

   createUser: function(input, cb){
   		User.create(input).exec(function(err, user){
   			if(!err && user){
   				cb(user);
   			}else{
   				cb(err);
   			}
   		});
   }
};

