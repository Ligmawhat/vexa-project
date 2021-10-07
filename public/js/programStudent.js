const emptyArr = ["1", "2", "3"];

const $week = document.querySelector("#week");

const $nextWeek = document.querySelector("[data-next-week]");

const $prevWeek = document.querySelector("[data-prev-week]");

let index = 0;
document.addEventListener("DOMContentLoaded", async (event) => {
  $week.innerHTML = emptyArr[index];
  // //  const allPosts = await fetch('/')  //Получаю массив программы со всеми элементами и неделями
});

$nextWeek.addEventListener("click", async (event) => {
  console.log($week);
  if (index < emptyArr.length - 1) {
    index += 1;
    $week.innerHTML = emptyArr[index];
  }
});

$prevWeek.addEventListener("click", (event) => {
  console.log($week);
  if (index > 0) {
    index -= 1;
    $week.innerHTML = emptyArr[index];
  }
});