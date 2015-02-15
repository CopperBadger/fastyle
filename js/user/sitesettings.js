// Stores currently selected values, as they're overwritten after appending skeleton
var disable_avatars = $('input[name=disable_avatars]:checked').val();
var date_format = $('input[name=date_format]:checked').val();
var perpage = $('select[name=perpage]').val();
var newsubmissions_direction = $('select[name=newsubmissions_direction]').val(); // <select> in FA's source - turned into radios in FAStyle
var thumbnail_size = $('select[name=thumbnail_size').val();
var hide_favorites = $('select[name=hide_favorites').val();
var no_guests = $('select[name=no_guests').val(); // <select> in FA's source - turned into radios in FAStyle
var no_notes = $('select[name=no_notes').val(); // <select> in FA's source - turned into radios in FAStyle

var skel = '<div class="panel panel-default">' +
	'<div class="panel-heading">Site Settings</div>' +
	'<div class="panel-body">' +
		'<form class="form-horizontal" method="POST" action="/controls/site-settings/">' +
			'<input type="hidden" name="do" value="update"/>' +
			'<div class="form-group">' +
				'<label for="disableavatars" class="col-sm-2 control-label">Disable avatars</label>' +
				'<div class="col-sm-10">' +
					'<label class="radio-inline">' +
						'<input type="radio" name="disable_avatars" value="1" />' +
						'Yes' +
					'</label>' +
					'<label class="radio-inline">' +
						'<input type="radio" name="disable_avatars" value="0" />' +
						'No' +
					'</label>' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="dateformat" class="col-sm-2 control-label">Date format</label>' +
				'<div class="col-sm-10">' +
					'<label class="radio-inline">' +
						'<input type="radio" name="date_format" value="full" />' +
						'Full (example: October 30, 2007, 00:23)' +
					'</label>' +
					'<label class="radio-inline">' +
						'<input type="radio" name="date_format" value="fuzzy" />' +
						'Fuzzy (example: 5 hours ago)' +
					'</label>' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="perpage" class="col-sm-2 control-label">Default number of items shown per page</label>' +
				'<div class="col-sm-10">' +
					'<select class="form-control" name="perpage">' +
						'<option value="24">24</option>' +
						'<option value="36">36</option>' +
						'<option value="48">48</option>' +
						'<option value="60">60</option>' +
					'</select>' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="notificationsorder" class="col-sm-2 control-label">Order of new notifications</label>' +
				'<div class="col-sm-10">' +
					'<label class="radio-inline">' +
						'<input type="radio" name="newsubmissions_direction" value="asc" />' +
						'Oldest first' +
					'</label>' +
					'<label class="radio-inline">' +
						'<input type="radio" name="newsubmissions_direction" value="desc" />' +
						'Newest first' +
					'</label>' +
				'</div>' +		
			'</div>' +
			'<div class="form-group">' +
				'<label for="thumbnailsize" class="col-sm-2 control-label">Thumbnail size (in pixels)</label>' +
				'<div class="col-sm-10">' +
					'<select class="form-control" name="thumbnail_size">' +
						'<option value="100">100</option>' +
						'<option value="150">150</option>' +
						'<option value="200">200</option>' +
					'</select>' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="hidefavorites" class="col-sm-2 control-label">Hide favorites</label>' +
				'<div class="col-sm-10">' +
					'<select class="form-control" name="hide_favorites">' +
						'<option value="n">Show everything</option>' +
						'<option value="a">Hide Adult content</option>' +
						'<option value="ma">Hide Mature and Adult content</option>' +
						'<option value="e">Hide everything</option>' +
					'</select>' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="guessaccess" class="col-sm-2 control-label">Guest access</label>' +
				'<div class="col-sm-10">' +
					'<label class="radio-inline">' +
						'<input type="radio" name="no_guests" value="0" />' +
						'Guests are allowed' +
					'</label>' +
					'<label class="radio-inline">' +
						'<input type="radio" name="no_guests" value="1" />' +
						'Guests are blocked' +
					'</label>' +
				'</div>' +
			'</div>' +
			'<div class="form-group">' +
				'<label for="disablenotes" class="col-sm-2 control-label">Disable notes</label>' +
				'<div class="col-sm-10">' +
					'<label class="radio-inline">' +
						'<input type="radio" name="no_notes" value="0" />' +
						'Notes are enabled' +
					'</label>' +
					'<label class="radio-inline">' +
						'<input type="radio" name="no_notes" value="1" />' +
						'Notes are disabled (except to and from the Administration team)' +
					'</label>' +
				'</div>' +
			'</div>' +
			'<button type="submit" class="btn btn-primary">Save Settings</button>' +
		'</form>' +
	'</div>' +
'</div>';

$(document).ready(function(){
	$(skel).insertBefore('.content.maintable');

	// Inserts stored values
	$('input[name=disable_avatars]').val([disable_avatars]);
	$('input[name=date_format]').val([date_format]);
	$('select[name=perpage]').val(perpage);
	$('input[name=newsubmissions_direction]').val([newsubmissions_direction]);
	$('select[name=thumbnail_size]').val(thumbnail_size);
	$('select[name=hide_favorites]').val(hide_favorites);
	$('input[name=no_guests]').val([no_guests]);
	$('input[name=no_notes]').val([no_notes]);
});