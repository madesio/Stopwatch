const stopwatch = document.querySelector('.stopwatch');
const miniNum = document.querySelector('.miniNum');

const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');

const timeList = document.querySelector('.time-list');

let timesArr = [];

let hours = 0;
let minutes = 0;
let seconds = 0;
let miliseconds = 0;
let stoptime = true;

function startTime() {
	clearInterval(countTime)
	if (stoptime == true) {
		stoptime = false;
		startBtn.style.display = startBtn.style.display === 'block' ? '' : 'none';
		pauseBtn.style.display = pauseBtn.style.display === 'none' ? '' : 'block';
		
		timerCycle();
	}
}

function stopTime() {
	if (stoptime == false) {
		stoptime = true;
		startBtn.style.display = startBtn.style.display === 'none' ? '' : 'block';
		pauseBtn.style.display = pauseBtn.style.display === 'block' ? '' : 'none';
	}
}
function resetTime() {
	if (stoptime == false) {
		stoptime = true;
		startBtn.style.display = startBtn.style.display === 'none' ? '' : 'block';
		pauseBtn.style.display = pauseBtn.style.display === 'block' ? '' : 'none';
	}
	stopwatch.innerHTML = `00:00:00`;
	hours = 0;
	minutes = 0;
	seconds = 0;
	timesArr = [];
	timeList.innerHTML = '';
}

function lapTime() {
	timesArr.push(stopwatch.textContent);
	let num = 1;
	timeList.textContent = '';
	timesArr.forEach(time => {
		const newTime = document.createElement('li');
		newTime.innerHTML = `<i class="fas fa-flag"></i> ${num}: ${time}`;
		timeList.appendChild(newTime);
		num++;
	});
}

const timerCycle = () => {



	countTime = setInterval(() => {
		if (stoptime == false) {
			seconds = parseInt(seconds);
			minutes = parseInt(minutes);
			hours = parseInt(hours);
			miliseconds = parseInt(miliseconds)
	
			miliseconds = miliseconds + 1
			// seconds = seconds + 1;
	
			if(miliseconds == 99){
				seconds = seconds + 1;
				miliseconds = 0
			}

			if (seconds == 60) {
				minutes = minutes + 1;
				miliseconds = 0
				seconds = 0;
			}
	
			if (minutes == 60) {
				hours = hours + 1;
				miliseconds = 0
				minutes = 0;
				seconds = 0;
			}
	
			if (seconds < 10 || seconds == 0) {
				seconds = '0' + seconds;
			}
			if (minutes < 10 || minutes == 0) {
				minutes = '0' + minutes;
			}
			if (hours < 10 || hours == 0) {
				hours = '0' + hours;
			}
	
			stopwatch.innerHTML = `${hours}:${minutes}:${seconds}`;
				// setTimeout('timerCycle()', 1000);

		}
	},10)
};

startBtn.addEventListener('click', startTime);
pauseBtn.addEventListener('click', stopTime);
resetBtn.addEventListener('click', resetTime);
stopBtn.addEventListener('click', lapTime);

window.requestAnimationFrame(timerCycle());
