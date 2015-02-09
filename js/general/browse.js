browseFormSkel = '<h3>' +
	'Browse&nbsp;&#183;&nbsp;<small><a href="javascript:void(0)" id="form-expander">Options</a></small>' +
'</h3>' +
'<form action="/browse/" method="POST" id="browse-form" style="display:none;">' +
	'<input type="hidden" name="perpage" value="36">' +
	'<input type="hidden" name="go" value="Update">' +
	'<div class="row">' +
		'<div class="col-sm-6">' +
			'<div class="row">' +
				'<div class="col-sm-6">' +
					'<div class="form-group">' +
						'<label for="category-select" class="control-label">Category</label><br>' +
						'<select name="cat" id="category-select" class="form-control"></select>' +
					'</div>' +
				'</div>' +
				'<div class="col-sm-6">' +
					'<div class="form-group">' +
						'<label for="type-select" class="control-label">Type / Speciality</label><br>' +
						'<select name="atype" id="type-select" class="form-control"></select>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-sm-6">' +
					'<div class="form-group">' +
						'<label for="species-select" class="control-label">Species</label><br>' +
						'<select name="species" id="species-select" class="form-control"></select>' +
					'</div>' +
				'</div>' +
				'<div class="col-sm-6">' +
					'<div class="form-group">' +
						'<label for="gender-select" class="control-label">Gender</label><br>' +
						'<select name="gender" id="gender-select" class="form-control"></select>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="col-sm-6">' +
			'<div class="row">' +
				'<div class="col-xs-12">' +
					'<div class="form-group">' +
						'<label class="control-label">Rating</label>' +
						'<div class="btn-group" data-toggle="buttons">' +
							'<label for="rating-general" class="btn btn-primary">' +
								'<input type="checkbox" class="rating-select" id="rating-general" value="on" name="rating_general">' +
								'<img src="/img/labels/general.gif" alt="General" />' +
							'</label>' +
							'<label for="rating-mature" class="btn btn-primary">' +
								'<input type="checkbox" class="rating-select" id="rating-mature" value="on" name="rating_mature">' +
								'<img src="/img/labels/mature.gif" alt="Mature" />' +
							'</label>' +
							'<label for="rating-adult" class="btn btn-primary">' +
								'<input type="checkbox" class="rating-select" id="rating-adult" value="on" name="rating_adult">' +
								'<img src="/img/labels/adult.gif" alt="Adult" />' +
							'</label>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-xs-12">' +
					'<button type="submit" class="pull-right btn btn-primary">Submit</button>' +
				'</div>' +
			'</div>' +
		'</div>' +
	'</div>' +
'</form>'


$(document).ready(function(){
	$(browseFormSkel).insertBefore('.content.maintable')

	// Inject form defaults
	srcForm = $('form[name=replyform]')
	
	$(srcForm).find('input:checked').each(function(){
		$('#browse-form input[name="'+$(this).attr('name')+'"]').click()
	}).end().find('select').each(function(){
		$('#browse-form select[name="'+$(this).attr('name')+'"]')
			.html($(this).html())
	})

	// Event bindings
	$('#form-expander').on("click",function(){
		$('#browse-form').slideToggle()
	})

	// Workaround for active buttons that don't have control checked underneath
	$('#browse-form .active').find('input').prop('checked',true)
})