//State

var questions = [
	{
		question: "1. ____ is the world's oldest and most widely consumed alcoholic drink.",
		answers: ["A. Wine", "B. Mead", "C. Beer", "D. Vodka"],
		answer: "2",
		location: "Question 1 out of 10"
	},

	{
		question: "2. Beer is primarily flavored with ____.",
		answers: ["A. Hops", "B. Malt", "C. Starch", "D. Herbs"],
		answer: "0",
		location: "Question 2 out of 10"
	},

	{
		question: "3. ____ is the measurement of alcohol in beer.",
		answers: ["A. IPA", "B. IBU", "C. ABV", "D. BPH"],
		answer: "2",
		location: "Question 3 out of 10"
	},

	{
		question: "4. What does IBU stand for?",
		answers: ["A. International Beer Unit", "B. Interesting Beer University", 
					"C. Increase Beer Uptake", "D. International Bittering Unit"],
		answer: "3",
		location: "Question 4 out of 10"
	},

	{
		question: "5. What is the official scientific name for the study of beer?",
		answers: ["A. Beerology", "B. Zythology", "C. Zoology", "D. Beerisics"],
		answer: "1",
		location: "Question 5 out of 10"
	},

	{
		question: "6. What is the most frequent color of beer?",
		answers: ["A. Pale Amber", "B. Deep rose", "C. Light brown", "D. Caramel"],
		answer: "0",
		location: "Question 6 out of 10"
	},

	{
		question: "7. What country drinks the most beer?",
		answers: ["A. USA", "B. Germany", "C. Czech Republic", "D. Belgium"],
		answer: "2",
		location: "Question 7 out of 10"
	},

	{
		question: "8. Which country has the most individual beer brands?",
		answers: ["A. Belgium", "B. USA", "C. Czech Republic", "D. Germany"],
		answer: "0",
		location: "Question 8 out of 10"
	},

	{
		question: "9. Where is the world's largest beerfest held?",
		answers: ["A. Czech Republic", "B. USA", "C. Beglium", "D. Germany"],
		answer: "3",
		location: "Question 9 out of 10"
	},

	{
		question: "10. An imperial stout is best served at what temperature?",
		answers: ["A. Well Chilled", "B. Cellar Temperature", "C. Room Temperature", "D. Lightly Chilled"],
		answer: "2",
		location: "Question 10 out of 10"
	},
];

var i = 0; //question location

var score = {
	Correct: 0,
	Incorrect: 0
};

var currentAnswer = "\"" + questions[i]["answer"] + "\"";

var scoreDescription = ["Are you sure should be drinking? Show me your ID.", 
						"Perhaps you should drink something besides beer.",
						"You sure know your beer!",
						"Wow! You're a beer genius!"
						];

//State Management
var calScore = function(){ //calculates score depending on user answer
	var correctId = "#choices-" + questions[i]["answer"];
	if (isChecked() == true){
		if(document.getElementById(questions[i]["answer"]).checked){
			score["Correct"]++;
			$(correctId).toggleClass("correct")
		}
		else{
			score["Incorrect"]++;
			$(correctId).toggleClass("correct")
		}
	}
	else {
		$("#no-answer-alert").show(1000);
		$("#no-answer-alert").fadeOut(3000);
	}
}


//DOM Management

var isChecked = function(){ //ensures an option is checked
	var radCheck = document.getElementsByTagName('input');
		for (var i=0; i < radCheck.length; i++){
			if (radCheck[i].checked){
				return true;
			}
		}
		return false;
}

var clearPage = function(){ //removes all elements within the quiz-section
	$("#question").remove();
	$("#answer-form").remove();
	$("#location").remove();
	$("#score").remove();
}

var displayQuestion = function(){
		if (i < questions.length){
			clearPage()
			
			$("#question-container").append("<p id=\"question\">" + questions[i]["question"] + "</p>");
			$("#location-container").append("<p id=\"location\">" + questions[i]["location"] + "</p>");

			$("#score-container").append(
					"<p id=\"score\">Correct: " + score["Correct"] + "<br> Incorrect: " + score["Incorrect"] + "</p>"
			);

			$("#answer-container").append("<form id=\'answer-form\'>");

			for (var a = 0; a < questions[i]["answers"].length; a++){
				$("#answer-form").append('<label class=\"radio-inline\" id=\"choices-' + a +'\"><input type=\'radio\' name=\'answer-choice\' id=\'' + 
					a + '\' class=\"radio\" value=\'' + a + '\'>' + questions[i]["answers"][a] + '</label>')
			};

			$("button").before("</form>");
	}
};

var displayFinal = function(){
	clearPage();
	$("#jumbo-text").empty();
	$("#scoreDescription").remove();
	$("#jumbo-text").append(
		"You answered " + score["Correct"] + " correctly."
	)
	if(parseInt(score["Correct"]) <= 2){
		$(".jumbotron").append(
		"<p id=\'scoreDescription\'>" + scoreDescription[0] + "</p>"
		)
	} 
	else if(parseInt(score["Correct"]) >= 3 && parseInt(score["Correct"]) <= 5){
		$(".jumbotron").append(
		"<p id=\'scoreDescription\'>" + scoreDescription[1] + "</p>"
		)
	} 
	else if(parseInt(score["Correct"]) >= 6 && parseInt(score["Correct"]) <= 8){
		$(".jumbotron").append(
		"<p id=\'scoreDescription\'>" + scoreDescription[2] + "</p>"
		)
	}
	else if(parseInt(score["Correct"]) >= 9 && parseInt(score["Correct"]) <= 10){
		$(".jumbotron").append(
		"<p id=\'scoreDescription\'>" + scoreDescription[3] + "</p>"
		)
	}
	$("#retake").toggleClass("hidden");
	$("#quiz-section").toggleClass("hidden")
	$("#start-title").toggleClass("hidden");
	$("#score-section").toggleClass("hidden"); 	 	
};

//Event Listeners

$("#start").on('click', function(){
	$("#start").toggleClass("hidden");
	$('#submit').toggleClass("hidden");
	$("#start-title").toggleClass("hidden");
	$("#navbar").toggleClass("hidden");
	$("#quiz-section").toggleClass("hidden")
	$("#score-section").toggleClass("hidden")
	displayQuestion();
})

$("#submit").on('click', function(){
	calScore();
	if(isChecked() == true && i == (questions.length-1)){
		$('#submit').toggleClass("hidden");
		setTimeout(displayFinal, 2000);
	}
	else if (isChecked() == true){
		i++;
		setTimeout(displayQuestion, 2000);
	}
})

$("#retake").on('click', function(){  //resets everything to zero and displays first question
	$("#retake").toggleClass("hidden");
	i = 0;
	score['Correct'] = 0;
	score["Incorrect"] = 0;
	displayQuestion();
	$("#submit").toggleClass("hidden");
	$("#quiz-section").toggleClass("hidden");
	$("#start-title").toggleClass("hidden");
	$("#score-section").toggleClass("hidden");
})
