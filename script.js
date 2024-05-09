const talk = document.getElementById("talk");
const usersText = document.getElementById("usersText");
const botQuestions = [
  "Co lubisz robić w wolnym czasie?",
  "Masz jakieś plany na popołudnie?",
  "Jaki jest Twój ulubiony język programowania?",
  "Co lubisz jeść?",
  "Wolisz czerwony czy niebieski?",
  "Ile zajęć jeszcze dziś masz?",
];
const botAnswers = [
  "Ja lubię pisać czacie",
  "Dziś idę na rolki na Błonia",
  "Lubie JS",
  "Ja kocham jeść pizze",
  "Ja wolę czerwony",
  "Dziś mam jeszcze jedne zajęcia",
];
const mapUserBot = new Map();

usersText.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("send").click();
  }
});

function send() {
  if (usersText.value.trim() == "") {
    return null;
  } else {
    const paraBot = document.createElement("p");
    if (usersText.value.toLowerCase().trim() == "motyla noga") {
      alert("tak nie pisz");
      paraBot.classList.add("redText");
      paraBot.innerHTML = "Proszę, nie używaj takich słów";
      setTimeout(() => {
        talk.prepend(paraBot);
      }, 1000);
      usersText.value = "";
      return;
    } else {
      const paraUser = document.createElement("p");
      paraBot.classList.add("bot");
      paraUser.classList.add("user");
      paraUser.innerHTML = usersText.value;

      if (usersText.value.trim() == "/version") {
        paraBot.innerHTML = "Wersja oprogramowania: v1.2.3";
      } else if (usersText.value.trim().search("/pogoda") == 0) {
        paraBot.innerHTML =
          "Dziś w " +
          usersText.value.trim().slice(7, usersText.value.length) +
          " jest 22 stopnie";
      } else {
        if (mapUserBot.get(usersText.value) !== undefined) {
          paraBot.innerHTML = mapUserBot.get(usersText.value);
        } else {
          let botAnswerRandom;
          if (usersText.value.includes("?")) {
            botAnswerRandom =
              botAnswers[Math.floor(Math.random() * botAnswers.length)];
          } else {
            botAnswerRandom =
              botQuestions[Math.floor(Math.random() * botQuestions.length)];
          }
          paraBot.innerHTML = botAnswerRandom;
          mapUserBot.set(usersText.value, botAnswerRandom);
        }
      }
      talk.prepend(paraUser);
      setTimeout(() => {
        talk.prepend(paraBot);
      }, 1000);

      usersText.value = "";
    }
  }
}
