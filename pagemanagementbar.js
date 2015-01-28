barskel = '<ul class="nav nav-tabs" id="page-management-nav">' +
	'<li role="presentation"><a href="/controls/journal/">Journals</a></li>' +
	'<li role="presentation"><a href="/controls/journalsettings/">Journal Settings</a></li>' +
	'<li role="presentation"><a href="/controls/submissions/">Submissions</a></li>' +
	//'<li role="presentation"><a href="/commissions/'+window.fastyle.truncatedname+'">Commission Info</a></li>' +
	'<li role="presentation"><a href="/controls/shouts/">Shouts</a></li>' +
	'<li role="presentation"><a href="/controls/favorites/">Favorites</a></li>' +
	'<li role="presentation"><a href="/controls/buddylist/">Watches</a></li>' +
'</ul>'

$(document).ready(function(){
	$(barskel).insertBefore('.content.maintable')

	//$("<h1>Five LEssons learned</h1>").insertBefore('.content.maintable')

	$('#page-management-nav a[href*="'+document.location.pathname.replace(/controls|\/|\d/g,'')+'/"]')
		.parent('li').addClass('active')
})