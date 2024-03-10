/**
 * Updates the active state of a button, removing the active class from currently
 * active button and adding it to the specified button.
 *
 * @param {HTMLElement} container - The container element within which to find and update active buttons.
 * @param {HTMLElement} newActiveButton - The new button to activate.
 */
export function updateActiveButton (container, newActiveButton) {
	const currentlyActiveButton = container.querySelector('.button--active');
	if (currentlyActiveButton) {
		currentlyActiveButton.classList.remove('button--active');
	}
	newActiveButton.classList.add('button--active');
}
