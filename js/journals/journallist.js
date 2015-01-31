$(document).ready(function(){
	row = $("<div class='row'>").insertBefore(".content.maintable")
		.append("<div class='col-xs-4 col-xs-push-8'><div class='panel panel-default'><div class='panel-heading'>All Journals</div><ul class='list-group' id='journal-list'></ul></div></div>")
		.append("<div class='col-xs-8 col-xs-pull-4'><div class='panel panel-default'><div class='panel-heading'>Latest Journal</div><div class='panel-body' id='latest-journal'></div></div></div>")

	latest = $('table[id*=jid]:first');
	$('#latest-journal')
		.html(latest.find('.addpad .no_overflow').html())
	$('<h4>').prependTo($('#latest-journal'))
		.append(latest.find('a:first').remove())

	$('a[href*="#jid"]').each(function(){
		$('<a href="'+$(this).attr('href').replace(/s\/[^\/]+\/#jid:(\d+)/,'/$1')+'" class="list-group-item">'+$(this).text()+'</a>')
			.appendTo('#journal-list')
			.prepend($(this).parents("table:first").find('.popup_date').addClass('pull-right text-muted').remove())
	})

	$('.content.maintable').remove()
})