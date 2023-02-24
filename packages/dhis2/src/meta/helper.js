import axios from 'axios';
import { generateUrl } from '../Utils.js';

const createHelper = (configuration = {}) => {
  const { username, password } = configuration;

  const get = url =>
    axios({
      url,
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
      auth: { username, password },
      params: { paging: false },
    });

  // get resource types (static, incomplete)
  const getResourceTypes = async () => {
    return ['trackedEntityInstances', 'programs', 'events', 'dataSets'];
  };

  // get a list of all the org units
  const getOrgUnits = async () => {
    // so. this gives me some stuff, but I don't really know what it is or what to do with it
    const url = generateUrl(configuration, {}, 'organisationUnits');
    const response = await get(url);

    return response.data;
  };

  // Get a list of program ids
  const getPrograms = () => {};

  const getTrackedEntityTypes = async () => {
    const url = generateUrl(configuration, {}, 'trackedEntityTypes');

    const response = await get(url);

    return response.data;
  };

  // get all the attriobutes for a trackedEntityInstanceType
  const getAttributes = async () => {
    const url = generateUrl(configuration, {}, 'attributes');

    const response = await get(url);

    return response.data;
  };

  return {
    getResourceTypes,
    getOrgUnits,
    getTrackedEntityTypes,
    getAttributes,
  };
};

export default createHelper;
