
function FinishQuiz({points,maxnum,dispatch,questions,high}) {
    const percentage=Math.ceil((points/maxnum)*100);
    return (
        <>
        <div className="result">
            <p>You scored {points} out of {maxnum} ({percentage}%)</p>
        </div>

        <p className="highscore">(Highscore: {high} points)</p>



        <button className="btn btn-ui" onClick={()=>dispatch({type:'success',payload:questions})}>Restart Quiz</button>
        </>
    )
}

export default FinishQuiz
