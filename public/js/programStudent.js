document.addEventListener('DOMContentLoaded', async (event) => {
  const $videos = document.querySelector('[data-videos]');
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

  function generateVideo(src, url) {
    return `<a href="${url}"><img width="100%" class="program-events__img" src="${src}" height="200px"></a>`;
  }

  function drawWeek(week) {
    $weekCurNum.innerHTML = week.number;
    $notes.innerHTML = week.notes;
    $goals.innerHTML = week.goals;
    $videos.innerHTML = '';
    for (const video of week.Videos) {
      $videos.insertAdjacentHTML('beforeend', generateVideo(video.thumbUrl, video.url));
    }
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
