submissionSkel = '<div class="container">' +
	'<div class="row">' +
		'<div class="col-xs-12 media">' +
			'<div class="media-left">' +
				'<a href="" class="author-anchor">' +
					'<img src="" alt="" class="author-avatar img-rounded">' +
				'</a>' +
			'</div>' +
			'<div class="media-body">' +
				'<div class="media-heading">' +
					'<h3 class="submission-title"></h3>' +
				'</div>' +
				'<span id="submission-subtitle">' +
					'by <a href="" class="author-anchor author-display" id="author-name"></a>, ' +
				'</span>' +
			'</div>' +
		'</div>' +
	'</div>' +
'</div>' +
'<div class="container-fluid" style="text-align:center;margin:16px 0;">' +
	'<div class="row">' +
		'<div class="col-xs-12" id="submission-wrapper"></div>' +
	'</div>' +
'</div>' +
'<div class="container" id="bottom-container">' +
	'<div class="row">' +
		'<div class="col-xs-12">' +
			'<nav id="pager-container">' +
				'<ul class="pager"></ul>' +
			'</nav>' +
			'<div class="panel panel-default">' +
				'<div class="panel-body">' +
					'<div class="row">' +
						'<div class="col-xs-12" style="margin-bottom:16px">' +
							'<div class="btn-group" id="action-well"></div>' +
						'</div>' +
					'</div>' +
					'<div class="row">' +
						'<div class="col-md-8">' +
							'<div id="author-information"></div>' +
						'</div>' +
						'<div class="col-md-4" id="submission-information"></div>' +
					'</div>' +
				'</div>' +
				'<div class="panel-footer">' +
					'<ul class="btn-group" id="keyword-well" style="padding-left:0"></ul>' +
				'</div>' +
			'</div>' +
		'</div>' +
	'</div>' +
	'<div class="row" id="comment-wrapper"></div>' +
'</div>'

$(document).ready(function() {
	$(submissionSkel).insertAfter("#body-wrapper")

	// Data population
	subimg = $('#submissionImg')
	subimgSrc = subimg.attr('src')
	subimgName = $('.maintable .cat>b:first').text()
	audio = (t=(t=$('embed[src="/embed/player.swf"]').attr('flashvars')||"").match(/file=(.+)$/))?t[1]:null;
	text = $('strong:contains(File type)').parents('td').html()
	flash = $('object[type="application/x-shockwave-flash"]')

	infoWrapper = $('b:contains(Submission information)').parents('td:first')
	author = $(infoWrapper).parents('table').eq(1).find('a[href*="/user"]')
	authorHref = author.eq(0).attr('href')
	authorName = author.eq(0).text()
	authorAvatar = author.eq(1).find('img').attr('src')
	submissionInformation = ((h=$(infoWrapper).html()).substring(0,(x=h.search(q='<b>Keywords'))!=-1?x:h.length))

	tmp = $(author).eq(1).parents()
	$(author).eq(1).remove()
	description = $(tmp).html()

	pubdate = $('.popup_date:first').wrap('<span>').parent().html()
	eval($('.alt1 script').text()) // Grab image urls

	// -- Header
	$('.author-anchor').attr('href',authorHref)
	$('.author-avatar').attr('src',authorAvatar)
		.attr('alt',authorName)
	$('.author-display').text(authorName)
	$('#submission-subtitle').append(pubdate)
	$('.submission-title').text(subimgName)

	// -- Submission Content
	if(subimgSrc){
		$('#submission-wrapper').append("<img src='"+subimgSrc+"' id='submission-image'/>")
	}
	if(audio){
		$('#submission-wrapper')
			.append("<br><a href='"+audio+"' class='btn btn-primary' style='margin:4px;' download>Download</a>")
			.append("<br><audio controls='controls'><source src='"+audio+"' /></audio>")
	}
	if(flash.length){
		$('#submission-wrapper').append(flash.remove())
	}

	// -- Pager
	if((pb = $('.prev.button')).length){$(pb).wrap("<li class='previous'>").parent().remove().appendTo('.pager')}
	if((nb = $('.next.button')).length){$(nb).wrap("<li class='next'>").parent().remove().appendTo('.pager')}

	// -- Information
	$('.actions b a').each(function(){
		$(this).addClass("btn btn-primary").remove().appendTo('#action-well')
	})

	// -- (Append YouTube embeds in description)
	videoIDs = window.fastyle.getYouTubeIDs(description)
	for(v in videoIDs) {
		description += '<hr><div class="embed-responsive embed-responsive-16by9"><iframe src="//www.youtube.com/embed/'+videoIDs[v]+'" class="embed-responsive-item" frameborder="0" allowfullscreen> </iframe></div>'
	}

	$('#author-information').html(description)
	$('#submission-information').html(submissionInformation)
	if(text){$('#author-information').append("<hr><h4>File Text</h4>"+text)}

	// -- Keywords

	keywordAnchors = $('#keywords a')
	if(keywordAnchors.length){
		$(keywordAnchors).each(function(){
			if($(this).text()){
				$('#keyword-well').append("<a href='"+$(this).attr('href')+"' class='btn btn-default'>"+$(this).text()+"</a>")
			}
		})
	} else {
		if(!keywordAnchors.length){
			$('#keyword-wrapper').html("<em>No Keywords</em>")
		}
	}

	// Move footer inside new container
	$('.footer').remove().appendTo('#bottom-container')

	// Evevnt Bindings

	// -- Clicking submission image
	$('#submission-image').click(function(){
		h = $(this).attr('src')
		$(this).attr('src',h.search(/\/\/t/)!=-1?full_url:small_url)
	}).css({cursor:'pointer',margin:'16px 0'})

	// -- Favorite button
	$('a[href^="/fav/"]').on("click",function(){
		msg = $(this).text().search("Remove")!=-1?"Unfaved":"Faved!"
		$(this).text(window.fastyle.funTitles[Math.floor(Math.random()*window.fastyle.funTitles.length)])
		self = this
		$.ajax({
			url:$(this).attr("href"),
			type:"GET",
			complete:function(xhr){
				$(self).text(msg)
					.unbind("click")
					.on("click",function(){return false})
			}
		})
		return false
	})

	// -- Next and previous arrow keys
	setTimeout(function(){
		$(document).on("keyup",function(e){
			if($(e.target).is('body')){
				if(e.which==37){document.location=$('.prev.button').attr('href')}
				if(e.which==39){document.location=$('.next.button').attr('href')}
			}
		})
	},1000)

})