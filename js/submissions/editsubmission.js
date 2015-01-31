subskel = '<div class="page-header">' +
	'<h2>' +
		'<span id="submission-name-field"></span>' +
	'</h2>' +
	'<small>Edit submission information</small>' +
'</div>' +
'<form action="" class="form well" method="POST" id="edit-submission-form">' +
	'<div class="row">' +
		'<div class="col-sm-6">' +
			'<div class="row">' +
				'<div class="col-xs-6">' +
					'<div class="form-group">' +
						'<label for="submission-category-select" class="control-label">Category</label>' +
						'<select name="cat" id="submission-category-select" class="form-control"></select>' +
					'</div>' +
				'</div>' +
				'<div class="col-xs-6">' +
					'<div class="form-group">' +
						'<label for="submission-gallery-select" class="control-label">Destination</label>' +
						'<select name="scrap" id="submission-gallery-select" class="form-control">' +
							'<option value="0">Gallery</option>' +
							'<option value="1">Scraps</option>' +
						'</select>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="submission-theme-select" class="control-label">Submission Theme</label>' +
				'<select name="atype" id="submission-theme-select" class="form-control"></select>' +
			'</div>' +
		'</div>' +
		'<div class="col-sm-6">' +
			'<div class="form-group">' +
				'<label for="submission-species-select" class="control-label">Species</label>' +
				'<select name="species" id="submission-species-select" class="form-control"></select>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="submission-gender-select" class="control-label">Gender</label>' +
				'<select name="gender" id="submission-gender-select" class="form-control"></select>' +
			'</div>' +
		'</div>' +
	'</div>' +
	'<div class="row">' +
		'<div class="col-xs-12">' +
			'<div class="form-group">' +
				'<div class="btn-group" data-toggle="buttons">' +
					'<label for="rating-general" class="btn btn-primary">' +
						'<input type="radio" class="rating-select" id="rating-general" name="rating" value="0">' +
						'<img src="/img/labels/general.gif" alt="General" />' +
					'</label>' +
					'<label for="rating-mature" class="btn btn-primary">' +
						'<input type="radio" class="rating-select" id="rating-mature" name="rating" value="2">' +
						'<img src="/img/labels/mature.gif" alt="Mature" />' +
					'</label>' +
					'<label for="rating-adult" class="btn btn-primary">' +
						'<input type="radio" class="rating-select" id="rating-adult" name="rating" value="1">' +
						'<img src="/img/labels/adult.gif" alt="Adult" />' +
					'</label>' +
				'</div>' +
			'</div>' +
		'</div>' +
	'</div>' +
	'<div class="row">' +
		'<div class="col-xs-12">' +
			'<div class="form-group">' +
				'<label for="submission-title-input" class="control-label">Title</label>' +
				'<input type="text" name="title" id="submission-title-input" class="form-control">' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="submission-comment-input" class="control-label">Comment</label>' +
				'<textarea name="message" id="submission-comment-input" class="form-control" rows="7"></textarea>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="submission-keyword-input" class="control-label">Keywords &#183; <span id="submission-keyword-chars-left"></span></label>' +
				'<textarea name="keywords" id="submission-keyword-input" class="form-control" rows="3"></textarea>' +
			'</div>' +
		'</div>' +
	'</div>' +
	'<div class="row">' +
		'<div class="col-xs-12">' +
			'<div class="form-group">' +
				'<button class="btn btn-primary pull-right" type="submit">Update</button>' +
			'</div>' +
		'</div>' +
	'</div>' +
'</form>'

$(document).ready(function(){
	$(subskel).insertBefore('.content.maintable')

	// Data Population
	// -- Set page title to submission title
	$('#submission-name-field').text($('form[name=MsgForm] [name=title]').val())

	// -- Form action
	$('#edit-submission-form').attr('action',$('form[name=MsgForm]').attr('action'))

	// -- Iterate through all input fields (excluding rating) and automatically populate
	$('form[name=MsgForm]').find('input:not([type=radio]), textarea').each(function(){
		$('#edit-submission-form [name='+$(this).attr('name')+']')
			.val($(this).val())
	})

	// -- Fill all selects with matching names, fill with existing markup
	.end().find('select').each(function(){
		$('#edit-submission-form [name='+$(this).attr('name')+']')
			.html($(this).html())
	})

	// -- Place all hidden fields in form
	.end().find('[type=hidden]').remove().prependTo('#edit-submission-form')

	// -- Select submission rating
	selectedRating = $('form[name=MsgForm]').find('[name=rating]:checked').val()
	$('.rating-select[value='+selectedRating+']').click()

	// -- Set destination default
	$('#submission-gallery-select option:contains('+(($('form[name=MsgForm] [name=scrap]').is(':checked'))?'Scraps':'Gallery')+')')
		.prop('selected',true)

	// Event Bindings
	$('#submission-keyword-input').on("keyup",function(){
		n = 250-$(this).val().length
		$('#submission-keyword-chars-left').html(n)
	}).trigger('keyup')
})