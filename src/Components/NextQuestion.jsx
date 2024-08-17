
export default function NextQuestion({dispatch,answer,index,num}){
    if(answer===null)return;
    if(index<num-1){
        return(
            <button className="btn btn-ui" onClick={()=>dispatch({type:'next'})}>Next</button>
        );
    }
    return(
        <button className="btn btn-ui" onClick={()=>dispatch({type:'finish'})}>Finish</button>
    );
    

}