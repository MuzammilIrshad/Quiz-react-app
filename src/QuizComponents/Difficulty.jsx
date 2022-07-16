import React, {useEffect, useState} from 'react'
import {AiFillStar} from 'react-icons/ai';


export default function Difficulty({difficulty}) {
    
    const easy = difficulty === "easy" ? ["black", "lightGrey","lightGrey", "lightGrey", "lightGrey"]: []
    const hard = difficulty === "hard"? ["black","black","black", "lightGrey","lightGrey"]:[];
    const medium = difficulty === "medium" ? ["black", "black", "lightGrey","lightGrey", "lightGrey"] : []
  console.log(difficulty)
  console.log(easy)
  console.log(hard)
  console.log(medium)
  return (
    <div>
      {easy && easy.map((val, ind)=><span>
            <AiFillStar className="icon" style={{color:`${val}`}}/>
        </span>)
      }
      {hard && hard.map((val, ind)=><span>
            <AiFillStar className="icon" style={{color:`${val}`}}/>
        </span>)
      }
      {medium && medium.map((val, ind)=><span>
            <AiFillStar className="icon" style={{color:`${val}`}}/>
        </span>)
      }
    </div>
  )
}
