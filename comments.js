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

	var newComment = function(par,src,after){
		if(!(t=$(src).attr('id'))||t.search(/cid\:\d+/)==-1){return null}

		// Fun fact that I didn't know until now: elements with numbers in their IDs
		//	can't be found using jQuery. Therefore, data-cid.
		out = $("<li class='media' id='"+(cid=$(src).attr('id'))+"' data-cid='"+cid+"'>")
		if(after){out.insertAfter(par)} else {out.appendTo(par)}

		out.html($(src).find('.icon').html())
			.find('a').addClass("media-left").end()
			.find('img').addClass('img img-rounded').css({'width':'64px'}).end()
			.css({'margin-left':(100-parseInt($(src).attr('width')))*12})
		bod = $("<div class='media-body'>").appendTo(out)
			.html($(src).find('.replyto-message').html())
			.prepend("<div class='media-heading'><h4><a href='"+$(src).find('.icon a').attr('href')+"'>"+$(src).find('.replyto-name').text()+"</a>&nbsp;</h4></div>")
		$(src).find('.popup_date').remove().appendTo($(bod).find('.media-heading h4')).wrap('<small>')
			.after(" &#183; <a href='javascript:void(0)' class='reply-link' data-comment-id='"+cid+"'>Reply</a>")
		return out
	}

	// Need to do this because WebKit messes up media displays for some reason
	// Sometimes it works, sometimes it doesn't. No clue why :(
	$('.media-body').css({display:'table-cell'})

	num = $('.container-comment').each(function(){
		newComment('#comment-list',this)
		$(this).attr('id',$(this).attr('id')+'-xxx')
	}).length

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
		obj = serialize(this)
		obj.subject = ""
		obj.f = ""
		console.log(obj)
		tgt = (n=obj.replyto)?$('[data-cid="cid:'+n+'"]'):$('#comment-list li.media:last');
		self = this
		$.ajax({
			url: document.location.href,
			type: "POST",
			data:obj,
			complete:function(xhr){
				$(self).find('textarea').val("");
				newComment($(tgt),$($(xhr.responseText).find('.container-comment[data-timestamp!=""] a[href*="copperbadger"]')
				.parents('.container-comment').sort(function(a,b){
					return parseInt($(a).attr('data-timestamp'))>parseInt($(b).attr('data-timestamp'))
				}).last()),true).hide().slideDown()
			}
		})
	})
})