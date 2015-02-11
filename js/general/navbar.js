navbarSkel = ""
if(window.fastyle.loginSession){
	rightSkel = '<li><a href="" id="user-anchor"></a></li>' +
			'<li>' +
				'<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">My FA</a>' +
				'<ul class="dropdown-menu" role="menu">' +
					'<li><a href="/msg/pms/">Notes</a></li>' +
					'<li><a href="/controls/journal">Journals</a></li>' +
					'<li class="divider"></li>' +
					'<li role="presentation" class="dropdown-submenu">' +
					'<a href="#">Account Management</a>' +
					'<ul class="dropdown-menu">' +
					'<li><a href="/controls/settings/">Account Settings</a></li>' +
					'<li><a href="/controls/site-settings/">Site Settings</a></li>' +
					'<li><a href="/controls/profile/">Profile Info</a></li>' +
					'<li><a href="/controls/avatar/">Update Avatar</a></li>' +
					'</ul>' +
					'</li>' +
					'<li role="presentation" class="dropdown-submenu">' +
					'<a href="#">Page Management</a>' +
					'<ul class="dropdown-menu">' +
					'<li><a href="/controls/journal/">Journals</a></li>' +
					'<li><a href="/controls/journalsettings/">Journal Settings</a></li>' +
					'<li><a href="/controls/submissions/">Submissions</a></li>' +
					'<li><a href="/commissions/(USER)">Commission Info</a></li>' +
					'<li><a href="/controls/shouts/">Page Shouts</a></li>' +
					'<li><a href="/controls/favorites/">Favorites</a></li>' +
					'<li><a href="/controls/buddylist/">Watch List</a></li>' +
					'</ul>' +
					'</li>' +
					'<li role="presentation" class="dropdown-submenu">' +
					'<a href="#">Site Security</a>' +
					'<ul class="dropdown-menu">' +
					'<li><a href="/controls/sessions/logins/">Active Sessions</a></li>' +
					'<li><a href="/controls/sessions/logs/">Activity Log</a></li>' +
					'<li><a href="/controls/sessions/labels/">Browser Labels</a></li>' +
					'</ul>' +
					'</li>' +
					'<li><a href="/controls/troubletickets/">Report a Problem</a></li>' +
					'<li class="divider"></li>' +
					'<li role="presentation" class="dropdown-header">Community</li>' +
					'<li><a href="forums.furaffinity.net">FA Forums</a></li>' +
					'<li><a href="//help.furaffinity.net/article/AA-00201/9/Fur-Affinity-IRC-Chat.html">IRC Chat</a></li>' +
					'<li><a href="twitter.com/furaffinity">Twitter</a></li>' +
					'<li><a href="www.facebook.com/furaffinity">Facebook</a></li>' +
					'<li><a href="//help.furaffinity.net/article/AA-00210/7/Advertising.html">Advertising</a></li>' +
					'<li class="divider"></li>' +
					'<li role="presentation" class="dropdown-header">Support</li>' +
					'<li><a href="/journals/fender/">News and Updates</a></li>' +
					'<li><a href="//help.furaffinity.net">Knowledgebase</a></li>' +
					'<li><a href="/staff/">Site Staff</a></li>' +
					'<li><a href="//help.furaffinity.net/article/AA-00203/8/Terms-of-Service-TOS.html">Terms of Service</a></li>' +
					'<li><a href="//help.furaffinity.net/article/AA-01065/0/Code-of-Conduct-COC.html">Code of Conduct</a></li>' +
					'<li><a href="//help.furaffinity.net/article/AA-00205/8/Acceptable-Upload-Policy-AUP.html">Acceptable Upload Policy</a></li>' +
				'</ul>' +
			'</li>' +
			'<li id="sfw-switch-item"><a href="?" id="sfw-switch">SFW</a></li>' +
			'<li><a href="/logout/">Log Out</a></li>'
} else {
	rightSkel = '<li><a href="/register/">Register</a></li>' +
	'<li><a href="/login/">Log in</a></li>'
}
navbarSkel = '<div class="navbar navbar-default" id="fastyle-navbar">' +
	'<ul class="nav navbar-nav pull-right">' +
	rightSkel +
	'</ul>' +
	'<ul class="nav navbar-nav">' +
		'<li><a href="/browse/">Browse</a></li>' +
		'<li><a href="/search/">Search</a></li>' +
		'<li><a href="/submit/">Submit</a></li>' +
	'</ul>' +
	'<form action="/search/" class="navbar-form navbar-left" role="search" method="POST">' +
		'<div class="form-group">' +
			'<div class="input-group">' +
				'<input type="text" class="form-control" name="q" id="search-query" placeholder="Search" />' +
				'<span class="input-group-btn">' +
					'<button class="btn btn-default" type="submit">Go</button>' +
				'</span>' +
			'</div>' +
		'</div>' +
	'</form>' +
