$(document).ready(function(){
	if(window.fastyle.disabled){return false;}

	// Executes after everything is done
	$('sup, sub').css({top:0,'line-height':'1em'})
	$('.bbcode_center').css({'text-align':'center'})
	$('#news').addClass('alert alert-info')
	$('#search-query').val(sessionStorage.getItem('q'))

	if(!window.fastyle.developerMode) {
		$('.content.maintable').hide()
	}
})