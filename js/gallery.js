skel = '<div class="row" id="gallery-container"></div>'


function renderImages(src){
	gallery = $('#gallery-container')

	iconLookup = {
		audio: "headphones",
		text: "book"
	}

	$(src||'body').find('.t-image').attr('data-type','image').removeClass('t-image')
		.end().find('.t-audio').attr('data-type','audio').removeClass('t-audio')
		.end().find('.t-text').attr('data-type','text').removeClass('t-text')

	out = $(src||'body').find('.r-general, .r-mature, .r-adult').each(function(){
		
		au = $(this).find('small a')
		cbx = $(this).find('small input[type=checkbox]')
		anchor = $(this).find('s a')
		href = anchor.attr('href')
		title = $(this).find('span').text()
		imgSrc = $(this).find('img').attr('src').replace(/@\d+/,'@400')
		subtext = (au.length?(" by "+$(au).text()):"")
		subType = $(this).attr('data-type')
		icon = ((ic=iconLookup[subType])?'<div class="submission-type"><span class="glyphicon glyphicon-'+ic+'"></span></div>':'')

		checkbox = ""
		if(cbx.length){
			checkbox = '<label href="javascript:void(0)" class="thumb-checkbox" style="display:none;">' +
				($(cbx).wrap('span').parent().html()) +
				' <strong>Select</strong>' +
			'</label>'
		}

		$('<div class="col-md-3 col-xs-6">' +
			'<a href="'+href+'" class="submission-item submission-'+subType+' thumbnail contain-hover" style="background-image:url(\''+imgSrc+'\')">' +
				'<div class="thumb-title">' +
					'<strong>'+title+'</strong>' +
					subtext +
				'</div>' +
				checkbox +
				icon +
			'</a>' +
		'</div>').appendTo(gallery)
	}).length
	return out
}

