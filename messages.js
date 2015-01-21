$(document).ready(function(){
	console.log("messages.js, reporting in")

	var newRow = function(){return $("<div class='row'>").insertBefore('.content.maintable')}

	$('.message-stream').each(function() {
		console.log(row = newRow())
		col = $("<div class='col-xs-12'>").appendTo(row)
		pan = $("<div class='panel panel-default'>").appendTo(col)
			.append("<div class='panel-heading'>")

		$(pan).find('.panel-heading').text($(this).prev("h3").text())
		list = $('<ul class="list-group">').appendTo(pan)
		$(this).find('li').each(function(){
			item = $('<li class="list-group-item"></li>').appendTo(list)
				.attr('data-message-id',$(this).find('input[type=checkbox]').remove().val())
				.prepend($(this).find('.popup_date').addClass('pull-right').remove())
				.append($(this).html())
		})
	})

	$('.list-group-item').css({padding:'4px'}).find('a[href^="/user"]:first').each(function(){
		uname = (t=$(this).attr('href').match(/([^\/]+)\/$/))?t[1]:""
		if(uname) {
			$("<img src='http://a.facdn.net/"+uname+".gif' class='img img-rounded' />").prependTo($(this).parents('.list-group-item'))
				.wrap("<a href='"+$(this).attr("href")+"'>")
				.css({width:'42px','padding-right':'8px'})
		}
	}).end().find('table').remove().end().find('.info').css({display:'inline'})
})