import {
  execute as commonExecute,
  composeNextState,
  expandReferences,
  http,
} from '@openfn/language-common';

// Map stuff to other stuff
function map() {}

// HTTP GET wrapper
function get() {}

/**
 * Get today's weather, wherever you are!!
 * @param {*} latitude
 * @param {*} longitude
 * @returns
 */
export function getTodaysWeather(latitude = 25.52, longitude = 13.41) {
  // TODO expandReferences()
  return state => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;

    return (
      fetch(url, {
        headers: {
          Authorization: `${state.configuration.username}:${state.configuration.password}`,
        },
      })
        .then(response => response.json())
        // TODO composeNextState()
        .then(data => ({ ...state, data }))
      // .then(data => {
      //   const newState = { ...state }; // clone(state)
      //   newState.data = data;
      //   return newState;
      // })
    );
  };
}

// What functions do you want from the common adaptor?
export {
  alterState,
  dataPath,
  dataValue,
  dateFns,
  each,
  field,
  fields,
  fn,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
