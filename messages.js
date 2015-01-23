function serialize(el) {
  var MD5 = function(src){return "";} //Dummy encryption function
  var o={};
  $.map($(el).find('input:not([type=radio]:not(:checked)), select, textarea'),function(e) {
    if(n=(e=$(e)).prop('name')) {
      o[n]=((e.is('[type=password]'))
        ?MD5(e.val())
        :((e.is('[type=checkbox]'))
          ?e.val()
          :false)
       	)
    }
  });
  return o;
}

$(document).ready(function() {

	var newRow = function(){return $("<div class='row'>").insertBefore('.content.maintable')}

	$('.message-stream').each(function() {
		row = newRow()
		col = $("<div class='col-xs-12'>").appendTo(row)
		pan = $("<div class='panel panel-default'>").appendTo(col)
			.append("<div class='panel-heading'>")

		$(pan).find('.panel-heading').text($(this).prev("h3").text())
		list = $('<ul class="list-group">').appendTo(pan)
		$(this).find('li').each(function(){
			id = (cbx=$(this).find('input[type=checkbox]').remove()).val()
			item = $('<a href="javascript:void(0)" class="list-group-item"></li>').appendTo(list)
				.attr('data-message-id',id)
				.prepend($(this).find('.popup_date').addClass('pull-right').remove())
				.prepend("<input type='checkbox' name='"+$(cbx).attr('name')+"' value='"+id+"' />&ensp;")
				.append($(this).html())
				.click(function(){$(this).find('[type=checkbox]').click()})
		})

		submitButton = $(this).find('.button.remove')
		actions = $(list).find('.list-group-item:last')
		$("<li class='list-group-item'>").appendTo(list)
			.html('<button class="btn btn-default select-all">Select All</button> ' +
			'<button class="btn btn-default deselect-all">Deselect All</button> ' +
			'<button class="btn btn-primary messages-clear" name="'+submitButton.attr('name')+'">Remove Selected</button> ' +
			'<button class="btn btn-default">(Nuke coming soon)</button>')
		$(actions).remove()
	})

	$('.select-all, .deselect-all').on("click",function(){
		$(this).parents('.list-group').find('.list-group-item [type=checkbox]').prop('checked',$(this).is('.select-all'))
	})

	$('.messages-clear').on("click",function(){
		dat = {}
		dat[$(this).attr('name')] = "Remove+selected"
		dat[(checked=$(this).parents('.list-group:first').find(':checked')).first().attr('name')] = $.map(checked,function(e){
			return $(e).attr('value')
		})
		checked.parents('a.list-group-item').css({opacity:0.6})
		list = $(this).parents('.list-group:first')

		$.ajax({
			url: "/msg/others/",
			data: dat,
			type: "POST",
			complete:function(xhr) {
				$(list).find(':checked').parents('a.list-group-item').slideUp(function(){$(this).remove()})
			}
		})
	})

	// Add avatars
	$('.list-group-item').css({padding:'4px'}).find('a[href^="/user"]:first').each(function(){
		uname = (t=$(this).attr('href').match(/([^\/]+)\/$/))?t[1]:""
		if(uname) {
			$("<img src='http://a.facdn.net/"+uname+".gif' class='img img-rounded' />").prependTo($(this).parents('.list-group-item'))
				.wrap("<a href='"+$(this).attr("href")+"'>")
				.css({width:'42px','padding-right':'8px'})
		}
	}).end().find('table').remove().end().find('.info').css({display:'inline'})
})