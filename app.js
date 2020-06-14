//State

const questions = [
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

let questionNum = 0; //question location

const score = {
	Correct: 0,
	Incorrect: 0
};


const scoreDescription = [
	"Are you sure should be drinking? Show me your ID.",
	"Perhaps you should drink something besides beer.",
	"You sure know your beer!",
	"Wow! You're a beer genius!"
];

//State Management
let calScore = function ()
{ //calculates score depending on user answer
	if (!isChecked) return;

	let answer = questions[questionNum]["answer"];
	var correctId = `#choices-${answer}`;
	if (document.getElementById(answer).checked)
	{
		score.Correct++;
		$(correctId).toggleClass("correct");
	}
	else
	{
		score.Incorrect++;
		$(correctId).toggleClass("correct");
	}
}


//DOM Management

let isChecked = () => $("input:checked").length == 1;

let clearPage = function ()
{ //removes all elements within the quiz-section
	$("#question").remove();
	$("#answer-form").remove();
	$("#location").remove();
	$("#score").remove();
}

let displayQuestion = function ()
{
	if (questionNum >= questions.length) return;

	clearPage()

	let currentQuestion = questions[questionNum];
	let answers = currentQuestion["answers"];

	$("#question-container").append(`<p id="question"> ${currentQuestion["question"]}</p>`);
	$("#location-container").append(`<p id=\"location">${currentQuestion["location"]}</p>`);

	$("#score-container").append(`<p id="score">Correct: ${score["Correct"]} Incorrect: ${score["Incorrect"]}</p>`);
	$("#answer-container").append(`<form id="answer-form">`);

	for (let i = 0; i < answers.length; i++)
	{
		let possibleAnswer = answers[i];
		let html = `<label class="radio-inline" id="choices-${i}">
						<input type="radio" name="answer-choice" id="${i}" class="radio" value="${i}">
						${possibleAnswer}
						</label>`;

		$("#answer-form").append(html);
	};

	$("button").before("</form>");
};

let displayFinal = function ()
{
	clearPage();

	let finalScore = parseInt(score["Correct"]);

	$("#location-container").append(`You answered ${finalScore} correctly.`)

	let desc = finalScore <= 2 ? scoreDescription[0]
		: finalScore >= 3 && finalScore <= 5 ? scoreDescription[1]
			: finalScore >= 6 && finalScore <= 8 ? scoreDescription[2]
				: scoreDescription[3];

	$("#question-container").append(`<p id="scoreDescription">${desc}</p>`)
	$("#retake").toggleClass("hidden");
};

//Event Listeners

$("#start").on('click', () =>
{
	$("#start").toggleClass("hidden");
	$('#submit').toggleClass("hidden");
	$("#quiz-section").toggleClass("hidden")
	$("#score-section").toggleClass("hidden")
	displayQuestion();
})

$("#submit").on('click', () =>
{
	if (!isChecked())
	{
		$("#no-answer-alert").show(1000);
		$("#no-answer-alert").fadeOut(3000);
		return;
	}

	calScore();

	if (questionNum == (questions.length - 1))
	{
		$('#submit').toggleClass("hidden");
		setTimeout(displayFinal, 2000);
	}
	else
	{
		questionNum++;
		setTimeout(displayQuestion, 2000);
	}
})

$("#retake").on('click', function ()
{  //resets everything to zero and displays first question
	$("#location-container").empty();
	$("#question-container").empty();
	$("#retake").toggleClass("hidden");
	questionNum = 0;
	score.Correct = 0;
	score.Incorrect = 0;
	displayQuestion();
	$("#submit").toggleClass("hidden");
})
