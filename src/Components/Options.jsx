
export default function Options({ question,dispatch ,answer}) {
  const isAnswer=answer!==null;
  return (
    <div className="options">
    {
      question.options.map((option,index)=>
        <button 
        className={`btn btn-option ${answer===index ?"answer":""} ${
          isAnswer?
          index===question.correctOption?"correct":"wrong":""
        }`} 
        key={option}
        onClick={()=>dispatch({type:'newAnswer',payload:index})}
        answer={answer}
        disabled={answer!==null}
        >


          {option}
        </button>
      )
    }
  </div>
  );
}
