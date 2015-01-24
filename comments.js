function serialize(el) {
  var MD5 = function(src){return "";} //Dummy encryption function
  var o={};
  $.map($(el).find('input:not([type=radio]:not(:checked)), select, textarea'),function(e) {
    if(n=(e=$(e)).prop('name')) {
      o[n]=((e.is('[type=password]'))
        ?MD5(e.val())
        :((e.is('[type=checkbox]'))
          ?e.is(':checked')
          :e.val()));
    }
  });
  return o;
}

function makeCommentForm(cid) {
	return '<form action="javascript:void(0)" class="form well comment-form">' +
		'<input type="hidden" name="action" value="replyto" />' +
		'<input type="hidden" name="replyto" value="'+(cid||'')+'" />' +
		'<div class="form-group">' +
			'<label class="control-label" for="reply-input">Reply</label>' +
			'<textarea class="form-control" name="reply" id="reply-input"></textarea>' +
		'</div>' +
		'<div class="form-group">' +
			'<input class="btn btn-default pull-right" type="submit" value="Reply" />' +
		'</div>' +
	'</form>'
}

$(document).ready(function(){
	if(window.fastyle.disabled){return false;}

	row = $('#comment-wrapper')
	if(!row.length){row = $("<div class='row'>").insertBefore(".content.maintable")}
	row.append("<div class='col-xs-12'>")
	$(row).find('.col-xs-12')
		.html('<div class="panel panel-default">' +
			'<div class="panel-heading" id="comment-header"></div>' +
			'<div class="panel-body"><ul class="media-list" id="comment-list"></ul></div>' +
		'</div>')

	var newComment = function(par,src){
		if(!(t=$(src).attr('id'))||t.search(/cid\:\d+/)==-1){return null}
		out = $("<li class='media' id='"+$(src).attr('id')+"'>").appendTo(par)
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

	// Need to do this because WebKit messes up media displays for some reason
	// Sometimes it works, sometimes it doesn't. No clue why :(
	$('.media-body').css({display:'table-cell'})

	num = $('.container-comment').each(function(){
		newComment('#comment-list',this)
	}).length

	$("#comment-header").html("Comments &#183; "+num)

	$('<div id="comment-form-wrapper"></div>').insertAfter('#comment-list')
		.html("<h3>Comment form under development <em>right now</em>.</h3>")
		//.html(makeCommentForm())
	/*
	var getId = function(e){
		return parseInt(t=((t=$(e).attr('id'))?t.match(/\d+/):["0","0"])?t[1]:0)
	}

	$('body').on("submit",".comment-form",function(){
		obj = serialize(this)
		console.log(obj)
		tgt = (n=obj.replyto)?$('#cid:'+n):$('.container-comment:last');
		self = this
		$.ajax({
			url: document.location.href,
			type: "POST",
			data:obj,
			complete:function(xhr){
				$(self).find('textarea').val();
				newComment($('#comment-list'),$(xhr.responseText)
					.find('.container-comment a[href*='+window.fastyle.truncateduname+']')
					.parents('.container-comment').sort(function(a,b){return getId(a)>getId(b)})
					.remove()).remove().insertAfter(tgt).hide().slideDown()
			}
		})
	})*/
})