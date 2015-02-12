// This page is used for both submission control and favorites control,
// so please be mindful that whatever you change will apply to both
// /controls/submissions and /controls/favorites

function renderThumbs(){
	idx = 0
	var newRow = function(){return $("<div class='row well' style='margin:4px 0'>").appendTo('#submission-container')}
	row = newRow()
	$('[alt=thumbnail]').each(function(){

		if(idx++==2){row = newRow();idx = 1}

		par = $(this).parents('td[align=center]:first')

		submissionAnchor = $(par).find('a[href*=view]')
		submissionHref = $(submissionAnchor).attr('href')
		submissionThumb = submissionAnchor.find('img').attr('src')
		deletePath = $(par).find('.hlp').attr('onclick')
			.match(/\'(\/[^\']+)\'/)[1]
		$(par).find('a,br').remove()
		submissionName = $(par).text().replace(/\s*\[\s*\]\s*$/,'')

		$('<div class="col-md-6">' +
			'<div class="row submission-row">' +
				'<div class="col-xs-4">' +
					'<a href="'+submissionHref+'">' +
						'<img src="'+submissionThumb+'" alt="thumbnail" class="img-responsive">' +
					'</a>' +
				'</div>' +
				'<div class="col-xs-8">' +
					'<h4 class="submission-title"><a href="'+submissionHref+'">'+submissionName+'</a></h4>' +
					'<a href="javascript:void(0)" data-delete-path="'+deletePath+'" class="btn btn-danger delete-confirm">Remove</a>' +
				'</div>' +
			'</div>' +
		'</div>').appendTo(row)
	})
}

skel = '<div id="submission-container"></div>' +
'<div class="row">' +
	'<div class="col-xs-12">' +
			'<ul class="pagination">' +
				'<li>' +
					'<a href="" id="prev-page-button">Previous</a>' +
				'</li>' +
				'<li>' +
					'<a href="" id="next-page-button">Next</a>' +
				'</li>' +
			'</ul>' +
	'</div>' +
'</div>'

$(document).ready(function(){
	$(skel).insertBefore('.content.maintable')

	// Function is factored out in case we want to make load pages asynchronously
	renderThumbs()

	// Next / Previous paging buttons
	path = document.location.pathname
	page = path.match(/controls\/([^\/]+)/)[1]
	pageNum = parseInt((t=path.match(/\d+/))?t[0]:0)
	$('#next-page-button').attr('href','/controls/'+page+'/'+(pageNum+1)+'/')
	if(!pageNum) {
		$('#prev-page-button').parent('li').remove()
	} else {
		$('#prev-page-button').attr('href','/controls/'+page+'/'+(pageNum-1)+'/')
	}

	// Event Bindings
	$('.delete-confirm').on("click",function(){
		if(confirm("Are you absolutely sure you want to remove this submission?")){
			tgt = $(this).parents('.submission-row:first').css({opacity:0.8})
			window.fastyle.ajax({
				url: $(this).attr('data-delete-path'),
				success: function(){
					$(tgt).css({opacity:0.2})
						.find('.submission-title').text("Removed")
				}
			})
		}
	})
})