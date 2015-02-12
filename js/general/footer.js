footskel = '<div class="row" id="ad-row" style="margin:72px 0 16px 0;">' +
	'<div class="col-sm-3"></div>' +
	'<div class="col-sm-3 default-ad-container"></div>' +
	'<div class="col-sm-3">' +
		'<div class="default-ad-container"></div>' +
		'<div class="default-ad-container"></div>' +
	'</div>' +
	'<div class="col-sm-3"></div>' +
'</div>' +
'<div class="row">' +
	'<div class="col-xs-12">' +
		'<div class="well">' +
			'<div class="btn-group" id="footer-links"></div>' +
			'<p id="footer-content" style="padding:16px 0"></p>' +
		'</div>' +
	'</div>' +
'</div>'


$(document).ready(function(){
	$('.footer').hide().appendTo('.container:last')
	$(footskel).insertBefore('.footer')

	$('.footer a:not([href*="rv.fur"])').addClass('btn btn-default')
		.remove().appendTo('#footer-links')

	$('#footer-content').html((h=$('.footer').html()).substring(h.search('Fur Affinity')))


	$('.footer').hide()
})