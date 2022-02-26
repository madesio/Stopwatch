const addAlarmBtn = document.querySelector('.addAlarmBtn');
const cancelBtn = document.querySelector('.cancelBtn');
const alarmShadow = document.querySelector('.alarmShadow');
const confirmBtn = document.querySelector('.confirmBtn .fa-check')
const setHour = document.querySelector('.alarmTime .hour')
const setMinute = document.querySelector('.alarmTime .minute')
const alarmUl = document.querySelector('.alarmContainer ul')

const valueTest2 = document.querySelector('.alarmMenu .ringtone .selected')


const turnOff = document.querySelector('.turnOff');
const offAlarm = document.querySelector('.offAlarm');

const alarmex = []

const alarmObj = {}
let ix = 0;







const localStorageTest2 = () =>{
	let alarmContent = document.querySelector(`.alarmContainer ul`).innerHTML
	localStorage.setItem("alarmContent", alarmContent);
	localStorage.setItem("ix", ix)

	let alarmexx = alarmex
	localStorage.setItem('alarmexx', JSON.stringify(alarmexx));
}



window.onload = function(){
	document.querySelector(`.alarmContainer ul`).innerHTML = localStorage.getItem('alarmContent')


	
	

	let alarmexx = JSON.parse(localStorage.getItem('alarmexx'));

	if(alarmexx != 0){
		for(i=0; i<alarmexx.length; i++){
			alarmex.push(alarmexx[i])

		}
	}
	ix = parseInt(localStorage.getItem('ix'))


	for(i=0;i<alarmex.length; i++){
		const inputCheck = document.querySelector('.alarmContainer ul').childNodes[i].firstChild.childNodes[1].firstChild
		const listaLista = document.querySelector('.alarmContainer ul').childNodes[i].firstChild

		if(listaLista.classList.contains('showC')){
			inputCheck.checked = true
		}else{
			inputCheck.checked = false
		}
	}
}






///////////////////////////////

