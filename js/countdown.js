const startBtn = document.querySelector('.startCountdown');
const pauseBtn = document.querySelector('.pauseCountdown');

const startBtn2 = document.querySelector('.countdownStart');
const pauseBtn2 = document.querySelector('.countdownPause');

const adjustmentButtons = document.querySelector('.adjustmentButtons');
const stopBtn = document.querySelector('.stopCountdown');
const countdown = document.querySelector('.countdown');

const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');

const setHour = document.querySelector('.setHour');
const setMin = document.querySelector('.setMin');
const setSec = document.querySelector('.setSec');

let hourInt;
let minuteInt;
let secondInt;

let stopTime = true;
let countTime;

let totalSeconds = 0;

let ih;
let im;
let is;

let audio

const countdownCycle = () => {
	countTime = setInterval(() => {
		hourInt = parseInt(hour.innerText);
		minuteInt = parseInt(minute.innerText);
		secondInt = parseInt(second.innerText);
		totalSeconds = hourInt * 60 * 60 + minuteInt * 60 + secondInt;

		totalSeconds--;

		const hourInte = Math.floor(totalSeconds / 60 / 60);
		const minuteInte = Math.floor(totalSeconds / 60 - hourInte * 60);
		const secondInte = totalSeconds % 60;

		hour.innerText = hourInte;
		minute.innerText = minuteInte;
		second.innerText = secondInte;

		if (hourInte < 10 || hourInte == 0) {
			hour.innerText = `0${hourInte}`;
		}
		if (minuteInte < 10 || minuteInte == 0) {
			minute.innerText = `0${minuteInte}`;
		}
		if (secondInte < 10 || secondInte == 0) {
			second.innerText = `0${secondInte}`;
		}
		if (totalSeconds == 0) {
			clearInterval(countTime);
			pauseCoundown();
			audio = new Audio('../mp3/countdown.mp3');
			audio.play();
			stopBtn.style.color = '#111'
			stopBtn.style.backgroundColor = '#e7d315'
			return;
		}
	}, 1000);
};

const pauseCoundown = () => {
	clearInterval(countTime);
	if (stopTime == false) {
		stopTime = true;
	}
	hourInt = parseInt(hour.innerText);
	minuteInt = parseInt(minute.innerText);
	secondInt = parseInt(second.innerText);

	if (hourInt.innerText == 0) {
		setHour.value = '';
	}
	if (minuteInt.innerText == 0 || minuteInt.innerText < 10) {
		setMin.value = '';
	}
	if (secondInt.innerText == 0 || secondInt.innerText < 10) {
		setSec.value = '';
	}
	setHour.value = hourInt;
	setMin.value = minuteInt;
	setSec.value = secondInt;
	ih = hourInt;
	im = minuteInt;
	is = secondInt;
	startBtn2.style.display = 'flex';
	pauseBtn2.style.display = 'none';
	adjustmentButtons.classList.add('adjShow');
	adjustmentButtons.classList.remove('adjHide');
};

const startCountdown = () => {
	if ((setHour.value == '' && setMin.value == '' && setSec.value == '') || (setHour.value == 0 && setMin.value == 0 && setSec.value == 0)) {
		return;
	} else {
		clearInterval(countTime);
		addTime();

		if (stopTime == true) {
			stopTime = false;
			countdownCycle();
		}
		startBtn2.style.display = 'none';
		pauseBtn2.style.display = 'flex';
		adjustmentButtons.classList.remove('adjShow');
		adjustmentButtons.classList.add('adjHide');
	}
	audio.pause();
	stopBtn.style.color = '#fff'
	stopBtn.style.backgroundColor = '#76798e'
};

const stopCountdown = () => {
	clearInterval(countTime);
	startBtn2.style.display = 'flex';
	pauseBtn2.style.display = 'none';
	adjustmentButtons.classList.remove('adjHide');
	adjustmentButtons.classList.add('adjShow');

	setHour.value = '';
	setMin.value = '';
	setSec.value = '';
	hour.innerText = '00';
	minute.innerText = '00';
	second.innerText = '00';

	if (stopTime == false) {
		stopTime = true;
	}
	audio.pause();
	stopBtn.style.color = '#fff'
	stopBtn.style.backgroundColor = '#76798e'
};

const adjBtns = () => {
	const hourUp = document.querySelector('.hourUp');
	const minUp = document.querySelector('.minUp');
	const secUp = document.querySelector('.secUp');

	const hourDown = document.querySelector('.hourDown');
	const minDown = document.querySelector('.minDown');
	const secDown = document.querySelector('.secDown');

	hourUp.addEventListener('click', () => {
		ih = setHour.value;
		if (ih == 99) {
			return;
		} else {
			ih++;
			setHour.value = ih;
		}
	});

	minUp.addEventListener('click', () => {
		im = setMin.value;
		if (im == 60) {
			return;
		} else {
			im++;
			setMin.value = im;
		}
	});

	secUp.addEventListener('click', () => {
		is = setSec.value;
		if (is == 60) {
			return;
		} else {
			is++;
			setSec.value = is;
		}
	});

	hourDown.addEventListener('click', () => {
		ih = setHour.value;
		if (ih == 00) {
			return;
		} else {
			ih--;
			setHour.value = ih;
		}
	});

	minDown.addEventListener('click', () => {
		im = setMin.value;
		if (im == 00) {
			return;
		} else {
			im--;
			setMin.value = im;
		}
	});

	secDown.addEventListener('click', () => {
		is = setSec.value;
		if (is == 00) {
			return;
		} else {
			is--;
			setSec.value = is;
		}
	});
};

const addTime = () => {
	if (setHour.value == '' || setHour.value < 0) {
		hour.innerText = '00';
	} else {
		if (setHour.value.length == 1) {
			hour.innerText = `0${setHour.value}`;
		} else {
			hour.innerText = setHour.value;
		}
	}

	if (setMin.value == '' || setMin.value < 0) {
		minute.innerText = '00';
	} else {
		if (setMin.value.length == 1) {
			minute.innerText = `0${setMin.value}`;
		} else {
			minute.innerText = setMin.value;
		}
	}

	if (setSec.value == '' || setSec.value < 0) {
		second.innerText = '00';
	} else {
		if (setSec.value.length == 1) {
			second.innerText = `0${setSec.value}`;
		} else {
			second.innerText = setSec.value;
		}
	}
};

const digitLimit = () => {
	setHour.addEventListener('keypress', function (e) {
		if (this.value.length == 2) {
			e.preventDefault();
			return false;
		}
	});

	setMin.addEventListener('keypress', function (e) {
		if (this.value.length == 2) {
			e.preventDefault();
			return false;
		}
	});

	setSec.addEventListener('keypress', function (e) {
		if (this.value.length == 2) {
			e.preventDefault();
			return false;
		}
	});
};

digitLimit();
adjBtns();

startBtn.addEventListener('click', startCountdown);
pauseBtn.addEventListener('click', pauseCoundown);
stopBtn.addEventListener('click', stopCountdown);