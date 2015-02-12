skel = '<div class="row" style="margin:16px 0">' +
		'<div class="col-xs-12">' +
			'<a href="/msg/pms/" class="btn btn-primary">Return to Notes</a>' +
		'</div>' +
	'</div>' +
	'<form action="/msg/send/" method="POST" id="reply-form">' +
	'<input type="hidden" name="key" id="message-key" value="" />' +
	'<input type="hidden" name="submit" value="Post" />' +
	'<div class="row" id="sender-row" style="margin:16px 0">' +
		'<div class="col-sm-12">' +
			'<div class="media">' +
				'<div class="media-left pull-left">' +
					'<a href="" class="sender-anchor"><img class="media-object img-rounded sender-avatar" /></a>' +
				'</div>' +
				'<div class="media-body media-middle">' +
					'<h3 class="message-subject">RE: Love your art!</h4>' +
					'Sent by <a href="" class="sender-name sender-anchor"></a> to <a href="" class="recipient-name recipient-anchor"></a><br>' +
					'<span class="pubdate-wrapper"></span>' +
				'</div>' +
			'</div>' +
		'</div>' +
	'</div>' +
	'<div class="row" id="message-row">' +
		'<div class="col-sm-12">' +
			'<div class="panel panel-default">' +
				'<div class="panel-body message-container">' +
				'</div>' +
				'<div class="panel-footer" style="padding:5px 7px;">' +
					'<div class="row">' +
						'<div class="col-sm-6">' +
							'<div class="btn-group">' +
								'<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">' +
									'<span id="prio-button-label">Priority</span> <span class="caret"></span>' +
								'</button>' +
								'<ul class="dropdown-menu" id="priority-dropdown" role="menu">' +
									'<li><a href="javascript:void(0)" class="priority-option" data-prio="high"><span class="text-danger">High Priority</span></a></li>' +
									'<li><a href="javascript:void(0)" class="priority-option" data-prio="medium"><span class="text-warning">Medium Priority</span></a></li>' +
									'<li><a href="javascript:void(0)" class="priority-option" data-prio="low"><span class="text-success">Low Priority</span></a></li>' +
									'<li><a href="javascript:void(0)" class="priority-option" data-prio="none"><span class="text-faded">No Priority</span></a></li>' +
								'</ul>' +
							'</div>' +
						'</div>' +
						'<div class="col-sm-6 text-right">' +
							/*'<button class="btn btn-default" id="restore-button">Restore</button>' +
							'<button class="btn btn-default" id="archive-button">Archive</button>' +
							'<button class="btn btn-default" id="trash-button"><span class="glyphicon glyphicon-trash"></span></button>' +*/
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
	'</div>' +
	'<div class="row" id="reply-row">' +
		'<div class="col-sm-12">' +
			'<div class="panel panel-default">' +
				'<div class="panel-heading">' +
					'Respond to this Message' +
				'</div>' +
				'<div class="panel-body">' +
					'<form class="horizontal-form">' +
						'<div class="form-group row">' +
							'<label for="reply-to" class="control-label col-sm-2">Recipient</label>' +
							'<div class="col-sm-10">' +
								'<input type="text" class="form-control reply-to" name="to" id="reply-to" placeholder="Enter Username" />' +
							'</div>' +
						'</div>' +
						'<div class="form-group row">' +
							'<label for="reply-subject" class="control-label col-sm-2">Subject</label>' +
							'<div class="col-sm-10">' +
								'<input type="text" name="subject" class="reply-subject form-control" placeholder="Enter Subject" />' +
							'</div>' +
						'</div>' +
						'<div class="form-group row">' +
							/*'<button class="btn btn-default" style="margin-left:15px;">' +
								'<span class="glyphicon glyphicon-bold"></span>' +
							'</button>' +
							'<button class="btn btn-default">' +
								'<span class="glyphicon glyphicon-italic"></span>' +
							'</button>' +
							'<button class="btn btn-default" style="margin-right: 15px;">' +
								'<u style="font-family: serif;">U</u>' +
							'</button>' +
							'<button class="btn btn-default">' +
								'<span class="glyphicon glyphicon-align-left"></span>' +
							'</button>' +
							'<button class="btn btn-default">' +
								'<span class="glyphicon glyphicon-align-center"></span>' +
							'</button>' +
							'<button class="btn btn-default" style="margin-right: 15px;">' +
								'<span class="glyphicon glyphicon-align-right"></span>' +
							'</button>' +
							'<button class="btn btn-default" id="emoticons-popover">&#9786;</button>' +*/
							'<div class="col-sm-12">' +
								'<textarea class="form-control reply-content" name="message" rows="20"></textarea>' +
							'</div>' +
						'</div>' +
					'</form>' +
				'</div>' +
				'<div class="panel-footer text-right" style="padding:5px 7px;">' +
					'<button type="submit" href="javascript:void(0)" class="btn btn-primary">Send</button>' +
				'</div>' +
			'</div>' +
		'</div>' +
	'</div>' +
'</form>'

$(document).ready(function(){
	$(skel).insertBefore('.content.maintable')

	messageId = (t=document.location.pathname.match(/viewmessage\/(\d+)/))?t[1]:0;

	senderName = ""

	if(document.location.href.search('viewmessage')==-1){
		$('#sender-row, #message-row').hide()
	} else {

		// Data Population
		subject = $('font[size=2]').text()
		senderAnchor = $('.viewmessage a[href*=user]:first')
		senderName = $(senderAnchor).text()
		senderHref = $(senderAnchor).attr('href')
		senderAvatar = "//a.facdn.net/"+(senderHref.match(/([^\/]+)\/$/)[1])+".gif"
		recipAnchor = $(senderAnchor).next('a')
		recipName = $(recipAnchor).text()
		recipHref = $(recipAnchor).attr('href')

		messageContainer = $(senderAnchor).parents('.alt1:first')
		pubdate = messageContainer.html().match(/On\:\s([^<]+)/)[1]

		$(messageContainer).find('font').remove()
		$(messageContainer).find('br').slice(0,3).remove()
		messageContent = $(messageContainer).html()
			.replace('[QUOTE]',"<blockquote>").replace('[/QUOTE]',"</blockquote>")
		replySubject = $('#MsgForm [name=subject]').val()
		replyContent = $('#JSMessage').val()

		$('.message-subject').html(subject)
		$('.sender-name').text(senderName)
		$('.sender-anchor').attr('href',senderHref)
		$('.sender-avatar').attr('src',senderAvatar)
		$('.recipient-name').text(recipName)
		$('.recipient-anchor').attr('href',recipHref)
		$('.pubdate-wrapper').text(pubdate)
		$('.message-container').html(messageContent)
		$('.reply-content').val(replyContent)
		$('.reply-subject').val(replySubject)

	}

	if(document.location.href.search("newpm")!=-1){
		senderName = document.location.href.match(/([^\/]+)\/?$/)[1]
	}
	$('#reply-to').val(senderName)
	$('#message-key').val($('#MsgForm [name=key]').val())

	// Formatting
	$('.bbcode_quote').wrapInner('<blockquote>')
	$('.form-group').css({margin:'2px 0'})

	// Event Binding
	if(messageId){
		$('.priority-option').on('click',function(){
			$('#prio-button-label').text('Setting priority...')
			window.fastyle.ajax({
				url: "/msg/pms/",
				data: {
					'manage_notes':'1',
					'items[]': messageId,
					'set_prio': $(this).attr('data-prio')
				},
				success: function(){$('#prio-button-label').text('Priority Set!')},
				error: function(){$('#prio-button-label').text('Error setting priority')}
			})
		})
	}
})