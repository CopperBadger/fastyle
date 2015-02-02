function capitalize(src){
	return src?(src[0].toUpperCase()+src.substring(1)):src
}

// Replace native style, make background color transition smooth
precolor = $('body').css('background-color')
	$('body').css({'background-color':precolor})
$('link[rel=stylesheet]').remove()
$('<link rel="stylesheet" href="'+window.fastyle.ss+'" id="stylesheet">').appendTo('head')

if(!disabled){
	$('body').wrapInner('<div class="container" id="body-wrapper"></div>')
	$('#body-wrapper').hide()
}

$(document).ready(function() {
	if(window.fastyle.disabled){return false;}

	banner = $('#fa_header').css('background-image')

	
	logo = $('.falogo').remove()
	$('.ads').remove()

	if(window.fastyle.developerMode) {
		$('head').append("<script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>")
	}

	$('#body-wrapper').show()
	$('body').css({'background-color':''})

	$('a[name=top]').remove()
	tabnav = $('.block-menu-top')
	tabnavCol = $(tabnav).find('tr td:first')
	$('<div class="navbar navbar-default">').insertBefore(tabnav)
		.css({'margin-top':'8px'})
		.append("<div class='navbar-header'>")
		.append("<div class='collapse navbar-collapse'>")

	

	{
		var consumebar = function(con,src,right){
			$(con).html(
				$(src).find('ul:first').addClass('nav navbar-nav').addClass(right&&"navbar-right")
				.removeClass('dropdown dropdown-horizontal dropdown-left').end().html()
			).find('.dir').addClass('dropdown-toggle')
				.attr('data-toggle','dropdown').attr('role','button').attr('aria-expanded','false')
				.next('ul').addClass('dropdown-menu')
				.parent('li').addClass("dropdown")
		}

		consumebar('.navbar-header',tabnavCol)
		consumebar('.navbar-collapse',$(tabnavCol).next('td'),true)
		$(tabnav).remove()

		//$('.navbar-collapse .noblock').hide()
		$('.navbar-collapse .noblock').each(function(){
			src = $(this)
			$(src).find('a').each(function(){
				t = $(this).remove()
				if(t.text()){
					t.insertBefore(src).wrap("<li>")
				}
			})
		}).remove()

		$('.dir').each(function(){
			$(this).text($(this).text().match(/[A-Za-z0-9]+/g).join(' '))
				.append("&ensp;<span class='caret'></span>")
		})
	}

	$('#news').addClass('alert alert-info')

	$('body').on("mouseover",".contain-hover",function(){
		$(this).css({'background-size':'contain'})
			.find('.thumb-title').hide().end()
			.find('.thumb-checkbox').show()
	}).on("mouseout",".contain-hover",function(){
		$(this).css({'background-size':'cover'})
			.find('.thumb-title').show().end()
			.find('.thumb-checkbox').hide()
	})

	SFWToggled = parseInt((t=document.cookie.match(/sfw=(\d)/))?t[1]:0)
	$('.navbar-nav a:contains(SFW)').on("click",function(){
		window.fastyle.setCookie('sfw',SFWToggled?'0':'1')
	}).parents('li:first').addClass(SFWToggled?"active":"")

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
			.text(capitalize(t))
			.wrapInner("<a href='javascript:void(0)' class='theme-anchor' data-theme='"+t+"'>")
	}

	$('body').on('click','.theme-anchor',function(){
		$('#stylesheet').attr('href',"//maxcdn.bootstrapcdn.com/bootswatch/3.3.1/"+$(this).attr('data-theme')+"/bootstrap.min.css")
		window.fastyle.setCookie('theme',$(this).attr('data-theme'))
	})
})