window.bwin = window.bwin || {};
window.bwin.createUser = function(username, password) {
	var LOGIN_URL = 'http://www.bwin.de';

	return {
		'username': username?username:'',
		'password': password?password:'',

		// Fills out the login form using the credentials stored
		// in the object.
		'fill_login': function(tab, cb) {
			tab.open(LOGIN_URL, function(state) {
				if(state != 'success') {
					cb('loading failed');
					return;
				}
				var err = tab.evaluate(function(data) {
					var lf_username = document.querySelector('span[id$="logincontrol"] input[id$=Username]');
					var lf_password = document.querySelector('span[id$="logincontrol"] input[id$=Password]');
					var lf_dummy = document.querySelector('span[id$="logincontrol"] input[id$=Dummy]');
					if(!lf_username || !lf_password || !lf_dummy) {
						return 'fill_login: document has unexpected layout';
					}
					lf_username.value = data.username;
					lf_dummy.focus();
					lf_password.value = data.password;
					return null;
				}, {
					'username': this.username,
					'password': this.password,

				});
				if(err) {
					cb(err);
					return;
				}
				cb(true);
				return;
			}.bind(this));
		},

		// Sends the login form. Assumes credentials have been entered.
		'authenticate': function(tab, cb) {
			var err = tab.evaluate(function(data) {
				var lf_submit = document.querySelector('span[id$="logincontrol"] a[id$=Login]');
				if(!lf_submit) {
					return 'authenticate: document has unexpected layout';
				}
				lf_submit.onclick();
				return null;
			}, {});
			cb(err);
		},

		'login': function(tab, cb) {
			this.fill_login(tab, function(ok) {
				if(ok !== true) {
					cb(ok);
					return
				}
				this.authenticate(tab, cb);
			}.bind(this));
		},
	};
};
