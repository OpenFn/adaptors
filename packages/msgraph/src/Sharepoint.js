import { expandReferences } from '@openfn/language-common/util';

import { request, setAuth, setUrl, handleResponse } from './Utils';

/**
 * Get a SharePoint site using msgraph API
 * @public
 * @example <caption>Access the root SharePoint site within a tenant.</caption>
 * getSites()
 * @example <caption>Access a SharePoint site using the siteId.</caption>
 * getSites("openfn.sharepoint.com")
 * @function
 * @param {string} sharepointSite -A SharePoint siteId
 * @param {function} [callback = state => state] - An optional callback function
 * @return {Operation}
 */
export function getSites(sharepointSite, callback = s => s) {
  return state => {
    const { accessToken, apiVersion } = state.configuration;
    const [resolvedRootSite] = expandReferences(state, sharepointSite);

    const resolvePath = resolvedRootSite
      ? `sites/${resolvedRootSite}`
      : 'sites/root';
    const url = setUrl({ apiVersion, resolvePath });

    const auth = setAuth(accessToken);

    return request(url, { ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

/**
 * Get a SharePoint site lists using msgraph API
 * @public
 * @example <caption>Get a collection of lists for a site.</caption>
 * getLists({siteId: "openfn.sharepoint.com"})
 * @example <caption>Returns metadata for a list using list ID.</caption>
 * getLists({siteId: "openfn.sharepoint.com", listId: "someId"})
 * @example <caption>Returns metadata for a list using list title.</caption>
 * getLists({siteId: "openfn.sharepoint.com", listId: "test folder"})
 * @function
 * @param {object} [resource={ siteId: '', listId: '' }] - A resource object containing resource ids
 * @param {function} [callback = state => state] - An optional callback function
 * @return {Operation}
 */
export function getLists(
  resource = { siteId: '', listId: '' },
  callback = s => s
) {
  return state => {
    const { accessToken, apiVersion } = state.configuration;
    const [resolveResource] = expandReferences(state, resource);

    const { siteId, listId } = resolveResource;

    if (!siteId) throw new Error('You must provide a siteId');

    const resolvePath = listId
      ? `sites/${siteId}/lists/${listId}`
      : `sites/${siteId}/lists`;

    const url = setUrl({ apiVersion, resolvePath });

    const auth = setAuth(accessToken);
    return request(url, { ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

export function getItems(
  resource = { siteId: '', listId: '', itemId: '' },
  options = {},
  callback = s => s
) {
  return state => {
    const { accessToken, apiVersion } = state.configuration;
    const [resolveResource, resolveOptions] = expandReferences(
      state,
      resource,
      options
    );

    const { siteId, listId, itemId } = resolveResource;

    if (!siteId || !listId)
      throw new Error('You must provide both siteId and listId');

    const resolvePath = itemId
      ? `sites/${siteId}/lists/${listId}/items/${itemId}`
      : `sites/${siteId}/lists/${listId}/items`;

    const url = setUrl({ apiVersion, resolvePath });

    const auth = setAuth(accessToken);

    return request(url, { ...resolveOptions, ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
  };
}
