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
	funTitles=["Give us a Moment","Just a Second","Please Wait","Doing the Thing","Hold on a Sec","Stuff is Happening"]
	$('a[href^="http://www.furaffinity.net/unwatch"]')
	.on("click",function(){
		$(this).text(funTitles[Math.floor(Math.random()*funTitles.length)])
		self = this
		$.ajax({
			url:$(this).attr("href"),
			type:"GET",
			complete:function(xhr){
				$(self).text("Unwatched!").unbind("click")
			}
		})
		return false
	})

	$('a[href^="http://www.furaffinity.net/watch"]')
	.on("click",function(){
		$(this).text(funTitles[Math.floor(Math.random()*funTitles.length)])
		self = this
		$.ajax({
			url:$(this).attr("href"),
			type:"GET",
			complete:function(xhr){
				$(self).text("Watched!").unbind("click")
			}
		})
		return false
	})
})