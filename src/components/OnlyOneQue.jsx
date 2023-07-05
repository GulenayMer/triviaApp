import { useEffect, useState } from "react"


const OnlyOneQue = () => {

const [quest, setQuestions] = useState(null);
const [correctAns, setCorrectAns] = useState(false);
const [score, setScore] = useState(0);
const [checkScore, setCheckScore] = useState(false);
const [retry, setRetry] = useState(false);
const [countIndex, setCountIndex] = useState(0);

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
		getNextQ();
	}
}

const getNextQ = () => {
	setCountIndex(prevIndex => (prevIndex + 1) % quest.length);

}


if (!quest) {
    return <p>Loading...</p>;
}

if (countIndex >= quest.length)
{
	setCountIndex(0);
}

const currentItem = quest[countIndex];
//console.log(quest);
//console.log(currentItem)
//console.log(countIndex);
return (
	<div className="questionsContainer">
		<ul>
			{countIndex < quest.length - 1 ? (
			<div className="questionList" key={currentItem.id}>
			<span className="number">{`${countIndex + 1}`}</span>
				<li>{currentItem.question}</li>
				<div className="btns">
				{currentItem.answers.map((i) => (
					<button key={i} onClick={() => getUserAnswer(i, currentItem.id)}>{i}</button>
				))}
				</div>
				</div>) : ("")}
		
		</ul>
		{!retry ? (
				<button className="btn" onClick={getNextQ}>Next</button>
		) : ""}
	

		<button className="btn" onClick={showResult}>{checkScore ? "Retry": "Show Score"} </button>
		{checkScore && score && retry ? (
			<p>Your score is  <span>{score}</span></p>
		) : ""
		}
	</div>
)
}

export default  OnlyOneQue