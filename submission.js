function renderComments(srcWrapper,outWrapper,startFrom,stack){

	var newComment = function(par,src){
		if(par){par = $(par).find('.media-body:first')}
		out = $("<li class='media' id='"+$(src).attr('id')+"'>").appendTo(par||outWrapper)
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

$(document).ready(function(){
	/*wrapper = $('#page-comments');
	if(!wrapper.length) {wrapper = $('b:contains(User comments)').parents("tr:nth-child(2)").next("tr").children("td:first")}
	$(wrapper).attr('align','')

	section = $("<ul class='media-list' id='comments'>").prependTo(wrapper)

	last = renderComments(wrapper,section,null)
	scrollThresh = ($('#comments').position().top+$('#comments').height())-$(window).height()*1.5

	$(document).scroll(function(){
		if(scrollThresh && $(document).scrollTop()>scrollThresh){
			console.log("Doing render...")
			scrollThresh = 0
			last = renderComments(wrapper,section,last[0],last[1])
			scrollThresh = ($('#comments').position().top+$('#comments').height())-$(window).height()*1.5
		}
	})*/

	
	row = $('<div class="row">').insertBefore(".content.maintable")

	subimg = $('#submissionImg')
	subimgSrc = subimg.attr('src')
	subimgName = subimg.attr('alt')
	author = $('b:contains(Submission information)').parents('table').eq(1).find('a[href*="/user"]')
	authorHref = author.eq(0).attr('href')
	authorName = author.eq(0).text()
	authorAvatar = author.eq(1).find('img').attr('src')

	$('<div class="col-xs-12 media">').appendTo(row)
		.html("<div class='media-left'><a href='"+authorHref+"'><img src='"+authorAvatar+"' class='img img-rounded' /></a></div><div class='media-body'><div class='media-heading'><h3>"+subimgName+"</h3></div>by <a href='"+authorHref+"'>"+authorName+"</a></div>")

	imgwrap = $('<div class="container-fluid">').css({'text-align':'center'}).insertAfter($(".container:first"))
	$(imgwrap).html("<div class='row'><div class='col-xs-12'><img src='"+subimgSrc+"' id='sub-img'/></div>")

	$('#sub-img').click(function(){
		h = $(this).attr('src')
		$(this).attr('src',h.search(/\/\/t/)!=-1?full_url:small_url)
	}).css({cursor:'pointer'})

	infowrap = $('<div class="container">').insertAfter(imgwrap)
	row = $('<div class="row">').appendTo(infowrap)

	authorwrap = $('<div class="col-xs-12">').appendTo(row)
	$('<div class="panel panel-default" id="author-info">').appendTo(authorwrap)
		.append("<div class='panel-body'>")
		.css({margin:'16px 0'})
	$('#author-info .panel-body')
		.append("<div class='col-xs-12' id='sub-info'><div class='btn-group' id='button-well'></div>")
		.wrapInner("<div class='row'>")

	$('.actions b a').each(function(){
		$(this).addClass("btn btn-primary").remove().appendTo('#button-well')
	})

	description = $(author).eq(1).parents()
	$(author).eq(1).remove()

	$('#sub-info')
		.append("<div>"+description.html()+"</div>")

	row = $('<div class="row">').appendTo(infowrap)

	commentwrap = $('<div class="col-md-12">').appendTo(row)

	$('.footer').remove().insertAfter(infowrap)
	$('.content.maintable').remove().insertAfter(infowrap)

})