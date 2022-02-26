const clockHr = document.querySelector('.clockHr');
const clockMin = document.querySelector('.clockMin');
const clockSec = document.querySelector('.clockSec');
const addCity = document.querySelector('.fa-plus-circle');
const cityInput = document.querySelector('.cityInput');

let hideDeleted = 0;
let undefCity;

const timeUpdate = () => {
	timeUpdateM();

	setInterval(function () {
		timeUpdateM();
	}, 1000);
};

const timeUpdateM = () => {
	const dateTime = document.querySelector('.dateTime');
	const clockTime = document.querySelector('.clockTime');
	const dateDay = document.querySelector('.dateDay');
	const dateMon = document.querySelector('.dateMon');
	const dateYr = document.querySelector('.dateYr');
	const currentTime = new Date();

	clockHr.innerText = currentTime.getHours();
	clockMin.innerText = currentTime.getMinutes();
	clockSec.innerText = currentTime.getSeconds();

	if (currentTime.getHours() < 10 || currentTime.getHours() == 0) {
		clockHr.innerText = `0${currentTime.getHours()}`;
	}
	if (currentTime.getMinutes() < 10 || currentTime.getMinutes() == 0) {
		clockMin.innerText = `0${currentTime.getMinutes()}`;
	}
	if (currentTime.getSeconds() < 10 || currentTime.getSeconds() == 0) {
		clockSec.innerText = `0${currentTime.getSeconds()}`;
	}

	dateDay.innerText = currentTime.getDate();
	dateMon.innerText = currentTime.getMonth() + 1;
	dateYr.innerText = currentTime.getFullYear();

	if (currentTime.getDate() < 10 || currentTime.getDate() == 0) {
		dateDay.innerText = `0${currentTime.getDate()}`;
	} else {
		dateDay.innerText = currentTime.getDate();
	}
	if (currentTime.getMonth() + 1 < 10 || currentTime.getMonth() + 1 == 0) {
		dateMon.innerText = `0${currentTime.getMonth() + 1}`;
	}
	if (currentTime.getFullYear() < 10 || currentTime.getFullYear() == 0) {
		dateYr.innerText = `0${currentTime.getFullYear()}`;
	}
};

timeUpdate();

const store = {
	city: {
		cityData: {},
	},
};





const storex = [];


let i = 0
let ide = 0;





const localStorageTest = () =>{
	let tabelaContent = document.querySelector(`.worldTimeUl`).innerHTML
	localStorage.setItem("tabelaContent", tabelaContent);
	localStorage.setItem("ide", ide);



	let storexx = storex
	localStorage.setItem('storexx', JSON.stringify(storexx));


}

const upadteNextDay = () => {
	for (i = 0; i < storex.length; i++) {
		const nwcorb = document.querySelector(`.worldTime ul`).children[i]
		const result = storex.filter(value => Object.keys(value).length !== 0);
	
		if(result[i].id == nwcorb.id){
			let dayUpdate = document.querySelector(`.worldTime ul`).children[i].childNodes[1].lastElementChild.lastChild
			const getCordx = () => {
				fetch(`https://api.ipgeolocation.io/timezone?apiKey=1369d0fef51744e4a2e85ce030a3c758&lat=${result[i].latitude}&long=${result[i].longitude}`)
					.then(res2 => res2.json())
					.then(cityCord => {	
						let newTimrTest = cityCord.date_time_wti;	
						dayUpdate.innerText = newTimrTest.slice(5, -20);
						
					});
			};
			getCordx()
		}
	}
} 

// setTimeout(() => {
// 	upadteNextDay()
// }, 1000);


