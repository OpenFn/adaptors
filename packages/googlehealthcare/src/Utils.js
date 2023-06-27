export function buildUrl({
  apiVersion,
  projectId,
  cloudRegion,
  datasetId,
  fhirStoreId,
  resourceType,
}) {
  const setApiVersion = apiVersion ? apiVersion : 'v1';
  const baseUrl = `https://healthcare.googleapis.com/${setApiVersion}`;

  return `${baseUrl}/projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}/fhir/${resourceType}`;
}

export const request = async (url, params = {}, method = 'GET') => {
  const { auth } = params;
  delete params.auth;

  const options = {
    method,
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/fhir+json',
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };

  if (method == 'GET') delete options.body;

  const resolvedUrl =
    method == 'GET' ? `${url}?${new URLSearchParams(params).toString()}` : url;

  const response = await fetch(resolvedUrl, options);
  const data = await response.json();

  handleResponseError(response, data, method);

  return data;
};

export function handleResponseError(response, data, method) {
  const { status, statusText, url } = response;

  if (isEmpty(data)) {
    const responseString = [
      `Message: 0 results returned`,
      `Request: ${method} ${url}`,
      `Status: ${status}`,
    ].join('\n\t∟ ');

    console.log(`Info at ${new Date()}\n${responseString}`);
  }
  if (!response.ok) {
    const errorString = [
      `Message: ${statusText}`,
      `Request: ${method} ${url}`,
      `Status: ${status}`,
      `Body: ${JSON.stringify(data, null, 2).replace(/\n/g, '\n\t  ')}`,
    ].join('\n\t∟ ');
    throw new Error(errorString);
  }
}

export function isEmpty(obj) {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).length === 0;
  }

  return false;
}
