/**
 * Transaction.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

     

        transactionType: {
            enum : ['borrow', 'return']
        },
        
        dueDate: {
            type: 'string'
        },

        user : {
      		model : 'User'
      	},

      	book: {
          model: 'Book'
        },
    },

    assignBook: function(book, user, transactionType, dueDate, cb){

    	if(transactionType == 'return'){
    		updateTransaction(book.id, user.id, {transactionType: transactionType}, function(err, updated){
    			if(!err && updated){
    				Book.update({id: book.id},{availability: book.availability, user: user.id, transactionType: transactionType}).exec(function(err, bookUpdated){
		    			if(!err && bookUpdated){
		    				cb(null, updated);
		    			}else{
		    				cb(err);
		    			}
		    		});
    			}else{
    				cb(err);
    			}
    		})
    	}else{
    		User.findOne({email: user.email}).exec(function(err, foundUser){
	    		if(!err && foundUser){
	    			createTransaction({user: foundUser.id, book: book.id, dueDate: dueDate, transactionType: transactionType}, function(err, created){
	    				if(!err && created){
	    					Book.update({id: book.id},{availability: book.availability, user: foundUser.id, transactionType: transactionType}).exec(function(err, bookUpdated){
				    			if(!err && bookUpdated){
				    				cb(null, created);
				    			}else{
				    				cb(err);
				    			}
				    		});
	    					
	    				}else{
	    					cb(err);
	    				}
	    			});
	    		}else if(!err && !foundUser){
	    			User.createUser(user, function(err, created){
	    				if(!err && created){
	    					createTransaction({user: created.id, book: book.id, dueDate: dueDate, transactionType: transactionType}, function(err, created){
			    				if(!err && created){
			    					Book.update({id: book.id},{availability: book.availability, user: created.id, transactionType: transactionType}).exec(function(err, bookUpdated){
						    			if(!err && bookUpdated){
						    				cb(null, created);
						    			}else{
						    				cb(err);
						    			}
						    		});
			    					
			    				}else{
			    					cb(err);
			    				}
			    			});
	    				}else{
	    					cb(err)
	    				}
	    			});
	    		}else{
	    			cb(err)
	    		}
	    	})
    	}
    }
};

function updateTransaction(bookId, userId, input, cb){
	Transaction.update({book: bookId, user: userId}, input).exec(function(err, updated){
		if(!err && updated){
			cb(null, updated[0]);
		}else{
			cb(err)
		}
	});
}

function createTransaction(input, cb){
	Transaction.create(input).exec(function(err, created){
		if(!err && created){
			cb(null, created);
		}else{
			cb(err)
		}
	});
}

