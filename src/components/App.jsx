import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "../Loader";
import Error from "./Error";
import StartReady from "./StartReady";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timerSecond: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "receivedData":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        timerSecond: state.questions.length * SECS_PER_QUESTION,
      };

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

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        timerSecond: state.timerSecond - 1,
        status: state.timerSecond === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action Unkwonn");
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, highscore, timerSecond },
    dispatch,
  ] = useReducer(reducer, initialState);

  const newQuestions = questions.length;
  const maxAnswer = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "receivedData", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />

      <main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartReady newQuestions={newQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              newQuestions={newQuestions}
              index={index}
              points={points}
              maxAnswer={maxAnswer}
              answer={answer}
            />
            <Question
              questions={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} timerSecond={timerSecond} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                newQuestions={newQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxAnswer={maxAnswer}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </main>
    </div>
  );
}
