function renderImages(src){
	row = $('#gallery-container')
	return $(src||'body').find('.r-general, .r-mature, .r-adult').each(function(){
		au = $(this).find('small a')
		$('<a href="'+(href=(hor=$(this).find('s a')).attr('href'))+'">').appendTo(row)
			.addClass('thumbnail contain-hover').attr('title',title=$(this).find('span').text())
			.css({background:'transparent url("'+($(this).find('img').attr('src').replace(/@\d+/,'@400'))+'") 50% 50% / cover no-repeat',height:'224px',padding:'0'})
			.wrap('<div class="col-md-3 col-xs-6">')
			.html("<div style='background-color:rgba(0,0,0,0.6);color:#FFF;padding:2px 6px' class='thumb-title'><strong>"+title+"</strong>"+(au.length?(" by "+$(au).text()):"")+"</div>")
	}).remove().length
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

	console.log("gallery.js, reporting in")

	row = $('<div class="row" id="gallery-container">').insertBefore(".content.maintable:first")
	renderImages()

	window.fastyle.scrollThresh = Math.round($(document).height()-($(window).height()*1.5))
	console.log("Initializing scroll thresh = "+window.fastyle.scrollThresh + ", doc height = "+$(document).height())

	page = (t=document.location.href.match(/\.net\/(.+)\d?\/?/))?t[1]:""
	window.fastyle.pageNumber = parseInt((t=document.location.href.match(/(\d)\//))?t[1]:1)
	window.fastyle.fetchSize = 36

	if(page){
		$(document).scroll(function(){
			if(window.fastyle.scrollThresh>0 && $(document).scrollTop() > window.fastyle.scrollThresh) {
				if(ta=(window.fastyle.nextHref||$('a.more:first').attr('href'))){
					u = ta
				} else {
					u = "http://www.furaffinity.net/"+page+"/"+(++window.fastyle.pageNumber)
				}

				d = serialize(sf=$('#search-form'));
					d.perpage=window.fastyle.fetchSize
					d.go="Next"
					if(sf.length){d.page = window.fastyle.pageNumber-1}
					delete d.do_search
				console.log("Triggered! Going to "+u)
				window.fastyle.scrollThresh = 0
				$.ajax({
					url:u,
					type:(page=="browse/")?"GET":"POST",
					data:d,
					complete:function(xhr){
						res = $(xhr.responseText)
						window.fastyle.nextHref = $(res).find('a.more:first').attr('href')
						n = renderImages(res)
						console.log("Rendered "+n+" images")
						if(n==window.fastyle.fetchSize) {
							window.fastyle.scrollThresh = Math.round($(document).height()-($(window).height()*1.5))
							console.log("Setting scroll thresh = "+window.fastyle.scrollThresh + ", doc height = "+$(document).height())
						}
					}
				})
			}
		})
	}
	$('#new-search-form').remove().insertBefore(row)
	//$('.content.maintable').remove()
})