var toggleHidden = function(item){
	$(item).toggleClass('hidden');
}

$('.start-quiz').on('click', function(){
	toggleHidden(".start-quiz");
	toggleHidden(".first");
});