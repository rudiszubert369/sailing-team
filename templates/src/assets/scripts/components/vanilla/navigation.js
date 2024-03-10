import { lockPage, unlockPage } from 'Models/locker';

export default element => {
	const elements = {
		mobileToggle: element.querySelector('.js-navigation__mobile-toggle'),
	};

	const states = {
		mobileNavOpen: 'is-mobile-navigation-open',
	};

	function init () {
		addListeners();
	}

	function addListeners () {
		elements.mobileToggle.addEventListener('click', mobileToggleClickHandler);
		window.addEventListener('scroll', scrollHandler);
	}

	function scrollHandler () {
		if (window.scrollY > 20) {
			element.classList.add('navigation--blur');
		} else {
			element.classList.remove('navigation--blur');
		}
	}

	function mobileToggleClickHandler () {
		element.classList.toggle(states.mobileNavOpen);

		if (element.classList.contains(states.mobileNavOpen)) {
			lockPage();
		} else {
			unlockPage();
		}
	}

	init();
};
