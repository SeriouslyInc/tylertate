$(document).ready(function() {
	var publishers;
	
	$("#writing article").each(function() {
		var publisher = $(this).attr('data-publisher');
		publishers.push(publisher);
	});
	
	console.log(publishers);
});
