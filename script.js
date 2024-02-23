'use strict';

// Selecting elements

// First Buttons
const btnsMain = document.querySelector('.btns-main');
const btnPl2 = document.querySelector('.btn--players--2');
const btnPl3 = document.querySelector('.btn--players--3');
const btnPl4 = document.querySelector('.btn--players--4');

// Inputs

const nameMain = document.querySelector('.input-main');
const player3 = document.querySelector('.player-3');
const player4 = document.querySelector('.player-4');
const btnNames = document.querySelector('.btn--names');

// Game

const gameMain = document.querySelector('.game-main')

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player2El = document.querySelector('.player--2');
const player3El = document.querySelector('.player--3');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const score2El = document.querySelector('#score--2');
const score3El = document.getElementById('score--3');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const current2El = document.getElementById('current--2');
const current3El = document.getElementById('current--3');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

btnsMain.classList.remove('open--game');

const inputsOpen = function () {
    btnsMain.classList.add('open--game');
    nameMain.classList.remove('input-main');
};

btnPl2.addEventListener('click', function () {
    inputsOpen();
    scores = [0, 0];
})

btnPl3.addEventListener('click', function () {
    inputsOpen();
    player3.classList.remove('player-3');
    player2El.classList.remove('section-3');
    scores = [0, 0, 0];
})

btnPl4.addEventListener('click', function () {
  inputsOpen();
  player3.classList.remove('player-3');
  player4.classList.remove('player-4');
  player2El.classList.remove('section-3');
  player3El.classList.remove('section-4');
  scores = [0, 0, 0, 0];
})



btnNames.addEventListener('click', function () {
  nameMain.classList.add('input-main');
  gameMain.classList.remove('game-main');
  document.getElementById('name--0').textContent = document.querySelector('.player-1').value;
  document.getElementById('name--1').textContent = document.querySelector('.player-2').value;
  document.getElementById('name--2').textContent = player3.value;
  document.getElementById('name--3').textContent = player4.value;
})


// Starting conditions

const init = function () {
  scores
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;
  score3El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;
  current3El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player3El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player2El.classList.remove('player--active');
  player3El.classList.remove('player--active');
  btnRoll.style.display = "inline-block";
  btnHold.style.display = "inline-block";
};

init();

const change = function (toggle1, toggle2, active) {
  activePlayer = active
  toggle1.classList.toggle('player--active');
  toggle2.classList.toggle('player--active');
}

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  if (activePlayer === 0) {
    change(player0El, player1El, 1);
  } else if (activePlayer === 1 && !player3.classList.contains('player-3')) {
    change(player1El, player2El, 2);
  } else if (activePlayer === 1 && player3.classList.contains('player-3')) {
    change(player0El, player1El, 0);
  } else if (activePlayer === 2 && !player4.classList.contains('player-4')) {
    change(player2El, player3El, 3);
  } else if (activePlayer === 2 && player4.classList.contains('player-4')) {
    change(player2El, player0El, 0);
  } else {
    change(player3El, player0El, 0);
  }
};

btnRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 20) {
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    btnRoll.style.display = "none";
    btnHold.style.display = "none";
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  init();
  gameMain.classList.add('game-main');
  btnsMain.classList.remove('open--game');
  player3.classList.add('player-3');
  player4.classList.add('player-4');
  player2El.classList.add('section-3');
  player3El.classList.add('section-4');
  document.querySelector('.player-1').value = '';
  document.querySelector('.player-2').value = '';
  document.querySelector('.player-3').value = '';
  document.querySelector('.player-4').value = '';
})