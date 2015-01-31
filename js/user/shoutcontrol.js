skel = '<div class="page-header"><h2>Page Shouts</h2></div>' +
	'<div class="panel panel-default">' +
		'<div class="panel-body" style="padding:0">' +
			'<table class="table table-hover" id="shouts-list" style="margin-botton:0">' +
				'<colgroup>' +
					'<col style="width:80px">' +
					'<col>' +
					'<col style="width:148px">' +
				'</colgroup>' +
			'</table>' +
		'</div>' +
		'<div class="panel-footer">' +
			'<button class="btn btn-default" id="check-all-button">Check All</button>' +
			'<button class="btn btn-default" id="uncheck-all-button">Uncheck All</button>' +
			'<button class="btn btn-danger" id="remove-checked-button">Remove Checked</button>' +
		'</div>' +
	'</div>' +
'</div>'


$(document).ready(function(){
	$(skel).insertBefore('.content.maintable')

	list = $('#shouts-list')
	$('.alt1.bpix.tpix.lpix.rpix.addpad').each(function(){
		shouterAvatar = $(this).find('img').attr('src')
		shouterAnchor = $(this).next('td').find("a")
		shouterHref = shouterAnchor.attr('href')
		shouterName = shouterAnchor.text()
		par = $(this).parents('.maintable:first')
		shoutID = $(par).find('[type=checkbox]').val()
		shoutContent = $(par).find('.no_overflow').html()
		pubDate = $(par).find('.popup_date').addClass('pull-right').wrap('<span>').parent().html()

		$('<tr class="shout-row">' +
			'<td>' +
				'<a href="'+shouterHref+'">' +
				'	<img src="'+shouterAvatar+'" class="small-thumb img img-rounded" />' +
				'</a>' +
				'<input type="checkbox" class="shout-checkbox" name="shouts[]" value="'+shoutID+'" /></td>' +
			'<td>' +
				'<a href="'+shouterHref+'" class="shouter-name">' +
					shouterName +
				'</a>' +
				': '+ shoutContent +
			'</td>' +
			'<td>'+ pubDate +'</td>' +
		'</tr>').appendTo(list)

	})

	// Event Bindings
	$('#check-all-button, #uncheck-all-button').on("click",function(){
		$('.shout-checkbox').prop('checked',$(this).is('#check-all-button'))
	})

	$('#remove-checked-button').on("click",function(){
		checked = $('.shout-checkbox:checked')
		tgt = $(checked).parents('.shout-row')
		shouters = {};
		$(tgt).find('.shouter-name').each(function(){
			if(!shouters[$(this).text()]){
				shouters[$(this).text()]=1
			}
		})
		shouters = $.map(shouters,function(e,i){return i})
		shouterNumber = shouters.length
		shouterSlice = shouters.slice(0,15)
		if(confirm("Are you absolutely sure you want to delete these shouts? This cannot be undone. " +
			"Shouts from the following users will be removed:\n\n" +
			shouterSlice.join('\n') +
			(
				((d=shouterNumber-shouterSlice.length)>0)
				?("\n and "+d+" others.")
				:""
			))) {
			$(tgt).css({opacity:0.8})
			$.ajax({
				url: "/controls/shouts/",
				type: "POST",
				data: {'shouts[]':$.map(checked,function(e){return $(e).val()}),do:'update'},
				complete: function(xhr) {
					$(tgt).hide("fast",function(){$(this).remove()})
				}
			})
		}
	})

	$('#shouts-list tr').on("click",function(){
		$(this).find('.shout-checkbox').click()
	})
})