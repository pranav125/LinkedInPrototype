var ejs = require('ejs');
var mysql = require('./mysql');
var session = require('express-session');

function afterSignup(req, res) {
    
	var newconnection = mysql.getConnection();
	var input = JSON.parse(JSON.stringify(req.body));
	var currentdate = new Date();
	var data = {
		"firstname" : input.firstName,
		"lastname" : input.lastName,
		"email" : input.email,
		"password" : input.password,
		"lastLogin" : currentdate
	};
	var query = newconnection.query('Insert INTO user_details SET ?', data,
			function(err, result) {
				newconnection.query("Insert INTO user_profile(user_id) Select uid from user_details where email='"+ data.email + "'");
				
				var getUser = "select  * from user_details where email = '"+ data.email + "'";

				console.log(getUser);
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						console.log(results);
						var firstname = req.body.firstName;
						var lastname = req.body.lastName;
						var password = req.body.password;
						console.log("Pasword length:" + password.length);
						var email = req.body.email;
					}
					if (results.length > 0) {
						
					    req.session.email = results[0].email;
						console.log(req.session.email);
						console.log("valid Login");
						ejs.renderFile('./views/afterSignin.ejs', {
							results : results
						}, function(err, result) {
							// render on success
							if (!err) {
								res.end(result);
							}
							// render or error
							else {
								
								console.log(err);
								res.end('An error occurred');
							}
						});
					}
				}, getUser);
			});

}

function afterSignin(req, res) {
	
     //var sess;
          

	var newconnection = mysql.getConnection();
	var input = JSON.parse(JSON.stringify(req.body));
	var currentdate = new Date();
	console.log(input);
	console.log (input.email);
	console.log (input.password);
	var data = {
		"email" : input.email,
		"password" : input.password,
	};
				
//				var getUser = newconnection.query("select * from user_details where email ='" + input.email + "' AND password = '" + input.password + "'\"");
                  var getUser = "select * from user_details where email = '"+ input.email + "'" +" and password = '" + input.password +"'" ;
//			
//		console.log(req);
				
				mysql.fetchData(function(err, results) {

					if (err) {
						throw err;
					} else {
						var firstname = req.body.firstName;
						var lastname = req.body.lastName;
						var password = req.body.password;
						//console.log("Pasword length:" + password.length);
						var email = req.body.email;
					}
					
					
					if (results.length > 0) {
					    req.session.email = results[0].email;
					   console.log(req.session.email);
						console.log("valid Login");
						
						//res.render('user', { title: "World's Largest Professional Network | LinkedIn" , summary:summary,education:education,skills:skills,experience:experience});
					
		    		
						//ejs.renderFile('./views/afterSignin.ejs', 
						res.render('afterSignin.ejs' ,	{
							
							results : results
						}, function(err, result) {
							// render on success
							if (!err) {
								res.end(result);
							}
							// render or error
							else {
								console.log(err);
								res.end('An error occurred');
							}
						});
					}
				}, getUser);

}

function logout(req,res){
	
   var newconnection = mysql.getConnection();
     //res.send('Your Awesome.');
     var currentDate= new Date();
     console.log(currentDate);
	 
     newconnection.query("update user_details set ? where email='"+req.session.email+"'", {"lastLogin" : currentDate});
	 
	 var getUser1="select  * from user_details";
		
	 mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0){
					req.session.destroy();
					//console.log("valid Login");
				ejs.renderFile('./views/index.ejs',{results:results, title:"World's Largest Professional Network | LinkedIn"},function(err, result) {
				        // render on success
				        if (!err) {
				        	
				            res.end(result);
				        }
				        // render or error
				        else {
				            res.end('An error occurred');
				            console.log(err);
				        }
				    });
				}
		     }
				        },getUser1);
		
//		req.session.destroy(function(err){
//       if(err){
//               console.log(err);
//              }
//       else
//       {
//    	   res.render('index', { title: "World's Largest Professional Network | LinkedIn"});
//    	   req.session.reset();
//       }
//      });


}

function editProfile(req,res){
	
		if(req.session.email){
        	 console.log(req.session.email);
        var getUser2 = "select * from user_details WHERE email='"+req.session.email+"'" ;
        
     
     mysql.fetchData(function(err,results){
    	
        if(err){
    	  throw err;	
    	  }
    	
    	else{
    		if(results.length > 0){
    			console.log(results);
    		  	ejs.renderFile('./views/editProfile.ejs',{results:results, title:"World's Largest Professional Network | LinkedIn"},function(err,result){
    		  	   
    		  	if(!err){
    		  		  res.end(result);   
    		  	   }
    		  	  
    		  	   else{
    		  		 res.end("An error occurred");
    		  		
    		  		 console.log(err);
    		  	   }
    		  	 });	  	
    		}	
    	}   		
     },getUser2);
     
      }
            else{
             res.render('index.ejs');	
            }
            
 }

 
function updateProfile(req,res){
	
	if(req.session.email){
    	   console.log(req.session.email);
    var newconnection = mysql.getConnection();
//   console.log(req);
	var input = JSON.parse(JSON.stringify(req.body));
	console.log("asdasdasdasdasdasdasd\n" + input);
	var currentdate = new Date();
	
	var data = {
	     
		  "summary" : input.summary,
		   "education" : input.education,
		   "skills" : input.skills,
		   "experience" : input.experience,
		   };
	 
//		   var post={
//		       //email : input.email,
//		        email : req.session.email,
//		   };
		   
		   
       console.log(input);

       console.log(req);
//       var query = newconnection.query("UPDATE user_profile set ? WHERE user_id IN (select uid from user_details where email="+ input.email  , data ,
   	
       
    var query = newconnection.query("update user_profile p JOIN user_details d ON (d.email='" +req.session.email+"') SET ?", data ,
       function(err, result) {
	var getUser3 = "select  * from user_profile where summary = '"+ data.summary + "' and education = '"+ data.education + "' and skills = '"+ data.skills + "' and experience = '"+ data.experience + "'";

				console.log(getUser3);
				console.log("update:" +query);
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						console.log(results);
						var summary = req.body.summary;
						var education = req.body.education;
						var skills = req.body.skills;
						//console.log("Pasword length:" + password.length);
						var experience = req.body.experience;
					}
					if (results.length > 0) {
						console.log("valid Login");
						ejs.renderFile('./views/afterSignin.ejs', {
							results : results
						}, function(err, result) {
							// render on success
							if (!err) {
								res.end(result);
							}
							// render or error
							else {
								
								console.log(err);
								res.end('An error occurred');
							}
						});
					}
				}, getUser3);
			});
		 }
         else{
          res.render('index.ejs');	
         }
     
 }

//function search(req, res){
//	
//   var newconnection = mysql.getConnection();
//
//   newconnection.query("select firstname from user_details",
//	   mysql.fetchData(function(err,rows,fields){
//       if(err) {throw err;}
//        res.end(JSON.stringify(rows));
//     }));
//}

//exports.search = search;
exports.afterSignup = afterSignup;
exports.afterSignin = afterSignin;
exports.logout = logout;
exports.editProfile = editProfile;
exports.updateProfile = updateProfile;