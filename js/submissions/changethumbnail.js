thumbSkel = '<div class="row">' +
	'<div class="col-xs-12">' +
		'<h2 id="control-title"></h2>' +
	'</div>' +
	'<div class="col-md-8">' +
		'<form action="" id="file-upload-form" method="POST" enctype="multipart/form-data">' +
			'<input type="hidden" name="update" value="yes">' +
			'<div class="form-group">' +
				'<label for="file-upload-field" class="control-label">New File</label>' +
				'<input type="file" id="file-upload-field" class="form-control">' +
			'</div>' +
			'<div class="form-group" id="rebuild-thumbnail-wrapper">' +
				'<label>' +
					'<input type="checkbox" name="rebuild-thumbnail" checked> ' +
					'Rebuild the thumbnail for this file' +
				'</label>' +
			'</div>' +
			'<div class="form-group">' +
				'<div class="btn-toolbar pull-right">' +
					'<a href="" id="cancel-button" class="btn btn-default">Cancel</a>' +
					'<button class="btn btn-primary">Update</button> ' +
				'</div>' +
				'<p>' +
					'<strong>jpg</strong>, ' +
					'<strong>jpeg</strong>, ' +
					'<strong>gif</strong>, and ' +
					'<strong>png</strong> are accepted.' +
				'</p>' +
				'<p>' +
					'Images of any size may be used. files too large will be automatically resized.' +
				'</p>' +
			'</div>' +
		'</form>' +
	'</div>' +
	'<div class="col-md-4">' +
		'<img src="" alt="Current Image" id="file-preview">' +
	'</div>' +
'</div>'

$(document).ready(function(){
	$(thumbSkel).insertBefore('.content.maintable')

	// Form defaults
	srcForm = $('form[name=uploadform]')
	imgSrc = $('[alt="Thumbnail"]').attr('src')
	subHref = $('a[href*="view/"]:first').attr('href')
	isThumbnail = document.location.pathname.search('thumbnail')!=-1

	$('#control-title').text(isThumbnail?"Change Thumbnail":"Change Submission File")
	$('#file-upload-field').attr('name',isThumbnail?"newthumbnail":"newsubmission")
	if(!srcForm.find('[name=rebuild-thumbnail]').length){$('#rebuild-thumbnail-wrapper').remove()}
	$('#file-upload-form').attr('action',srcForm.attr('action'))
	$('#file-preview').attr('src',imgSrc)
	$('#cancel-button').attr('href',subHref)
})