import React, { useEffect, useState } from "react";
import { data } from "./QuizData";
import Question from "./Question";
//import { useParams } from 'react-router-dom';
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import  MultiProgress  from "./ScoresBar";
import Difficulty from "./Difficulty";


const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    background: "white",
  },
  bullet: {
    display: "inline-block",
    margin: "0 auto",
    transform: "scale(0.8)",
    alignContent: "center",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Quizdetails() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>�</span>;
  let [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  let [score, setScore] = useState(0);
  const [quizProgress, setQuizProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  let [answer, setAnswer] = useState("");
  const [disable, setDisable] = useState(false);
  const [correctPercent, setCorrectPercent] = useState(0);
  const [scores, setScores] = useState({inCorrect:0,totalAttempts:0,totalPossibleIncorrectScores:0, correct:0, totalPossibleCorrectScores:100})
  useEffect(() => {
    async function exam() {
      let quizData = await data();
      //console.log(quizData);
      setQuestions(quizData);
    }
    exam();
  }, []);
  // console.log(state);
  const handleClick = (e, val) => {
    e.preventDefault();
    // console.log(val);
    const correctAnswer = questions[count];
    // console.log(correctAnswer.correct_answer);
    if (val === correctAnswer.correct_answer) {
      setScore(() => score + 1);
    }
    if (count < questions.length - 1){
    //console.log(correctOnes);
    setCount(() => count + 1);
    setAnswer('')
    }else{

    }
  };
  const handleAnswer = (val) => {
    setAnswer(val);
    setDisable(true);
    const testSolved = quizProgress + (100 / questions.length);
    console.log(testSolved)
    setQuizProgress(testSolved);
    console.log(scores)
    if(val === questions[count].correct_answer){
      const correctScore = scores.correct + 1
               const totalPossibleCorrectScores = (correctScore + (questions.length - (scores.inCorrect + correctScore))) / questions.length;
              //  console.log(totalScores * 100) 
               const totalPossibleIncorrectScores =  (scores.inCorrect + (questions.length - (scores.inCorrect + correctScore))) / questions.length;

               setScores({...scores, totalPossibleIncorrectScores:(totalPossibleIncorrectScores * 100), totalPossibleCorrectScores:totalPossibleCorrectScores * 100, correct:correctScore})
                   const obtainedMarks = Math.floor((correctScore * 100 ) / (questions.length));
                   setCorrectPercent(obtainedMarks)
              }else{
      const inCorrectScore = scores.inCorrect + 1
      const totalPossibleCorrectScores = (scores.correct + (questions.length - (inCorrectScore + scores.correct))) / questions.length;
   
      const totalPossibleIncorrectScores = (inCorrectScore + (questions.length - (inCorrectScore + scores.correct))) / questions.length;
      // console.log(totalScores * 100) 
      setScores({...scores,totalPossibleCorrectScores:totalPossibleCorrectScores * 100, totalPossibleIncorrectScores:totalPossibleIncorrectScores * 100, inCorrect:inCorrectScore})
      const obtainedMarks = Math.floor((scores.correct * 100 ) / (questions.length));
      setCorrectPercent(obtainedMarks)
    }

  };
 
  if (questions.length === 0) {
    return <h1>Loading...</h1>;
  } else {
    // console.log(state[count].correct_answer);
    return (
      <Card className={classes.root} id="question">
      <MultiProgress
			transitionTime={1.2}
			elements={[
        {
					value:quizProgress,
					color: "black",
				},
			]}
			height={25}
		/>        <h1>
          Question {count + 1} of {questions.length}
        </h1>
        <p>{questions[count].category}</p>
         <Difficulty difficulty={questions[count].difficulty}/>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            <div>
              <Question option={questions[count]} callback={handleClick} handleAnswer={handleAnswer} setDisable={setDisable} answer={answer} disable={disable}/>
            </div>
           
          </Typography>
         
        </CardContent>
        <div style={{display:"flex", margin:"10px"}}>
          <p style={{width:"50%"}}>Score: {correctPercent}%</p>
          <p style={{width:"50%",textAlign:"right"}}>Max Score: {Math.floor(scores.totalPossibleCorrectScores)}%</p>

        </div>
        <MultiProgress
			transitionTime={1.2}
			elements={[
        {
					value:  scores.totalPossibleIncorrectScores,
					color: "black",
				},
        {
					value: scores.correct,
					color: "grey",
          
				},
        {
					value:  scores.totalPossibleCorrectScores,
					color: "lightGrey",
				},
        {
					value:100,
					color: "white",
				},
			]}
			height={25}
		/>

      </Card>
    );
  }
}
