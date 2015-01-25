var topSkel = 
	'<div class="row" id="new-search-query">'+
		'<div class="col-sm-12">'+
			'<h3>Search results for <span id="query-text"></span></h3>'+
		'</div>'+
	'</div>'+
	
	'<div class="row" id="username-found">'+
		'<div class="col-sm-12">'+
			'<div class="list-group">'+
				'<a href="#" class="list-group-item" id="username-searching">Checking if Username exists...</a>'+
				'<a href="#" class="list-group-item list-group-item-danger hidden" id="username-error">Error checking for username</a>'+
				'<a style="padding: 3px 5px 5px 5px;" href="#" class="list-group-item list-group-item-success hidden" id="username-link"><img style="width:35px; margin-right: 5px;" id="found-img" class="img-rounded" />&nbsp;<div style="margin-top:8px;display:inline-block;">Found a matching username! Click here to go to their profile.</div></a>'+
			'</div>'+
		'</div>'+
	'</div>';


var formSkel = 
'<div class="row" id="new-search-form">' +
'<div class="col-sm-12">'+
	'<div class="page-header"><h2>Search</h2></div>' +
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
		'</form>'+
	'</div>'+
'</div>';

$(document).ready(function(){
	
	$(topSkel).insertBefore("#gallery-container");
	
	$(formSkel).insertBefore('.content.maintable');

	$('#search-form fieldset:first').hide();
		
	var searchQuery = $("#q").val();
	$("#query-text").text(searchQuery);
	
	var usernamePattern = new RegExp("^[A-Za-z0-9-_~\.]+$");
	var isValidUsername = usernamePattern.test(searchQuery);
	
	if (isValidUsername) {
	
		$.ajax({
		    url : '/register/?phase=5&mode=check_username',
		    type: 'POST',
		    data : {
			    username: searchQuery
			},
		    success: function(ret){
			    
			    var result = ret.replace("/*-secure-\n","").replace("*/","");
				result = JSON.parse(result);
				status = result.status;
				if (status == 1) {
					$("#username-link").removeClass('hidden').attr('href','/user/' + searchQuery);
					$("#found-img").attr('src', '//a.facdn.net/'+ searchQuery +'.gif');
					console.log("username found");
				}
				else {
					console.log("username not found");
				}
				$("#username-searching").remove();
				$("#username-error").remove();
		    },
		    error: function (result){
		 		$("#username-link").removeClass('hidden').
				$("#username-searching").remove();
				$("#username-link").remove();
		    }
		});
		
	}
	
	else {
		$("#username-searching").remove();
		$("#username-error").remove();
		console.log("regex mismatch");
	}

})