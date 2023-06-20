// export function listSites() {
//   return state => {
//     const { accessToken, apiVersion } = state.configuration;
//     // TODO: paste in the code snippet for listing sharepoint sites
//   };
// }

// export function listDrives(siteId) {
//   return state => {
//     const { accessToken, apiVersion } = state.configuration;
//     // TODO: paste in the code snippet for listing sharepoint drives
//   };
// }

// export function listLists(siteId) {
//   return state => {
//     const { accessToken, apiVersion } = state.configuration;
//     // TODO: paste in the code snippet for listing sharepoint lists
//   };
// }

// export function listItems({ siteId, driveId, listId }) {
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
