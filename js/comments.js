function makeCommentForm(cid) {
	cidn = cid&&cid.match(/\d+$/)[0]
	return '<form action="javascript:void(0)" class="form well comment-form" '+((cid)?'style="margin-left:'+($('[data-cid="'+cid+'"]').css('margin-left')):"")+'">' +
		'<input type="hidden" name="action" value="'+((cid)?'replyto':'reply')+'" />' +
		'<input type="hidden" name="replyto" value="'+(cidn||'')+'" />' +
		'<div class="form-group">' +
			'<label class="control-label" for="reply-input">Reply</label>' +
			'<textarea class="form-control" name="reply" id="reply-input"></textarea>' +
		'</div>' +
		'<div class="form-group">' +
			'<input class="btn btn-default pull-right" type="submit" value="Reply" />' +
		'</div>' +
	'</form>'
}

function makeSubmissionPreview(subLink, linkElement) {
	subLink = subLink.replace(/https?\:/,'')
	$(linkElement).addClass('preview-built').text("Fetching preview...")
	$.ajax({
		context: linkElement,
		url : subLink,
		dataType : 'html',
		success: function(data){
			var pageData = $(data);
			var subImg = pageData.find("#submissionImg").attr('src');
			var subTitle = pageData.find("#submissionImg").attr('alt');
			
			var infoWrapper = pageData.find('b:contains(Submission information)').parents('td:first');
			var author = pageData.find(infoWrapper).parents('table').eq(1).find('a[href*="/user"]');
			var authorHref = author.eq(0).attr('href');
			var authorName = author.eq(0).text();
			
			$(this).append('<img src="' + subImg + '" class="hidden popover-img-preload" />');
			
			$(".popover-img-preload").load(function(){
				linkElement.text("Preview").popover({
					html: true,
					placement: 'auto top',
					title: "Submission Preview",
					trigger: 'click',
					content: '<strong>' + subTitle +'</strong><br>' +
								'<img src="' + subImg + '" class="img-responsive pull-left" style="width:50%; margin:5px 10px 15px 0;" />'+
								'by ~<a href="'+authorHref+'">' + authorName +'</a><br />'+
								'<a href="'+ subLink +'" class="btn btn-primary">Open &gt;</a>',
					template: '<div class="popover" role="tooltip" style="width:360px;">' +
								'<div class="arrow"></div>' +
								'<h3 class="popover-title"></h3>' + 
								'<div class="popover-content"></div>' +
								'</div>'
				}).popover('show');	
			})
		},
		error: function (){
			console.error("Error building popover!");
		}
	});
}

