function Progress({num,index,maxnum,points}) {
    return (
      <header className="progress">
      <progress max={num} value={index} />
      <p>Question <strong>{index + 1}</strong> / {num}</p>

      <p><strong>{points}</strong> / {maxnum}
      </p>
    </header>
    )
}

export default Progress
