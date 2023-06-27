import { expandReferences } from '@openfn/language-common';
import { request, setAuth, setUrl, handleResponse } from './Utils';

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

export function getDrives(siteId, driveId, callback = s => s) {
  return state => {
    const { accessToken, apiVersion } = state.configuration;
    const [resolvedSiteId, resolvedDriveId] = expandReferences(
      state,
      siteId,
      driveId
    );

    const siteDrivePath = resolvedSiteId
      ? `sites/${resolvedSiteId}/drives`
      : 'me/drives';

    const resolvePath = resolvedDriveId
      ? `${siteDrivePath}/${resolvedDriveId}`
      : siteDrivePath;

    const url = setUrl({ apiVersion, resolvePath });
    const auth = setAuth(accessToken);

    return request(url, { ...auth }).then(response =>
      handleResponse(response, state, callback)
    );
  };
}

// export function getLists({ siteId, driveId, listId }, callback = s => s) {
//   return state => {
//     const { accessToken, apiVersion } = state.configuration;

//     return request(url, { ...auth }).then(response =>
//       handleResponse(response, state, callback)
//     );
//   };
// }

// export function getItems({ siteId, driveId, listId }) {
//   return state => {
//     const { accessToken, apiVersion } = state.configuration;
//     // TODO: paste in the code snippet for listing sharepoint items
//     if (driveId) {
//       // return /sites/siteId/drives/driveId/items
//     }

//     if (listId) {
//       // return /sites/siteId/lists/listId/items
//     }

//     throw 'You must provide either a siteId or a driveId to list items';
//   };
// }

// sharepoint.listItems({siteId: blah, driveId: blah})

// Alterantaive style to consider after the above is working.
// export const list = {
//   items: params => {
//     return state => {};
//   },
//   drive: () => {},
// };
