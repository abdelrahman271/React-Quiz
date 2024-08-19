import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import StartScreen from "./Components/StartScreen";
import Error from "./Components/Error";
import Question from "./Components/Question";
import NextQuestion from "./Components/NextQuestion";
import Progress from "./Components/Progress";
import FinishQuiz from "./Components/FinishQuiz";
import Footer from "./Components/Footer";
import Timer from "./Components/Timer";

const initial = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  counter: null,
  high: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "success":
      return {
        ...initial,
        status: "ready",
        questions: action.payload,
        high: state.high,
      };
    case "error":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "start",counter: state.questions.length * 30,};
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "next":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finish",
        high: state.high > state.points ? state.high : state.points,
      };
    case "restart":
      return { ...initial, questions: state.questions, status: "ready" };
    case "count":
      return {
        ...state,
        counter: state.counter - 1,
        status: state.counter === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, counter, high },
    dispatch,
  ] = useReducer(reducer, initial);
  const num = questions.length;
  const maxnum = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:9000/questions");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatch({ type: "success", payload: data });
      } catch (error) {
        console.error("Fetching error:", error);
        dispatch({ type: "error" });
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen num={num} dispatch={dispatch} />}
        {status === "error" && <Error />}
        {status === "start" && (
          <>
            <Progress num={num} index={index} maxnum={maxnum} points={points} />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} counter={counter} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                num={num}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishQuiz
            points={points}
            maxnum={maxnum}
            dispatch={dispatch}
            high={high}
            questions={questions}
          />
        )}
      </Main>
    </div>
  );
}
