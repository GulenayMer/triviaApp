import { useEffect, useState } from "react"


const FetchQuestions = () => {

const [quest, setQuestions] = useState(null);
const [correctAns, setCorrectAns] = useState(false);
const [score, setScore] = useState(0);
const [checkScore, setCheckScore] = useState(false);
const [retry, setRetry] = useState(false);

const fetchData = async () => {
	try{
		const response = await fetch("https://wd40-trivia.onrender.com/api/questions");
		const jsonData = await response.json();
		setQuestions(jsonData);
	}catch(error){
		console.log("Error fetching data: ", error);
	}
}

useEffect(() => {

	fetchData();
	//console.log(quest)

}, []);


const getUserAnswer = (i, id) => {

	let userAns = i.toLowerCase();
	//console.log("user answer is: ", userAns);

	const updatedQuestions = quest.map((item) => {
		if (item.id === id) {
			if (item.correctAnswer.toLowerCase() === userAns) {
				//console.log("user answer is correct");
				setCorrectAns(!correctAns);
				setScore(score + 17);
			}
			return {
				...item,
				userAnswer: userAns,
			};
		}
		return item;
	});
	setQuestions(updatedQuestions);
	//console.log(updatedQuestions);
} 

const showResult = () => {
	setCheckScore(!checkScore);
	setRetry(!retry);
	if (retry){
		fetchData();
	}
}


return (
	<div className="questionsContainer">
	{ quest ? (
		<ul>
		{quest.map((item) => (
				<div className="questionList" key={item.id}>
				<li>{item.question}</li>
				{item.answers.map((i) => (
					<button key={i} onClick={() => getUserAnswer(i, item.id)}>{i}</button>
				))}
				</div>
			))}
		</ul>
		) : (<p>Loading...</p>)
	}
	<button onClick={showResult}>{checkScore ? "Retry": "Show Score"} </button>
		{checkScore && score && retry ? (
			<p>Your score is  {score}</p>
		) : ""
		}
	</div>
)
}

export default FetchQuestions 