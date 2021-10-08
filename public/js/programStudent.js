// const programArr = [{"title" : "Diving", 'startDate' : new Date('October 1, 2021 03:24:00'), 'country' : "Greece", 'weeks' : {
//   'firstWeek'
// }},{},{}];

const phases = [
  {
    number: 1,
    weeks: [
      {
        number: 1,
        goals: "Week 1 Goal",
        notes: "Week 1 Notes",
        videos: [
          {
            title: "Week 1 videos events",
            subtitle: "Week 1 subtitle",
            url: "/images/thumbs/scape.jpg",
          },
        ],
      },
    ],
  },
  {
    number: 2,
    weeks: [
      {
        number: 2,
        goals: "Week 2 Goal",
        notes: "Week 2 Notes",
        videos: [
          {
            title: "Week 2 videos events",
            subtitle: "Week 2 subtitle",
            url: "/images/thumbs/yacht.jpg",
          },
        ],
      },
    ],
  },
  {
    number: 3,
    weeks: [
      {
        number: 3,
        goals: "Week 3 Goal",
        notes: "Week 3 Notes",
        videos: [
          {
            title: "Week 3 videos events",
            subtitle: "Week 3 subtitle",
            url: "./images/thumbs/scape.jpg",
          },
        ],
      },
    ],
  },
];

function findWeek(phases, weekNum) {
  for (let phase of phases) {
    const { number } = phase;
    for (let week of phase.weeks) {
      if (week.number === weekNum) {
        return [week, number];
      }
    }
  }
  return null;
}

const videoFirstWeek = phases[0].weeks[0].videos[0].url;

const $video = document.querySelector("[data-video]");

const $notes = document.querySelector("[data-notes]");

const $goals = document.querySelector("[data-goals]");

const $week = document.querySelector("#week");

const $nextWeek = document.querySelector("[data-next-week]");

const $prevWeek = document.querySelector("[data-prev-week]");

document.addEventListener("DOMContentLoaded", async (event) => {
  phases[0].weeks[0].videos[0].url;
  // //  const allPosts = await fetch('/')  //Получаю массив программы со всеми элементами и неделями
});

let weekNum = 1;

function drawWeek(phases, weekNum) {
  const [week, phaseNum] = findWeek(phases, weekNum);
  $notes.innerHTML = week.notes;
  $goals.innerHTML = week.goals;
  $video.src = week.videos[0].url;
}

const lastPhase = phases[phases.length - 1];
const weeksCount = lastPhase.weeks[lastPhase.weeks.length - 1].number;

$nextWeek.addEventListener("click", async (event) => {
  if (weekNum < weeksCount) {
    weekNum += 1;
    console.log($week);
    drawWeek(phases, weekNum);
  }
});

$prevWeek.addEventListener("click", (event) => {
  console.log($week);
  if (weekNum > 1) {
    weekNum -= 1;
    drawWeek(phases, weekNum);
  }
});
