skel = '<div class="row">' +
	'<div class="col-md-6 col-md-push-3">' +
		'<div class="page-header">' +
			'<h2>Log in to FurAffinity</h2>' +
		'</div>' +
		'<form action="/login/?ref=http://www.furaffinity.net/" method="POST" class="form well" id="login-form">' +
			'<input type="hidden" name="action" value="login" />' +
			'<input type="hidden" name="retard_protection" value="1" />' + //I honestly don't know, but it was in the original markup so :shrugs:
			'<div class="form-group">' +
				'<label for="username-input" class="control-label">Username</label>' +
				'<input type="text" name="name" class="form-control" id="username-input" placeholder="Username" />' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="password-input" class="control-label">Password</label>' +
				'<input type="password" name="pass" class="form-control" id="password-input" placeholder="Password" />' +
			'</div>' +
			'<div class="form-group">' +
				'<label for=""></label>' +
				'<button type="submit" class="btn btn-primary">' +
					'Log In' +
				'</button>' +
			'</div>' +
		'</form>' +
	'</div>' +
	'<div class="col-md-3 col-md-pull-3"></div>' +
	'<div class="col-md-3"></div>' +
'</div>'

$(document).ready(function(){
	$(skel).insertBefore('.content.maintable')

	$('#login-form').attr('action',$('.content.maintable form:first').attr('action'))

	if(document.location.search.search("msg=1")!=-1){
		$('<div class="alert alert-danger">').prependTo('#login-form')
			.html("Invalid username or password. Please try again.")
	}
})