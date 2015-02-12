statSkel = '<table class="table table-hover" id="submissions-stats-table">' +
	'<colgroup>' +
		'<col>' +
		'<col style="width:64px">' +
		'<col style="width:64px">' +
		'<col style="width:64px">' +
		'<col style="text-align:right;">' +
	'</colgroup>' +
	'<tr>' +
		'<th>Title</th>' +
		'<th>' +
			'<a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="Views" data-field="views">' +
				'<span class="glyphicon glyphicon-eye-open"></span></th>' +
			'</a>' +
		'<th>' +
			'<a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="Favorites" data-field="favorites">' +
				'<span class="glyphicon glyphicon-heart"></span></th>' +
			'</a>' +
		'<th>' +
			'<a href="javascript:void(0)" data-toggle="tooltip" data-placement="bottom" title="Comments" data-field="comments">' +
				'<span class="glyphicon glyphicon-comment"></span></th>' +
			'</a>' +
		'<th>' +
			'<a href="javascript:void(0)" data-field="date">Date</a>' +
		'</th>' +
	'</tr>' +
'</table>' +
'<button class="btn btn-primary" id="more-button">Load More</button>'

function renderSubmissions(src){
	submissionTable = $('#submissions-stats-table')
	return $(src||'body').find('.submissions tr[id]').each(function(){
		infoList = $(this).find('.info')
		subAnchor = $(infoList).find('dt a')
		$(infoList).find('dd span').remove()

		imgSrc = $(this).find('[alt=thumb]')
		title = $(subAnchor).text()
		href = $(subAnchor).attr('href')
		pubDate = $(infoList).find('.popup_date').wrap('<span>').parent().html()
		views = $(infoList).find('dd:nth-child(2)').text().trim()
		favorites = $(infoList).find('dd:nth-child(3) a').text().trim()
		comments = $(infoList).find('dd:nth-child(4)').text().trim()

		$('<tr>' +
			'<td><a href="'+href+'">'+title+'</a></td>' +
			'<td>'+views+'</td>' +
			'<td>'+favorites+'</td>' +
			'<td>'+comments+'</td>' +
			'<td>'+pubDate+'</td>' +
		'</tr>').appendTo(submissionTable)
	}).length
}

$(document).ready(function(){

	// Data population + formatting
	$(statSkel).insertBefore('.content.maintable')
	renderSubmissions()

	pageForm = $('form[name=replyform]:first')
	pageParameters = window.fastyle.serialize(pageForm)
	window.fastyle.statsPage = 1

	// -- Decorate default selected header
	sortField = $(pageForm).find('[name=sort-field]').val()
	$('th').find('a[data-field='+sortField+']').parents('th:first').addClass('active')

	// Event Bindings
	$('body').on('click','#more-button:not(.processing)',function(){
		$(this).text("Loading...").addClass('processing')
		done = function(){$('#more-button').text("Nothing more to load")}
		window.fastyle.ajax({
			url: document.location.pathname+(++window.fastyle.statsPage)+"/",
			data: pageParameters,
			success:function(res){
				if(renderSubmissions(res)!=0){
					$('#more-button').removeClass('processing').text("Load More")
				} else {done()}
			},
			error: done
		})
	})

	$('th a[data-field]').on('click',function(){
		$(pageForm).find('[name=sort-field]').val($(this).attr('data-field'))
			.end().submit()
	})
})