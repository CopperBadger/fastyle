skel = '<div class="row">' +
	'<div class="col-md-8">' +
		'<div class="panel panel-default">' +
			'<div class="panel-heading">New Journal</div>' +
			'<div class="panel-body">' +
				'<form action="/controls/journal/" method="POST" class="form well" id="journal-form">' +
					'<div class="form-group">' +
						'<label for="journal-subject" class="control-label">Subject</label>' +
						'<input type="text" name="subject" class="form-control" id="journal-subject" />' +
					'</div>' +
					'<div class="form-group">' +
						'<label for="journal-message" class="control-label">Journal</label>' +
						'<textarea name="message" class="form-control" id="journal-message" rows="30"></textarea>' +
					'</div>' +
					'<div class="form-group">' +
						'<button class="btn btn-primary pull-right" type="submit">Create / Update</button>' +
						'<p>' +
							'For help formatting, see ' +
							'<a href="/journal/441426/" target="blank">this page</a> (will open in new window / tab)' +
						'</p>' +
					'</div>' +
				'</form>' +
			'</div>' +
		'</div>' +
	'</div>' +
	'<div class="col-md-4">' +
		'<div class="panel panel-default">' +
			'<div class="panel-heading">Previous Journals</div>' +
			'<ul class="list-group" id="new-journals-list">' +
			'</ul>' +
		'</div>' +
	'</div>' +
'</div>'

$(document).ready(function(){
	$(skel).insertBefore('.content.maintable')

	// Insert hidden form elements
	$('#MsgForm').find('input[type=hidden]').remove().prependTo('#journal-form')

	// Data Population
	newlist = $('#new-journals-list')
	$('#journals-list div').each(function(){
		jnlAnchor = $(this).children('a')
		jnlHref = jnlAnchor.attr('href')
		jnlName = jnlAnchor.text()
		jnlEditHref = $(this).find('.edit').attr('href')
		jnlDeleteHref = $(this).find('.delete').attr('onclick').match(/\'(\/control[^\']+)/)[1]

		$('<li>').appendTo(newlist)
			.html('<div class="pull-right">' +
				'<a href="'+jnlEditHref+'">Edit</a> ' +
				'<a href="javascript:void(0)" data-target="'+jnlDeleteHref+'" class="delete-confirm">Delete</a>' +
			'</div>' +
			'<a href="'+jnlHref+'">'+jnlName+'</a>')
			.addClass('list-group-item')
	})

	$('#journal-message').val($('#JSMessage').val())
	$('#journal-subject').val($('#MsgForm input[name=subject]').val())

	// Event Bindings
	$('.delete-confirm').on("click",function(){
		if(confirm("Are you sure you want to delete this journal?")){
			toBeRemoved = $(this).parents('li.list-group-item').css({opacity:0.8})
			$.ajax({
				url: $(this).attr('data-target'),
				type: "GET",
				complete: function(xhr){
					$(toBeRemoved).slideUp(function(){$(this).remove()})
				}
			})
		}
	})
})