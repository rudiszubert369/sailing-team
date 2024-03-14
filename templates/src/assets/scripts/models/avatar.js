/**
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
 * Creates an <img> element for the avatar.
 *
 * @param {string} src - The source URL of the image.
 * @param {string} alt - The alt text for the image.
 * @param {string} className - Additional class(es) for the image.
 * @returns {HTMLElement} The created <img> element.
 */
function createImageElement (src, alt, className) {
	const img = document.createElement('img');
	img.src = src;
	img.alt = alt;
	img.className = className;
	img.loading = 'lazy';

	return img;
}

/**
 * Renders an avatar and returns the constructed DOM element.
 *
 * @param {Object} avatar - The avatar data object containing the avatar's properties.
 * @returns {HTMLElement} The constructed avatar element ready to be inserted into the document.
 */
function renderAvatar (avatar) {
	const avatarElement = createDivWithClass('avatar');
	const photoDiv = createDivWithClass('avatar__photo');
	const infoDiv = createDivWithClass('avatar__info');
	const imageEl = createImageElement(avatar.image, `Crew Member - ${avatar.name}`, 'avatar__photo__image');

	photoDiv.appendChild(imageEl);

	infoDiv.appendChild(createNameElement(avatar.name));
	infoDiv.appendChild(createDutiesElement(avatar.duties));

	avatarElement.appendChild(photoDiv);
	avatarElement.appendChild(infoDiv);

	return avatarElement;
}

/**
 * Generates avatars from the provided data array and appends them to the given container.
 * RequestAnimationFrame is used for fade in effect.
 *
 * @param {Array.<Object>} avatars - An array of avatar data objects.
 * @param {HTMLElement} containerElement - The container to which the avatars will be appended.
 */
export default function generateAvatars (avatars, containerElement) {
	const fragment = document.createDocumentFragment();

	avatars.forEach(avatar => {
		const avatarElement = renderAvatar(avatar);
		fragment.appendChild(avatarElement);
	});

	containerElement.appendChild(fragment);

	requestAnimationFrame(() => {
		containerElement.querySelectorAll('.avatar').forEach(element => {
			element.classList.add('avatar--visible');
		});
	});
}
