skel = '<div class="page-header"><h2>Watch List</h2></div>' +
	'<ul class="pagination"></ul>' +
	'<div id="buddylist-container"></div>' +
	'<ul class="pagination"></ul>' +
'</div>'

$(document).ready(function(){
	$(skel).insertBefore('.content.maintable')

	var newRow = function(){return $('<div class="row well" style="margin:4px 0">').appendTo('#buddylist-container')}
	row = newRow()
	idx = 0
	$('img[src*="a.facdn"]').each(function(){
		if(idx++==2){row=newRow();idx=1}
		buddyAvatar = $(this).attr('src')
		buddyAnchor = $(this).parent("a")
		buddyHref = buddyAnchor.attr('href')
		buddyName = buddyAnchor.text()
		par = $(this).parents("td.alt1:first")
		buddyUnwatch = $(par).find('a[href*="unwatch"]').attr('href')

		$('<div class="col-md-6">' +
			'<div class="row buddy-row">' +
				'<div class="col-xs-4">' +
					'<a href="'+buddyHref+'">' +
						'<img src="'+buddyAvatar+'" alt="thumbnail" class="img-responsive">' +
					'</a>' +
				'</div>' +
				'<div class="col-xs-8">' +
					'<h4 class="buddy-name"><a href="'+buddyHref+'">'+buddyName+'</a></h4>' +
					'<a href="javascript:void(0)" data-delete-path="'+buddyUnwatch+'" class="btn btn-danger delete-confirm">Remove</a>' +
				'</div>' +
			'</div>' +
		'</div>').appendTo(row)

	})

	pages = parseInt((t=$('td.cat:contains(Pages)').text().match(/\((\d+)\)/))?t[1]:0)
	pageNumber = parseInt((t=document.location.href.match(/\/(\d+)\//))?t[1]:1)
	console.log("Pages = "+pages+", pageNumber = "+pageNumber)
	if(pageNumber>1){$('.pagination').prepend("<li><a href='/controls/buddylist/"+(pageNumber-1)+"/'>Previous</a></li>")}
	for(i=1;i<=pages;++i){
		a = $('<li><a href="/controls/buddylist/'+i+'/">'+i+'</a></li>')
			.appendTo('.pagination')
		if(i==pageNumber){$(a).addClass('disabled')}
	}
	$('.pagination').append("<li><a href='/controls/buddylist/"+(pageNumber+1)+"/'>Next</a></li>")

	// Event Bindings
	$('.delete-confirm').on("click",function(){
		if(confirm("Are you sure you want to unwatch this person?")){
			tgt = $(this).parents('.buddy-row').css({opacity:0.8})
			window.fastyle.ajax({
				url: $(this).attr('data-delete-path'),
				success: function(){
					$(tgt).css({opacity:0.2})
						.find('.buddy-name').html("Unwatched")
				}
			})
		}
	})
})