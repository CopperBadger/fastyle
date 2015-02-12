
typeSelectSkel = '<div class="row">' +
	'<div class="col-xs-12">' +
		'<h2>Submit Your Work!</h2>' +
		'<p>' +
			'This is where you can submit your work to FurAffinity! Please start by saying what type of submission you have.' +
		'</p>' +
	'</div>' +
'</div>' +
'<div class="row">' +
	'<div class="col-sm-8">' +
		'<div class="panel panel-default">' +
			'<div class="panel-heading">Visual</div>' +
			'<ul class="list-group">' +
				'<a href="javascript:void(0)" data-type="submission" class="list-group-item type-select">' +
					'<h4>Artwork</h4>' +
					'<p>Artwork, photography and other images.</p>' +
				'</a>' +
				'<a href="javascript:void(0)" data-type="flash" class="list-group-item type-select">' +
					'<h4>Flash</h4>' +
					'<p>Flash animations</p>' +
				'</a>' +
			'</ul>' +
		'</div>' +
		'<div class="col-xs-12" id="upload-wrapper" style="padding:0"></div>' +
	'</div>' +
	'<div class="col-sm-4">' +
		'<div class="panel panel-default">' +
			'<div class="panel-heading">Textual</div>' +
			'<ul class="list-group">' +
				'<a href="javascript:void(0)" data-type="story" class="list-group-item type-select">' +
					'<h4>Stories</h4>' +
					'<p>Short stories and other narrative writing</p>' +
				'</a>' +
				'<a href="javascript:void(0)" data-type="poetry" class="list-group-item type-select">' +
					'<h4>Other Prose and Poetry</h4>' +
					'<p>Anything that doesn\'t fit into the "stories" category</p>' +
				'</a>' +
			'</ul>' +
		'</div>' +
		'<div class="panel panel-default">' +
			'<div class="panel-heading">Audio</div>' +
			'<ul class="list-group">' +
				'<a href="javascript:void(0)" data-type="music" class="list-group-item type-select">' +
					'<h4>Music</h4>' +
					'<p>Audio recordings and musical compositions</p>' +
				'</a>' +
			'</ul>' +
		'</div>' +
	'</div>' +
'</div>'

uploadSkel = '<form action="/submit/" method="POST" enctype="multipart/form-data" id="upload-form" class="form">' +
	'<div class="row">' +
		'<div class="col-md-6">' +
			'<div class="panel panel-primary">' +
				'<div class="panel-heading">Submission File</div>' +
				'<div class="panel-body">' +
					'<div class="form-group">' +
						'<label for="submission-file-input" class="control-label sr-only">Submission File</label>' +
						'<input type="file" id="submission-file-input" name="submission" class="form-control">' +
					'</div>' +
				'</div>' +
				'<ul class="list-group" id="submission-notices"></ul>' +
			'</div>' +
		'</div>' +
		'<div class="col-md-6">' +
			'<div class="panel panel-primary">' +
				'<div class="panel-heading">Thumbnail (optional)</div>' +
				'<div class="panel-body">' +
					'<div class="form-group">' +
						'<label for="thumbnail-file-input" class="control-label sr-only">Submission File</label>' +
						'<input type="file" id="thumbnail-file-input" name="thumbnail" class="form-control">' +
					'</div>' +
				'</div>' +
				'<ul class="list-group" id="thumbnail-notices"></ul>' +
			'</div>' +
			'<div class="form-group">' +
				'<button type="submitt" class="btn btn-primary pull-right">Submit</button>' +
			'</div>' +
		'</div>' +
	'</div>' +
'</form>'

function renderUploadForm(){
	uploadForm = $('#upload-form-src')
	$('#upload-wrapper').html(uploadSkel)

	uploadForm.find('[type=hidden]').remove().prependTo('#upload-form')

	par = uploadForm.find('.uploadfield[name=submission]').parents('td:first')

	par.find('ul:first li').addClass('list-group-item').remove()
		.appendTo('#submission-notices').find('img').remove()

	par.find('ul:last li').addClass('list-group-item').remove()
		.appendTo('#thumbnail-notices').find('img').remove()
}

$(document).ready(function(){
	part = $('input[name=part]').val()
	if(part=="2"){
		$(typeSelectSkel).insertBefore('.content.maintable')

		// Event Bindings
		$('.type-select').on("click",function(){
			$('#upload-form-src').remove()
			$('#upload-wrapper').css({opacity:0.6})

			window.fastyle.ajax({
				url: "/submit/",
				data: {
					part:"2",
					'submission_type':$(this).attr('data-type')
				},
				success:function(res) {
					$(res).find('form[name=myform]').appendTo('body').hide()
						.attr('id','upload-form-src')
					renderUploadForm()
					$('#upload-wrapper').css({opacity:1})
				},
				impatient: function() {
					$('#upload-wrapper').html("")
					return "Please wait a moment before select another option."
				}
			})
		})
	}
})