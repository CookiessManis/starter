import Options from "./Options";
export default function Question({ questions, answer, dispatch }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options questions={questions} answer={answer} dispatch={dispatch} />
    </div>
  );
}
