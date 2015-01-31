skel = 
	'<div class="row">'+
			'<div class="col-sm-12">'+
				'<div class="panel panel-default" id="comminfo-panel">'+
					'<div class="panel-heading"></div>'+
					'<div class="panel-body" style="padding:0px;">'+
						'<table class="table table-striped" id="comminfo-table" style="margin-bottom:0;">'+
							'<tbody></tbody>'+
						'</table>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';

$(document).ready(function(){
	$(skel).insertBefore('.content.maintable');
	
	// data population
	
	if ($("#no-images").length) { 
		$("<tr>").appendTo("#comminfo-table tbody")
			.append("<td class='text-center' style='padding: 50px 0;'><b><i>No commission type information defined.</i></b></td>");
	}
	else {
	
		$(".types-table tr").each(function(){
			var previewAnchor = $(this).find(".preview a").attr('href');
			var previewThumb = $(this).find(".preview a img").attr('src');
			
			var commTitle = $(this).find(".info dt").text();
			var commOpen = ($(this).find(".info dt").attr('class')=="open") ? 1 : 0;
			
			var commPrice = $(this).find(".info dd:nth-child(2)").html();
			var commSlots = $(this).find(".info dd:nth-child(3)").html();
			
			var commDesc = $(this).find(".desc").html();
			
			var pageHead = $("td.cat table tr td:nth-child(1)").text();
			
			$("#comminfo-panel .panel-heading").html(pageHead);
			
			if (commPrice == undefined) {
				commPrice = "";
			}
			
			if (commSlots == undefined) {
				commSlots = "";
			}
			
			
			if (commOpen) {
				statusColor = "text-success";
				statusMessage = "OPEN";
			}
			else {
				statusColor = "text-danger";
				statusMessage = "CLOSED";
			}
			//<img class='thumbnail contain-hover' src='"+ previewThumb +"' />
			$("<tr>").appendTo("#comminfo-table tbody")
				.append("<td width='15%' style='vertical-align: middle;'><a class='thumbnail contain-hover img-rounded' style='background: url("+ previewThumb +") 50% 50% / cover no-repeat; padding-top:100%;' href='" + previewAnchor + "'></a>")
				.append("<td width='35%' style='vertical-align: middle;'><h3 style='margin-top: 0;'>" + commTitle + "<br /><small style='line-height:20px;' class='"+ statusColor +"'>"+ statusMessage+"</small></h3><br />" + commPrice + "<br />" + commSlots + "</td>")
				.append("<td width='50%' style='vertical-align: middle;'>" + commDesc + "</td>");
			
		});
	}
	
});