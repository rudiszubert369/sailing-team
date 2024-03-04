/**
 * Generates an HTML picture element with specified images and attributes.
 *
 * This function dynamically creates a <picture> element containing multiple <source>
 * elements for responsive image sources, and an <img> element as a fallback. It allows
 * for the specification of responsive images through media queries, and sets attributes
 * for lazy loading.
 *
 * @param {Object} data - The data object containing all necessary information to construct the picture element.
 * @param {Array.<Object>} data.responsive_sources - An array of objects for responsive images, each containing `src` and `media` properties.
 * @param {Array.<Object>} data.sources - An array of objects for default image sources, each containing `src` and `width` properties.
 * @param {string} [data.alt] - The alt text for the <img> element.
 * @param {string} [data.class] - Additional class(es) to add to the <img> element.
 * @returns {HTMLElement} The constructed <picture> element with child <source> elements and an <img> element.
 *
 * @example
 * const imageData = {
 *   responsive_sources: [
 *     { src: 'https://example.com/mobile.jpg', media: '(max-width: 600px)' },
 *     { src: 'https://example.com/tablet.jpg', media: '(max-width: 900px)' },
 *   ],
 *   sources: [
 *     { src: 'https://example.com/desktop.jpg', width: 1200 },
 *     { src: 'https://example.com/large-desktop.jpg', width: 1800 },
 *   ],
 *   alt: 'A descriptive alt text',
 *   class: 'custom-class',
 * };
 * const imageElement = generateImage(imageData);
 * document.body.appendChild(imageElement);
 */
export default function generateImage (data) {
	const picture = document.createElement('picture');

	if (data.responsive_sources && data.responsive_sources.length) {
		data.responsive_sources.forEach(source => {
			if (source.src && source.media) {
				const sourceElement = document.createElement('source');
				sourceElement.setAttribute('data-srcset', source.src);
				sourceElement.setAttribute('media', source.media);
				picture.appendChild(sourceElement);
			}
		});
	}

	let imgSrcset = '';
	if (data.sources && data.sources.length) {
		const sourceStrings = data.sources.map(source => `${source.src} ${source.width}w`);
		imgSrcset = sourceStrings.join(', ');
	}

	const img = document.createElement('img');
	img.className = 'lazyload' + (data.class ? ` ${data.class}` : '');
	img.setAttribute('data-sizes', 'auto');
	img.setAttribute('data-srcset', imgSrcset);
	if (data.alt) img.setAttribute('alt', data.alt);

	picture.appendChild(img);

	return picture;
}
