import { call } from 'Models/http-request';
import { showPreloader, hidePreloader } from 'Models/preloader';
import generateAvatars from 'Models/avatar';

// https://challenge-api.view.agentur-loop.com/api/?duty=tactic&page=1&limit=5
// https://challenge-api.view.agentur-loop.com/api/?page=1&limit=5
const url = 'https://challenge-api.view.agentur-loop.com/api/?duty=tactic&page=1&limit=5';

export default function loadContent (element) {
	const buttonEl = element.querySelector('.js-load-content__button');
	const resultEl = element.querySelector('.js-load-content__result');
	// const url = element.dataset.url + '?duty=tactic&page=1&limit=5';

	function init () {
		console.log('loadContent init', element);
		addListeners();
	}

	function addListeners () {
		buttonEl.addEventListener('click', buttonClickHandler);
	}

	function buttonClickHandler () {
		getData();
	}

	async function getData () {
		showPreloader(buttonEl, { color: 'white' });
		const response = await call(url, 'GET', { Authorization: 'Bearer 0123456789' });
		// check if it should delete button or if it should delete the list if sorting has changed
		console.log(response.data.data);
		generateAvatars(response.data.data, resultEl);

		hidePreloader(buttonEl);
	}

	init();
}
