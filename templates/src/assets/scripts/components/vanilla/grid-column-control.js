const currentOption = 2; // 2 | 5 | 6

export default function gridColumnControl (element) {
	console.log('dziala');
	const toggleButtons = element.querySelectorAll('.js-grid-column-control .button');

	function init () {
		addListeners();
	}

	function addListeners () {
		toggleButtons.forEach(button => {
			button.addEventListener('click', toggleClickHandler);
		});
	}

	function toggleClickHandler () {
		const clickedButton = this;
		const selectedGridOption = clickedButton.innerText.toLowerCase().trim();
		console.log(selectedGridOption);
		if (selectedGridOption !== currentOption) { // TODO export some things ?
			const currentlyActiveButton = element.querySelector('.js-grid-column-control .button--active');
			console.log(currentlyActiveButton);
			if (currentlyActiveButton) {
				currentlyActiveButton.classList.remove('button--active');
			}

			clickedButton.classList.add('button--active');
		}
		// TODO stworzyć w avatar.js zmiane klasy gridu, ale najpierw zrobic fajny grid z 5 elementami na linii
		// TODO bug image ze sie jakos dziwnie skaluje przy
	}

	init();
}
