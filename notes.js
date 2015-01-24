skel = 

'<div class="row">' +
	'<div class="col-sm-12">' +
		'<ul class="nav nav-tabs">' +
			'<li><a href="/controls/switchbox/inbox">Inbox</a></li>' +
			'<li><a href="/controls/switchbox/outbox">Outbox</a></li>' +
			'<li><a href="/controls/switchbox/high_prio"><span class="text-danger">High Priority</span></a></li>' +
			'<li><a href="/controls/switchbox/medium_prio"><span class="text-warning">Medium Priority</span></a></li>' +
			'<li><a href="/controls/switchbox/low_prio"><span class="text-success">Low Priority</span></a></li>' +
			'<li><a href="/controls/switchbox/archive">Archive</a></li>' +
			'<li><a href="/controls/switchbox/trash">Trash</a></li>' +
		'</ul>' +
	'</div>' +
'</div>' +
'<br />' +
'<div class="row">' +
	'<div class="col-sm-6">' +
		'<button class="btn btn-default" id="select-all">Select All</button> ' +
		'<button class="btn btn-default" id="select-none">Select None</button> ' +
		'<button class="btn btn-default" id="select-withprio">Select With Priority</button>' +
	'</div>' +
	'<div class="col-sm-6 text-right">' +
		'<!-- show only on Archive/Trash -->' +
		'<!--button class="btn btn-default">Restore</button-->' +
		'<div class="btn-group text-left">' +
			'<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Priority <span class="caret"></span></button>' +
			'<ul class="dropdown-menu" role="menu">' +
				'<li><a href="#"><span class="text-danger">High Priority</span></a></li>' +
				'<li><a href="#"><span class="text-warning">Medium Priority</span></a></li>' +
				'<li><a href="#"><span class="text-success">Low Priority</span></a></li>' +
				'<li><a href="#"><span class="text-faded">No Priority</span></a></li>' +
			'</ul>' +
		'</div> ' +
		'<button class="btn btn-default">Archive</button> ' +
		'<button class="btn btn-default"><span class="glyphicon glyphicon-trash"></span></button> ' +
		'<button class="btn btn-primary">Compose</button>' +
	'</div>' +
'</div>' +
'<br />' +
'<div class="row">' +
	'<div class="col-sm-12">' +
		'<div class="panel panel-default">' +
			'<div class="panel-body" style="padding:0px;">' +
				'<table class="table table-hover" id="notes-table" style="margin-bottom:0;">' +
					'<tbody>' +
					'</tbody>' +
				'</table>' +
			'</div>' +
			'<div class="panel-footer text-center" style="padding: 6px 0 2px 0;">' +
				'<nav>' +
					'<ul class="pagination" style="margin: 0;">' +
						'<li><a href="#">&larr; Previous</a></li>' +
						'<li><a href="#">Next &rarr;</a></li>' +
					'</ul>' +
				'</nav>' +
			'</div>' +
		'</div>' +
	'</div>' +
'</div>'

$(document).ready(function(){
	$(skel).insertBefore('.content.maintable')

	// Data population
	$('.container.maintable tr').each(function(){
		msgAnchor = $(this).find('.subject a')
		msgHref = msgAnchor.attr('href')
		msgName = msgAnchor.text()
		msgId = $(this).find('[type=checkbox]').attr('value')
		senderAnchor = $(this).find('a[href*="user/"]')
		senderHref = senderAnchor.attr('href')
		senderName = window.fastyle.truncateName(((t=senderAnchor.text())?t.substring(1):"")||"")
		sentDate = $(this).find('.popup_date').wrap('<span>').html()

		// Skip for rows that aren't actually messages
		if(!senderName){
			console.log("Skipping")
			return true
		}

		$('<tr>').appendTo('#notes-table')
			.append("<td><a href='"+senderHref+"'><img src='//a.facdn.net/"+senderName+".gif' class='small-thumb img img-rounded' /></a> <input type='checkbox' class='note-checkbox' value='"+msgId+"' /></td>")
			.append("<td><a href='"+msgHref+"'>"+msgName+"</a></td>")
			.append("<td><a href='"+senderHref+"'>"+senderName+"</a></td>")
			.append("<td>"+sentDate+"</td>")
	})

	// Formatting. TODO: Make CSS
	$('.small-thumb').css({width:'42px'})
	folder = document.cookie.match(/folder=(.+)/)[1]
	$('a[href*='+folder+']').parent().addClass('active')

	// Event Bindings
	$('#select-all, #select-none').on("click",function(){
		$('.note-checkbox').prop('checked',$(this).is('#select-all'))
	})
	$('')
})