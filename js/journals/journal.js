$(document).ready(function(){
	row = $("<div class='row'>").insertBefore(".content.maintable")

	$('.owner_edit_journal').remove()
	author = $('.content.maintable').find('a[href^="/user"]:first')
	tab = author.parents('table:first')
	title = $(tab).find('.no_overflow').text().trim()
	authorHref = author.attr('href')
	authorName = author.text()
	authorAvatar = tab.find('img').attr('src')
	pubDate = $(tab).find('.popup_date')

	$("<div class='col-xs-12'>").appendTo(row)
		.html('<div class="media">' +
			'<div class="media-left"><a href="'+authorHref+'"><img src="'+authorAvatar+'" class="img img-rounded" alt="'+authorName+'"></a></div>' +
			'<div class="media-body">' +
				'<div class="media-heading" id="journal-heading">' +
					'<h3>'+title+'</h3>' +
					'by <a href="'+authorHref+'">'+authorName+'</a>, ' +
				'</div>' +
			'</div>' +
		'</div>').css({'padding-bottom':'16px'})

	tab = tab.parents('table:first')

	row = $("<div class='row' style='margin:16px 0'>").insertBefore(".content.maintable")

	$('#journal-heading').append(pubDate.remove())

	$("<div class='col-xs-12 well allow-previews'>").appendTo(row)
		.html($(tab).find('td.alt1 .no_overflow').html())
})