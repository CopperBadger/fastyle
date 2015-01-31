skel = '<div class="row">' +
	'<form action="/controls/profile/" method="POST" id="profile-info-form" class="form">' +
		'<input type="hidden" name="do" />' +
		'<input type="hidden" name="key" />' +
		'<div class="panel panel-default">' +
			'<div class="panel-heading">Personal Information</div>' +
			'<div class="panel-body">' +
				'<div class="row">' +
					'<div class="col-md-6">' +
						'<div class="form-group">' +
							'<label for="species-input" class="control-label">Species</label>' +
							'<input type="text" id="species-input" name="species" class="form-control" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="typeartist-input" class="control-label">Artist Type</label>' +
							'<input type="text" id="typeartist-input" name="typeartist" class="form-control" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="age-input" class="control-label">Age</label>' +
							'<input type="text" id="age-input" name="age" class="form-control" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="shell-input" class="control-label">Shell of Choice</label>' +
							'<input type="text" id="shell-input" name="shell" class="form-control" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="os-input" class="control-label">Operating System</label>' +
							'<input type="text" id="os-input" name="os" class="form-control" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="music-input" class="control-label">Favorite Music</label>' +
							'<input type="text" id="music-input" name="music" class="form-control" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="favoritemovie-input" class="control-label">Favorite Movie</label>' +
							'<input type="text" id="favoritemovie-input" name="favoritemovie" class="form-control" />' +
						'</div>' +
					'</div>' +
					'<div class="col-md-6">' +
						'<div class="form-group">' +
							'<label for="favoritegame-input" class="control-label">Favorite Game</label>' +
							'<input type="text" id="favoritegame-input" name="favoritegame" class="form-control" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="favoriteplatform-input" class="control-label">Favorite Game Platform</label>' +
							'<input type="text" id="favoriteplatform-input" name="favoriteplatform" class="form-control" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="favoritemusicplayer-input" class="control-label">Favorite Music Player</label>' +
							'<input type="text" id="favoritemusicplayer-input" name="favoritemusicplayer" class="form-control" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="favoriteartist-input" class="control-label">Favorite Artists</label>' +
							'<input type="text" id="favoriteartist-input" name="favoriteartist" class="form-control" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="favoriteanimal-input" class="control-label">Favorite Animals</label>' +
							'<input type="text" id="favoriteanimal-input" name="favoriteanimal" class="form-control" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="favoritewebsite-input" class="control-label">Favorite Websites</label>' +
							'<input type="text" id="favoritewebsite-input" name="favoritewebsite" class="form-control" />' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="favoritefood-input" class="control-label">Favorite Food</label>' +
							'<input type="text" id="favoritefood-input" name="favoritefood" class="form-control" />' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<label for="quote-input" class="control-label">Personal Quote</label>' +
					'<input type="text" id="quote-input" name="quote" class="form-control" />' +
				'</div>' +
				'<div class="form-group">' +
					'<label for="profileinfo-input" class="control-label">Profile</label>' +
					'<textarea name="profileinfo" id="profileinfo-input" class="form-control" rows="10"></textarea>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="panel panel-default">' +
			'<div class="panel-heading">User Page Appearance and Preferences</div>' +
			'<div class="panel-body">' +
				'<div class="row">' +
					'<div class="col-md-6">' +
						'<div class="form-group">' +
							'<div class="control-label">Full View</div>' +
							'<p>Enable to ignore resized images and view the full sized images.</p>' +
							'<div class="btn-group" data-toggle="buttons">' +
								'<label class="btn btn-default" for="fullview-off">' +
									'<input id="fullview-off" value="0" name="fullview" type="radio" autocomplete="off"> Off' +
								'</label>' +
								'<label class="btn btn-default" for="fullview-on">' +
									'<input id="fullview-on" value="1" name="fullview" type="radio" autocomplete="off"> On' +
								'</label>' +
							'</div>' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="mood-input" class="control-label">Current Mood</label>' +
							'<input type="text" id="mood-input" name="mood" class="form-control" />' +
						'</div>' +
					'</div>' +
					'<div class="col-md-6">' +
						'<div class="form-group">' +
							'<label for="profile-pic-select" class="control-label">Profile Picture</label>' +
							'<div id="profile-pic-select-wrapper"></div>' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="featured-select" class="control-label">Featured Submission</label>' +
							'<div id="featured-select-wrapper"></div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="panel panel-default">' +
			'<div class="panel-heading">Block List</div>' +
			'<div class="panel-body">' +
				'<div class="row">' +
					'<div class="col-md-4">' +
						'<p>Block users who are being rude or malicious towards you. Blocked users will not be able to comment on your work and journals, shout on your userpage and send you notes.</p>' +
						'<p>Note: Only enter ONE username per line, otherwise the block feature will not work. Be sure and double check your spelling.</p>' +
					'</div>' +
					'<div class="col-md-8">' +
						'<div class="form-group">' +
							'<textarea name="blocklist" id="blocklist-input" rows="10" class="form-control"></textarea>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="panel panel-default">' +
			'<div class="panel-heading">Websites</div>' +
			'<div class="panel-body">' +
				'<h4>General</h4>' +
				'<div class="row">' +
					'<div class="col-md-4">' +
						'<div class="form-group">' +
							'<label for="website-input" class="control-label">Website Address</label>' +
							'<input type="text" id="website-input" class="form-control" name="website">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="youtube-input" class="control-label">Youtube username</label>' +
							'<input type="text" id="youtube-input" class="form-control" name="youtube">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="twitter-input" class="control-label">Twitter username</label>' +
							'<input type="text" id="twitter-input" class="form-control" name="twitter">' +
						'</div>' +
					'</div>' +
					'<div class="col-md-4">' +
						'<div class="form-group">' +
							'<label for="myspace-input" class="control-label">Myspace username</label>' +
							'<input type="text" id="myspace-input" class="form-control" name="myspace">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="ustream-input" class="control-label">Ustream username</label>' +
							'<input type="text" id="ustream-input" class="form-control" name="ustream">' +
						'</div>' +
					'</div>' +
					'<div class="col-md-4">' +
						'<div class="form-group">' +
							'<label for="lj-input" class="control-label">Livejournal username</label>' +
							'<input type="text" id="lj-input" class="form-control" name="lj">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="facebook-input" class="control-label">Facebook username</label>' +
							'<input type="text" id="facebook-input" class="form-control" name="facebook">' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<h4>Art Sites</h4>' +
				'<div class="row">' +
					'<div class="col-md-4">' +
						'<div class="form-group">' +
							'<label for="sofurry-input" class="control-label">Sofurry username</label>' +
							'<input type="text" id="sofurry-input" class="form-control" name="sofurry">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="furocity-input" class="control-label">Furocity username</label>' +
							'<input type="text" id="furocity-input" class="form-control" name="furocity">' +
						'</div>' +
					'</div>' +
					'<div class="col-md-4">' +
						'<div class="form-group">' +
							'<label for="inkbunny-input" class="control-label">Inkbunny username</label>' +
							'<input type="text" id="inkbunny-input" class="form-control" name="inkbunny">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="artspots-input" class="control-label">Artspots username</label>' +
							'<input type="text" id="artspots-input" class="form-control" name="artspots">' +
						'</div>' +
					'</div>' +
					'<div class="col-md-4">' +
						'<div class="form-group">' +
							'<label for="deviantart-input" class="control-label">Deviantart username</label>' +
							'<input type="text" id="deviantart-input" class="form-control" name="deviantart">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="vcl-input" class="control-label">VCL username</label>' +
							'<input type="text" id="vcl-input" class="form-control" name="vcl">' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<h4>Instant Messaging</h4>' +
				'<div class="row">' +
					'<div class="col-md-4">' +
						'<div class="form-group">' +
							'<label for="msn-input" class="control-label">MSN Handle</label>' +
							'<input type="text" id="msn-input" class="form-control" name="msn">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="aim-input" class="control-label">AOL Instant Messenger</label>' +
							'<input type="text" id="aim-input" class="form-control" name="aim">' +
						'</div>' +
					'</div>' +
					'<div class="col-md-4">' +
						'<div class="form-group">' +
							'<label for="yim-input" class="control-label">Yahoo Handle</label>' +
							'<input type="text" id="yim-input" class="form-control" name="yim">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="icq-input" class="control-label">ICQ</label>' +
							'<input type="text" id="icq-input" class="form-control" name="icq">' +
						'</div>' +
					'</div>' +
					'<div class="col-md-4">' +
						'<div class="form-group">' +
							'<label for="skype-input" class="control-label">Skype</label>' +
							'<input type="text" id="skype-input" class="form-control" name="skype">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="jabber-input" class="control-label">Jabber/Google Talk</label>' +
							'<input type="text" id="jabber-input" class="form-control" name="jabber">' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<h4>Gaming Sites</h4>' +
				'<div class="row">' +
					'<div class="col-md-4">' +
						'<div class="form-group">' +
							'<label for="steam-input" class="control-label">Steam username</label>' +
							'<input type="text" id="steam-input" class="form-control" name="steam">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="wii-input" class="control-label">Wii code</label>' +
							'<input type="text" id="wii-input" class="form-control" name="wii">' +
						'</div>' +
					'</div>' +
					'<div class="col-md-4">' +
						'<div class="form-group">' +
							'<label for="xbl-input" class="control-label">Xbox Live username</label>' +
							'<input type="text" id="xbl-input" class="form-control" name="xbl">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="secondlife-input" class="control-label">Second Life username</label>' +
							'<input type="text" id="secondlife-input" class="form-control" name="secondlife">' +
						'</div>' +
					'</div>' +
					'<div class="col-md-4">' +
						'<div class="form-group">' +
							'<label for="psn-input" class="control-label">PSN</label>' +
							'<input type="text" id="psn-input" class="form-control" name="psn">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="xfire-input" class="control-label">Xfire</label>' +
							'<input type="text" id="xfire-input" class="form-control" name="xfire">' +
						'</div>' +
					'</div>' +
				'</div>' + // </.row>
			'<button type="submit" class="btn btn-primary pull-right">Update</button>'
			'</div>' + // </.panel-body>
		'</div>' + // </.panel>
	'</form>' +
'</div>'

$(document).ready(function(){
	if($('form').length){
		$(skel).insertBefore('.content.maintable')

		// Data Population
		$('form[name=MsgForm]').find('input, textarea').each(function(){
			$('#profile-info-form [name="'+$(this).attr('name')+'"]').val($(this).val())
		})

		$('#typeartist-input').val($('form[name=MsgForm] [name=typeartist]').val())
		$('#mood-input').val($('form[name=MsgForm] [name=mood]').val())

		$('#fullview-'+($('form[name=MsgForm]').find('[name=fullview]').val()=="1"?'on':'off')).click()
		$('form[name=MsgForm]').find('[name=profile_pic]').addClass('form-control')
			.remove().appendTo('#profile-pic-select-wrapper')
		$('form[name=MsgForm]').find('[name=featured]').addClass('form-control')
			.remove().appendTo('#featured-select-wrapper')
	}

})