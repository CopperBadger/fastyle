$(document).ready(function(){
	if(window.fastyle.disabled){return false;}

	// Executes after everything is done
	$('sup, sub').css({top:0,'line-height':'1em'})
	$('.bbcode_center').css({'text-align':'center'})
	$('#news').addClass('alert alert-info')
	$('#search-query').val(sessionStorage.getItem('q'))

	$('[data-toggle="tooltip"]').tooltip()

	// Detect System Messages
	sysmsg = $('.cat b:contains(System Message)').parents('table:first').find('.alt1').html()
	if(sysmsg){
		$('<div class="alert alert-info">' +
			'<strong>System Message</strong>' + sysmsg +
		'</div>').insertAfter('#fastyle-navbar')
	}

	// Arrange Advertisements

	$('.ad').each(function(){
		isBig = parseInt($(this).find('img').attr('height'))>100
		c = $('.ad-container:not(.taken'+((isBig)?', .ad-short-only':'')+'):first').addClass('taken')
		if(c.length){
			$(this).remove().appendTo(c).addClass('placed')
		} else {return false;}
	}).filter(':not(.placed)').each(function(){
		isBig = parseInt($(this).find('img').attr('height'))>100
		c = $('.default-ad-container:not(.taken'+((isBig)?', .ad-short-only':'')+'):first').addClass('taken')
		if(c.length){
			$(this).remove().appendTo(c)
		} else {
			console.warn("Ran out of spaces for ads!")
			$(this).remove().appendTo('.default-ad-container:last')
		}
	})

	if(!window.fastyle.developerMode) {
		$('.content.maintable').hide()
	}
})