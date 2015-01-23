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
			//console.log(parts)
			out[parts[0]] = parts[1]
		}
	}
	return out;
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

function capitalize(src){
	return src?(src[0].toUpperCase()+src.substring(1)):src
}

function addCommas(strnum){
	n = (l=strnum.length)%3
	return ((p=strnum.substring(0,n))&&(p+(l>3?',':''))) + strnum.substring(n).replace(/(\d{3})(\d{3})/g,'$1,$2')
}

$(document).ready(function(){

	firstTable = $('.ldot>b:contains(Full Name)').parents('.maintable:first').children('tbody')
	window.fastyle.profile_of = $(firstTable).find('tr:nth-child(2)>.addpad.lead>b').text().substring(1)
	truncatedName = window.fastyle.truncateduname = window.fastyle.profile_of.toLowerCase().match(/[a-z0-9\-]+/g).join('')

	// Page header
	if(userBannerHref = (a=$('#featured-submission a')).attr("href")||(a=$('.flow.userpage-first-submission a')).attr("href")){
		userBanner = $('<div class="row">').insertAfter('#user-nav').hide()
		userBannerTitle = $(a).parents('u:first').next('span').text()
		$.ajax({
			url: userBannerHref.replace('view','full'),
			type: "GET",
			complete: function(xhr){
				banner = $(xhr.responseText).find('#submissionImg').attr('src')
				if(banner){
				$(userBanner).css({
						'margin':('0 0 16px 0'),
						'height':'148px',
						'background':'transparent url("'+banner+'") 50% 25% no-repeat',
						'background-size':'cover',
						'box-shadow':'inset 0 -24px 64px rgba(0,0,0,0.3), inset 0 72px 0 rgba(255,255,255,0.15), inset 0 45px 72px rgba(255,255,255,0.25)',
						'padding':'16px',
						'text-align':'right'
					}).addClass('img-rounded').append(
						$("<a href='"+userBannerHref+"'>"+(userBannerTitle)+"</a>")
							.css({
								'color':'#FFF',
								'font-weight':'bold',
								'background-color':'rgba(0,0,0,0.6)',
								'padding':'4px',
								'opacity':'0.6'
							}).addClass('img-rounded')
						).show()
				} else { $(userBanner).remove()}
			}
		})
	} else {
		console.log("No banner, no submissions found")
	}

	var newRow = function(){return $('<div class="row">').insertBefore('.content.maintable:first')}
	cursorRow = newRow()
		
	$(firstTable).css({'background-color':'rgba(0,0,0,0.1)'})

	idpic = (idlink=$('#profilepic-submission a')).find('img').attr('src')
	avatar = ("http://a.facdn.net/"+truncatedName+'.gif')

	// --- First Column: ID Badge + Info, Watches list, Watchers list
	col = $('<div class="col-md-4">').appendTo(cursorRow)

	// ID Badge
	idbadge = $('<div class="panel panel-default" id="profile-badge" style="padding-top:8px">').appendTo(col)
	wra = $('<div style="text-align:center">').appendTo(idbadge)
		.append('<h2>'+window.fastyle.profile_of+'</h2></div>')
		.append('<div class="panel-body"><img class="img img-rounded" src="'+(idpic||avatar)+'" style="border:solid 4px rgba(0,0,0,0.2)" id="badge-pic" /></div>')
	idbadge
		.append('<table class="table" id="profile-info-table">')

	if(idlink){
		$('#badge-pic').wrap("<a href='"+idlink.attr('href')+"'>")
	}

	// Info
	infoWell = $('<div class="panel panel-default" id="profile-info">').appendTo(col)
	profileRow = $(firstTable).find('>tr:last>td:last>table>tbody>tr')
	profile = profileRow.children('td:first')
	summary = (summary=profile.html()).substring(summary.search(q="<b>Artist Profile:</b><br>")+q.length)

	inftab = $("<table class='table' id='full-info'>").appendTo(infoWell).wrap("<div class='panel-body' style='padding:0'>")
	var retab = function(data){
		out = {}
		for(k in data){out[k.replace(/[^A-Za-z0-9\s\-]/g,'')] = data[k].replace(/^\:\s?/g,'')}
		return out
	}

	info = retab(extractInfo(profile.html()))
	stats = retab(extractInfo(profileRow.children('td:last').html()))
	for(s in stats){stats[s]=addCommas(stats[s])}
	info2 = retab(extractInfo($('.user-info').html()))
	contact = {};
		$('td.user-contacts tr').each(function(){contact[$(this).find('th').text()]=$(this).find('td').html()})
		retab(contact)

	var addRow = function(key,val){
		if(id=(t=val.match(/(?:v=|\.be\/)(.{11})/))?t[1]:""){
			$("<div class='panel panel-default'><div class='panel-heading'>"+key+"</div><div class='panel-body'><div class='embed-responsive embed-responsive-16by9'><iframe src='//www.youtube.com/embed/"+id+"' class='embed-responsive-item' frameborder='0' allowfullscreen></iframe></div></div>")
				.insertBefore('#profile-info')
			}
		return (key&&val)?$('<tr>').appendTo(inftab).append("<td>"+key+"</td>").append("<td>"+capitalize(val)+"</td>"):null
	}

	for(i in a=[["Basic Information",info],["Extended Information",info2],["Contact Information",contact],["Statistics",stats]]){
		$('<tr><th colspan="2" style="width:50%">'+a[i][0]+'</th></tr>').appendTo(inftab)
		for(k in a[i][1]){
			addRow(k,a[i][1][k])
		}
	}

	var toggleInfo = function(){
		if($('#profile-info .panel-body').attr('data-expanded')=="true") {
			$('#profile-info-expander').text("Read More")
			$('#profile-info .panel-body').animate({'max-height':'196px'})
				.attr('data-expanded','false')
		} else {
			$('#profile-info-expander').text("Show Less")
			h = $('#profile-info .panel-body').css({'max-height':''}).height()
			$('#profile-info .panel-body').css({'max-height':'196px'}).animate({'max-height':h})
				.attr('data-expanded','true')
		}
	}

	$('<ul class="list-group"><a href="javascript:void(0)" class="list-group-item" id="profile-info-expander">Read More</a></ul>')
		.appendTo((e=$('#profile-info'))
		.find('.panel-body').css({'max-height':'196px','overflow':'hidden'}).end())
		.click(toggleInfo)

	inftab = $('#profile-info-table').css({'margin-top':'8px'})
	var addRow = function(key,val){return (key&&val)?$('<tr>').appendTo(inftab).append("<td>"+key+"</td>").append("<td>"+capitalize(val)+"</td>"):null}
	if(idpic){addRow("Avatar","<img class='img img-rounded' src='"+avatar+"' />")}
	addRow("Full Name",info['Full Name']);
	addRow("Species",info2['Species']);
	addRow("Age",info2['Age']);


	// Watches panel
	watchingCount = addCommas((watchingLink = $('#is-watching').parents('tr:first').next('tr').find('a')).text().match(/\d+/)[0])
	watching = $('#is-watching td a')

	if(watching.length){
		row = $("<div class='row'>").appendTo(
				$('<div class="panel panel-default"></div>')
				.prepend("<div class='panel-heading'><a href='"+$(watchingLink).attr('href')+"'>Watching</a> &#183; "+(watchingCount)+"</div>")
				.appendTo(col)).wrap("<div class='panel-body'>")
		idx = 0
		$(watching).each(function() {
			name = $(this).text()
			$("<div class='col-xs-3'>").appendTo(row)
				.append("<img src='http://a.facdn.net/"+((t=$(this).attr("href").match(/([^\/]+)\/$/))?t[1]:'null/undefined')+".gif' alt='"+name+"' />")
				.wrapInner("<a href='"+$(this).attr("href")+"' class='thumbnail' title='"+name+"'>")
			if(++idx==4) {row = $("<div class='row'>").insertAfter(row);idx=0;}
		});
	}

	// Watchers panel
	watcherCount = addCommas((watcherLink = $('#watched-by').parents('tr:first').next('tr').find('a')).text().match(/\d+/)[0])
	watchers = $('#watched-by td a')

	if(watchers.length){
		row = $("<div class='row'>").appendTo(
				$('<div class="panel panel-default"></div>')
				.prepend("<div class='panel-heading'><a href='"+$(watcherLink).attr('href')+"'>Watched By</a> &#183; "+(watcherCount)+"</div>")
				.appendTo(col))
			.wrap("<div class='panel-body'>")
		idx = 0
		$(watchers).each(function() {
			name = $(this).text()
			$("<div class='col-xs-3'>").appendTo(row)
				.append("<img src='http://a.facdn.net/"+((t=$(this).attr("href").match(/([^\/]+)\/$/))?t[1]:'null/undefined')+".gif' alt='"+name+"' />")
				.wrapInner("<a href='"+$(this).attr("href")+"' class='thumbnail' title='"+name+"'>")
			if(++idx==4) {row = $("<div class='row'>").insertAfter(row);idx=0;}
		});
	}

	// Latest journal
	journal = $('b:contains(Latest Submissions)').parents("table").eq(1).find(">tbody>tr:last>td:last>.maintable:first")
	if(journal.length && ((t=(anchor=$(journal).find('a:first')).attr('href'))?t.search(/\/journal/):-1)!=-1) {
		pan = $('<div class="panel panel-default">').appendTo(col)
			.prepend("<div class='panel-heading'>Latest Journal</div>")
		bod = $('<div class="panel-body">').appendTo(pan)
			.html($(journal).find("tr .no_overflow.alt1").html())
			.css({'max-height':'480px','overflow-y':'hidden'})
		$("<ul class='list-group'><a href='"+$(anchor).attr('href')+"' class='list-group-item'>View Full Journal</a></ul>").appendTo(pan)
		$(anchor).prependTo(jtitle = $('<h4>').prependTo(bod))
		$($(journal).find('.popup_date').remove()).appendTo(jtitle).wrap("<small style='display:block;'>")
	}

	// --- Second Column: Art, Profile summary, Shouts
	col = $('<div class="col-md-8">').appendTo(cursorRow)

	// Summary
	$("<div class='panel panel-default' id='summary-well'>")
		.append("<div class='panel-body'>"+summary+"</div>")
		.prepend("<div class='panel-heading'>About "+window.fastyle.profile_of+"</div>")
		.appendTo(col)

	if($('#summary-well .panel-body').height() > $('#profile-badge').height()) {
		var toggleSummary = function(){
			if($('#summary-well .panel-body').attr('data-expanded')=="true") {
				$('#summary-expander').text("Read More")
				$('#summary-well .panel-body').animate({'max-height':$('#profile-badge').height()})
					.attr('data-expanded','false')
			} else {
				$('#summary-expander').text("Show Less")
				$('#summary-well .panel-body').animate({'max-height':$('#summary-well').attr('data-full-height')})
					.attr('data-expanded','true')
			}
		}

		$('<ul class="list-group"><a href="javascript:void(0)" class="list-group-item" id="summary-expander">Read More</a></ul>')
			.appendTo((e=$('#summary-well')).attr('data-full-height',e.height()+72)
			.find('.panel-body').css({'max-height':$('#profile-badge').height()+"px",'overflow-y':'scroll','overflow-x':'hidden'}).end())
			.click(toggleSummary)

	} else {$('#summary-well').css({'overflow-x':'hidden'})}
	$('.bbcode_center').css({'text-align':'center'})

	// Submissions
	subs = $('.flow.userpage-submissions.twolines a')
	if(subs.length) {
		pan = $('<div class="panel panel-default"></div>').appendTo(col)
			.append("<div class='panel-heading'><a href='http://www.furaffinity.net/gallery/"+truncatedName+"/'>Submissions</a></div>")
			.append("<div class='panel-body'><div class='row'><div class='col-md-12' id='submission-well'></div></div></div>")
		list = $('#submission-well')
		var newRow = function(){return $('<div class="row"></div>').appendTo(list)}
		r = newRow()
		idx = rows = 0
		mh = 0
		subs.each(function(){
			$(this).remove().appendTo(r)
				.addClass('thumbnail contain-hover')
				.wrap("<div class='col-xs-4'>")
				.css({'background':'transparent url("'+$(this).find('img').attr('src').replace('@100','@300')+'") 50% 50% / cover no-repeat',height:'132px'})
				.find('img').remove()
			if(++idx>=3){r = newRow();idx=0;rows+=1}
			if(rows>=2){
				return false;
			}
		})

		$('.userpage-first-submission .popup_date').addClass('pull-right text-muted').remove().appendTo($(pan).find('.panel-heading')).prepend("Last submission: ")
	}

	// Favorites
	faves = $('.flow.userpage-favorites.twolines a')
	if(faves.length) {
		pan = $('<div class="panel panel-default"></div>').appendTo(col)
			.append("<div class='panel-heading'><a href='http://www.furaffinity.net/favorites/"+truncatedName+"/'>Favorites</a></div>")
			.append("<div class='panel-body'><div class='row'><div class='col-md-12' id='favorites-well'></div></div></div>")
		list = $('#favorites-well')
		var newRow = function(){return $('<div class="row"></div>').appendTo(list)}
		r = newRow()
		idx = rows = 0
		mh = 0
		faves.each(function(){
			$(this).remove().appendTo(r)
				.addClass('thumbnail contain-hover')
				.wrap("<div class='col-xs-3'>")
				.css({'background':'transparent url("'+$(this).find('img').attr('src').replace('@100','@300')+'") 50% 50% / cover no-repeat',height:'104px'})
				.find('img').remove()
			if(++idx>=4){r = newRow();idx=0;rows+=1}
			if(rows>=2){
				return false;
			}
		})

		$('.userpage-first-favorite .popup_date').addClass('pull-right text-muted').remove().appendTo($(pan).find('.panel-heading')).prepend("Last favorite: ")
	}

	// Shouts
	addShout = function(src,slide,prepend){
		if(!(id=$(src).attr('id'))||(id.search("shout")==-1)){return true;}

		href = (a=$(src).find('.alt1.bpix.tpix.lpix.rpix.addpad a')).attr('href')
		avatar = a.children('img').attr('src')
		name = a.parent('td').next('td.lead.addpad').find('a').text()
		msg = $(src).find('.alt1.addpad .no_overflow.alt1').html().trim()
		posted = $(src).find('.popup_date').parent().html().replace("Posted:","")

		m = $('<li class="media"></li>')[prepend?"prependTo":"appendTo"]('#shouts-list').hide()
			.append("<div class='media-left'><a href='"+href+"'><img class='media-object img-rounded' src='"+avatar+"' style='width:72px' /></a></div>")
		$('<div class="media-body">').appendTo(m)
			.html(msg)
			.prepend("<div class='media-heading'><h4><a href='"+href+"'>"+name+"</a><small>"+posted+"</small></h4></div>")
		if(slide){$(m).slideDown()} else {$(m).show()}
	}

	
	$("<div class='panel panel-default' id='shouts-panel'>").appendTo(col)
	$('#shouts-panel')
		.prepend("<div class='panel-heading'>Shouts</div>")
		.append("<div class='panel-body'>")
	$('#shouts-panel').find('.panel-body').append("<ul class='media-list' id='shouts-list'>")
	shouts = $('#shouts-list')
	$('.cat>b:contains(Shouts)').parents('table:first').nextAll('table').each(function(){addShout(this);})

	shoutForm = $('<form id="shout-form">').prependTo($('#shouts-panel .panel-body')).html(
		'<div class="form-group">' +
			'<label for="shout-messsage">Message</label>' +
			'<textarea class="form-control" name="shout" id="shout-message"></textarea>' +
			'<input type="hidden" name="chars_left" id="shout-chars-left" />' +
		'</div>' +
		'<div class="form-group" style="text-align:right">' +
			'<span id="char-left" style="padding:0 8px;">...</span>' +
			'<input type="submit" class="btn btn-primary">' +
		'</div>'
		).on("submit",function(){
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
	$('#JSForm input[type=hidden]').remove().prependTo(shoutForm)
	$('#shout-message').on("keyup",function(){
		n = 222-$(this).val().length
		$('#char-left').html("<span class='"+((n<32)?"text-danger":"text-muted")+"'>"+n+"</span>")
	}).trigger('keyup')

	$('.content.maintable').remove()
})