$(document).ready(function() {
	var publishers = [];
	
	$("#writing article").each(function() {
		var publisher = $(this).attr('data-publisher');
		publishers.push(publisher);
	});

	for (var i=0; i<publishers.length; i++) {
		var selector = $("#writing aside ul#publisher li[data-publisher='"+publishers[i]+"']");
		if (selector.length > 0) {
			var originalCount = selector.children('span').text() * 1;
			var newCount = originalCount + 1;
			selector.children('span').text(newCount);
		} else {
			$("#writing aside ul#publisher").append('<li data-publisher="'+ publishers[i] +'"><label>'+ publishers[i] +'</label><span>1</span></li>');
		}
	}
	
	console.log(publishers);
});
