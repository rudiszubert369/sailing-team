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

	const imageEl = generateImage({
		alt: `Crew Member - ${avatar.name}`,
		class: 'crew__avatar__image',
		sources: [{
			src: avatar.image,
			width: 810,
		}],
	});

	avatarElement.appendChild(imageEl);

	const detailsDiv = document.createElement('div');
	detailsDiv.classList.add('avatar__details');
	detailsDiv.setAttribute('data-duty', avatar.duty_slugs.join(', ')); // assuming you want to show combined roles

	const nameH3 = document.createElement('h3');
	nameH3.classList.add('avatar__name');
	nameH3.textContent = avatar.name;
	detailsDiv.appendChild(nameH3);

	const dutiesP = document.createElement('p');
	dutiesP.classList.add('avatar__duties');
	dutiesP.textContent = avatar.duties;
	detailsDiv.appendChild(dutiesP);

	avatarElement.appendChild(detailsDiv);

	containerElement.appendChild(avatarElement);
}

export default function generateAvatars (avatars, containerElement) {
	avatars.forEach(avatar => {
		renderAvatar(avatar, containerElement);
	});
}
