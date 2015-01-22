function renderComments(srcWrapper,outWrapper,startFrom,stack){

	var newComment = function(par,src){
		if(par){par = $(par).find('.media-body:first')}
		out = $("<li class='media' id='"+$(src).attr('id')+"'>").appendTo(par)
			.html($(src).find('.icon').html())
				.find('a').addClass("media-left").end()
				//.find('img').attr('src','http://a.facdn.net/copperbadger.gif').end()
		$("<div class='media-body'>").appendTo(out)
			.html($(src).find('.replyto-message').html())
			.prepend("<div class='media-heading'><h4>"+$(src).find('.replyto-name').text()+"</h4></div>")
		return out
	}
	comment = startFrom||null
	stack = stack||[]

	$(wrapper).find('.container-comment').slice(0,10).each(function(){
		w = parseInt($(this).attr("width"));
		previous = (p=stack[stack.length-1])?p[0]:100;
		console.log("Doing comment #"+$(this).attr('id')+" ("+$(this).find('.replyto-name').text()+") at "+w+", previous = "+previous+", with stack length of "+stack.length+":")
		//console.log(stack)
		if(!stack.length||w==previous) {
			stack.pop()
			comment = (t=stack.pop())?t[1]:undefined;
			stack.push([w,(comment=newComment(comment,this))])
			//console.log("-- Co-level comment")

		// Child comment
		} else if(w<previous) {
			stack.push([w,comment=newComment(comment,this)])
			//console.log("-- Child comment")
		// Parent comment
		} else if(w>previous) {
			while(((t=stack.pop())?t[0]:0)<w){}
			comment=(t=stack.pop())?t[1]:undefined;
			stack.push([w,comment=newComment(comment,this)])
			//console.log("Parent comment")
		}
	}).remove()

	$('.media').css({
		'border-left':'dashed 1px #999'
	})

	return [comment,stack]
}

$(document).ready(function() {
	
	row = $('<div class="row">').insertBefore(".content.maintable")

	subimg = $('#submissionImg')
	subimgSrc = subimg.attr('src')
	subimgName = $('.maintable .cat>b:first').text()
	audio = (t=(t=$('embed[src="/embed/player.swf"]').attr('flashvars')||"").match(/file=(.+)$/))?t[1]:null;
	text = $('strong:contains(File type)').parents('td').html()
	author = $('b:contains(Submission information)').parents('table').eq(1).find('a[href*="/user"]')
	authorHref = author.eq(0).attr('href')
	authorName = author.eq(0).text()
	authorAvatar = author.eq(1).find('img').attr('src')

	eval($('.alt1 script').text()) // Grab image urls

	$('<div class="col-xs-12 media">').appendTo(row)
		.html("<div class='media-left'><a href='"+authorHref+"'><img src='"+authorAvatar+"' class='img img-rounded' /></a></div><div class='media-body'><div class='media-heading'><h3>"+subimgName+"</h3></div>by <a href='"+authorHref+"'>"+authorName+"</a></div>")

	imgwrap = $('<div class="container-fluid">').css({'text-align':'center',margin:'16px 0'}).insertAfter($(".container:first"))
	$(imgwrap).html("<div class='row'><div class='col-xs-12'><img src='"+subimgSrc+"' id='sub-img'/></div>")
	if(audio){
		$('#sub-img').after("<br><audio controls='controls'><source src='"+audio+"' /></audio>")
	}

	$('#sub-img').click(function(){
		h = $(this).attr('src')
		$(this).attr('src',h.search(/\/\/t/)!=-1?full_url:small_url)
	}).css({cursor:'pointer',margin:'16px 0'})

	infowrap = $('<div class="container">').insertAfter(imgwrap)
	row = $('<div class="row">').appendTo(infowrap)

	authorwrap = $('<div class="col-xs-12">').appendTo(row)
	$('<div class="panel panel-default" id="author-info">').appendTo(authorwrap)
		.append("<div class='panel-body'>")
	$('#author-info .panel-body')
		.append("<div class='col-xs-12' id='sub-info'><div class='btn-group' id='button-well'></div>")
		.wrapInner("<div class='row'>")

	$('.actions b a').each(function(){
		$(this).addClass("btn btn-primary").remove().appendTo('#button-well')
	})

	description = $(author).eq(1).parents()
	$(author).eq(1).remove()


	$('#sub-info').append("<div>"+description.html()+"</div>")
	if(text){$('#sub-info').append("<hr><h4>File Text</h4>"+text)}

	row = $('<div class="row" id="comment-wrapper">').appendTo(infowrap)

	commentwrap = $('<div class="col-md-12">').appendTo(row)

	$('.footer').remove().insertAfter(infowrap)

	$('a[href^="/fav"]').on("click",function(){
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