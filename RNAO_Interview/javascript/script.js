$(document).ready(function(){

	$('a').click(function(e){

	//Prevent the browser to a new URL	
	e.preventDefault();
	
	$("#dynamicContent").load($(this).attr('href'));

	});

});
