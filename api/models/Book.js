/**
 * Book.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
  		name: {
            type: 'string',
            required: true
        },
        author: {
        	type: 'string'           
        },

        availability: {
            enum : ['available', 'unavailable']
        },

        transactions: {
            collection: 'Transaction',
            via : 'book'
        },

        user : {
      		model : 'User'
      	},

    },

    add: function(input, cb){
	   	Book.create(input).exec(function(err, book){
			if(!err && book){
				cb(null, book);  
			}else{
				cb(err);
			}
	   	});
    },

    getBook: function(input, cb){
	   	Book.find().populate('user').exec(function(err, book){
			if(!err && book){
				cb(null, book);  
			}else{
				cb(err);
			}
	   	});
    },

    edit: function(input, cb){
	   	Book.update({id:input.id}, {availability: input.availability}).exec(function(err, book){
			if(!err && book && book.length > 0){
				cb(null, book[0]);  
			}else if(!err && book && book.length == 0){
				cb(null, {});  
			}else{
				cb(err);
			}
	   	});
    },

    delete: function(id, cb){
	   	Book.destroy({id:id}).exec(function(err, book){
			if(!err && book){
				cb(null, book);  
			}else{
				cb(err);
			}
	   	});
    },
};