$(document).ready(function() {
	row = $('#comment-wrapper')

	if(!row.length){row = $("<div class='row'>").insertBefore(".content.maintable")}
	row.append("<div class='col-xs-12'>")
	$(row).find('.col-xs-12')
		.html('<div class="panel panel-default">' +
			'<div class="panel-heading" id="comment-header"></div>' +
			'<div class="panel-body"><ul class="media-list" id="comment-list"></ul></div>' +
		'</div>')

	authorName = $('#author-name').text()
	mentioned = $.map($('#author-information a[href*="/user"]'),function(e){
		return (t=$(e).attr('href').match(/user\/([^\/]+)\/?$/))?t[1]:null;
	})

	var newComment = function(par,src,after){
		if(!(t=$(src).attr('id'))||t.search(/cid\:\d+/)==-1){return null}

		posterIconAnchor = $(src).find('.icon a')
		posterHref = posterIconAnchor.attr('href')
		posterTruncated = posterHref.match(/user\/([^\/]+)\/?/)[1]
		posterAvatar = posterIconAnchor.find('img').attr('src')
		posterName = $(src).find('.replyto-name').text()
		commentContent = $(src).find('.replyto-message').html()
		videoIDs = window.fastyle.getYouTubeIDs(commentContent)
		pubdate = $(src).find('.popup_date').wrap('<span>').parent().html()
		commentID = $(src).attr('id')
		byAuthor = (posterName==authorName)
		byYou = (posterName==window.fastyle.truncatedName)
		byMentioned = false; for(m in mentioned){
			if(posterTruncated==mentioned[m]){
				byMentioned=true
			}
		}


		// Fun fact that I didn't know until now: elements with numbers in their IDs
		//	can't be found using jQuery. Therefore, data-cid.
		o = $('<li class="media" id="'+commentID+'" data-cid="'+commentID+'" style="margin-left:'+((100-parseInt($(src).attr('width')))*12)+'px">' +
			'<div class="media-left">' +
				'<a href="'+posterHref+'">' +
					'<img src="'+posterAvatar+'" alt="'+posterName+'" class="img img-rounded medium-thumb media-object" />' +
				'</a>' +
			'</div>' +
			'<div class="media-body" style="width:100%">' +
				'<div class="media-heading">' +
					'<h4>' +
						'<a href="'+posterHref+'">'+posterName+'</a> ' +
						'<small>' +
							((byAuthor)?"<span title='Submitter' class='label label-primary'>S</span> ":"") +
							((byYou)?"<span class='label label-info'>You</span> ":"") +
							((byMentioned)?"<span title='Mentioned in Description' class='label label-success'>Mentioned</span> ":"") +
							pubdate +
							' &#183; ' +
							'<a href="javascript:void(0)" class="reply-link" data-comment-id="'+commentID+'">Reply</a>' +
						'</small>' +
					'</h4>' +
				'</div>' +
				commentContent +
			'</div>' +
		'</li>')

		if(after){o.insertAfter(par)} else {o.appendTo(par)}

		// Add submission preview links
		$('a[href*="furaffinity.net/view"]:not(.popover-bound), a[href*="furaffinity.net/full"]:not(.popover-bound)').each(function(){
			var link = $(this).attr('href');
			console.log("Writing new popover anchor for "+link)
			$(this).after('&nbsp;<a href="javascript:void(0)" class="label label-primary label-sub-preview" data-link="'+ link +'">Preview</span>')
		}).addClass('popover-bound');

		if(videoIDs.length){
			$('<button class="btn btn-default btn-xs show-youtube-embeds-button" data-video-ids="'+videoIDs.join(',')+'" type="button">Show Linked Video'+((videoIDs.length>1)?"s":"")+'</button>')
				.appendTo($(o).find('.media-body'))
		}

		return o
	}

	num = $('.container-comment').each(function(){
		newComment('#comment-list',this)
		$(this).attr('id',$(this).attr('id')+'-xxx')
	}).length

	// Need to do this because WebKit messes up media displays for some reason
	// Sometimes it works, sometimes it doesn't. No clue why :(
	$('.media-body').css({display:'table-cell'})

	$('.reply-link').on("click",function(){
		par = $(this).parents('li:first')
		if($(par).is('.reply-form-open')){
			$(par).removeClass('reply-form-open')
			.next('li').slideUp(function(){$(this).remove();})
		} else {
			$(par).addClass('reply-form-open')
			$("<li class='media'>").insertAfter($(this).parents('li:first'))
				.hide()
				.html(makeCommentForm($(this).attr('data-comment-id')))
				.slideDown()
			
		}
	})

	$("#comment-header").html("Comments &#183; "+num)

	$('<div id="comment-form-wrapper"></div>').insertAfter('#comment-list')
		.html(makeCommentForm())
	
	var getId = function(e){
		return parseInt(t=((t=$(e).attr('id'))?t.match(/\d+/):["0","0"])?t[1]:0)
	}

	$('body').on("submit",".comment-form",function(){
		obj = window.fastyle.serialize(this)
		obj.subject = ""
		obj.f = ""
		target = after = undefined
		target = (after=!!(n=obj.replyto))?$('[data-cid="cid:'+n+'"]'):$('#comment-list li.media:last');
		self = this
		$.ajax({
			url: document.location.href,
			type: "POST",
			data:obj,
			complete:function(xhr){
				$(self).find('textarea').val("");
				newComment($(target),$(
					$(xhr.responseText).find('.container-comment[data-timestamp!=""] a[href*="user"]')
					.parents('.container-comment').sort(function(a,b){
						return parseInt($(a).attr('data-timestamp'))>parseInt($(b).attr('data-timestamp'))
					}).last()),after
				).hide().slideDown()
			}
		})
	}).on("click",".show-youtube-embeds-button:not(.opened)",function(){
		$(this).addClass('opened')
		par = $(this).parents('.media-body')
		ids = $(this).attr('data-video-ids').split(',')
		console.log(par)
		for(vid in ids){
			$(par).append('<hr>')
				.append('<div class="embed-responsive embed-responsive-16by9"><iframe src="//www.youtube.com/embed/'+ids[vid]+'" class="embed-responsive-item" frameborder="0" allowfullscreen> </iframe></div>')
		}
	}).on('click','.label-sub-preview', function(e){
		if (!$(this).hasClass('preview-built')){
			var link = $(this).data('link');
			makeSubmissionPreview(link, $(this));
		}
	});
})