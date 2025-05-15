const correct_answers = {
  q1: "Usul",
  q2: "Shai-Hulud",
  q3: "Four",
  q4: "The Bene Gesserit Sisterhood",
  q5: "Smuggler",
  q6: "Sietch Tabr",
  q7: "Gurney Halleck",
  q8: "Maker hooks",
  q9: "Childbirth",
  q10: "Melange",
};

const user_answers = {};
let score = 0;

function scrollAndSet(questionID, answerID, answer) {
  progress();
  setAnswer(answerID, answer);
  user_answers[answerID] = answer;
  console.log(user_answers);
  scrollNext(questionID);
}

function progress() {
  var i = 0;
  var elem = document.getElementById("bar");
  var width = parseInt(elem.style.width, 10) || 0;
  width += 10;

  if (width >= 100) {
    width = 100;
    clearInterval(i);
  }
  elem.style.width = width + "%";
  elem.innerHTML = width + "%";
}

function scrollNext(questionID) {
  var container = document.getElementById(questionID);
  container.scrollIntoView({ behavior: "smooth" });
}

function setAnswer(answerID, selected_answer) {
  const correct_answer = correct_answers[answerID];
  console.log(correct_answer);
  if (selected_answer === correct_answer) {
    score++;
    console.log(score);
  }

  if (answerID === "q10") {
    document.getElementById("score").textContent = `Your score: ${score}/10`;
    document.getElementById("score-container").style.display = "block";
    //Delay needed to register final answer before printing
    setTimeout(() => {
      displayWrongAnswers();
    }, "0.01");
  }
}
function displayWrongAnswers() {
  const wrongAnswersContainer = document.getElementById("wrong-answers");
  let wrongAnswersHTML = "";

  for (const [questionID, userAnswer] of Object.entries(user_answers)) {
    const correct_answer = correct_answers[questionID];
    if (userAnswer !== correct_answer) {
      wrongAnswersHTML += `<div class="answer-row">
                                    <div class="incorrect glow"><strong>${questionID})</strong> Your Answer: ${userAnswer}</div>
                                    <div class="correct">Correct Answer: ${correct_answer}</div>
                                </div>`;
    }
  }
  wrongAnswersContainer.innerHTML = wrongAnswersHTML;
}
