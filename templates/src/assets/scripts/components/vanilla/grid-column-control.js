import markLastElement from 'Models/markLastGridElement';

// on resize niech sie nowy default gridu zmieni na 2//i ten event w gridzie, oraz case otwarcia na mobilu juz

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
		addListeners();
		markLastElement(elements.gridContainer);
	}

	function addListeners () {
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

	init();
}
