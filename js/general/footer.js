footskel = '<div class="row" style="margin-top:92px;">' +
	'<div class="col-xs-12">' +
		'<div class="well">' +
			'<div class="btn-group" id="footer-links"></div>' +
			'<p id="footer-content" style="padding:16px 0"></p>' +
		'</div>' +
	'</div>' +
'</div>'


$(document).ready(function(){
	$('.footer').remove().appendTo('.container:last')
	$(footskel).insertBefore('.footer')

	$('.footer a').addClass('btn btn-default')
		.remove().appendTo('#footer-links')

	$('#footer-content').html((h=$('.footer').html()).substring(h.search('Fur Affinity')))

	$('.footer').hide()
})