setInterval(function () {
	localStorageTest()
	for (i = 0; i < storex.length; i++) {

		const nwcorb = document.querySelector(`.worldTime ul`).children[i]
		const result = storex.filter(value => Object.keys(value).length !== 0);

		if(result[i].id == nwcorb.id){

			const dayNightUpdate = document.querySelector(`.worldTime ul`).children[i].firstChild
			const hourUpdate = document.querySelector(`.worldTime ul`).children[i].childNodes[1].lastElementChild.firstChild

			let newHourx = parseInt(new Date().toLocaleString('en-US', {timeZone: `${result[i].timeZone}`,timeStyle: 'medium',hourCycle: 'h23'}).slice(0, -6));

			hourUpdate.innerText = new Date().toLocaleString('en-US', {timeZone: `${result[i].timeZone}`,timeStyle: 'medium',hourCycle: 'h23'}).slice(0, -3);
			if (newHourx >= 8 && newHourx <= 19) {
				dayNightUpdate.innerHTML = '<i class="fas fa-sun"</i>';
			} else if (newHourx == 0) {
				dayNightUpdate.innerHTML = `<i class="fas fa-moon"</i>`;
			} else {
				dayNightUpdate.innerHTML = `<i class="fas fa-moon"</i>`;
			}

			let nextDay = new Date().toLocaleString('en-US', {timeZone: `${result[i].timeZone}`,timeStyle: 'medium',hourCycle: 'h23'});

			// let dayUpdate = document.querySelector(`.worldTime ul`).children[i].childNodes[1].lastElementChild.lastChild
			// 	const getCordx = () => {
			// 		fetch(`https://api.ipgeolocation.io/timezone?apiKey=1369d0fef51744e4a2e85ce030a3c758&lat=${result[i].latitude}&long=${result[i].longitude}`)
			// 			.then(res2 => res2.json())
			// 			.then(cityCord => {	
			// 				let newTimrTest = cityCord.date_time_wti;	
			// 				dayUpdate.innerText = newTimrTest.slice(5, -20);
							
			// 			});
			// 	};

				if(nextDay === '00:00:00' || nextDay === '00:00:01'){
					upadteNextDay()
				}
				
		}
		
	}
	
}, 1000);







const getCord = () => {
	fetch(
		`https://api.ipgeolocation.io/timezone?apiKey=1369d0fef51744e4a2e85ce030a3c758&lat=${store.city.latitude}&long=${store.city.longitude}`
	)
		.then(res2 => res2.json())
		.then(cityCord => {
			store.city.cityData.time24 = cityCord.time_24;
			store.city.cityData.timeZone = cityCord.timezone;
			store.city.cityData.timeZoneOffset = cityCord.timezone_offset;
			store.city.cityData.dateTime = cityCord.date_time_txt;
			store.city.cityData.dateTimeWti = cityCord.date_time_wti;
			
			const testObj = {
				id: ide,
				timeZone: cityCord.timezone,
				time24: cityCord.time_24,
				timeZoneOffset: cityCord.timezone_offset,
				dateTime: cityCord.date_time_txt,
				dateTimeWti: cityCord.date_time_wti,
				latitude: store.city.latitude,
				longitude: store.city.longitude
				
			};
			
			storex.push(testObj);
			
			createNewCity();
		});
};






const getCity = () => {
	fetch(
		`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=a4cf891a513341099d0fde29e2fe61f1`
	)
		.then(res => res.json())
		.then(city => {
			if(city.results[0].components.city === undefined){
				store.city.city = undefCity
			}else{
				store.city.city = city.results[0].components.city;
			}
			
			store.city.latitude = city.results[0].geometry.lat;
			store.city.longitude = city.results[0].geometry.lng;

			getCord();
		});
};


let newDayNight;
let locationDifference;
let getHour;
let getDay;

const render = () => {
	const dayOrNight = () => {
		let intTest;
		intTest = parseInt(store.city.cityData.time24);

		if (intTest >= 8 && intTest <= 19) {
			newDayNight.innerHTML = '<i class="fas fa-sun"></i>';
		} else if (intTest == 0) {
			newDayNight.innerHTML = `<i class="fas fa-moon"></i>`;
		} else {
			newDayNight.innerHTML = `<i class="fas fa-moon"></i>`;
		}
	};

	const timeZone = () => {
		let timeZoneOffset;
		timeZoneOffset = store.city.cityData.timeZoneOffset;
		let minus = timeZoneOffset - 1;

		if (timeZoneOffset - 1 == 0) {
			locationDifference.innerText = `Same as local time`;
		} else if (timeZoneOffset - 1 > 0) {
			if (minus == 1) {
				locationDifference.innerText = `${minus} hr ahead`;
			} else {
				locationDifference.innerText = `${minus} hrs ahead`;
			}
		} else if (timeZoneOffset - 1 < 0) {
			if (minus == 1) {
				locationDifference.innerText = `${Math.abs(minus)} hr behind`;
			} else {
				locationDifference.innerText = `${Math.abs(minus)} hrs behind`;
			}
		}
	};

	const getDate = () => {
		getHour = new Date()
			.toLocaleString('en-US', {
				timeZone: `${store.city.cityData.timeZone}`,
				timeStyle: 'medium',
				hourCycle: 'h23',
			})
			.slice(0, -3);
		getDay = store.city.cityData.dateTimeWti.slice(5, -20)
	};

	getDate();
	dayOrNight();
	timeZone();
};



