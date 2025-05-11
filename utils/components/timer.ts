export const calculateTime = (date: string) => {
  const countDownDate = new Date(date).getTime();
  const currentDate = new Date().getTime();

  const timeInterval = countDownDate - currentDate;

  let days;
  let hours;
  let minutes;
  let seconds;
  let shouldClearInterval = false;

  if (isNaN(countDownDate) || timeInterval <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    shouldClearInterval = true;
  } else {
    days = Math.floor(timeInterval / (1000 * 60 * 60 * 24));
    hours = Math.floor(
      (timeInterval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    minutes = Math.floor((timeInterval % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((timeInterval % (1000 * 60)) / 1000);
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    shouldClearInterval,
  };
};
