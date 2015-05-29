
/*
 * GET home page.
 */
	var sess;
exports.index = function(req, res){
	  res.render('index', { title: "World's Largest Professional Network | LinkedIn" });
	  
	  
	
	};
 

//var ejs = require('ejs');
//exports.index = function signup(req, res){
////  res.render('index', { title: "World's Largest Professional Network | LinkedIn" });
//res.render('index', { title: "World's Largest Professional Network | LinkedIn" });
//  ejs.renderFile('./views/content.ejs', function(err,result){
//	   if(!err){
//		 res.end(result);   
//	   }
//	   else{
//		 res.end('Error Occurred');
//		 console.log(err);
//	   }
//	   
//	   
//	 }
//	);
//
//};



	