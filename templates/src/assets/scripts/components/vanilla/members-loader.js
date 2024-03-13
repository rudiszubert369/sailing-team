import { call } from 'Models/http-request';
import { showPreloader, hidePreloader } from 'Models/preloader';
import generateAvatars from 'Models/avatar';
import markLastElement from 'Models/utils/mark-last-grid-element';
import { updateActiveButton } from 'Models/utils/update-active-button';

/**
 * This module is responsible for loading and displaying content dynamically based on pagination and filtering criteria.
 * It handles user interactions for loading more content and toggling filters.
 *
 * @module membersLoader
 */

/**
 * Constructs a URL for fetching data based on base URL, pagination, and filtering parameters.
 *
 * @param {string} baseUrl
 * @param {number} currentPage
 * @param {number} limit - The number of items to fetch per page.
 * @param {string} currentFilter - The current filter criterion ('show all' | 'trim' | 'tactic'| 'helmsman').
 * @returns {string} The constructed URL with query parameters for fetching data.
 */
function constructFetchUrl (baseUrl, currentPage, limit, currentFilter) {
	const filter = currentFilter !== 'show all' ? `&duty=${currentFilter}` : '';

	return `${baseUrl}?page=${currentPage}&limit=${limit}${filter}`;
}

function updateButtonVisibility (button, shouldBeVisible) {
	button.style.display = shouldBeVisible ? 'inline-block' : 'none';
}

function clearResults (element) {
	element.innerHTML = '';
}

/**
 * @param {string} baseUrl
 * @param {number} currentPage
 * @param {number} limit - The limit of items to fetch.
 * @param {string} currentFilter - The currently applied filter.
 * @param {string} authToken
 * @returns {Promise<Object>}
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
export default function membersLoader (element) {
	const limit = 5;
	const baseUrl = element.dataset.url || '';
	const authToken = element.dataset.token || '';

	const state = {
		currentPage: 1,
		currentFilter: 'show all', // show-all | trim | tactic | helmsman
	};

	const elements = {
		buttonEl: element.querySelector('.js-members-loader__button__load-more'),
		toggleButtons: element.querySelectorAll('.js-members-loader__button-group .button'),
		buttonContainer: element.querySelector('.js-members-loader__button-group'),
		resultEl: element.querySelector('.js-members-loader__result'),
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

		if (buttonCategory !== state.currentFilter) {
			updateActiveButton(elements.buttonContainer, this);
			clearResults(elements.resultEl);

			state.currentFilter = buttonCategory;
			state.currentPage = 1;

			updateButtonVisibility(elements.buttonEl, true);
			loadAndDisplayData();
		}
	}

	/**
	 * Handles click events on the 'load more' button, incrementing the current page and fetching additional content accordingly.
	 */
	async function buttonClickHandler () {
		state.currentPage++;
		await loadAndDisplayData();
	}

	/**
	 * Fetches and displays content based on the current page, limit, and filter settings. Shows a preloader during the fetch operation
	 * and updates the visibility of the 'load more' button based on whether there is more content available.
	 */
	async function loadAndDisplayData () {
		showPreloader(elements.buttonEl, { color: 'color-primary' });

		try {
			const response = await fetchData(baseUrl, state.currentPage, limit, state.currentFilter, authToken);

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
