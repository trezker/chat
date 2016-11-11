var loginViewModel = {
	username: '',
	password: '',
	log_in : function() {
		var data = ko.toJS(this);
		data.model = "user";
		data.method = "login_password";
		ajax_post(data, function(returnedData) {
		    console.log(returnedData);
		});
	}
};

ko.applyBindings(loginViewModel);