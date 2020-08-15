const clock = document.querySelector(".clock");

function getTime() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  clock.innerText =
    `${hours < 10 ? `0${hours}` : hours} : ` +
    `${minutes < 10 ? `0${minutes}` : minutes} : ` +
    `${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
