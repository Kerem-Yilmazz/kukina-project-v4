
const landmarks = [
  ["eiffel.jpg", "France"],
  ["anitkabir.jpeg", "Turkey"],
  ["pyramids.jpg", "Egypt"],
  ["tajmahal.jpg", "India"],
  ["statueofliberty.jpg", "USA"]
];

let current = 0;
let score = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadQuestion() {
  if (current >= landmarks.length) {
    document.getElementById('options').innerHTML = '';
    document.getElementById('landmarkImage').style.display = 'none';
    document.getElementById('feedback').innerText = `Oyun bitti! Toplam puan: ${score}`;
    return;
  }

  const [image, answer] = landmarks[current];
  document.getElementById('landmarkImage').src = 'assets/' + image;

  let countries = [answer];
  while (countries.length < 4) {
    const random = landmarks[Math.floor(Math.random() * landmarks.length)][1];
    if (!countries.includes(random)) countries.push(random);
  }
  shuffle(countries);

  const optionsHTML = countries.map(function(country) {
    return `<button onclick="checkAnswer('${country}', '${answer}')">${country}</button>`;
  }).join('');
  document.getElementById('options').innerHTML = optionsHTML;
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    score++;
    document.getElementById('feedback').innerHTML = "<div class='correct'>🎉 Harika! Bildin!</div>";
  } else {
    document.getElementById('feedback').innerHTML = `<div class='wrong'>🙈 Üzgünüm! Doğru cevap: ${correct}</div>`;
  }
  document.getElementById('score').innerText = 'Puan: ' + score;
  current++;
  setTimeout(() => {
    document.getElementById('feedback').innerText = '';
    loadQuestion();
  }, 1500);
}

window.onload = loadQuestion;
