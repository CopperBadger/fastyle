userskel = '<div class="row img-rounded" id="user-banner" style="margin:16px 0">' +
	'<a href="" class="img-rounded" id="user-banner-link"></a>' +
'</div>' +
'<div class="row" style="margin-top:16px;">' +
	'<div class="col-md-4">' +
		'<div class="panel panel-default" id="user-id-badge-panel">' +
			'<div class="panel-body">' +
				'<div style="text-align:center;">' +
					'<h2 class="user-name-field"></h2>' +
					'<img src="" alt="" class="img img-rounded" id="user-profile-picture" />' +
				'</div>' +
			'</div>' +
			'<table class="table" id="user-summary-table"></table>' +
		'</div>' +
		'<div class="panel panel-default" id="user-full-info-panel">' +
			'<div class="panel-expandable" data-short-height="196" style="overflow-y:hidden">' +
				'<table class="table" id="user-full-info-table"></table>' +
			'</div>' +
			'<ul class="list-group">' +
				'<a href="javascript:void(0)" class="list-group-item panel-expander">Show More</a>' +
			'</ul>' +
		'</div>' +
		'<div class="panel panel-default" id="user-watching-panel">' +
			'<div class="panel-heading">' +
				'<a href="" id="watching-link">Watching</a>' +
				' &#183; ' +
				'<span class="watching-count"></span>' +
			'</div>' +
			'<div class="panel-body" id="user-watching-container">' +
			'</div>' +
		'</div>' +
		'<div class="panel panel-default" id="user-watched-by-panel">' +
			'<div class="panel-heading">' +
				'<a href="" id="watched-by-link">Watched By</a>' +
				' &#183; ' +
				'<span class="watched-by-count"></span>' +
			'</div>' +
			'<div class="panel-body" id="user-watched-by-container">' +
			'</div>' +
		'</div>' +
		'<div class="panel panel-default" id="user-latest-journal-panel">' +
			'<div class="panel-heading">' +
				'Latest Journal' +
			'</div>' +
			'<div class="panel-body" id="user-latest-journal-container" style="overflow-y:hidden;max-height:480px"></div>' +
			'<ul class="list-group">' +
				'<a href="" class="list-group-item user-full-journal-link">View Full Journal</a>' +
			'</ul>' +
		'</div>' +
	'</div>' +
	'<div class="col-md-8">' +
		'<div class="panel panel-default" id="user-about-panel">' +
			'<div class="panel-heading">' +
				'About <span class="user-name-field"></span>' +
			'</div>' +
			'<div class="panel-body panel-expandable" id="user-about-container" style="overflow-y:scroll"></div>' +
			'<ul class="list-group">' +
				'<a href="javascript:void(0)" class="list-group-item panel-expander">Show More</a>' +
			'</ul>' +
		'</div>' +
		'<div class="panel panel-default" id="user-submissions-panel">' +
			'<div class="panel-heading">' +
				'<span class="pull-right text-muted" id="latest-submission-text"></span>' +
				'<a href="" id="gallery-link">Submissions</a>' +
				' &#183; ' +
				'<span class="submission-count"></span>' +
			'</div>' +
			'<div class="panel-body" id="user-submissions-container"></div>' +
		'</div>' +
		'<div class="panel panel-default" id="user-favorites-panel">' +
			'<div class="panel-heading">' +
				'<span class="pull-right text-muted" id="latest-favorite-text"></span>' +
				'<a href="" id="favorites-link">Favorites</a>' +
			'</div>' +
			'<div class="panel-body" id="user-favorites-container"></div>' +
		'</div>' +
		'<div class="panel panel-default" id="user-shouts-panel">' +
			'<div class="panel-heading">Shouts</div>' +
			'<div class="panel-body">' +
				'<form action="" class="form" id="shout-form" method="POST">' +
					'<div class="form-group">' +
						'<label for="shout-message" class="control-label">Message</label>' +
						'<textarea name="shout" id="shout-message" rows="5" class="form-control"></textarea>' +
					'</div>' +
					'<div class="form-group" style="text-align:right">' +
						'<span id="chars-left"></span>&nbsp;' +
						'<button class="btn btn-primary" type="submit">Shout</button>' +
					'</div>' +
				'</form>' +
				'<ul class="media-list" id="shouts-list"></ul>' +
			'</div>' +
		'</div>' +
	'</div>' +
'</div>'

