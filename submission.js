$(document).ready(function() {
	if(window.fastyle.disabled){return false;}
	
	row = $('<div class="row">').insertBefore(".content.maintable")

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
	pubdate = $('.popup_date:first').wrap('<span>').parent().html()

	// Header
	$('<div class="col-xs-12 media">').appendTo(row)
		.html("<div class='media-left'><a href='"+authorHref+"'><img src='"+authorAvatar+"' class='img img-rounded' /></a></div><div class='media-body'><div class='media-heading'><h3>"+subimgName+"</h3></div>by <a href='"+authorHref+"'>"+authorName+"</a>, "+pubdate+"</div>")

	// Submission Content
	eval($('.alt1 script').text()) // Grab image urls

	imgwrap = $('<div class="container-fluid">').css({'text-align':'center',margin:'16px 0'}).insertAfter($(".container:first"))
	$(imgwrap).html("<div class='row'><div class='col-xs-12' id='submission-wrapper'></div>")
	if(subimgSrc){
		$('#submission-wrapper').append("<img src='"+subimgSrc+"' id='sub-img'/>")
	}
	if(audio){
		$('#submission-wrapper')
			.append("<br><a href='"+audio+"' class='btn btn-primary' style='margin:4px;' download>Download</a>")
			.append("<br><audio controls='controls'><source src='"+audio+"' /></audio>")
	}
	if(flash.length){
		$('#submission-wrapper').append(flash.remove())
	}

	$('#sub-img').click(function(){
		h = $(this).attr('src')
		$(this).attr('src',h.search(/\/\/t/)!=-1?full_url:small_url)
	}).css({cursor:'pointer',margin:'16px 0'})

	// Information
	infowrap = $('<div class="container">').insertAfter(imgwrap)
	row = $('<div class="row">').appendTo(infowrap)

	authorwrap = $('<div class="col-xs-12">').appendTo(row)
	$('<div class="panel panel-default" id="author-info">').appendTo(authorwrap)
		.append("<div class='panel-body'>")
	$('#author-info .panel-body')
		.append("<div id='sub-info-wrapper'><div class='btn-group' id='button-well'></div></div>")

	$('.actions b a').each(function(){
		$(this).addClass("btn btn-primary").remove().appendTo('#button-well')
	})

	description = $(author).eq(1).parents()
	$(author).eq(1).remove()

	$('#sub-info-wrapper').append("<div class='row'><div class='col-md-8' id='sub-info'>" +
		description.html() + "</div><div class='col-md-4' style='padding:8px 0'>" +
		(h=$(infoWrapper).html()).substring(0,(x=h.search(q='<b>Keywords'))!=-1?x:h.length) +
	"</div></div>")

	// Detect YouTube videos and embed
	videoids = {};
	$('#sub-info a[href*=youtu]').each(function(){
		if(id=(t=$(this).attr('href').match(/(?:v=|\.be\/)(.{11})/))?t[1]:""){
			videoids[id] = 1
		}
	})
	for(v in videoids){
		$('#sub-info')
			.append('<hr>')
			.append('<div class="embed-responsive embed-responsive-16by9"><iframe src="//www.youtube.com/embed/'+v+'" class="embed-responsive-item" frameborder="0" allowfullscreen> </iframe></div>')
	}

	if(text){$('#sub-info').append("<hr><h4>File Text</h4>"+text)}

	// Keywords
	$("<ul class='list-group'><li class='list-group-item' id='keyword-wrapper'></li></ul>").appendTo('#author-info')
	w = $('#keyword-wrapper')
	keywordAnchors = $('#keywords a')
	keywordAnchors.each(function(){
		if($(this).text()){
			w.append("<a href='"+$(this).attr('href')+"' class='btn btn-default' style='margin:2px;'>"+$(this).text()+"</a>")
			
		}
	})
	if(!keywordAnchors.length){
		$('#keyword-wrapper').html("<em>No Keywords</em>")
	}

	// Prepare comment wrapper
	row = $('<div class="row" id="comment-wrapper">').appendTo(infowrap)
	commentwrap = $('<div class="col-md-12">').appendTo(row)

	$('.footer').remove().insertAfter(infowrap)

	// Make favorite button asynchronous
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

})