import React, { useState } from 'react'

const CALC_BTNS =[
    7,8,9,"+",
    4,5,6,"-",
    1,2,3,"/",
    "*",".",0,"="
]

export default function Calculator() {
    const [display, setDisplay] = useState("");
    const [firstNumber, setFirstNumber]= useState(0);
    const [operator,, setOperator] = useState("");
    const [secondNumber, setSecondNumber] = useState(0);
    
    const Calculate = (first, second, op) => {
        var result =0;
         switch(op){
                case "+":
                    result =first+ second;
                    break;
                case "-":
                    result = first- second;
                    break;
                case "*":
                    result = first * second;
                    break;
                    case "/":
                        result = first / second
            }
            return result;

    }

    const handleCalculate = ()=>{
        var numbers = display.split(/[+\-*/]/)
        var ops = display.split(/[1234567890]/).filter(item => item !== "" && item !== ".")
        var result = 0;
       

        while(ops.includes("/") || ops.includes("*")){
            var appearsFirst ;
            if(ops.indexOf("/")!== -1 && ops.indexOf("*") !== -1){
                appearsFirst= Math.min(ops.indexOf("/"), ops.indexOf("*"));
            }else{
                appearsFirst= Math.max(ops.indexOf("/"), ops.indexOf("*"));
            }
            
            first = Number(numbers[appearsFirst]);
            second = Number(numbers[appearsFirst + 1]);
           var  resultEarly = Calculate(first,second, ops[appearsFirst])
           console.log(resultEarly)
           ops.splice(appearsFirst,1);
                       numbers[appearsFirst] = resultEarly;
            numbers.splice(appearsFirst+1,1);
        }

        for (var i = 0; i<ops.length; i++){
            
              var first =   Number(numbers[i]);
            var second = Number(numbers[i+1]);
          
            result = Calculate(first,second,ops[i])
           
            numbers[i+1]=result
            
           
        }
        setDisplay(result);
        console.log(numbers);
        console.log(ops);
        console.log(result);

    }

  return (
    <div className='WindowContent'>
        <div className="CalcDisplayRow">
            <button className='DeleteButton' onClick={()=> setDisplay("")}>delete</button>
             <input className='CalcInput' value={display}></input>
            
            </div>
        <div className='CalcControl'> 
       { CALC_BTNS.map((el,index) => (
 <button className='CalcButton' onClick={()=>{

    if(el == "="){
        handleCalculate();
        return;
    }
   setDisplay(prev => prev+el)
 }} >{el}</button>
            
        ))}</div>
       
       
        
        </div>
  )
}
