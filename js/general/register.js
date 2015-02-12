skel = '<div class="row">' +
	'<div class="col-md-6 col-md-push-3">' +
		'<div class="page-header">' +
			'<h2>Welcome to FurAffinity!</h2>' +
		'</div>' +
		'<div class="panel panel-default" id="registration-panel">' +
			'<div class="panel-heading">New Account Registration</div>' +
			'<div class="panel-body">' +
				'<form action="" method="POST" class="form">' +
					'<input type="hidden" name="send" value="send" />' +
					'<input type="hidden" name="proceed" value="I accept. Proceed with account creation." />' +
					'<input type="hidden" name="check" id="username-check" value="" />' +
					'<div class="form-group">' +
						'<label for="username-input" class="control-label">Username</label>' +
						'<input type="text" name="username" id="username-input" class="form-control" />' +
						'<span id="username-message"></span>' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="email-input" class="control-label">Email Address</label>' +
						'<input type="text" name="email" id="email-input" class="form-control" />' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="email-confirm-input" class="control-label">Email Address Confirm</label>' +
						'<input type="text" name="email2" id="email-confirm-input" class="form-control" />' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="captcha-input" class="control-label">Word Verification</label>' +
						'<div id="captcha-wrapper"></div>' +
						'<div class="input-group">' +
							'<input type="text" class="form-control" name="captcha" id="captcha-input" maxlength="15" class="form-control" />' +
							'<span class="input-group-btn">' +
								'<input type="button" class="btn btn-default" id="captcha-button" value="Reload Image" />' +
							'</span>' +
						'</div>' +
					'</div>' +
					'<div class="form-group">' +
						'<p id="agreement-text">' +
							'By clicking on I accept below you are agreeing to the' +
							'<a href="http://help.furaffinity.net/article/AA-00203/8/Terms-of-Service-TOS.html">Terms of Service</a>' +
							'and the <a href="http://help.furaffinity.net/article/AA-00204/8/Submission-Agreement-SA.html">Submission Policy</a>' +
						'</p>' +
						'<button class="btn btn-primary" type="submit">' +
							'I accept. Proceed with Account Creation.' +
						'</button>' +
					'</div>' +
				'</form>' +
			'</div>' +
		'</div>' +
	'</div>' +
	'<div class="col-md-3 col-md-pull-6"></div>' +
	'<div class="col-md-3"></div>' +
'</div>'

$(document).ready(function(){
	if(!$('form').length){
		$('#status').insertBefore('.content.maintable').addClass('well')
	} else {
		$(skel).insertBefore('.content.maintable')

		$('#errors').remove().insertBefore('#registration-panel')

		// Moving over parts of old form
		$('#captcha-wrapper').append($('#captcha_img').remove())
			.css({'text-align':'center','margin':'4px 0'})

		// Event Bindings

		usernameMessages = {
			0: "Hooray! Username $_ is available!",
			1: "Sorry, username $_ is already taken.",
			2: "Sorry, $_ is a banned username.",
			3: "Username $_ is currently awaiting confirmation over email. It will become available again if confirmation is not received within the next $#.",
			4: "Username $_ is adoptable! The associated account has been inactive for the past 12 months. Send an email to <a href='mailto:accounts@furaffinity.net'>accounts@furaffinity.net</a> if you'd like to claim this account.",
			255: "An error occured: $#"
		}
		$('#username-input').on("change",function(){
			$('#username-message').html("Checking availability")
			$('#username-check').val("")
			window.fastyle.ajax({
				url: "/register/?phase=5&mode=check_username",
				type: "POST",
				data: {username: $(this).val()},
				success:function(res) {
					// This request will return with a JSON response with keys "username", "status", and "extra"
					// username contains the submitted username. Status is a number indicating the status of the
					// username-- the codes and their meanings are stored in the usernameMessages object. The extra
					// variables contains extra information: for reserved usernames (status=3), it contains the
					// number of seconds are left until the username becomes available. For errors (status=255),
					// it contains an error message
					try {
						obj = JSON.parse(res.replace(/^[^\{]+/,'').replace(/[^\}]+$/,''))
						obj.status = parseInt(obj.status)
						if(obj.status==0){$('#username-check').val("check")}
						if(typeof (m=usernameMessages[obj.status]) == "string"){
							timeleft = []
							if(obj.extra.toString().search(/\d+/)!=-1){
								t = parseInt(obj.extra)
								sec = (t%60)
								min = ((t%3600)-sec)/60
								hrs = (t-((60*min)+sec))/3600
								if(hrs){timeleft.push(hrs+" hour"+((hrs!=1)?"s":""))}
								if(min){timeleft.push(min+" minute"+((min!=1)?"s":""))}
								if(sec){timeleft.push(sec+" second"+((sec!=1)?"s":""))}
								obj.extra = timeleft.join(', ')
							}
							$('#username-message').html(m.replace('$_',"<strong>"+obj.username+"</strong>").replace('$#',obj.extra))
						} else {$('#username-message').html("Username status code "+obj.status+" not recognized. ("+obj.extra+")")}
					} catch(e){
						$('#username-message').html("There was a problem checking the availability of your chosen username")
					}
				},
				error:function(){
					$('#username-message').html("There was a problem checking the availability of your chosen username")
				}
			})
		})

		$('#captcha-button').on("click",function(){
			$('#captcha_img').attr('src','../captcha.jpg?random='+Math.round(Math.random()*1e14))
		})
	}
})