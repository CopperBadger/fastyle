skel = '<div class="row">' +
	'<div class="col-md-8 col-md-push-2">' +
		'<div class="jumbotron">' +
			'<h2>Welcome to FurAffinity, <strong id="username"></strong>!</h2>' +
			'<p>Congratulations! Your account has been created, and you may now log into the website. Once you do, please take some time to fill out your profile information for this account via the Control Panel.</p>' +
		'</div>' +
	'</div>' +
	'<div class="col-md-2 col-md-pull-8"></div>' +
	'<div class="col-md-2"></div>' +
'</div>'

$(document).ready(function(){
	$(skel).insertBefore('.content.maintable')

	$('#username').text(document.location.pathname.match(/[^\/]+$/)[0])
})