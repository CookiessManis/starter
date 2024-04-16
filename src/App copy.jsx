import { useEffect, useReducer } from "react";
import Header from "./Header";

const initialState = {
  questions: [],

  status: "loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => console.log("error", err));
  }, []);
  return (
    <div className="app">
      <Header />

      <main className="main">
        <p>1/15</p>
        <p>Question</p>
      </main>
    </div>
  );
}
