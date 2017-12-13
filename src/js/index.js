(function(){
	var button = document.getElementById('btn');
	button.addEventListener("click",login(),false);
})();

function login(){
	var getParams = {
		username : document.getElementById('user_id').value,
		password : document.getElementById('user_password').value
	};

	Ajax({
		url:"http://localhost:3001",
		method:'GET',
		data:{
			username:getParams.username,
			password:getParams.password
		},
		dataType:'jsonp',
		success:function(data){
			console.log(data);
		}
	});	
}





