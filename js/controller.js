
$(document).ready(function(){

	$(".post .read-more").hover(function(){
		//$(this).parent().children('.share').animate({left: "20px"});
		$(this).next('.read-more-text').show();
	}, function(){
		$(this).next('.read-more-text').hide();
		//$(this).parent().children('.share').animate({left: "5px"});
	});

	$('.sidebar .categories a').click(function(){
		console.log("clicked");
	});

});