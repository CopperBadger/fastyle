$(document).ready(function(){
	if($('form').length) { // Editing journal settings

		skel = '<form action="/controls/journalsettings/" method="POST" id="journal-settings-form" class="form">' +
			'<input type="hidden" name="do" value="update" />' +
			'<div class="panel panel-default">' +
				'<div class="panel-heading">Journal Settings</div>' +
				'<div class="panel-body">' +
					'<div class="row">' +
						'<div class="col-md-6">' +
							'<div class="form-group">' +
								'<label for="journal-header-input" class="control-label">Journal Header</label>' +
								'<textarea name="journalheader" id="journal-header-input" rows="10" class="form-control"></textarea>' +
							'</div>' +
						'</div>' +
						'<div class="col-md-6">' +
							'<div class="form-group">' +
								'<label for="journal-footer-input" class="control-label">Journal Footer</label>' +
								'<textarea name="journalfooter" id="journal-footer-input" rows="10" class="form-control"></textarea>' +
							'</div>' +
						'</div>' +
						'<div class="col-xs-12"><button class="btn btn-primary" type="submit">Update</button></div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</form>'

		$(skel).insertBefore('.content.maintable')

		// Data Population
		$('form[name=MsgForm] textarea').each(function(){
			$('#journal-settings-form [name="'+$(this).attr('name')+'"]').val($(this).val())
		})
	} else { // After journal settings have been submitted
		skel = '<h2 id="message"></h2>' +
		'<a href="/controls/journalsettings">Return to journal settings</a>'

		$(skel).insertBefore('.content.maintable')

		$('#message').text($('b:contains(System Message)').parents('table:first').find('.alt1 b').text())
	}
})