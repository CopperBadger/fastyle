//$('body').hide()

$(document).ready(function(){
	window.fastyle = {}

	banner = $('#fa_header').css('background-image')

	$('link[rel=stylesheet]').remove()
	$('a.iconusername img').css({'width':'64px'})
	logo = $('.falogo').remove()
	$('.ads').remove()

	$('head').append("<script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>")

	$('body').show().wrapInner('<div class="container">')
	$('a[name=top]').remove()
	tabnav = $('.block-menu-top')
	tabnavCol = $(tabnav).find('tr td:first')
	$('<div class="navbar navbar-default">').insertBefore(tabnav)
		.css({'margin-top':'8px'})
		.append("<div class='navbar-header'>")
		.append("<div class='collapse navbar-collapse'>")

	window.fastyle.uname = $('#my-username').text().substring(1)

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
		$(this).css({'background-size':'contain'}).find('.thumb-title').hide()
	}).on("mouseout",".contain-hover",function(){
		$(this).css({'background-size':'cover'}).find('.thumb-title').show()
	})
})