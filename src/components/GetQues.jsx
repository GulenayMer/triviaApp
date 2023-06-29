import { useEffect, useState } from "react"
import questions from "../questions"


const GetQues = () => {

const [quest, setQuestions] = useState(questions);
const [correctAns, setCorrectAns] = useState(false);
const [score, setScore] = useState(0);
const [checkScore, setCheckScore] = useState(false);

useEffect(() => {

	setQuestions(quest);

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
}


return (
	<div className="questionsContainer">
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
		<button onClick={showResult}>Show Result</button>
		{checkScore && score ? (
			<p>Your score is  {score}</p>
		) : ""
		}
		
	</div>
)
}

export default GetQues