function renderImages(src){
	row = $('#gallery-container')
	return $(src||'body').find('.r-general, .r-mature, .r-adult').each(function(){
		au = $(this).find('small a')
		cbx = $(this).find('small input[type=checkbox]')
		s = $('<a href="'+(href=(hor=$(this).find('s a')).attr('href'))+'" class="submission-item" style="text-decoration:none">').appendTo(row)
			.addClass('thumbnail contain-hover').attr('title',title=$(this).find('span').text())
			.css({background:'transparent url("'+($(this).find('img').attr('src').replace(/@\d+/,'@400'))+'") 50% 50% / cover no-repeat',height:'224px',padding:'0'})
			.wrap('<div class="col-md-3 col-xs-6">')
			.html("<div class='thumb-title'>" +
					"<strong>"+title+"</strong>" +
					(au.length?(" by "+$(au).text()):"") +
				"</div>")
		if(cbx.length){
			$(s).append("<a href='javascript:void(0)' style='background-color:rgba(64,0,0,0.6);color:#FFF;padding:6px;display:block;text-decoration:none' class='thumb-checkbox'>" +
					" <strong>Select</strong>" +
				"</a>").find('.thumb-checkbox').prepend($(cbx).remove())
				.on("click",function(e){
					
					$(this).parents('.contain-hover').toggleClass('checked-for-deletion',
						$(this).find('[type=checkbox]').click().is(':checked'));
				})
				.hide()
		}
	}).length
}

function serialize(el) {
  var MD5 = function(src){return "";} //Dummy encryption function
  var o={};
  $.map($(el).find('input:not([type=radio]:not(:checked)), select, textarea'),function(e) {
    if(n=(e=$(e)).prop('name')) {
      o[n]=((e.is('[type=password]'))
	        ?MD5(e.val())
        :((e.is('[type=checkbox]'))
          ?e.is(':checked')
          :e.val()));
    }
  });
  return o;
}

$(document).ready(function(){

	if(document.location.pathname=="/msg/submissions/"){
		row = $('<div class="row" id="gallery-controls">').insertBefore(".content.maintable:first")
			.html('<button class="btn btn-default select-all">Select All</button> ' +
				'<button class="btn btn-default deselect-all">Deselect All</button> ' +
				'<button class="btn btn-primary submissions-clear">Remove Selected</button> ' +
				'<button class="btn btn-danger nuke-submissions">Nuke All Submissions</button>')
			.wrapInner('<div class="col=md-12">')

		$('.select-all, .deselect-all').on("click",function(){
			$('.thumb-checkbox').find('[type=checkbox]').prop('checked',$(this).is('.deselect-all'))
				.end().click()
		})

		$('.submissions-clear').on("click",function(){
			dat = {'messagecenter-action':'Remove checked'}
			dat['submissions[]'] = $.map(chx=$('.submission-item :checked'),function(e){return $(e).val()})
			tgt = $(chx).parents(".submission-item").css({opacity:0.8})
			$.ajax({
				url:"/msg/submissions/",
				data: dat,
				type: "POST",
				complete: function(xhr){
					tgt.html("<div class='thumb-title'>Deleted</div>").css({opacity:0.2})
				}
			})
		})

		$('.nuke-submissions').on("click",function(){
			$('#gallery-container').css({opacity:'0.8'})
			$.ajax({
				url: "/msg/submissions/",
				type: "POST",
				data: {'messagecenter-action':'Nuke all Submissions'},
				complete:function(xhr){
					$('#gallery-container').remove()
				}
			})
		})
	}

	row = $('<div class="row" id="gallery-container">').insertBefore(".content.maintable:first")
	renderImages()


	page = (t=document.location.href.match(/\.net\/(.+)\d?\/?/))?t[1]:""
	window.fastyle.pageNumber = parseInt((t=document.location.href.match(/(\d)\//))?t[1]:1)
	window.fastyle.fetchSize = 36

	if($('#no-images').length){
		$('#gallery-container').append("<h3 style='text-align:center'>(No items to list)</h3>")
	}

	$('.content.maintable').hide()

	window.fastyle.scrollThresh = Math.round($(document).height() - $(window).height()*2)
	console.log("Initializing scroll thresh = "+window.fastyle.scrollThresh + ", doc height = "+$(document).height())

	$('.content.maintable').show()

	window.fastyle.clearToLoad = true
	var imagesExist = $('.r-general, .r-mature, .r-adult').length

	var loadMore = function(){
		if(window.fastyle.clearToLoad) {
			window.fastyle.clearToLoad = false
			$('#load-more-button').text("Loading More...")

			u = getNextURL()
			d = serialize(sf=$('#search-form'));
					d.perpage=window.fastyle.fetchSize
					d.go="Next"
					if(sf.length){d.page = window.fastyle.pageNumber-1}
					delete d.do_search

			console.log("Triggered! Going to "+u)
			$.ajax({
				url:u,
				type:(page=="browse/")?"GET":"POST",
				data:d,
				complete:function(xhr){
					res = $(xhr.responseText)
					window.fastyle.nextHref = $(res).find('a.more:first').attr('href')
					n = renderImages(res)
					console.log("Rendered "+n+" images")

					if(n!=0) {
						setTimeout(function(){
							window.fastyle.clearToLoad = true
							window.fastyle.scrollThresh = Math.round($(document).height() - $(window).height()*2)
							$(document).trigger('scroll')
							$('#load-more-button').text("Load More")
						},5000)
						console.log("Setting scroll thresh = "+window.fastyle.scrollThresh + ", doc height = "+$(document).height())
					} else {
						$('#load-more-button').before("<p>No more images to load!</p>").remove()
					}
				}
			})
		} else {
			$('#load-more-button').text("Please wait...")
			console.log("Failed to reinitiate: ctl="+window.fastyle.clearToLoad+", thresh="+window.fastyle.scrollThresh)
		}
	}

	var getNextURL = function(){
		if(ta=(window.fastyle.nextHref||$('a.more:first').attr('href'))){
			return ta
		} else {
			return document.location.protocol+"//"+window.fastyle.domain+".furaffinity.net/"+page+"/"+(++window.fastyle.pageNumber)
		}
	}

	if(page && imagesExist) {
		$(document).scroll(function(){
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
	$('#new-search-form').remove().insertBefore(row)
	//$('.content.maintable').remove()
})