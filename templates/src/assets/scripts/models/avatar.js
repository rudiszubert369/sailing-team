import generateImage from './image';

/**
 * Creates a div element with a specified class.
 *
 * @param {string} className - The class name to be added to the div.
 * @returns {HTMLElement} The created div element with the class applied.
 */
function createDivWithClass (className) {
	const div = document.createElement('div');
	div.classList.add(className);
	return div;
}

/**
 * Creates an HTML element for displaying an avatar's name.
 *
 * @param {string} name - The name of the avatar.
 * @returns {HTMLElement} The created h5 element with the avatar's name.
 */
function createNameElement (name) {
	const nameElement = document.createElement('h5');
	nameElement.classList.add('avatar__info__name', 'h5');
	nameElement.textContent = name;
	return nameElement;
}

/**
 * Creates an HTML element for displaying an avatar's duties.
 *
 * @param {string} duties - The duties of the avatar.
 * @returns {HTMLElement} The created p element with the avatar's duties.
 */
function createDutiesElement (duties) {
	const dutiesElement = document.createElement('p');
	dutiesElement.classList.add('avatar__info__duties');
	dutiesElement.textContent = duties;
	return dutiesElement;
}

/**
 * Renders an avatar and appends it to the provided container element.
 *
 * @param {Object} avatar - The avatar data object.
 * @param {HTMLElement} containerElement - The container to which the avatar element will be appended.
 */
function renderAvatar (avatar, containerElement) {
	const avatarElement = createDivWithClass('avatar');
	const photoDiv = createDivWithClass('avatar__photo');
	const infoDiv = createDivWithClass('avatar__info');

	const imageEl = generateImage({
		alt: `Crew Member - ${avatar.name}`,
		class: 'avatar__photo__image',
		sources: [{ src: avatar.image, width: 810 }],
	});
	photoDiv.appendChild(imageEl);

	infoDiv.appendChild(createNameElement(avatar.name));
	infoDiv.appendChild(createDutiesElement(avatar.duties));

	avatarElement.appendChild(photoDiv);
	avatarElement.appendChild(infoDiv);

	containerElement.appendChild(avatarElement);
}

/**
 * Generates avatars from the provided data array and appends them to the given container.
 *
 * @param {Array.<Object>} avatars - An array of avatar data objects.
 * @param {HTMLElement} containerElement - The container to which the avatars will be appended.
 */
export default function generateAvatars (avatars, containerElement) {
	avatars.forEach(avatar => {
		renderAvatar(avatar, containerElement);
	});
}
