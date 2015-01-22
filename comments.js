$(document).ready(function(){
	console.log("comments.js, reporting in")

	row = $('#comment-wrapper')
	if(!row.length){row = $("<div class='row'>").insertBefore(".content.maintable")}
	row.append("<div class='col-xs-12'>")
	$(row).find('.col-xs-12')
		.html('<div class="panel panel-default">' +
			'<div class="panel-heading" id="commend-header"></div>' +
			'<div class="panel-body"><ul class="media-list" id="comment-list"></ul></div>' +
		'</div>')

	var newComment = function(par,src){
		//if(par){par = $(par).find('.media-body:first')}
		out = $("<li class='media' id='"+$(src).attr('id')+"'>").appendTo(par||outWrapper)
			.html($(src).find('.icon').html())
				.find('a').addClass("media-left").end()
				.find('img').addClass('img img-rounded').css({'width':'64px'}).end()
				.css({'margin-left':(100-parseInt($(src).attr('width')))*12})
		bod = $("<div class='media-body'>").appendTo(out)
			.html($(src).find('.replyto-message').html())
			.prepend("<div class='media-heading'><h4><a href='"+$(src).find('.icon a').attr('href')+"'>"+$(src).find('.replyto-name').text()+"</a>&nbsp;</h4></div>")
		$(src).find('.popup_date').remove().appendTo($(bod).find('.media-heading h4')).wrap('<small>')
		return out
	}

	num = $('.container-comment').each(function(){
		newComment('#comment-list',this)
	}).remove().length

	$("#commend-header").html("Comments &#183; "+num)
})