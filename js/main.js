const quesionmark = document.querySelector('.fa-question');

const alarm = document.querySelector('.alarm');
const clock = document.querySelector('.clock');
const stopwtch = document.querySelector('.stopwtch');
const timer = document.querySelector('.timer');

const closeBtn = document.querySelector('.close');
const modalShadow = document.querySelector('.modal-shadow');

const showModal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block';
	} else {
		modalShadow.style.display = 'none';
	}
	modalShadow.classList.toggle('modal-animation');
};

window.addEventListener('click', e =>
	e.target === modalShadow ? showModal() : false
);

quesionmark.addEventListener('click', showModal);
closeBtn.addEventListener('click', showModal);
