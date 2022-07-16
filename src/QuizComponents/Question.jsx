import React, { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Question = ({ option, callback, handleAnswer, answer, disable, setDisable}) => {
  //let correct = option.correct_answer;
  console.log(option);
  console.log(answer)
  let { question, incorrect_answers, correct_answer } = option;

  //console.log(question);
 
  return (
    <>
      <h1>{question}</h1>
      <form onSubmit={(e) => callback(e, answer)}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {incorrect_answers &&
              incorrect_answers.map((value, ind) => {
               const bgColor = answer === value ? "black" : ""; 
               const fontColor = (answer === value && disable === true) ? "white":"black"
                return (
                    <Grid item xs={6}>
                  <div key={ind}>
                   
                      <input
                       style={{width:"80%", height:"30px", background:`${bgColor}`, color:`${fontColor}`}}
                        type="button"
                        onClick={() =>{
                            handleAnswer(value)}
                        }
                        value={value}
                        disabled={disable && true}
                      />
                  </div>
                  </Grid>

                );
              })}
              <div style={{marginInline:"auto", textAlign:"center"}}>
              {(answer !== '' && answer === correct_answer) && (<h2>CORRECT !</h2>)}
              {(answer !== '' && answer !== correct_answer) && (<h2>SORRY !</h2>)}
            {answer ? (
              <input type="submit" value="NEXT QUESTION" id="submit" onClick={()=>setDisable(false)} />
            ) : (
              <p></p>
            )}
            </div>
          </Grid>
        </Box>
      </form>

    </>
  );
};
export default Question;