const checkClick = e => {
	
    if (e.target.classList.value !== '') {
        if (e.target.closest('div').classList.contains('showC') && e.target.closest('label').classList.contains('switch')) {
			e.target.closest('div').classList.toggle('showC')
			let idek = e.path[3].id
			alarmex[idek].timex = ''
        }else if(e.target.closest('div').classList.contains('delete')) {
			removeCity(e);
        }else if(e.target.closest('label').classList.contains('switch')){
			e.target.closest('div').classList.toggle('showC')
			idek2 = e.path[3].id
			let alarmhr = document.querySelector(`.alarm${idek2} .alarmHr`) 
			let alarmmin = document.querySelector(`.alarm${idek2} .alarmMin`)

			const date = new Date()
			const newDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${alarmhr.innerText}:${alarmmin.innerText}`
			let date2 = new Date(newDate);
			
			alarmex[idek2].timex = date2.getTime()
		}
    }
	
}



alarmUl.addEventListener('click', checkClick)



const removeCity = e => {
    let deleteCity = e.target.closest('li');
	let deleteid = parseInt(deleteCity.id)
	delete(alarmex[deleteid])
    deleteCity.remove();
	delete alarmex[e.target.closest('li').id]
	alarmex[e.target.closest('li').id] = {}
}



///////////////////////////
offAlarm.addEventListener('click',() => {    
	showOffAlarm();
	audio.pause()
	audio.currentTime = 0;
});

const showOffAlarm = () => {
	if (!(offAlarm.style.display === 'block')) {
		offAlarm.style.display = 'block';
	} else {
		offAlarm.style.display = 'none';
	}
	offAlarm.classList.toggle('modal-animation');
};

window.addEventListener('click', e =>
	e.target === offAlarm ? showOffAlarm() : false
);


/////////////////////
	

const playAlarm = () => {
	const date = new Date()
	const currentDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
	let date1 = new Date(currentDate);
	const funTest2 = () =>{
		switch (parseInt(alarmex[i].alarmid)) {
			case 1:
			value = 1;
			audio = new Audio('../mp3/weatherAlarm.mp3');
			let case1 = document.querySelector(`.alarm${i} .alarmBox`)
			if(case1.classList.contains('showC')){
			audio.play()
			showOffAlarm()
				}
			  break;
			case 2:
			value = 2;
			audio = new Audio('../mp3/natureAlarm.mp3');
			let case2 = document.querySelector(`.alarm${i} .alarmBox`)
			if(case2.classList.contains('showC')){
			audio.play()
			showOffAlarm()
				}
			  break;
			case 3:
			value = 3;
			audio = new Audio('../mp3/mornignDew.mp3');
			let case3 = document.querySelector(`.alarm${i} .alarmBox`)
			if(case3.classList.contains('showC')){
			audio.play()
			showOffAlarm()
				}
			  break;
			case 4:
			value = 4;
			audio = new Audio('../mp3/fireflies.mp3');
			let case4 = document.querySelector(`.alarm${i} .alarmBox`)
			if(case4.classList.contains('showC')){
			audio.play()
			showOffAlarm()
				}
			  break;
			case 5:
			value = 5;
			audio = new Audio('../mp3/daydream.mp3');
			let case5 = document.querySelector(`.alarm${i} .alarmBox`)
			if(case5.classList.contains('showC')){
			audio.play()
			showOffAlarm()
				}
			  break;
		  }
	}


		

	for(i=0; i<alarmex.length; i++){
		
		const nwcorb = document.querySelector(`.alarmContainer ul`).children[i]
		const result = alarmex.filter(value => Object.keys(value).length !== 0);

		let clasCheck = document.querySelector(`.alarm${i} .alarmBox`)
		if(alarmex[i].timex === date1.getTime() && clasCheck.classList.contains('showC')){
			funTest2()
			alarmex[i].timex = ''
			tets = document.querySelector(`.alarm${i} .alarmBox label span`)
			tets.click()
		}

	}
		

}

playAlarm()

let sews = setInterval(() =>{
	playAlarm()
	localStorageTest2()
},1000)

let timerInt = setInterval(() => {
	for(i=0; i<alarmex.length; i++){

		const nwcorb2 = document.querySelector(`.alarmContainer ul`).children[i]
		const result2 = alarmex.filter(value => Object.keys(value).length !== 0);

		if(result2[i].id == nwcorb2.id){

	
			let getAlarmHr = document.querySelector(`.alarmContainer ul`).children[i].firstChild.firstChild.firstChild.firstChild
			let getAlarmMin = document.querySelector(`.alarmContainer ul`).children[i].firstChild.firstChild.firstChild.lastChild
			let setNewAlarmx = document.querySelector(`.alarmContainer ul`).children[i].firstChild.firstChild.lastChild

		const date = new Date()
		const currentDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
		const newDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${getAlarmHr.innerText}:${getAlarmMin.innerText}`
	
		let date1 = new Date(currentDate);
		let date2 = new Date(newDate);
		

		let diff = date2.getTime() - date1.getTime();
	
		let msec = diff;
	
		let hh = Math.floor(msec / 1000 / 60 / 60);
		msec -= hh * 1000 * 60 * 60;
		let mm = Math.floor(msec / 1000 / 60);
		msec -= mm * 1000 * 60;
		
		if(hh >= 0){
			hh = hh
		}else{
			hh = 24 + hh
		}
		
		if(diff == 0){
			hh = 24
			mm = 0
			setNewAlarmx.innerText = `Alarm in ${hh} hours ${mm} minutes`
		}else{
			setNewAlarmx.innerText = `Alarm in ${hh} hours ${mm} minutes`
		}
		}
		}




		
}, 1000);