function extractInfo(html){
	if(!html || !html.match){
		console.warn("Cannot extract info from "+(typeof html))
		return {}
	}
	mat = html.match(/(?:b|n)\>[^<]+\<\/(?:b|span)\>[^<]+\<br/g)
	out = {}
	for(m in mat) {
		parts = $.map(mat[m].match(/(?:>)([^<]+)/g),function(e){return e.substring(1).trim()})
		if(!parts.length==2){continue;}
		else {
			out[parts[0]] = parts[1]
		}
	}
	return out;
}

// Removes undesired characters from keys and values of object, returned a "cleaned" copy
function retab(data){
	out = {}
	for(k in data){out[k.replace(/[^A-Za-z0-9\s\-]/g,'')] = data[k].replace(/^\:\s?/g,'')}
	return out
}

function addRow(key,val,table) {
	return (key&&val)
		?$('<tr>').appendTo(table).append("<td>"+key+"</td>").append("<td>"+capitalize(val)+"</td>")
		:null
}

$(document).ready(function(){

	$(userskel).insertBefore('.content.maintable')

	// Data Population
	// (Helper containers)
	firstTable = $('.ldot>b:contains(Full Name)').parents('.maintable:first').children('tbody')
	profileRow = $(firstTable).find('>tr:last>td:last>table>tbody>tr')
	profile = $(profileRow).children('td:first')
	featuredAnchor = $('#featured-submission a')
	if(!featuredAnchor.length){featuredAnchor=$('.flow.userpage-first-submission a')}
	userProfileAnchor = $('#profilepic-submission a')
	watchingAnchor = $('#is-watching').parents('tr:first').next('tr').find('a')
	watchedByAnchor = $('#watched-by').parents('tr:first').next('tr').find('a')

	// (Actual Variables)

	featuredHref = featuredAnchor.attr('href')
	featuredName = featuredAnchor.parents('b:first').find('span:first').text()

	userName = $(firstTable).find('tr:nth-child(2)>.addpad.lead>b').text().substring(1)
	userNameTruncated = window.fastyle.truncateName(userName)
	userAvatar = "//a.facdn.net/"+userNameTruncated+".gif"
	userProfileID = userProfileAnchor.find('img').attr('src')
	userProfileIDHref = userProfileAnchor.attr('href')
	userProfileDescription = (s=profile.html()).substring(s.search(q="<b>Artist Profile:</b><br>")+q.length)

	info = retab(extractInfo(profile.html()))
	stats = retab(extractInfo(profileRow.children('td:last').html()))
	for(s in stats){stats[s]=window.fastyle.addCommas(stats[s])}
	info2 = retab(extractInfo($('.user-info').html()))
	contact = {};
		$('td.user-contacts tr').each(function(){contact[$(this).find('th').text()]=$(this).find('td').html()})
		retab(contact)

	watching = $('#is-watching td a')
	watchingHref = $(watchingAnchor).attr('href')
	watchingCount = window.fastyle.addCommas(watchingAnchor.text().match(/\d+/)[0])
	watchedBy = $('#watched-by td a')
	watchedByHref = $(watchedByAnchor).attr('href')
	watchedByCount = window.fastyle.addCommas(watchedByAnchor.text().match(/\d+/)[0])

	journalContainer = $('b:contains(Latest Submissions)').parents("table").eq(1).find(">tbody>tr:last>td:last>.maintable:first")
	journalAnchor = journalContainer.find('a:first')
	journalHref = journalAnchor.attr('href')
	journalName = journalAnchor.text()
	journalContent = journalContainer.find('tr .no_overflow.alt1').html()
	journalPubDate = journalContainer.find('.popup_date').wrap('<span>').parent().html()

	submissions = $('.flow.userpage-submissions.twolines a')
	firstSubmissionPubdate = $('.userpage-first-submission .popup_date').wrap('<span>').parent().html()

	favorites = $('.flow.userpage-favorites.twolines a')
	firstFavoritePubdate = $('.userpage-first-favorite .popup_date').wrap('<span>').parent().html()

	shouts = $('.cat>b:contains(Shouts)').parents('table:first').nextAll('table')

	// -- User Banner Image
	$('#user-banner-link').attr('href',featuredHref).text(featuredName)
	if(featuredHref){
		$.ajax({
			url: featuredHref.replace('view','full'),
			type: "GET",
			complete: function(xhr){
				if(featuredSrc = $(xhr.responseText).find('#submissionImg').attr('src')){
					$('#user-banner').css('background-image','url("'+featuredSrc+'")')
						.show()
				} else {
					$('#user-banner').remove()
				}
			}
		})
	} else {
		$('#user-banner').remove()
	}

	// -- User Badge
	$('.user-name-field').text(userName)
	$('#user-profile-picture').attr('alt',userName)
		.attr('src',userProfileID||userAvatar)
	if(userProfileID){
		addRow('Avatar',"<img src='"+userAvatar+"' class='img img-rounded' />",'#user-summary-table')
		$('#user-profile-picture').wrap("<a href='"+userProfileIDHref+"'>")
	}
	addRow('Full Name',info['Full Name'],'#user-summary-table')
	addRow('Species',info2['Species'],'#user-summary-table')
	addRow('Age',info2['Age'],'#user-summary-table')

	// -- User Full Info Table
	lookups = [
		["Basic Information",info],
		["Extended Information",info2],
		["Contact Information",contact],
		["Statistics",stats]
	]
	for(a in lookups){
		$('<tr><th colspan="2">'+lookups[a][0]+'</th></tr>').appendTo('#user-full-info-table')
		for(k in lookups[a][1]){
			v = lookups[a][1][k]

			if(id=(t=v.match(/(?:v=|\.be\/)(.{11})/))?t[1]:""){
				$('<div class="panel panel-default">' +
					'<div class="panel-heading">'+k+'</div>' +
					'<div class="panel-body">' +
						'<div class="embed-responsive embed-responsive-16by9">' +
							'<iframe src="//www.youtube.com/embed/'+id+'" frameborder="0" class="embed-responsive-item" frameborder="0" allowfullscreen> </iframe>' +
						'</div>' +
					'</div>' +
				'</div>').insertBefore('#user-full-info-panel')
			}

			//URL RegEx credit: http://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
			if(v.search(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)==-1){v=capitalize(v)}
			else{v = "<a href='"+v+"' target='_blank'>"+v+"</a>"}
			addRow(k,v,'#user-full-info-table')
		}
	}

	// -- (Embed YouTube videos that match)

	// -- Watching
	if(watchingCount=='0'){$('#user-watching-panel').remove()}
	else {
		$('.watching-count').text(watchingCount)
		idx = 0
		var newRow = function(){return $('<div class="row">').appendTo('#user-watching-container')}
		row = newRow()
		watching.each(function(){
			if(idx++==4){row=newRow();idx=1}

			watchHref = $(this).attr('href')
			watchTruncatedName = ((t=watchHref.match(/\/([^\/]+)\/?$/))?t[1]:"")
			watchName = $(this).text()

			$('<div class="col-xs-3">' +
				'<a href="'+watchHref+'" class="thumbnail watch-thumb" style="background-image:url(\'//a.facdn.net/'+watchTruncatedName+'.gif\');"></a>' +
			'</div>').appendTo(row)
		})
	}


	// -- Watched By
	if(watchedByCount=='0'){$('#user-watched-by-panel').remove()}
	else {
		$('.watched-by-count').text(watchedByCount)
		idx = 0
		var newRow = function(){return $('<div class="row">').appendTo('#user-watched-by-container')}
		row = newRow()
		watchedBy.each(function(){
			if(idx++==4){row=newRow();idx=1}

			watchHref = $(this).attr('href')
			watchTruncatedName = ((t=watchHref.match(/\/([^\/]+)\/?$/))?t[1]:"")
			watchName = $(this).text()

			$('<div class="col-xs-3">' +
				'<a href="'+watchHref+'" class="thumbnail watch-thumb" style="background-image:url(\'//a.facdn.net/'+watchTruncatedName+'.gif\');"></a>' +
			'</div>').appendTo(row)
		})
	}

	
	// -- Latest Journal
	if(!journalContainer.length){$('#user-latest-journal-panel').remove()}
	else {
		$('#user-latest-journal-container')
			.html('<h4><a href="'+journalHref+'">'+journalName+'</a></h4>' +
			'<small>'+journalPubDate+'</small>' +
			'<div>'+journalContent+'</div>')

		$('.user-full-journal-link').attr('href',journalHref)
	}


	// -- User Profile Summary
	$('#user-about-container').html(userProfileDescription)
		.attr('data-short-height',$('#user-id-badge-panel').height())

	// -- User Submissions
	$('.submission-count').text(stats['Submissions'])
	$('#gallery-link').attr('href','/gallery/'+userNameTruncated)
	$('#latest-submission-text').html("Last submission: "+firstSubmissionPubdate)
	if(stats['Submissions']=='0'){$('#user-submissions-panel').remove()}
	else {
		idx = 0
		var newRow = function(){return $('<div class="row">').appendTo('#user-submissions-container')}
		row = newRow()
		rows = 0
		$(submissions).each(function(){
			if(idx++==3){row=newRow();rows++;idx=1}
			if(rows==2){return false;}

			submissionHref = $(this).attr('href')
			submissionSrc = $(this).find('img').attr('src').replace('@100','@400')

			$('<div class="col-xs-4">' +
				'<a href="'+submissionHref+'" class="thumbnail contain-hover" style="background-image:url(\''+submissionSrc+'\');"></a>' +
			'</div>').appendTo(row)
		})
	}

	// -- User Favorites
	$('#favorites-link').attr('href','/favorites/'+userNameTruncated)
	$('#latest-favorite-text').html("Last favorite: "+firstFavoritePubdate)
	if(stats['Favorites']=='0'){$('#user-favorites-panel').remove()}
	else {
		idx = 0
		var newRow = function(){return $('<div class="row">').appendTo('#user-favorites-container')}
		row = newRow()
		rows = 0
		$(favorites).each(function(){
			if(idx++==4){row=newRow();rows++;idx=1}
			if(rows==2){return false;}

			favoriteHref = $(this).attr('href')
			favoriteSrc = $(this).find('img').attr('src').replace('@100','@400')

			$('<div class="col-xs-3">' +
				'<a href="'+favoriteHref+'" class="thumbnail contain-hover" style="background-image:url(\''+favoriteSrc+'\');"></a>' +
			'</div>').appendTo(row)
		})
	}

	// -- User Shouts
	var addShout = function(src){
		shouterAnchor = $(src).find('table tr:first a[href*=user]:last')
		shouterName = shouterAnchor.text()
		shouterHref = shouterAnchor.attr('href')
		shouterAvatar = $(src).find('.alt1.bpix.tpix.lpix.rpix.addpad img').attr('src')
		pubdate = $(src).find('.popup_date').wrap('<span>').parent().html()
		shoutContent = $(src).find('table tr:last .no_overflow.alt1').html()

		if(!shouterAnchor.length){return false}

		$('<li class="media">' +
			'<div class="media-left">' +
				'<a href="'+shouterHref+'">' +
					'<img src="'+shouterAvatar+'" alt="'+shouterName+'" class="media-object img img-rounded medium-thumb">' +
				'</a>' +
			'</div>' +
			'<div class="media-body">' +
				'<div class="media-heading">' +
					'<h4><a href="'+shouterHref+'">'+shouterName+'</a> <small>'+pubdate+'</small></h4>' +
				'</div>' +
				shoutContent +
			'</div>' +
		'</li>').appendTo('#shouts-list')

	}

	$(shouts).each(function(){addShout(this)})

	// Event Bindings
	$('#shout-form').on("submit",function(){
		$('#shout-chars-left').val($('#shout-message').val().length)
		if($('#shout-message').val().length<=222){
			$.ajax({
				url:$(this).attr('action'),
				type: "POST",
				data: serialize($(this)),
				complete:function(xhr){
					addShout($(xhr.responseText).find('.cat>b:contains(Shouts)').parents('table:first').nextAll('table:first'),true,true)
					tmp.remove()
				}
			})
			$('#shout-message').val("").trigger("keyup")
		}
		return false;
	}).attr('action',$('#JSForm').attr('action')).attr('method','POST')
	$('#JSForm input[type=hidden]').remove().prependTo('#shout-form')
	$('#shout-message').on("keyup",function(){
		n = 222-$(this).val().length
		$('#chars-left').html("<span class='"+((n<32)?"text-danger":"text-muted")+"'>"+n+"</span>")
	}).trigger('keyup')

	// -- Bindings for panel expanders
	$('.panel-expandable').each(function(){
		$(this).attr('data-full-height',$(this).height())
			.css({'max-height':$(this).attr('data-short-height')+"px"})
	})
	$('.panel-expander').on("click",function(){
		tgt = $(this).parents('.panel:first').find('.panel-expandable')
		if(tgt.is('.expanded')) {
			tgt.animate({'max-height':$(tgt).attr('data-short-height')})
				.removeClass('expanded')
			$(this).text('Show More')
		} else {
			tgt.animate({'max-height':$(tgt).attr('data-full-height')})
				.addClass('expanded')
			$(this).text('Show Less')
		}
	})

	$('.content.maintable').hide()
})