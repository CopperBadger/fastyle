$(document).ready(function(){

	$('<div class="row" id="new-search-form">').insertBefore('.content.maintable').html('<div class="page-header"><h2>Search</h2></div>' +
		'<form class="form form-horizontal" method="POST" action="/search">' +
			'<div class="col-sm-6">'+
				'<div class="form-group">' +
					'<label for="query" class="col-sm-2 control-label">Search Query</label>' +
					'<div class="col-sm-10">' +
						'<input type="text" class="form-control" name="q" id="query" />' +
					'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<label for="order-by" class="col-sm-2 control-label">Sort By</label>' +
					'<div class="col-sm-10">' +
						'<select class="form-control" name="order-by" id="order-by">' +
							'<option value="relevancy">Relevance</option>' +
							'<option value="date">Date</option>' +
							'<option value="popularity">Popularity</option>' +
						'</select>' +
					'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<label for="order-direction" class="col-sm-2 control-label">Order</label>' +
					'<div class="col-sm-10">' +
						'<select class="form-control" name="order-direction" id="order-direction">' +
							'<option value="desc">Descending</option>' +
							'<option value="asc">Ascending</option>' +
						'</select>' +
					'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<label for="search-button" class="col-sm-2 control-label">Search</label>' +
					'<div class="col-sm-10">' +
						'<button id="search-button" class="btn btn-primary">' +
							'Search' +
						'</button>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="col-sm-6">' +
				'<div class="form-group">' +
					'<div class="col-sm-2 control-label">Range</div>' +
					'<div class="col-sm-10 btn-group" data-toggle="buttons">' +
						'<label class="btn btn-primary" for="range-day">' +
							'<input type="radio" id="range-day" value="day" name="range" autocomplete="off"> One Day' +
						'</label>' +
						'<label class="btn btn-primary" for="range-threedays">' +
							'<input type="radio" id="range-threedays" value="3days" name="range" autocomplete="off"> Three Days' +
						'</label>' +
						'<label class="btn btn-primary" for="range-week">' +
							'<input type="radio" id="range-week" value="week" name="range" autocomplete="off"> One Week' +
						'</label>' +
						'<label class="btn btn-primary" for="range-month">' +
							'<input type="radio" id="range-month" value="month" name="range" autocomplete="off"> One Month' +
						'</label>' +
						'<label class="btn btn-primary active" for="range-all">' +
							'<input type="radio" id="range-all" value="all" name="range" autocomplete="off" checked> No Limit' +
						'</label>' +
					'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<div class="col-sm-2 control-label">Rating</div>' +
					'<div class="col-sm-10 btn-group" data-toggle="buttons">' +
						'<label class="btn btn-primary" for="rating-general">' +
							'<input type="checkbox" id="rating-general" name="rating-general" autocomplete="off"> General' +
						'</label>' +
						'<label class="btn btn-primary" for="rating-mature">' +
							'<input type="checkbox" id="rating-mature" name="rating-mature" autocomplete="off"> Mature' +
						'</label>' +
						'<label class="btn btn-primary" for="rating-adult">' +
							'<input type="checkbox" id="rating-adult" name="rating-adult" autocomplete="off"> Adult' +
						'</label>' +
					'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<div class="col-sm-2 control-label">Type</div>' +
					'<div class="col-sm-10 btn-group" data-toggle="buttons">' +
						'<label class="btn btn-primary" for="type-art">' +
							'<input type="checkbox" id="type-art" name="type-art" autocomplete="off"> Art' +
						'</label>' +
						'<label class="btn btn-primary" for="rating-flash">' +
							'<input type="checkbox" id="type-flash" name="type-flash" autocomplete="off"> Flash' +
						'</label>' +
						'<label class="btn btn-primary" for="rating-photo">' +
							'<input type="checkbox" id="type-photo" name="type-photo" autocomplete="off"> Photo' +
						'</label>' +
						'<label class="btn btn-primary" for="rating-music">' +
							'<input type="checkbox" id="type-music" name="type-music" autocomplete="off"> Music' +
						'</label>' +
						'<label class="btn btn-primary" for="rating-story">' +
							'<input type="checkbox" id="type-story" name="type-story" autocomplete="off"> Story' +
						'</label>' +
						'<label class="btn btn-primary" for="rating-poetry">' +
							'<input type="checkbox" id="type-poetry" name="type-poetry" autocomplete="off"> Poetry' +
						'</label>' +
					'</div>' +
				'</div>' +
				'<div class="form-group">' +
					'<div class="col-sm-2 control-label">Match Mode</div>' +
					'<div class="col-sm-10 btn-group" data-toggle="buttons">' +
						'<label class="btn btn-primary" for="mode-all">' +
							'<input type="radio" id="mode-all" value="all" name="mode" autocomplete="off"> All of the words' +
						'</label>' +
						'<label class="btn btn-primary" for="mode-any">' +
							'<input type="radio" id="mode-any" value="any" name="mode" autocomplete="off"> Any of the words' +
						'</label>' +
						'<label class="btn btn-primary" for="mode-extended">' +
							'<input type="radio" id="mode-extended" value="extended" name="mode" autocomplete="off" checked> Normal' +
						'</label>' +
					'</div>' +
				'</div>' +
			'</div>' +

		'</form>')

	$('.page-header').wrap('<div class="col-sm-12">')

	$('#search-form fieldset:first').hide()

})