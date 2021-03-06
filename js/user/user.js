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
			'<table class="table" id="user-summary-table">' +
				'<colgroup>' +
					'<col style="width: 40%">' +
					'<col>' +
				'</colgroup>' +
			'</table>' +
		'</div>' +
		'<div class="panel panel-default" id="user-full-info-panel">' +
			'<div class="panel-expandable" data-short-height="196" style="overflow-y:hidden">' +
				'<table class="table table-condensed" id="user-full-info-table">' +
					'<colgroup>' +
						'<col style="width: 40%">' +
						'<col>' +
					'</colgroup>' +
				'</table>' +
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
		'<div class="ad-container"></div>' +
		'<div class="ad-container"></div>' +
		'<div class="ad-container"></div>' +
		'<div class="ad-container"></div>' +
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
			'<div class="panel-body allow-previews">' +
				'<form action="javascript:void(0)" class="form" id="shout-form" method="POST">' +
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
	m = -1
	while(mat&&(++m<mat.length)) {
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
		?$('<tr>').appendTo(table).append("<td>"+key+"</td>").append("<td>"+window.fastyle.capitalize(val)+"</td>")
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
	for(s in stats){stats[s]=window.fastyle.addCommas(stats[s].trim())}
	info2 = retab(extractInfo($('.user-info').html()))
	contact = {};
		$('td.user-contacts tr').each(function(){contact[$(this).find('th').text()]=$(this).find('td').html()})
		contact = retab(contact)

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
	journalExists = journalHref&&journalHref.search('journal')!=-1

	submissions = $('.flow.userpage-submissions.twolines a')
	firstSubmissionPubdate = $('.userpage-first-submission .popup_date').wrap('<span>').parent().html()

	favorites = $('.flow.userpage-favorites.twolines a')
	firstFavoritePubdate = $('.userpage-first-favorite .popup_date').wrap('<span>').parent().html()

	shouts = $('.cat>b:contains(Shouts)').parents('table:first').nextAll('table')
	shoutAction = $('#JSForm').attr('action')

	// -- User Banner Image
	$('#user-banner-link').attr('href',featuredHref).text(featuredName)
	err = function(){$('#user-banner').remove()}
	if(featuredHref){
		window.fastyle.ajax({
			url: featuredHref.replace('view','full'),
			type: "GET",
			success: function(res){
				if(featuredSrc = $(res).find('#submissionImg').attr('src')){
					$('#user-banner').css('background-image','url("'+featuredSrc+'")')
						.show()
				} else {err()}
			},
			error: err
		})
	} else {err()}

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
		th = $('<tr><th colspan="2">'+lookups[a][0]+'</th></tr>').appendTo('#user-full-info-table')
		idx = 0
		for(k in lookups[a][1]){
			++idx
			v = lookups[a][1][k]
			if(typeof v!="string"){continue}
			console.log(k+": "+v)

			if(videoEmbeds=window.fastyle.getYouTubeEmbeds(v)) {
				i = -1
				while(++i<videoEmbeds.length){
					$('<div class="panel panel-default">' +
						'<div class="panel-heading">'+k+'</div>' +
						'<div class="panel-body" style="padding:0">' +
							'<div class="embed-responsive embed-responsive-16by9">' +
								videoEmbeds[i] +
							'</div>' +
						'</div>' +
					'</div>').insertBefore('#user-full-info-panel')
				}
			}

			//URL RegEx credit: http://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
			if(v.search(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})[^\s]+\/?$/)==-1){ 
				v=window.fastyle.capitalize(v)
			} else {
				if(v.search(/^http/)!=0){v=document.location.protocol+"//"+v}
				v = "<a href='"+v+"' target='_blank'>"+v+"</a>"
			}

			addRow(k,v,'#user-full-info-table')
		}
		if(!idx){th.remove()}
	}

	// -- (Embed YouTube videos that match)

	// -- Watching
	if(watchingCount=='0'){$('#user-watching-panel').remove()}
	else {
		$('.watching-count').text(watchingCount)
		$('#watching-link').attr('href',watchingHref)
		idx = 0
		var newRow = function(){return $('<div class="row">').appendTo('#user-watching-container')}
		row = newRow()
		watching.each(function(){
			if(idx++==4){row=newRow();idx=1}

			watchHref = $(this).attr('href')
			watchTruncatedName = ((t=watchHref.match(/\/([^\/]+)\/?$/))?t[1]:"")
			watchName = $(this).text()

			$('<div class="col-xs-3">' +
				'<a href="'+watchHref+'" title="'+watchName+'" class="thumbnail watch-thumb" data-toggle="tooltip" data-placement="bottom" style="background-image:url(\'//a.facdn.net/'+watchTruncatedName+'.gif\');"></a>' +
			'</div>').appendTo(row)
		})
	}


	// -- Watched By
	if(watchedByCount=='0'){$('#user-watched-by-panel').remove()}
	else {
		$('.watched-by-count').text(watchedByCount)
		$('#watched-by-link').attr('href',watchedByHref)
		idx = 0
		var newRow = function(){return $('<div class="row">').appendTo('#user-watched-by-container')}
		row = newRow()
		watchedBy.each(function(){
			if(idx++==4){row=newRow();idx=1}

			watchHref = $(this).attr('href')
			watchTruncatedName = ((t=watchHref.match(/\/([^\/]+)\/?$/))?t[1]:"")
			watchName = $(this).text()

			$('<div class="col-xs-3">' +
				'<a href="'+watchHref+'" title="'+watchName+'" class="thumbnail watch-thumb" data-toggle="tooltip" data-placement="bottom" style="background-image:url(\'//a.facdn.net/'+watchTruncatedName+'.gif\');"></a>' +
			'</div>').appendTo(row)
		})
	}

	
	// -- Latest Journal
	if(!journalExists||!journalContainer.length||!journalName||!journalHref){$('#user-latest-journal-panel').remove()}
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
	if(!submissions.length){$('#user-submissions-panel').remove()}
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
	if(!favorites.length){$('#user-favorites-panel').remove()}
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
	var addShout = function(src,afterLoad){
		shouterAnchor = $(src).find('table tr:first a[href*=user]:last')
		shouterName = shouterAnchor.text()
		shouterHref = shouterAnchor.attr('href')
		shouterAvatar = $(src).find('.alt1.bpix.tpix.lpix.rpix.addpad img').attr('src')
		pubdate = $(src).find('.popup_date').wrap('<span>').parent().html()
		shoutContent = $(src).find('table tr:last .no_overflow.alt1').html()

		if(!shouterAnchor.length){return false}

		m = $('<li class="media">' +
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
		'</li>')

		if(afterLoad){
			m.prependTo('#shouts-list').hide().slideDown()
		} else {
			m.appendTo('#shouts-list')
		}

		$('body').trigger('render-previews')

	}

	$(shouts).each(function(){addShout(this)})

	// Event Bindings

	// -- Binding for shout form
	$('#shout-form').on("submit",function(){
		$('#shout-chars-left').val($('#shout-message').val().length)
		if($('#shout-message').val().length<=222){
			window.fastyle.ajax({
				url:shoutAction,
				data: window.fastyle.serialize($(this)),
				success:function(res) {
					addShout($(res).find('.cat>b:contains(Shouts)').parents('table:first').nextAll('table:first'),true)
					tmp.remove()
				},
				error: function(res){
					window.fastyle.showMessage("There was an error while posting your shout")
				}
			})
			$('#shout-message').val("").trigger("keyup")
		} else {
			window.fastyle.showMessage("Shout input is too long")
		}
		return false;
	}).attr('data-ajax-action',shoutAction)
	$('#JSForm input[type=hidden]').remove().prependTo('#shout-form')
	$('#shout-message').on("keyup",function(){
		n = 222-$(this).val().length
		$('#chars-left').html("<span class='"+((n<32)?"text-danger":"text-muted")+"'>"+n+"</span>")
	}).trigger('keyup')

	// -- Bindings for panel expanders
	$('.panel-expandable').each(function(){
		shortHeight = parseInt($(this).attr('data-short-height'))
		if(!shortHeight||shortHeight>$(this).height()) {
			$(this).removeClass('panel-expandable').css({'overflow-y':''})
				.parents('.panel:first').find('.panel-expander').parents('ul:first').remove()
		} else {
			$(this).css({'max-height':shortHeight+"px"})
		}
	})
	$('.panel-expander').on("click",function(){
		tgt = $(this).parents('.panel:first').find('.panel-expandable')
		if(tgt.is('.expanded')) {
			tgt.animate({'max-height':$(tgt).attr('data-short-height')})
				.removeClass('expanded')
			$(this).text('Show More')
		} else {
			tmp = tgt.height()
			fullHeight = tgt.css({'max-height':''}).height()
			tgt.css({'max-height':tmp+'px'})
			tgt.animate({'max-height':fullHeight})
				.addClass('expanded')
			$(this).text('Show Less')
		}
	})

	$('.content.maintable').hide()
})