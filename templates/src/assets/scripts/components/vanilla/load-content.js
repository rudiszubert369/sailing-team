import { call } from 'Models/http-request';
import { showPreloader, hidePreloader } from 'Models/preloader';
import generateAvatars from 'Models/avatar';
import markLastElement from 'Models/utils/mark-last-grid-element';
import { updateActiveButton } from 'Models/utils/update-active-button';

/**
 * This module is responsible for loading and displaying content dynamically based on pagination and filtering criteria.
 * It handles user interactions for loading more content and toggling filters, updating the display accordingly.
 *
 * @module loadContent
 */

/**
 * Constructs a URL for fetching data based on base URL, pagination, and filtering parameters.
 *
 * @param {string} baseUrl - The base URL for the data fetch request.
 * @param {number} currentPage - The current page number for pagination.
 * @param {number} limit - The number of items to fetch per page.
 * @param {string} currentFilter - The current filter criterion (e.g., 'show all', 'trim', 'tactic', 'helmsman').
 * @returns {string} The constructed URL with query parameters for fetching data.
 */
function constructFetchUrl (baseUrl, currentPage, limit, currentFilter) {
	let url = `${baseUrl}?page=${currentPage}&limit=${limit}`;
	if (currentFilter !== 'show all') {
		url += `&duty=${currentFilter}`;
	}
	return url;
}

function updateButtonVisibility (button, shouldBeVisible) {
	button.style.display = shouldBeVisible ? 'inline-block' : 'none';
}

function clearResults (element) {
	element.innerHTML = '';
}

/**
 * Initializes and handles the content loading functionality for a given DOM element. This includes setting up
 * event listeners for pagination and filter buttons, fetching the initial set of data, and updating the UI accordingly.
 *
 * The `baseUrl`, and `authToken` are derived from the `data-url` and `data-token` attributes of the provided element,
 * acting as the endpoint and authorization token for fetching the data.
 *
 * @param {string} baseUrl - The base URL for the data fetch request.
 * @param {number} currentPage - The current page of pagination.
 * @param {number} limit - The limit of items to fetch.
 * @param {string} currentFilter - The currently applied filter.
 * @param {string} authToken - The authentication token to use for the fetch request.
 * @returns {Promise<Object>} A promise that resolves with the fetched data.
 */
const fetchData = async (baseUrl, currentPage, limit, currentFilter, authToken) => {
	const url = constructFetchUrl(baseUrl, currentPage, limit, currentFilter);
	return call(url, 'GET', { Authorization: `Bearer ${authToken}` });
};

/**
 * Initializes and handles the content loading functionality for a given DOM element. This includes setting up
 * event listeners for pagination and filter buttons, fetching the initial set of data, and updating the UI accordingly.
 *
 * @param {HTMLElement} element - The DOM element that serves as the root for the content loading functionality.
 */
export default function loadContent (element) {
	let currentPage = 1;
	let currentFilter = 'show all'; // show-all | trim | tactic | helmsman
	const limit = 5;
	const baseUrl = element.dataset.url || '';
	const authToken = element.dataset.token || '';

	const elements = {
		buttonEl: element.querySelector('.js-load-content__button__load-more'),
		toggleButtons: element.querySelectorAll('.js-load-content__button-group .button'),
		buttonContainer: element.querySelector('.js-load-content__button-group'),
		resultEl: element.querySelector('.js-load-content__result'),
	};

	async function init () {
		await loadAndDisplayData();
		addListeners();
	}

	function addListeners () {
		elements.buttonEl.addEventListener('click', buttonClickHandler);
		elements.toggleButtons.forEach(button => {
			button.addEventListener('click', toggleClickHandler);
		});
	}

	/**
	 * Handles click events on toggle buttons, updating the current filter and reloading content based on the selected filter.
	 */
	async function toggleClickHandler () {
		const buttonCategory = this.innerText.toLowerCase().trim();

		if (buttonCategory !== currentFilter) {
			updateActiveButton(elements.buttonContainer, this);
			clearResults(elements.resultEl);

			currentFilter = buttonCategory;
			currentPage = 1;

			updateButtonVisibility(elements.buttonEl, true);
			loadAndDisplayData();
		}
	}

	/**
	 * Handles click events on the 'load more' button, incrementing the current page and fetching additional content accordingly.
	 */
	async function buttonClickHandler () {
		currentPage++;
		await loadAndDisplayData();
	}

	/**
	 * Fetches and displays content based on the current page, limit, and filter settings. Shows a preloader during the fetch operation
	 * and updates the visibility of the 'load more' button based on whether there is more content available.
	 */
	async function loadAndDisplayData () {
		showPreloader(elements.buttonEl, { color: 'white' });

		try {
			const response = await fetchData(baseUrl, currentPage, limit, currentFilter, authToken);

			if (response.data && response.data.data.length > 0) {
				generateAvatars(response.data.data, elements.resultEl);
				markLastElement(elements.resultEl);
			}

			updateButtonVisibility(elements.buttonEl, response.data.data.length >= limit);
		} catch (error) {
			console.error(error);
			handleError();
		} finally {
			hidePreloader(elements.buttonEl);
		}
	}

	/**
	 * Handles errors that occur during data fetch operations by displaying an error message to the user
	 * and hiding the 'load more' button.
	 */
	function handleError () {
		const errorDiv = document.createElement('div');
		errorDiv.className = 'team__results--error';
		errorDiv.textContent = 'Something went wrong ;( try reloading the page.';

		elements.resultEl.appendChild(errorDiv);
		updateButtonVisibility(elements.buttonEl, false);
	}

	init();
}
