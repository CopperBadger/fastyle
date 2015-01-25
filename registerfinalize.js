skel = '<div class="row">' +
	'<div class="col-md-6 col-md-push-3">' +
		'<div class="panel panel-default">' +
			'<div class="panel-heading">Finalize Account Registration</div>' +
			'<div class="panel-body">' +
				'<form action="/register/finalize/" method="POST" class="form">' +
					'<input type="hidden" name="send" value="send" />' +
					'<input type="hidden" name="proceed" value="I accept. Create my account." />' +
					'<div class="form-group">' +
						'<label for="username-input" class="control-label">Username</label>' +
						'<input type="text" id="username-input" name="username" class="form-control" disabled />' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="email-input" class="control-label">Email Address</label>' +
						'<input type="text" id="email-input" name="email" class="form-control" disabled />' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="display-name-input" class="control-label">Display Name</label>' +
						'<input type="text" id="display-name-input" name="" class="form-control" />' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="" class="control-label">Birth Date</label>' +
						'<div class="row">' +
							'<div class="col-md-6"><select name="bmon" id="bmon" class="form-control"></select></div>' +
							'<div class="col-md-3"><select name="bday" id="bday" class="form-control"></select></div>' +
							'<div class="col-md-3"><select name="byear" id="byear" class="form-control"></select></div>' +
						'</div>' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="password-input" class="control-label">Password</label>' +
						'<input type="password" id="password-input" name="pass1" class="form-control" />' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="password-confirm-input" class="control-label">Confirm Password</label>' +
						'<input type="password" id="password-confirm-input" name="pass2" class="form-control" />' +
					'</div>' +
					'<div class="form-group">' +
						'<p>' +
							'Fur Affinity values your privacy and will not share this information. See our <a href="http://wiki.furaffinity.net/index.php?title=TOS#Account_Information_.26_Security">Privacy Policy</a> for more information.' +
						'</p>' +
						'<p>' +
							'By clicking on I accept below you are agreeing to the' +
							'<a href="http://help.furaffinity.net/article/AA-00203/8/Terms-of-Service-TOS.html">Terms of Service</a>' +
							'and the <a href="http://help.furaffinity.net/article/AA-00204/8/Submission-Agreement-SA.html">Submission Policy</a>' +
						'</p>' +
						'<p>' +
							'Yes, we know, we already displayed this message once. It is here as a reminder just so you can\'t say "I haven\'t read it" later, because you really should.' +
						'</p>' +
						'<input type="submit" class="btn btn-primary" value="I accept. Create my account." />' +
					'</div>' +
				'</form>' +
			'</div>' +
		'</div>' +
	'</div>' +
	'<div class="col-md-3 col-md-pull-6"></div>' +
	'<div class="col-md-3"></div>' +
'</div>'

$(document).ready(function() {

	if(!$('form').length){
		$('#status').insertBefore('.content.maintable').addClass('well')
	} else {
		$(skel).insertBefore('.content.maintable')

		// Render birthday inputs
		mon = ['January','Februrary','March','April','May','June','July','August','September','October','November','December']
		var perMonth = function(idx){return (idx==1)?29:((idx>=7)?(30+(idx%2)):(31-(idx%2)))}
		$('#bmon').html($.map(mon,function(e,i){return "<option value='"+i+"'>"+e+"</option>"}))
			.on("change",function(){
				$('#bday').html("")
				n = perMonth($(this).val())
				for(i=1;i<=n;++i){
					$('#bday').append("<option value='"+i+"'>"+i+"</option>")
				}
			}).trigger("change")
		capYear = (new Date).getFullYear()-13
		for(i=1915;i<=capYear;++i){
			$('#byear').append("<option value='"+i+"'>"+i+"</option>")
		}

		// Data population
		$('#username-input').val($('#username').val())
		$('#email-input').val($('#email').val())
	}
})