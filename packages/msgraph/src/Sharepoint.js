import { expandReferences } from '@openfn/language-common/util';

import { request, setAuth, getUrl, handleResponse } from './Utils';

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
    const url = getUrl(resolvePath, apiVersion);

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

    const url = getUrl(resolvePath, apiVersion);

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

    const url = getUrl(resolvePath, apiVersion);

    const auth = setAuth(accessToken);

    return request(url, { ...resolveOptions, ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

// Gets a drive reference and writes to state.drives.default
// @param specifier: specify the drive to get. default 'me'.
//         If an id/owner pair, will return the default drive for the specified owner
// @param name: optional name for the drive. Will be written to state.drives[name].
getDrive(specifier, name, callback);

getDrive({}, 'joe'); // get my drive and name it joe
getDrive('me', 'joe'); // get my drive and name it joe
getDrive({ id: 'driveId' }, 'joe'); // Get a drive by Id
getDrive({ id: '<siteId>', owner: 'sites' }, 'joe'); // get default drive for a site
getDrive({ id: '<userId>', owner: 'users' }); // get default drive for a user

// loose spec for getFile/writeFiles
const options = {
  driveName: 'string', // drive of the file to use (optional)
  metadata: false, // return metadata, not content
  $filter: 'string', // filter on the query. Needs to be URI encoded
};

// return an array of folder contents
// We should safely URI encode the path
// Path must start with /, else will be treated as an id
// writes to state.data
// uses default drive
getFolder(pathOrId, { options }, (callback = s => s));

// return a single file's content (pass { metadata: true } to get metadata only)
// return an array of folder contents
// We should safely URI encode the path
// Path must start with /, else will be treated as an id
// writes to state.data
// uses default drive
getFile(pathOrId, { options }, (callback = s => s));

// writes one or more files to the path provided
writeFiles(pathOrId, { options }, data, (callback = s => s));

// examples

each(
  'state.data',
  getFile('/BC Actuals Export/bc_actuals_export_11072023.csv')
);

each('state.data', getFile(`/BC Actuals Export/${state.data.name}`));
each('state.data', getFile(state.data.id));

// Path must internally be encoded like this
// path: ".../root:/<content%20path>:/content", // path of content to get

// Job code
// getDrive('openfnorg.sharepoint.com');

// getFolder('/BC Actuals Export', {
//   $filter: "file/mimeType eq 'application/vnd.ms-excel'",
// });

// each(
//   '$.data',
//   getFile(() => state.data.id),
//   {},
//   state => {
//     state.groupOfActuals.push(state.data);

//     return {
//       ...state,
//       references: [],
//       data: {},
//       response: {},
//     };
//   }
// );
