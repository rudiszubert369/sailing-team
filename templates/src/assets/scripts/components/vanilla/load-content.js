import { call } from 'Models/http-request';
import { showPreloader, hidePreloader } from 'Models/preloader';
import generateAvatars from 'Models/avatar';
import markLastElement from 'Models/markLastGridElement';

export const fetchData = async (baseUrl, currentPage, limit, currentFilter) => {
	let url = `${baseUrl}?page=${currentPage}&limit=${limit}`;
	if (currentFilter !== 'show all') {
		url += `&duty=${currentFilter}`;
	}
	return call(url, 'GET', { Authorization: 'Bearer 0123456789' });
};

let currentPage = 1;
let currentFilter = 'show all'; // show-all | trim | tactic | helmsman
const limit = 5;

export function updateButtonVisibility (button, shouldBeVisible) {
	button.style.display = shouldBeVisible ? 'inline-block' : 'none';
}

export function updateActiveButton (currentlyActiveButton, newActiveButton, activeClass) {
	if (currentlyActiveButton) {
		currentlyActiveButton.classList.remove(activeClass);
	}
	newActiveButton.classList.add(activeClass);
}

export function clearResults (element) {
	element.innerHTML = '';
}

export default function loadContent (element) {
	const baseUrl = element.dataset.url || ''; // Default to empty string because optimism

	const elements = {
		buttonEl: element.querySelector('.js-load-content__button--load-more'),
		toggleButtons: element.querySelectorAll('.js-load-data__button-group .button'),
		resultEl: element.querySelector('.js-load-content__result'),
	};

	const states = {
		buttonActive: 'button--active', // When you feel special but you're just a class
	};

	async function init () {
		console.log('loadContent init', element); // Logging, because we care about your console
		await loadAndDisplayData();
		addListeners();
	}

	function addListeners () {
		elements.buttonEl.addEventListener('click', buttonClickHandler);
		elements.toggleButtons.forEach(button => {
			button.addEventListener('click', toggleClickHandler);
		});
	}

	async function toggleClickHandler () {
		const buttonCategory = this.innerText.toLowerCase().trim();
		if (buttonCategory !== currentFilter) {
			const currentlyActiveButton = element.querySelector('.js-load-data__button-group .button--active');
			if (currentlyActiveButton) {
				currentlyActiveButton.classList.toggle(states.buttonActive);
			}
			this.classList.toggle(states.buttonActive);

			elements.resultEl.innerHTML = ''; // Fresh start because we believe in second chances

			currentFilter = buttonCategory;
			currentPage = 1;

			elements.buttonEl.style.display = 'inline-block';

			loadAndDisplayData();
		}
	}

	async function buttonClickHandler () {
		currentPage++;
		await loadAndDisplayData();
	}

	async function loadAndDisplayData () {
		showPreloader(elements.buttonEl, { color: 'white' }); // Fancy loading because we can
		try {
			const response = await fetchData(baseUrl, currentPage, limit, currentFilter);
			console.log(response); // For the curious souls
			if (response.data && response.data.data.length > 0) {
				generateAvatars(response.data.data, elements.resultEl);
				markLastElement(elements.resultEl);

				if (response.data.data.length < limit) {
					elements.buttonEl.style.display = 'none'; // Hide because we're out of stuff
				}
			} else {
				elements.buttonEl.style.display = 'none'; // Hide because we're definitely out of stuff
			}
		} catch (error) {
			console.error('Oops, something went wrong with fetching data:', error);
			elements.buttonEl.style.display = 'none'; // Hide because errors are shy
		} finally {
			hidePreloader(elements.buttonEl); // Because all good things must come to an end
		}
	}

	init();
}
