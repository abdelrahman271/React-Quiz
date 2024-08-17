import { useEffect } from "react"

function Timer({dispatch,counter}) {
    const min=Math.floor(counter/60);
    const second=counter%60;
    useEffect(function(){
        const id=setInterval(()=>{
            dispatch({type:'count'})
        },1000)

        return ()=>clearInterval(id)

    },[dispatch]);

    return (
        <div className="timer">{min<10 && '0'}{min}:{second<10 && '0'}{second}</div>
       
    );
}

export default Timer
