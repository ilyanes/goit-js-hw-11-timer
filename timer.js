// /*
//  * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
//  * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
//  */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

// /*
//  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
//  * остатка % и делим его на количество миллисекунд в одном часе
//  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
//  */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

// /*
//  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
//  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
//  */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

// /*
//  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
//  * миллисекунд в одной секунде (1000)
//  */
// const secs = Math.floor((time % (1000 * 60)) / 1000);

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
  }
  getRefs() {
    const container = document.querySelector(this.selector);
    const daysRef = container.querySelector('[data-value="days"]');
    const hoursRef = container.querySelector('[data-value="hours"]');
    const minsRef = container.querySelector('[data-value="mins"]');
    const secsRef = container.querySelector('[data-value="secs"]');
    return { daysRef, hoursRef, minsRef, secsRef, container };
  }
  updateTimer({ daysRef, hoursRef, minsRef, secsRef, container }) {
    const time = this.targetDate - Date.now();
    if (time < 1000) {
      this.stopTimer();
      container.innerHTML = "<h1>Время вышло</h1>";
      return;
    }
    const days = Math.floor(time / (1000 * 60 * 60 * 24)).toString();
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    daysRef.textContent = days.padStart(2, "0");
    hoursRef.textContent = hours < 10 ? `0${hours}` : hours;
    minsRef.textContent = mins < 10 ? `0${mins}` : mins;
    secsRef.textContent = secs < 10 ? `0${secs}` : secs;
  }
  startTimer() {
    console.log(this.updateTimer);
    this.intervalId = setInterval(() => this.updateTimer(this.getRefs()), 1000);
  }
  stopTimer() {
    clearInterval(this.intervalId);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Aug 17, 2021"),
});

timer.startTimer();

const timer2 = new CountdownTimer({
  selector: "#timer-2",
  targetDate: new Date("Aug 15, 2021"),
});

timer2.startTimer();
