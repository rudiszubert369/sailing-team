import generateImage from './image';

/**
 * Generates an HTML picture element with specified images and attributes.
 *
 * This function dynamically creates a <picture> element containing an <img> element as a fallback.
 * It allows for the specification of a single image source or multiple responsive image sources
 * through media queries. It sets attributes for lazy loading and supports adding custom classes.
 *
 * @param {Object} data - The data object containing all necessary information to construct the picture element.
 * @param {Array.<{src: string, media?: string, width?: number}>} data.sources - An array of objects for image sources.
 * Each object can contain `src`, `width`, and optionally `media` properties. If `media` is provided, it will treat the source as responsive.
 * @param {string} [data.alt] - The alt text for the <img> element.
 * @param {string} [data.class] - Additional class(es) to add to the <img> element.
 * @returns {HTMLElement} The constructed <picture> element with child <source> elements (if responsive sources are provided) and an <img> element.
 *
 * @example
 * const imageEl = generateImage({
 *   alt: `Crew Member - ${avatar.name}`,
 *   class: 'crew__avatar__image',
 *   sources: [{
 *     src: avatar.image,
 *     width: 810,
 *   }],
 * });
 * document.body.appendChild(imageEl); // Append the generated <picture> element to the desired container
 */
function renderAvatar (avatar, containerElement) {
	const avatarElement = document.createElement('div');
	avatarElement.classList.add('avatar');

	const photoDiv = document.createElement('div');
	photoDiv.classList.add('avatar__photo');

	const imageEl = generateImage({
		alt: `Crew Member - ${avatar.name}`,
		class: 'avatar__photo__image',
		sources: [{
			src: avatar.image,
			width: 810,
		}],
	});

	photoDiv.appendChild(imageEl);
	avatarElement.appendChild(photoDiv);

	const infoDiv = document.createElement('div');
	infoDiv.classList.add('avatar__info');

	const nameH3 = document.createElement('h5');
	nameH3.classList.add('avatar__info__name', 'h5');
	nameH3.textContent = avatar.name;
	infoDiv.appendChild(nameH3);

	const dutiesP = document.createElement('p');
	dutiesP.classList.add('avatar__info__duties');
	dutiesP.textContent = avatar.duties;
	infoDiv.appendChild(dutiesP);

	avatarElement.appendChild(infoDiv);

	containerElement.appendChild(avatarElement);
}

export default function generateAvatars (avatars, containerElement) {
	avatars.forEach(avatar => {
		renderAvatar(avatar, containerElement);
	});
}