$(document).ready(function(){

	$('.cat:contains("Recent Artwork")').parents("table:first")
		.find(".r-general, .r-mature, .r-adult").attr('data-type','image')
	$('.cat:contains("Recent Writing")').parents("table:first")
		.find(".r-general, .r-mature, .r-adult").attr('data-type','text')
	$('.cat:contains("Recent Music")').parents("table:first")
		.find(".r-general, .r-mature, .r-adult").attr('data-type','audio')

	// First, insert and bind controls if this is the submissions page
	if(document.location.pathname=="/msg/submissions/") {

		row = $('<div class="row" id="gallery-controls">' +
			'<div class="col-xs-12">' +
				'<div class="btn-group">' +
					'<button class="btn btn-default select-all" type="button">Select All</button>' +
					'<button class="btn btn-default deselect-all" type="button">Deselect All</button>' +
					'<button class="btn btn-primary submissions-clear" type="button">Remove Selected</button>' +
					'<button class="btn btn-danger nuke-submissions" type="button">Nuke All Submissions</button>' +
				'</div>' +
			'</div>' +
		'</div>').insertBefore('.content.maintable')

		$('.select-all, .deselect-all').on("click",function(){
			$('.thumb-checkbox').find('[type=checkbox]').prop('checked',$(this).is('.select-all'))
				.end().trigger('update-display')
		})

		$('.submissions-clear').on("click",function(){
			dat = {'messagecenter-action':'Remove checked'}
			dat['submissions[]'] = $.map(chx=$('.submission-item :checked'),function(e){return $(e).val()})
			tgt = $(chx).parents(".submission-item").css({opacity:0.8})
			window.fastyle.ajax({
				url:"/msg/submissions/",
				data: dat,
				success: function(){
					tgt.html("<div class='thumb-title'>Deleted</div>").css({opacity:0.2})
				}
			})
		})

		$('.nuke-submissions').on("click",function(){
			$('#gallery-container').css({opacity:'0.8'})
			if(confirm("Are you sure you want to remove all submissions from your messages?")){
				window.fastyle.ajax({
					url: "/msg/submissions/",
					data: {'messagecenter-action':'Nuke all Submissions'},
					success:function(xhr){
						$('#gallery-container').remove()
					}
				})
			}
		})

		$('body').on("update-display",".thumb-checkbox",function(){
			$(this).parents('.contain-hover').toggleClass('checked-for-deletion',
				$(this).find('[type=checkbox]').is(':checked'));
		}).on("click",".thumb-checkbox",function(){$(this).trigger('update-display')})
	}


	// Skeleton and data population
	$(skel).insertBefore('.content.maintable')
	renderImages()

	var imagesExist = $('.r-general, .r-mature, .r-adult').length
	if($('#no-images').length){
		$('#gallery-container').append("<h3 style='text-align:center'>(No items to list)</h3>")
	} else if(imagesExist) {

		// Infinite Scroll
		// Infinite scroll helper functions
		var getScrollThresh = function(){return Math.round($(document).height()-$(window).height()*2)}
		var getNextURL = function(){
			out = ""
			if(ta=(window.fastyle.nextHref||$('a.more:first').attr('href'))){
				out = ta
			} else {
				out = document.location.protocol+"//"+window.fastyle.domain+".furaffinity.net/"+window.fastyle.pageString+"/"+window.fastyle.pageNumber
			}

			return out
				.replace(/([^\:])\/{2,}/g,'$1/')
				.replace(/search\/@.+/,'search/')
		}

		// Infinite Scroll variables
		window.fastyle.pageNumber = ((t=document.location.pathname.match(/\/(d+)\/?$/g))?t:["","1"])
		window.fastyle.pageString = document.location.pathname.replace(window.fastyle.pageNumber,window.fastyle.pageNumber[0])
		window.fastyle.pageNumber = parseInt(window.fastyle.pageNumber[1])
		window.fastyle.fetchSize = 36
		window.fastyle.clearToLoad = true // If false, no loading will be allowed
		window.fastyle.nextHref = null // The href attribute of a.more, if such an element exists

		$('.content.maintable').hide()
		window.fastyle.scrollThresh = getScrollThresh()
		console.log("Threshold = "+window.fastyle.scrollThresh + ", doc height = "+$(document).height())
		$('.content.maintable').show()

		
		var imagesExist = $('.r-general, .r-mature, .r-adult').length

		var loadMore = function(){
			if(window.fastyle.clearToLoad) {
				window.fastyle.clearToLoad = false
				$('#load-more-button').text("Loading More...")

				window.fastyle.pageNumber++
				u = getNextURL()

				// For search results or browse page, get search params from form, incrementing page
				isSearch = $('#search-form').length
				d = window.fastyle.serialize($('#search-form, #browse-form'));
					d.perpage = window.fastyle.fetchSize
					d.go=d.btn="Next"
					for(i in n=['general','mature','adult']){
						if(typeof (src=d['rating_'+n[i]])=="boolean"){
								d['rating_'+n[i]]*=1
							}
						}
					if(isSearch){d.page = window.fastyle.pageNumber-1}
					delete d.do_search

				for(p in d){if(!d[p]){delete d[p]}}

				done = function(){
					$('#load-more-button').before("<p>No more images to load!</p>").remove()
				}
				window.fastyle.ajax({
					url:u,
					data:d,
					success: function(res){
						window.fastyle.nextHref = $(res).find('a.more:first').attr('href')
						n = renderImages(res)
						if(n!=0) {
							$('#load-more-button').text("Load More")
							setTimeout(function(){
								window.fastyle.clearToLoad = true
								window.fastyle.scrollThresh = getScrollThresh()
								$(document).trigger('scroll')
							},5000)
						} else {done()}
					},
					error: done
				})
			} else {
				$('#load-more-button').text("Please wait...")
				console.log("Failed to reinitiate: ctl="+window.fastyle.clearToLoad+", thresh="+window.fastyle.scrollThresh)
			}
		}

		$(document).scroll(function() {
			if(window.fastyle.scrollThresh>0 && $(document).scrollTop() > window.fastyle.scrollThresh) {
				window.fastyle.scrollThresh = 0
				loadMore()
			}
		})

		$('<a href="javascript:void(0)" class="btn btn-primary" id="load-more-button">Load More</a>')
			.insertBefore('.content.maintable')
			.on("click",loadMore)

		$(window).on("resize",function(){
			console.log("resizing window...")
			window.fastyle.scrollThresh = Math.round($(document).height() - $(window).height()*2)
			console.log("Setting scroll thresh = "+window.fastyle.scrollThresh + ", doc height = "+$(document).height())
		})
	}

})