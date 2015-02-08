$(document).ready(function(){
	if(window.fastyle.disabled){return false;}

	// Executes after everything is done
	$('sup, sub').css({top:0,'line-height':'1em'})
	$('.bbcode_center').css({'text-align':'center'})
	$('#news').addClass('alert alert-info')
	$('#search-query').val(sessionStorage.getItem('q'))


	sysmsg = $('.cat b:contains(System Message)').parents('table:first').find('.alt1').html()
	if(sysmsg){
		$('<div class="alert alert-info">' +
			'<strong>System Message</strong>' + sysmsg +
		'</div>').insertAfter('#fastyle-navbar')
	}

	if(!window.fastyle.developerMode) {
		$('.content.maintable').hide()
	}
})