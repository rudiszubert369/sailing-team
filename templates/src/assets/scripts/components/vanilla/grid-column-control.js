import markLastElement from 'Models/markLastGridElement';
import { breakpoints } from 'Models/breakpoints';

let currentView = null; // mobile | desktop

export default function gridColumnControl (element) {
	const elements = {
		toggleButtons: element.querySelectorAll('.js-grid-column-control__button-group .button'),
		gridContainer: element.querySelector('.team__results__grid'),
	};

	const states = {
		buttonActive: 'button--active',
		lastElement: 'team__results__grid--last-element',
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
			updateGridClass(currentOptionClass);
			updateActiveButton(clickedButton);
			markLastElement(elements.gridContainer);
		}
	}

	function updateGridClass (newClass) {
		const classPattern = /team__results__grid--\d+/;
		const currentClasses = elements.gridContainer.className.split(' ');
		const newClasses = currentClasses.map(cls => cls.match(classPattern) ? newClass : cls).filter(cls => cls !== undefined);

		if (!newClasses.includes(newClass)) {
			newClasses.push(newClass);
		}

		elements.gridContainer.className = newClasses.join(' ');
	}

	function updateActiveButton (newActiveButton) {
		const currentlyActiveButton = element.querySelector('.js-grid-column-control__button-group .button--active');
		if (currentlyActiveButton) {
			currentlyActiveButton.classList.remove(states.buttonActive);
		}

		newActiveButton.classList.add(states.buttonActive);
	}

	function setGridColumn () {
		const screenWidth = window.innerWidth;
		const tabletLandscapeWidth = breakpoints['tablet-landscape'];
		const newView = screenWidth >= tabletLandscapeWidth ? 'desktop' : 'mobile';

		let gridClass = 'team__results__grid--2';

		if (newView === 'desktop') {
			gridClass = 'team__results__grid--5';
		}

		if (currentView !== newView) {
			console.log(`View changed from ${currentView} to ${newView}`);
			updateGridClass(gridClass);

			const targetButton = Array.from(elements.toggleButtons).find(button => button.innerText === (newView === 'desktop' ? '5' : '2'));
			if (targetButton) {
				updateActiveButton(targetButton);
			}

			currentView = newView;

			markLastElement(elements.gridContainer);
		}
	}

	init();
}
