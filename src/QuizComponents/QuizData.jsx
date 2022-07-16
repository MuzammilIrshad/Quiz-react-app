import React from 'react';
import {Questions} from './Questions';

export async function data() {

    let  results  = Questions;
    console.log(results);
    const quiz = results.map((questionObj, ind) => {
        const category = String(questionObj.category).replace(/%20/g," ").replace(/%3A/g, ":");
        const correct_answer = String(questionObj.correct_answer).replace(/%20/g," ").replace(/%24/g," ");
        const question = String(questionObj.question).replace(/%2C/g, " ").replace(/%22/g,"").replace(/%20/g," ").replace(/%3F/g," ?").replace(/%27/g," ");
        const incorrectAns = questionObj.incorrect_answers.map((option)=>option.replace(/%24/g," ").replace(/%20/g," "));
         incorrectAns.splice(Math.floor(Math.random() * 3), 0, correct_answer);
        return {
            question: question,
            incorrect_answers: [...incorrectAns],
            correct_answer,
            category,
            difficulty:questionObj.difficulty
        }
    })
    console.log(quiz);
    return quiz;
}