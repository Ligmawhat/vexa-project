document.addEventListener('DOMContentLoaded', async (event) => {
  const $video = document.querySelector('[data-video]');
  const $notes = document.querySelector('[data-notes]');
  const $goals = document.querySelector('[data-goals]');
  const $nextWeek = document.querySelector('[data-next-week]');
  const $prevWeek = document.querySelector('[data-prev-week]');
  const $weekCurNum = document.querySelector('[data-week-cur-num]');

  const weeksCount = Number(document.querySelector('[data-weeks-count]').innerText);

  async function getWeekInfo(weeknum) {
    const currWeek = await fetch(`${window.location.href}/${weeknum}`);
    const weekInfo = await currWeek.json();
    return weekInfo;
  }

  function drawWeek(week) {
    $weekCurNum.innerHTML = week.number;
    $notes.innerHTML = week.notes;
    $goals.innerHTML = week.goals;
    $video.src = week.Videos[0].url;
  }

  let weekNum = 1;

  drawWeek(await getWeekInfo(weekNum));

  $nextWeek.addEventListener('click', async (event) => {
    if (weekNum < weeksCount) {
      weekNum += 1;
      const weekData = await getWeekInfo(weekNum);
      drawWeek(weekData);
    }
  });

  $prevWeek.addEventListener('click', async (event) => {
    if (weekNum > 1) {
      weekNum -= 1;
      const weekData = await getWeekInfo(weekNum);
      drawWeek(weekData);
    }
  });
});