/////////////////////
const setTime = () =>{
	const date = new Date()
	const currentDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
	const newDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${setHour.value}:${setMinute.value}`
	let date1 = new Date(currentDate);
	let date2 = new Date(newDate);
	
	let diff = date2.getTime() - date1.getTime();

	let msec = diff;
	let hh = Math.floor(msec / 1000 / 60 / 60);
	msec -= hh * 1000 * 60 * 60;
	let mm = Math.floor(msec / 1000 / 60);
	msec -= mm * 1000 * 60;

	if(hh >= 0){
		hh = hh
	}else{
		hh = 24 + hh
	}

	if(diff == 0){
		hh = 24
		mm = 0
		newAlarmStart.innerText = `Alarm in ${hh} hours ${mm} minutes`
	}else{
		newAlarmStart.innerText = `Alarm in ${hh} hours ${mm} minutes`
	}
}

 









let newAlarmStart;

const createNewAlarm = () =>{
	const alarmContainer = document.querySelector('.alarmContainer ul')

	newAlarm = document.createElement('li')
	newAlarm.classList.add('alarm')
	newAlarm.classList.add(`alarm${ix}`)
	newAlarm.id = `${ix}`

	newAlarmBox = document.createElement('div')
	newAlarmBox.classList.add('alarmBox')

	newTime = document.createElement('div')
	newTime.classList.add('time')

	newTimeHour = document.createElement('p')
	newTimeHour.classList.add('hour')

	newHour = document.createElement('span')
	newHour.classList.add('alarmHr')
	if (setHour.value.length == 1){
		newHour.innerText =`0${setHour.value}`
	}else if(setHour.value >23){
		newHour.innerText = 23
	}else if(setHour.value <0){
		newHour.innerText = 23
	}else{
		newHour.innerText = setHour.value
	}


	newColon = document.createTextNode(':')

	newMin = document.createElement('span')
	newMin.classList.add('alarmMin')
	if (setMinute.value.length == 1){
		newMin.innerText =`0${setMinute.value}`
	}else if(setMinute.value >59){
		newMin.innerText = 59
	}else if(setMinute.value <0){
		newMin.innerText = 59
	}else{
		newMin.innerText = setMinute.value
	}

	

	newTimeHour.appendChild(newHour)
	newTimeHour.appendChild(newColon)
	newTimeHour.appendChild(newMin)
	

	newAlarmStart = document.createElement('p')
	newAlarmStart.classList.add('alarmStart')
	

	newTime.appendChild(newTimeHour)
	newTime.appendChild(newAlarmStart)

	setTime() 
	
	newSwitch = document.createElement('label')
	newSwitch.classList.add('switch')
	newSwitch.innerHTML = `<input type="checkbox">`
	newAlarmBox.classList.add('showC')
	if(newAlarmBox.classList.contains('showC')){
		newSwitch.click()
	}
	

	newSlider = document.createElement('span')
	newSlider.classList.add('slider')
	newSlider.classList.add('round')
	



	newSwitch.appendChild(newSlider)

	newDelete = document.createElement('div')
	newDelete.classList.add('delete')
	newDelete.innerHTML = '<i class="fas fa-times"></i>'



	newAlarmBox.appendChild(newTime)
	newAlarmBox.appendChild(newSwitch)
	newAlarmBox.appendChild(newDelete)

	newAlarm.appendChild(newAlarmBox)
	alarmContainer.appendChild(newAlarm)
	
	inputChecked = document.querySelector(`.alarmContainer ul .alarm${ix} div label input`)
	inputChecked.checked = true
	const date = new Date()
	const newDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${setHour.value}:${setMinute.value}`
	let date2 = new Date(newDate);
	const alarmObj = {
		id : ix,
		alarmid : valueTest2.value,
		timex : date2.getTime()
	}
	
	alarmex.push(alarmObj)

	ix++;
	xshowModal()
	
}

im = 0;
const adjButtons = () => {
	const hourUp = document.querySelector('.hourUp')
	const hourDown = document.querySelector('.hourDown')
	const minUp = document.querySelector('.minUp')
	const minDown = document.querySelector('.minDown')




	hourUp.addEventListener('click', () => {
		im = setHour.value;
		im++
		if (im > 23) {
			im = 0
			setHour.value = im;
		} else {
			if (im === 0 || im < 10){
				setHour.value =`0${im}`
			}
			setHour.value = im;
			
		}
	});

	hourDown.addEventListener('click', () => {
		im = setHour.value;
		im--
		if (im < 0) {
			im = 23
			setHour.value = im;
		} else {
			if (im === 0 || im < 10){
				setHour.value =`0${im}`
			}
			setHour.value = im;
		}
	});

	minUp.addEventListener('click', () => {
		im = setMinute.value;
		im++;
		if (im == 60) {
			im = 0
			setMinute.value = im;
		} else {
			setMinute.value = im;
		}
	});

	minDown.addEventListener('click', () => {
		im = setMinute.value;
		im--;
		if (im < 0) {
			im = 59
			setMinute.value = im;
		} else {
			setMinute.value = im;
		}
	});

}
adjButtons()

const digitLimit = () => {
	setHour.addEventListener('keypress', function (e) {
		if (this.value.length == 2) {
			e.preventDefault();
			return false;
		}
	});

	setMinute.addEventListener('keypress', function (e) {
		if (this.value.length == 2) {
			e.preventDefault();
			return false;
		}
	});
};
digitLimit()

confirmBtn.addEventListener('click', () => {
	createNewAlarm();
	
})

setMinute.addEventListener('keyup', function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		createNewAlarm();
	}
});


window.addEventListener('click', e =>
	e.target === alarmShadow ? xshowModal() : false
);

const getCurrentDate = () => {
	const date = new Date()
	setHour.value = date.getHours()
	setMinute.value = date.getMinutes()
}
const xshowModal = () => {

	if (!(alarmShadow.style.display === 'block')) {
		alarmShadow.style.display = 'block';

	} else {
		alarmShadow.style.display = 'none';

	}
	alarmShadow.classList.toggle('modal-animation');
	setHour.value = ''
	setMinute.value = ''
};

addAlarmBtn.addEventListener('click',() => {    
	xshowModal();
	getCurrentDate();    
});
cancelBtn.addEventListener('click', xshowModal);



