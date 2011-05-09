$(document).ready(function() {
	var publishers = [];
	
	$("#writing article").each(function() {
		var publisher = $(this).attr('data-publisher');
		publishers.push(publisher);
	});

	for (var i=0; i<publishers.length; i++) {
		$("#writing aside ul#publisher").append('<li>'+ publishers[i] +'</li>');
	}
	
	console.log(publishers);
});
