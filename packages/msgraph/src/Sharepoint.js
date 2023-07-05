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

/**
 * Get sharePoint site items using msgraph API
 * @public
 * @example <caption>Get the collection of items in a list for a site.</caption>
 * getItems({siteId: "openfn.sharepoint.com", listId: "Documents"})
 * @example <caption>Returns the metadata for an item with downloadUrl</caption>
 * getItems({siteId: "openfn.sharepoint.com", listId: "Documents", itemId: "d97073d1-5ee7-4218-97cd-bd4167078516"})
 * @example <caption>Returns an item content.</caption>
 * getItems({siteId: "openfn.sharepoint.com", listId: "Documents", itemId: "d97073d1-5ee7-4218-97cd-bd4167078516"}, itemContent: true)
 * @function
 * @param {object} [resource={ siteId: '', listId: '', itemId: '', itemContent: false }] - An object containing resource ids
 * @param {object} [options= { select: 'id,@microsoft.graph.downloadUrl' }] - An object containing options parameters
 * @param {function} [callback = state => state] - An optional callback function
 * @return {Operation}
 */
export function getItems(
  resource = { siteId: '', listId: '', itemId: '', itemContent: false },
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

    const { siteId, listId, itemId, itemContent } = resolveResource;
    const content = itemContent ? '/content' : '';

    if (!siteId || !listId)
      throw new Error('You must provide both siteId and listId');

    const resolvePath = itemId
      ? `sites/${siteId}/drive/items/${itemId}${content}`
      : `sites/${siteId}/lists/${listId}/items`;

    const url = setUrl({ apiVersion, resolvePath });

    const auth = setAuth(accessToken);

    return request(url, { ...resolveOptions, ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
  };
}
