$(document).ready(function(){
	tabs = $('<ul class="nav nav-tabs" id="user-nav" style="margin-bottom:16px">').insertBefore(".content.maintable:first")
	$('.tab').find('b>a,u').each(function(){
		t = $("<li role='presentation'>").appendTo(tabs)
		if($(this).is("u")){
			$(t).addClass("active")
		}
		$(t).append("<a href='"+($(this).prop('href')||"#")+"'>"+$(this).text()+"</a>")
	}).end().remove()

	// Make Watch / Unwatch asynchronous
	doWatch = function(self,msg){
		$(self).text(window.fastyle.funTitles[Math.floor(Math.random()*window.fastyle.funTitles.length)])
		window.fastyle.ajax({
			url:$(self).attr("href"),
			type:"GET",
			success:function() {
				$(self).text(msg)
					.unbind("click")
					.on("click",function(){return false})
			}
		})
		return false
	}

	$('a[href*="furaffinity.net/unwatch"]').on("click",function(){return doWatch(this,"Unwatched!")})
	$('a[href*="furaffinity.net/watch"]').on("click",function(){return doWatch(this,"Watched!")})
})