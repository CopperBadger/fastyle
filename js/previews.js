function makeSubmissionPreview(subLink, linkElement) {
	subLink = subLink.replace(/https?\:/,'')
	$(linkElement).addClass('preview-built').text("Fetching preview...")
	$.ajax({
		context: linkElement,
		url : subLink,
		dataType : 'html',
		success: function(data){
			var pageData = $(data);
			var subImg = pageData.find("#submissionImg").attr('src');
			var subTitle = pageData.find("#submissionImg").attr('alt');
			
			var infoWrapper = pageData.find('b:contains(Submission information)').parents('td:first');
			var author = pageData.find(infoWrapper).parents('table').eq(1).find('a[href*="/user"]');
			var authorHref = author.eq(0).attr('href');
			var authorName = author.eq(0).text();
			
			$(this).append('<img src="' + subImg + '" class="hidden popover-img-preload" />');
			
			$(".popover-img-preload").load(function(){
				linkElement.text("Preview").popover({
					html: true,
					placement: 'auto top',
					title: "Submission Preview",
					trigger: 'click',
					content: '<strong>' + subTitle +'</strong><br>' +
								'<img src="' + subImg + '" class="img-responsive pull-left" style="width:50%; margin:5px 10px 15px 0;" />'+
								'by ~<a href="'+authorHref+'">' + authorName +'</a><br />'+
								'<a href="'+ subLink +'" class="btn btn-primary">Open &gt;</a>',
					template: '<div class="popover" role="tooltip" style="width:360px;">' +
								'<div class="arrow"></div>' +
								'<h3 class="popover-title"></h3>' + 
								'<div class="popover-content"></div>' +
								'</div>'
				}).popover('show');	
			})
		},
		error: function (){
			console.error("Error building popover!");
		}
	});
}

function makeExternalPreview(link, linkElement) {
	link = link.replace(/https?\:/,'');
	$(linkElement).addClass('preview-built')
		.text("Fetching preview...")
		.append('<img src="' + link + '" class="hidden popover-img-preload" />');
	
	$(".popover-img-preload").load(function(){
		linkElement.text("Preview").popover({
			html: true,
			placement: 'auto top',
			title: "Image Preview",
			trigger: 'click',
			content: '<img src="' + link + '" class="img-responsive" /><br />'+
				'<a href="'+ link +'" class="btn btn-primary btn-xs pull-right">Open &gt;</a>',
			template: '<div class="popover" role="tooltip" style="width:360px;">' +
				'<div class="arrow"></div>' +
				'<h3 class="popover-title"></h3>' + 
				'<div class="popover-content clearfix"></div>' +
				'</div>'
		}).popover('show');
	});
}

$(document).ready(function(){

	$('body').on('click','.label-sub-preview', function(e){
		if (!$(this).hasClass('preview-built')){
			var link = $(this).data('link');
			makeSubmissionPreview(link, $(this));
		}
	}).on('click','.label-external-preview', function(e){
		if (!$(this).hasClass('preview-built')){
			var link = $(this).data('link');
			makeExternalPreview(link, $(this));
		}
	}).bind('render-previews',function(){
		console.log("Rendering previews")

		// Add submission preview links
		$('.allow-previews').find('a[href*="furaffinity.net/view"]:not(.popover-bound), a[href*="furaffinity.net/full"]:not(.popover-bound)').each(function(){
			var link = $(this).attr('href');
			console.log("Writing new popover anchor for "+link)
			$(this).after('&nbsp;<a href="javascript:void(0)" class="label label-primary label-sub-preview" data-link="'+ link +'">Preview</span>')
		}).addClass('popover-bound');
		
		// Add external image preview links
		$('.allow-previews').find('a[href*=".png"]:not(.popover-bound), a[href*=".gif"]:not(.popover-bound), a[href*=".jpg"]:not(.popover-bound), a[href*=".jpeg"]:not(.popover-bound)').each(function(){
			var link = $(this).attr('href');
			console.log("Writing new popover anchor for "+link)
			$(this).after('&nbsp;<a href="javascript:void(0)" class="label label-primary label-external-preview" data-link="'+ link +'">Preview</span>')
		}).addClass('popover-bound');
	}).trigger('render-previews');
})