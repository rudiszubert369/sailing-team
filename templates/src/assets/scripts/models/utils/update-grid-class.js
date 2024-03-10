/**
 * Updates the class of a given DOM element based on a class pattern. If an existing class matching the pattern is found,
 * it is replaced with the new class. If no matching class is found, the new class is added to the element.
 *
 * @param {HTMLElement} element - The DOM element to update the class on.
 * @param {RegExp} newClassPattern - A regular expression pattern used to find the existing class to be replaced.
 * @param {string} newClass - The new class name to apply to the element.
 */
export function updateGridClass (element, newClassPattern, newClass) {
	const existingClass = Array.from(element.classList).find(cls => newClassPattern.test(cls));
	if (existingClass) {
		element.classList.replace(existingClass, newClass);
	} else {
		element.classList.add(newClass);
	}
}
