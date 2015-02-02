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

	var newRow = function(){return $("<div class='row' style='margin:16px 0'>").insertBefore('.content.maintable')}

	row = newRow()

	$(row).append("<div class='col-md-12'><div class='pull-right'><button class='btn btn-danger' id='everything-nuke'>Nuke It All!</button></div></div>")

	$('#everything-nuke').on("click",function(){
		dat = {}
		$.map($('.list-group-item [type=checkbox]'),function(e){
			if(!dat[n=(e=$(e)).attr('name')]){dat[n]=[]}
			dat[n].push($(e).attr('value'))
		})
		dat['remove-all'] = "Global remove selected"
		$('.panel').css({opacity:0.8})
		$.ajax({
			url:"/msg/others/",
			type: "POST",
			data: dat,
			complete: function(){
				$('.panel').fadeOut(function(){$(this).remove()})
			}
		})
	})

	$('.message-stream').each(function() {
		row = newRow()
		col = $("<div class='col-xs-12'>").appendTo(row)
		pan = $("<div class='panel panel-default'>").appendTo(col)
			.append("<div class='panel-heading'>")

		title = $(this).prev("h3").text()
		$(pan).find('.panel-heading').text(title)
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
		nukeButton = $(this).parent().find('[name^=nuke]')
		actions = $(list).find('.list-group-item:last')
		$("<li class='list-group-item'>").appendTo(list)
			.html('<button class="btn btn-default select-all">Select All</button> ' +
			'<button class="btn btn-default deselect-all">Deselect All</button> ' +
			'<button class="btn btn-primary messages-clear" name="'+submitButton.attr('name')+'">Remove Selected</button> ' +
			'<button class="btn btn-danger messages-nuke" name="'+nukeButton.attr('name')+'" data-value="'+nukeButton.attr('value')+'">Nuke '+title+'</button>')
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

	$('.messages-nuke').on("click",function(){
		tgt = $(this).parents('ul').find('a.list-group-item').css({opacity:'0.8'})
		dat = {};
		dat[$(this).attr('name')] = $(this).attr('data-value')
		$.ajax({
			url: "/msg/others/",
			type: "POST",
			data: dat,
			complete:function(xhr){
				$(tgt).slideUp(function(){$(this).remove()})
			}
		})
	})

	// Add avatars
	$('.list-group-item').css({padding:'4px'}).find('a[href^="/user"]:first').each(function(){
		uname = (t=$(this).attr('href').match(/([^\/]+)\/$/))?t[1]:""
		if(uname) {
			$("<img src='http://a.facdn.net/"+uname+".gif' class='img img-rounded' />").prependTo($(this).parents('.list-group-item'))
				.wrap("<a href='"+$(this).attr("href")+"'>")
				.css({width:'42px','margin-right':'8px'})
		}
	}).end().find('table').remove().end().find('.info').css({display:'inline'})
})