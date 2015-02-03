// Replace native style, make background color transition smooth
precolor = $('body').css('background-color')
	$('body').css({'background-color':precolor})
$('link[rel=stylesheet]').remove()
$('<link rel="stylesheet" href="'+window.fastyle.ss+'" id="stylesheet">').appendTo('head')

$('body').wrapInner('<div class="container" id="body-wrapper"></div>')
$('#body-wrapper').hide()

$(document).ready(function() {

	//banner = $('#fa_header').css('background-image')
	
	logo = $('.falogo').remove()
	$('.ads').remove()

	// Add jQuery to user-side if in developer mode
	if(window.fastyle.developerMode) {
		$('head').append("<script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>")
	}

	$('#body-wrapper').show()
	$('body').css({'background-color':''})
	$('a[name=top]').remove()

	// General Event Bindings
	$('body').on("mouseover",".contain-hover",function(){
		$(this).css({'background-size':'contain'})
			.find('.thumb-title').hide().end()
			.find('.thumb-checkbox').show()
	}).on("mouseout",".contain-hover",function(){
		$(this).css({'background-size':'cover'})
			.find('.thumb-title').show().end()
			.find('.thumb-checkbox').hide()
	})


	theme = window.fastyle.theme
	$('<div id="theme-selector">').prependTo('body')
		.html('<div class="btn-group dropup">' +
			'<button class="btn btn-info dropdown-toggle" id="theme-list-toggle" data-toggle="dropdown" aria-expanded="false">' +
				'Select Theme ' +
				'<span class="caret"></span>' +
				'<span class="sr-only">Toggle Dropdown</span>' +
			'</button>' +
			'<ul class="dropdown-menu" role="menu" id="theme-list"></ul>' +
		'</div>').css({position:'fixed',bottom:'16px',left:'16px','z-index':50})

	themes = ['cerulean','cosmo','cyborg','darkly','flatly','journal','lumen','paper','readable','sandstone','simplex','slate','spacelab','superhero','united','yeti']

	for(t in themes) {
		t = themes[t]
		if(typeof t !="string"){continue;}
		$("<li>").appendTo($('#theme-list'))
			.text(window.fastyle.capitalize(t))
			.wrapInner("<a href='javascript:void(0)' class='theme-anchor' data-theme='"+t+"'>")
	}

	$('body').on('click','.theme-anchor',function(){
		$('#stylesheet').attr('href',"//maxcdn.bootstrapcdn.com/bootswatch/3.3.1/"+$(this).attr('data-theme')+"/bootstrap.min.css")
		window.fastyle.setCookie('theme',$(this).attr('data-theme'))
	})
})