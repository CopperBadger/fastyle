$(document).ready(function(){
	if(window.fastyle.disabled){return false;}

	// Executes after everything is done

	$('a.iconusername img').css({'width':'64px'})
	$('sup, sub').css({top:0,'line-height':'1em'})
	$('.bbcode_center').css({'text-align':'center'})

	if(sessionStorage.getItem('theme')=="superhero") {
		$('.panel-heading .text-muted').css({color:'rgba(255,255,255,0.8)'})
	}

	if(!window.fastyle.developerMode) {
		$('.content.maintable').hide()
	}
})