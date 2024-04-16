function Progress({ index, newQuestions, points, maxAnswer, answer }) {
  return (
    <header className="progress">
      <progress max={newQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {newQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxAnswer}
      </p>
    </header>
  );
}

export default Progress;
