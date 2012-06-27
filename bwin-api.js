(function() {
	phantom.injectJs('bind.js');
	phantom.injectJs('bwinuser.js');

	var tab = require('webpage').create();
	tab.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5';
	tab.settings.loadImages = true;
	tab.onConsoleMessage = function (msg) { console.log(msg); };

	buser = window.bwin.createUser('user', 'password');
	buser.login(tab, function(state) {
		setTimeout(function() {
			tab.render('view.png');
			phantom.exit();
		}, 2000);
	});
	return {};
})()
