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
		'<button class="btn btn-default" id="restore-button" style="display:none">Restore</button> ' +
		'<div class="btn-group text-left">' +
			'<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Priority <span class="caret"></span></button>' +
			'<ul class="dropdown-menu prio-menu" role="menu">' +
				'<li><a href="javascript:void(0)" data-prio-param="high"><span class="text-danger">High Priority</span></a></li>' +
				'<li><a href="javascript:void(0)" data-prio-param="medium"><span class="text-warning">Medium Priority</span></a></li>' +
				'<li><a href="javascript:void(0)" data-prio-param="low"><span class="text-success">Low Priority</span></a></li>' +
				'<li><a href="javascript:void(0)" data-prio-param="none"><span class="text-faded">No Priority</span></a></li>' +
			'</ul>' +
		'</div> ' +
		'<button class="btn btn-default" id="archive-button">Archive</button> ' +
		'<button class="btn btn-default" id="trash-button"><span class="glyphicon glyphicon-trash"></span></button> ' +
		'<a href="/msg/compose/" class="btn btn-primary">Compose</a>' +
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

	prios = {low_prio:"success",medium_prio:"warning",high_prio:"danger"}

	// Data population
	$('.container.maintable tr').each(function(){
		msgAnchor = $(this).find('.subject a')
		msgPrio = undefined;for(p in prios){if($(msgAnchor).hasClass(p)){msgPrio=p}}
		msgUnread = $(msgAnchor).hasClass("unread")
		msgHref = msgAnchor.attr('href')
		msgName = msgAnchor.text()
		msgId = $(this).find('[type=checkbox]').attr('value')
		senderAnchor = $(this).find('a[href*="user/"]')
		senderHref = senderAnchor.attr('href')
		senderName = window.fastyle.truncateName(((t=senderAnchor.text())?t.substring(1):"")||"")
		sentDate = $(this).find('.popup_date').wrap('<span>').parent().html()

		// Skip for rows that aren't actually messages
		if(!senderName){return true}

		$('<tr>').appendTo('#notes-table')
			.append("<td><a href='"+senderHref+"'><img src='//a.facdn.net/"+senderName+".gif' class='small-thumb img img-rounded' /></a> <input type='checkbox' class='note-checkbox' value='"+msgId+"' /></td>")
			.append("<td><a href='"+msgHref+"'>"+msgName+"</a></td>")
			.append("<td><a href='"+senderHref+"'>"+senderName+"</a></td>")
			.append("<td>"+sentDate+"</td>")
		.addClass(msgPrio+" "+prios[msgPrio])
		.addClass((msgUnread)?"info":"")
	})

	// Formatting. TODO: Make CSS
	$('.small-thumb').css({width:'42px'})
	folder = document.cookie.match(/folder=([A-Za-z0-9]+)/)[1]
	$('a[href*='+folder+']').parent().addClass('active')
	if(folder=="archive"||folder=="trash"){
		$('#restore-button').show()
		$((folder=='archive')?'#archive-button':'#trash-button').hide()
	}

	// Event Bindings
	$('#select-all, #select-none').on("click",function(){
		$('.note-checkbox').prop('checked',$(this).is('#select-all'))
	})
	$('#select-withprio').on("click",function(){
		$($.map(prios,function(e,i){return "."+i}).join(', ')).find('.note-checkbox').prop('checked',true)
	})
	$('#notes-table tr').on("click",function(){
		$(this).find('.note-checkbox').click()
	})

	var note_action = function(params,callback,prefire){
		dat = {manage_notes: "1"}
		for(k in params){dat[k]=params[k]}
		checkedNotes = $('.note-checkbox:checked')
		dat['items[]'] = $.map(checkedNotes,function(e){return $(e).val()})
		checkedNotes = $(checkedNotes).parents('tr')
		if(prefire){prefire(checkedNotes)}
		window.fastyle.ajax({
			url: "/msg/pms/",
			data: dat,
			complete: function(xhr){callback(xhr,checkedNotes)}
		})
	}

	$('.prio-menu a').on("click",function(){
		prios = {low_prio:"success",medium_prio:"warning",high_prio:"danger"}
		prio = $(this).attr('data-prio-param')
		prio_class = prio + "_prio"
		presentation_class = prios[prio_class]
		remove_prio = (prio == "none")

		note_action({set_prio: prio},function(xhr,checkedNotes) {
			t = null
			all = []
			for(k in prios){all.push(k);all.push(prios[k])}
			t = $(checkedNotes).removeClass(all.join(' '))
			if(!remove_prio) {
				$(checkedNotes).addClass(prio_class+" "+presentation_class)
			}
			$(t).find('.note-checkbox').prop('checked',false)
		})
	})

	$('#archive-button, #trash-button').on("click",function(){
		tgt = ($(this).is('#archive-button'))?"archive":"trash";
		note_action({move_to:tgt},function(xhr,checkedNotes){
			$(checkedNotes).hide("fast",function(){$(this).remove()})
		},function(checkedNotes){
			$(checkedNotes).css({opacity:0.8})
		})
	})
})