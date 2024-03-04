export async function call (url, method = 'POST', additionalHeaders = {}, data = false, convertDataToJSON = true) {
	const options = {
		method,
		headers: {
			...additionalHeaders,
		},
	};
	if (method === 'POST' && data !== false) {
		if (convertDataToJSON) {
			options.body = JSON.stringify(data);
			options.headers = {
				'Content-Type': 'application/json',
			};
		} else {
			options.body = data;
		}
	}
	const response = await fetch(url, options);
	const res = await response.json();
	return res;
}
