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
	const baseUrl = element.dataset.url || '';

	const elements = {
		buttonEl: element.querySelector('.js-load-content__button__load-more'),
		toggleButtons: element.querySelectorAll('.js-load-content__button-group .button'),
		resultEl: element.querySelector('.js-load-content__result'),
	};

	const states = {
		buttonActive: 'button--active',
	};

	async function init () {
		console.log('loadContent init', element);
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

			elements.resultEl.innerHTML = '';

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
		showPreloader(elements.buttonEl, { color: 'white' });
		try {
			const response = await fetchData(baseUrl, currentPage, limit, currentFilter);
			console.log(response);
			if (response.data && response.data.data.length > 0) {
				generateAvatars(response.data.data, elements.resultEl);
				markLastElement(elements.resultEl);
				if (response.data.data.length < limit) {
					elements.buttonEl.style.display = 'none';
				}
			} else {
				elements.buttonEl.style.display = 'none';
			}
		} catch (error) {
			handleError(elements.resultEl);
		} finally {
			hidePreloader(elements.buttonEl);
		}
	}

	function handleError (parentEl) {
		const errorDiv = document.createElement('div');
		errorDiv.className = 'team__results--error';
		errorDiv.textContent = 'Something went wrong ;( try reloading the page.';

		parentEl.appendChild(errorDiv);
		elements.buttonEl.style.display = 'none';
	}

	init();
}
