/**
 * Applies or removes the 'last-element' class on children of a specified grid container. The function
 * calculates the position based on the number of columns. It removes the 'last-element' class from all children
 * before re-applying it to every nth child, where n is the number of columns.
 *
 * @param {Element} gridContainer - The DOM element of the grid container whose children are to be modified.
 * Assumes the presence of an element with the class '.js-grid-column-control__button-group .button--active'
 * to determine the active number of columns in the grid. The inner text of this element should represent
 * the number of columns (selectedGridOption) as an integer.
 *
 * Usage:
 * Assuming you have a grid container element and an active button indicating the number of columns,
 * you can call this function to dynamically adjust which child elements receive the 'last-element' class
 * based on the currently active grid layout.
 */
export default function markLastElement (gridContainer) {
	const currentlyActiveButton = document.querySelector('.js-grid-column-control__button-group .button--active');

	const selectedGridOption = parseInt(currentlyActiveButton.innerText.trim(), 10);

	gridContainer.querySelectorAll('.last-element').forEach((element) => {
		element.classList.remove('last-element');
	});

	Array.from(gridContainer.children).forEach((child, index) => {
		if ((index + 1) % selectedGridOption === 0) {
			child.classList.add('last-element');
		}
	});
}