'</div>'

$(document).ready(function(){
	$(navbarSkel).insertBefore('.block-menu-top')
	$('.block-menu-top').hide()

	// Data population
	username = $('#my-username').text()
	userHref = $('#my-username').attr('href')
	messageItems = $('.block-menu-top li.noblock:first a')

	$('#user-anchor').text(username)
		.attr('href',userHref)

	// -- Notification icons
	iconLookup = {
		S: {i:"picture",l:"Submission"},
		C: {i:"comment",l:"Comment"},
		J: {i:"pencil",l:"Journal"},
		F: {i:"heart",l:"Favorite"},
		W: {i:"user",l:"Watcher"},
		T: {i:"exclamation-sign",l:"Ticket"},
		N: {i:"envelope",l:"Note"}
	}
	$(messageItems).each(function(){
		if(!!$(this).text()){
			var messageText = $(this).text();
			var messageLink = $(this).attr('href');
			
			if (messageText == "No Messages") {
				$("#messages").remove();
			}
			else if (messageLink != "/controls/messages/") {
				
				var messageArr = messageText.split(", ");
				
				for (index = 0; index<messageArr.length; index++) {
					
					var messageType = messageArr[index].charAt(messageArr[index].length-1)
					var messageNum = window.fastyle.addCommas(""+messageArr[index].substr(0, messageArr[index].length-1))
					var messageGlyph = (lk=iconLookup[messageType])?lk.i:"question-sign"
					var messageLabel = (lk=iconLookup[messageType])?lk.l:"Notification"
					
					var messageHTML = '<li>' +
							'<a href="' + messageLink + '" class="message-icon" data-toggle="tooltip" data-placement="bottom" title="'+messageNum+' '+messageLabel+(messageNum!=1?'s':'')+'">' + 
								'<span class="glyphicon glyphicon-' + messageGlyph + '"></span>'+
								'<div class="message-num label label-danger">' + messageNum + '</div>'+
							'</a>' +
						'</li>';
					
					msg = $(messageHTML).insertBefore('#sfw-switch-item')
					$(msg).find('a').css({'padding-right':$(msg).find('.message-num').width()+12})
				}
				
			}
		}
	})

	$('.message-icon').css({
		color: $('#')
	})

	// Event Bindings
	SFWToggled = parseInt((t=document.cookie.match(/sfw=(\d)/))?t[1]:0)
	$('#sfw-switch').on("click",function(){
		window.fastyle.setCookie('sfw',SFWToggled?'0':'1')
	}).parents('li:first').addClass(SFWToggled?"active":"")

	$('body').on("click",'.header-position-switch',function() {
		tog = window.fastyle.headerFixed = !$('#fastyle-navbar').is('.navbar-fixed-top')
		window.fastyle.setCookie('navpos',(tog)?'fixed':'static')
		window.fastyle.setNavbarPosition(tog)
	})

	window.fastyle.setNavbarPosition(window.fastyle.getCookie('navpos','static')=='fixed')
});