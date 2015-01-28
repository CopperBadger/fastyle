footskel = '<div class="container">' +
	'<div class="row">' +
		'<div class="col-xs-12">' +
			'<div class="well">' +
				'<div class="btn-group" id="footer-links"></div>' +
				'<p id="footer-content" style="padding:16px 0"></p>' +
			'</div>' +
		'</div>' +
	'</div>' +
'</div>'


$(document).ready(function(){
	$(footskel).insertBefore('.footer')

	$('.footer a').addClass('btn btn-default')
		.remove().appendTo('#footer-links')

	$('#footer-content').html((h=$('.footer').html()).substring(h.search('Fur Affinity')))

	$('.footer').hide()
})