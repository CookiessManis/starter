export default function FinishScreen({
  points,
  maxAnswer,
  highscore,
  dispatch,
}) {
  const percentage = (points / maxAnswer) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥳";
  else if (percentage >= 80) emoji = "😎";
  else if (percentage >= 50) emoji = "😃";
  else emoji = "😕";
  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {maxAnswer} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(highscore: score {highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}
