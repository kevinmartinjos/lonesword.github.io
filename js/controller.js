
$(document).ready(function(){

	$(".post .read-more").hover(function(){
		$(this).next('.read-more-text').show();
	}, function(){
		$(this).next('.read-more-text').hide();
	});

});