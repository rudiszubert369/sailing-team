import markLastElement from 'Models/utils/mark-last-grid-element';
import { breakpoints } from 'Models/breakpoints';
import { updateGridClass } from 'Models/utils/update-grid-class';
import { updateActiveButton } from 'Models/utils/update-active-button';

/**
 * Controls the grid column layout and active button state within a specified element.
 * It initializes the grid layout based on the current screen width, sets up event listeners
 * for window resize and button clicks to adjust the layout and active states dynamically.
 *
 * @param {HTMLElement} element - The root element that contains the grid and toggle buttons.
 */
export default function gridColumnControl (element) {
	let currentView = null; // mobile | desktop

	const elements = {
		buttonContainer: element.querySelector('.js-grid-column-control__button-group'),
		toggleButtons: element.querySelectorAll('.js-grid-column-control__button-group .button'),
		gridContainer: element.querySelector('.team__results__grid'),
	};

	const states = {
		lastElement: 'team__results__grid--last-element',
		gridElementClassPattern: /team__results__grid--\d+/,
	};

	function init () {
		setGridColumn();
		addListeners();
		markLastElement(elements.gridContainer);
	}

	function addListeners () {
		window.addEventListener('resize', setGridColumn);
		elements.toggleButtons.forEach(button => {
			button.addEventListener('click', toggleClickHandler);
		});
	}

	function toggleClickHandler () {
		const clickedButton = this;
		const selectedGridOption = clickedButton.innerText;
		const currentOptionClass = `team__results__grid--${selectedGridOption}`;

		if (!elements.gridContainer.classList.contains(currentOptionClass)) {
			updateGridClass(elements.gridContainer, states.gridElementClassPattern, currentOptionClass);
			updateActiveButton(elements.buttonContainer, clickedButton);
			markLastElement(elements.gridContainer);
		}
	}

	function setGridColumn () {
		const screenWidth = window.innerWidth;
		const newView = screenWidth >= breakpoints['tablet-landscape'] ? 'desktop' : 'mobile';
		const gridClass = determineGridClass(screenWidth);

		if (currentView !== newView) {
			updateGridClass(elements.gridContainer, states.gridElementClassPattern, gridClass);
			const targetButton = findTargetButton(newView);
			if (targetButton) updateActiveButton(elements.buttonContainer, targetButton);

			currentView = newView;
			markLastElement(elements.gridContainer);
		}
	}

	/**
     * Determines the appropriate grid class based on the current screen width.
     * Used initially and on window resize to set the grid layout.
	 *
     * @param {number} screenWidth - The current width of the screen.
     * @returns {string} The class name for the current grid layout.
     */
	function determineGridClass (screenWidth) {
		return screenWidth >= breakpoints['tablet-landscape'] ? 'team__results__grid--5' : 'team__results__grid--2';
	}

	/**
     * Finds the target button based on the new view.
     *
     * @param {string} newView - The current view state ('desktop' or 'mobile').
     * @returns {HTMLElement} The button that matches the current view.
     */
	function findTargetButton (newView) {
		return Array.from(elements.toggleButtons).find(button => button.innerText.trim() === (newView === 'desktop' ? '5' : '2'));
	}

	init();
}
