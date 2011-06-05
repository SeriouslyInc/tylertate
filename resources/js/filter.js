$(document).ready(function() {
	// About link
	$("#top li.about").click(function() {
		$("#top #tagline").slideToggle();
	});
	
	// publishers
	var publishers = [];
	
	$("#writing article").each(function() {
		var publisher = $(this).attr('data-publisher');
		publishers.push(publisher);
	});

	// loop through each publisher
	for (var i=0; i<publishers.length; i++) {
		var selector = $("#writing aside ul#publisher li[data-publisher='"+publishers[i]+"']");
		
		// if the publisher already exists, increment the count
		if (selector.length > 0) {
			var originalCount = selector.children('span').text() * 1;
			var newCount = originalCount + 1;
			selector.children('span').text(newCount);
			
		// otherwise, add the publisher to the list
		} else {
			$("#writing aside ul#publisher").append('<li data-publisher="'+ publishers[i] +'"><label>'+ publishers[i] +'</label><span>1</span></li>');
		}
	}
	
	$("#writing aside ul#publisher li").click( function() {
		var publisher = $(this).attr('data-publisher');
	});
	
});
