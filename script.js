'use strict';

const cardsContainer = document.querySelector('.cards-container');
const btnDaily = document.getElementById('daily');
const btnWeekly = document.getElementById('weekly');
const btnMonthly = document.getElementById('monthly');
const btns = [btnDaily, btnWeekly, btnMonthly];

const renderCards = function () {
  const cards = [
    { color: 'orange', title: 'Work' },
    { color: 'blue', title: 'Play' },
    { color: 'red', title: 'Study' },
    { color: 'green', title: 'Exercise' },
    { color: 'purple', title: 'Social' },
    { color: 'yellow', title: 'Self Care' },
  ];

  cards.forEach((card) => {
    const html = `<div class="card-activity card-activity--${card.color}">
          <div class="card-activity__image"></div>
          <div class="card-activity__text">
            <div class="card-activity__title">
              <span>${card.title}</span>
              <a href="#" class="card-activity__more"></a>
            </div>
            <div class="card-activity__current"> <span></span> hrs</div>
            <div class="card-activity__previous"><span class="timeframe"></span> 	&mdash; <span class="total"></span>h</div>
          </div>
        </div>`;

    cardsContainer.insertAdjacentHTML('beforeend', html);
  });
};
renderCards();

const getData = async function () {
  const response = await fetch('data.json');
  return await response.json();
};

const renderTimeframes = async function (timeframe, name) {
  const timeframeName = document.querySelectorAll('.timeframe');
  const currentTime = document.querySelectorAll('.card-activity__current span');
  const previousTime = document.querySelectorAll('.card-activity__previous .total');

  try {
    const data = await getData();

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < currentTime.length; j++) {
        timeframeName[i].textContent = name;
        currentTime[i].textContent = data[i].timeframes[timeframe].current;
        previousTime[i].textContent = data[i].timeframes[timeframe].previous;
      }
    }
  } catch {
    console.log('Data not found');
  }
};
renderTimeframes('daily', 'Yesterday');

const removeActive = function (btns) {
  btns.forEach((btn) => btn.classList.remove('btn--active'));
};

btnDaily.addEventListener('click', function () {
  removeActive(btns);
  this.classList.add('btn--active');
  renderTimeframes('daily', 'Yesterday');
});
btnWeekly.addEventListener('click', function () {
  removeActive(btns);
  this.classList.add('btn--active');
  renderTimeframes('weekly', 'Last Week');
});
btnMonthly.addEventListener('click', function () {
  removeActive(btns);
  this.classList.add('btn--active');
  renderTimeframes('monthly', 'Last Month');
});
