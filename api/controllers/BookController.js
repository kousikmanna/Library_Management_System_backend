/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addBook: function(req, res){
 		var input = req.body;
		Book.add(input, function(err, book){
			if(!err && book){
				res.json(book);
			}else{
				res.status(500).json(err);
			}
 		});
 		
 	},

 	getBook: function(req, res){
 		Book.getBook(req, function(err, book){
 			if(!err && book){
 			   res.json(book);
 			}else{
 				res.status(500).json(err);
 			}
 		});
 	},

 	updateBook: function(req, res){
 		var input = req.body;;
 		Book.edit(input, function(err, book){
 			if(!err && book){
 			   res.json(book);
 			}else{
 				res.status(500).json(err);
 			}
 		});
 	},

 	delete: function(req, res){
 		var id = req.body.id;
 		Book.delete(id, function(err, book){
 			if(!err && book){
 			    res.json(book);
 			}else{
 				res.status(500).json(err);
 			}
 		});
 	},

 	assignBook: function(req, res){
 		var book = req.body.book;
 		var transactionType = req.body.type;
 		var user = req.body.user;
 		var dueDate = req.body.dueDate;
 		Transaction.assignBook(book, user, transactionType, dueDate, function(err, assigned){
 			if(!err && assigned){
 			    res.json(assigned);
 			}else{
 				res.status(500).json(err);
 			}
 		});
 	}
};

