$(document).ready(function(){
	row = $("<div class='row'>").insertBefore('.content.maintable')
	col = $("<div class='col-xs-12'>").appendTo(row)
	pan = $("<div class='panel panel-default'>").appendTo(col)
		.append("<div class='panel-heading'>Messages</div>")
	list = $('<ul class="list-group">').appendTo(pan)
	$('.content.maintable a[href*="submissions"]:first').parent().children("a").each(function(){
		$(this).addClass('list-group-item').remove().appendTo(list)
	})
})