const createNewCity = () => {
	const worldTime = document.querySelector('.worldTime ul');
	let newPlace;
	let newCity;
	let newLocation;
	let newDate;
	let newDelete;
	let locationCity;
	let newHour;
	let newDay;
	

	newPlace = document.createElement('li');
	newPlace.classList.add('place');
	newPlace.classList.add(`place${ide}`);
	newPlace.id = `${ide}`;

	newDayNight = document.createElement('p');
	newDayNight.classList.add('dayNight');

	newCity = document.createElement('div');
	newCity.classList.add('city');

	newLocation = document.createElement('div');
	newLocation.classList.add('location');

	locationCity = document.createElement('p');
	locationCity.classList.add('cityp');
	locationCity.innerText = store.city.city;

	locationDifference = document.createElement('p');
	locationDifference.classList.add('differnce');

	render();

	newHour = document.createElement('p');
	newHour.classList.add('hour');
	newHour.innerText = `${getHour}`;

	newDay = document.createElement('p');
	newDay.classList.add('day');
	newDay.innerText = `${getDay}`;

	newDate = document.createElement('div');
	newDate.classList.add('date');

	newDelete = document.createElement('p');
	newDelete.innerHTML = `<i class="fas fa-times"></i>`;
	newDelete.classList.add('delete');
	if(hideDeleted === 0){
		newDelete.classList.add('show');
	}

	newLocation.appendChild(locationCity);
	newLocation.appendChild(locationDifference);

	newDate.appendChild(newHour);
	newDate.appendChild(newDay);

	newCity.appendChild(newLocation);
	newCity.appendChild(newDate);

	newPlace.appendChild(newDayNight);
	newPlace.appendChild(newCity);
	newPlace.appendChild(newDelete);
	worldTime.appendChild(newPlace);


console.log(`ide przed ${ide}`)
	ide++;
	console.log(`ide po ${ide}`)
	console.log(`-----------`)
};

const addNewCity = () => {
	city = cityInput.value;
	undefCity = city


	testeeee = cityInput.value
	if(/\d/.test(testeeee)){
		return
	}else{
		getCity();
	}

	cityInput.value = '';
};

///// 	REMOVE CITY
const worldTimeUl = document.querySelector('.worldTimeUl')


const checkClick = e => {
    if (e.target.classList.value !== '') {
        if (e.target.closest('i').classList.contains('fa-times')) {
            console.log(e.target.closest('li').id)
			delete storex[e.target.closest('li').id]
			storex[e.target.closest('li').id] = {}
			removeCity(e);
        }
    }
}

const removeCity = e => {
    let deleteCity = e.target.closest('li');
    deleteCity.remove();
}


worldTimeUl.addEventListener('click', checkClick)



const deleteCityBtn = document.querySelector('.fa-times-circle')
const savaCityBtn = document.querySelector('.fa-check-circle')


const deleteCity = () =>{
	hideDeleted = 0;
	savaCityBtn.style.display = 'block'
	deleteCityBtn.style.display = 'none'
	for (i=0; i<storex.length; i++){
		const nwcorb2 = document.querySelector(`.worldTime ul`).children[i]

		const result = storex.filter(value => Object.keys(value).length !== 0);
		if(result[i].id == nwcorb2.id){
			let deletex = document.querySelector(`.worldTime ul`).children[i].lastChild
			deletex.classList.add('show')
		}
		
	}
	
	
}

const saveCity = () =>{
	hideDeleted = 1;
	deleteCityBtn.style.display = 'block'
	savaCityBtn.style.display = 'none'
	for (i=0; i<storex.length; i++){
		const nwcorb3 = document.querySelector(`.worldTime ul`).children[i]

		const result = storex.filter(value => Object.keys(value).length !== 0);
		if(result[i].id == nwcorb3.id){
			let savex = document.querySelector(`.worldTime ul`).children[i].lastChild
		savex.classList.remove('show')
		}
		
	}
	
}

///////////// Remove city

cityInput.addEventListener('keyup', function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		addNewCity();
	}
});









window.onload = function(){
	let storexx = JSON.parse(localStorage.getItem('storexx'));
	if(storexx != 0){
		for(i=0; i<storexx.length; i++){
			storex.push(storexx[i])

		}
	}
	
	document.querySelector(`.worldTimeUl`).innerHTML = localStorage.getItem('tabelaContent')
	ide = parseInt(localStorage.getItem('ide'))
	saveCity()
	

	
	
	
}

addCity.addEventListener('click', addNewCity);
deleteCityBtn.addEventListener('click', deleteCity)
savaCityBtn.addEventListener('click', saveCity)


