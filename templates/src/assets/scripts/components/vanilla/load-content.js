import { call } from 'Models/http-request';
import { showPreloader, hidePreloader } from 'Models/preloader';
import generateAvatars from 'Models/avatar';

// https://challenge-api.view.agentur-loop.com/api/?duty=tactic&page=1&limit=5
// https://challenge-api.view.agentur-loop.com/api/?page=1&limit=5

let currentPage = 1;
let currentFilter = 'show all'; // show-all | trim | tactic | helmsman
const limit = 5;

export default function loadContent (element) {
	const buttonEl = element.querySelector('.js-load-content__button--load-more');
	const toggleButtons = element.querySelectorAll('.js-load-data--filter-control .button');
	const resultEl = element.querySelector('.js-load-content__result');
	const baseUrl = element.dataset.url;

	async function init () {
		console.log('loadContent init', element);
		await fetchData();
		addListeners();
	}

	function addListeners () {
		buttonEl.addEventListener('click', buttonClickHandler);
		toggleButtons.forEach(button => {
			button.addEventListener('click', toggleClickHandler);
		});
	}

	function toggleClickHandler () {
		const clickedButton = this;
		console.log(clickedButton);
		const buttonCategory = clickedButton.innerText.toLowerCase().trim();

		if (buttonCategory !== currentFilter) { // TODO export some things
			const currentlyActiveButton = element.querySelector('.js-load-data--filter-control .button--active');

			if (currentlyActiveButton) {
				currentlyActiveButton.classList.remove('button--active');
			}
			clickedButton.classList.add('button--active');

			resultEl.innerHTML = '';
			showPreloader(resultEl, { color: 'white' });

			currentFilter = buttonCategory;
			currentPage = 1;

			fetchData();
		}
	}

	async function buttonClickHandler () {
		currentPage++;
		await fetchData();
	}

	async function fetchData () {
		showPreloader(buttonEl, { color: 'white' });
		let url = `${baseUrl}?page=${currentPage}&limit=${limit}`;

		if (currentFilter !== 'show all') {
			url += `&duty=${currentFilter}`;
		}

		const response = await call(url, 'GET', { Authorization: 'Bearer 0123456789' });// TODO display error message
		console.log(response);
		if (response.data && response.data.data.length > 0) {
			generateAvatars(response.data.data, resultEl);

			if (response.data.data.length < limit) {
				buttonEl.style.display = 'none';
			}
		} else {
			buttonEl.style.display = 'none';
		}

		hidePreloader(buttonEl);
	}

	init();
}
