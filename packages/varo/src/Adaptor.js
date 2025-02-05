import { composeNextState } from '@openfn/language-common';

export function getEmsData() {
  return async state => {
    const results = [];

    console.log('--- Incoming message count', state.data.length);

    for (const message of state.data) {
      if (!message.metadata?.content) {
        console.error('No metadata supplied.');
        continue;
      }

      if (!message.data?.content) {
        console.error('No data supplied.');
        continue;
      }

      const varoMetadata = JSON.parse(message.metadata.content);
      const varoData = JSON.parse(message.data.content);
      const varoDataPath = message.data.filename;

      const result = getResult(varoMetadata, varoData, varoDataPath);

      if (!result) {
        throw new Error(`No result found for ${varoMetadata.name}`);
      }

      results.push(result);
    }

    console.log('--- Converted message count', results.length);

    const nextState = { ...composeNextState(state, results) };

    return nextState;
  };
}

function getResult(varoMetadata, varoData, varoDataPath) {
  const result = {
    CID: null,
    LAT: varoMetadata.location.used.latitude,
    LNG: varoMetadata.location.used.longitude,
    ADOP: varoData.ADOP,
    AMFR: varoData.AMFR,
    AMOD: varoData.AMOD,
    APQS: varoData.APQS,
    ASER: varoData.ASER,
    EDOP: null,
    EMFR: null,
    EMOD: null,
    EPQS: null,
    ESER: null,
    EMSV: null,
    LDOP: varoData.LDOP,
    LMFR: varoData.LMFR,
    LMOD: varoData.LMOD,
    LPQS: varoData.LPQS,
    LSER: varoData.LSER,
    LSV: varoData.LSV,
    records: [],
  };

  const deviceDate = getRelativeDateFromUsbPluggedInfo(varoDataPath);

  for (const item of varoData.records) {
    const durations = [item.RELT]; // ignore RTCW?
    const absoluteDate = getAdjustedDate(deviceDate, durations);
    const abst = isoToAbbreviatedIso(absoluteDate);

    const record = {
      ABST: abst,
      ALRM: null,
      BEMD: null,
      BLOG: item.BLOG,
      CMPR: null,
      DORV: item.DORV,
      HAMB: null,
      HOLD: item.HOLD,
      LERR: item.LERR,
      EERR: null,
      SVA: null,
      TAMB: item.TAMB,
      TVC: item.TVC,
    };

    // TODO: limit the number of records for testing.
    if (result.records.length >= 3) {
      result.records.shift();
    }

    result.records.push(record);
  }

  return result;
}

function getRelativeDateFromUsbPluggedInfo(path) {
  const regex = /_CURRENT_DATA_(?<duration>\w+?)_(?<date>\w+?)\.json$/;
  const match = path.match(regex);

  if (!match) {
    throw new Error(`Path format is incorrect: ${path}`);
  }

  const usbPluggedInfo = {
    date: match.groups.date,
    duration: match.groups.duration,
  };

  const isoDate = abbreviatedIsoToIso(usbPluggedInfo.date);

  // The relative date is: from when the USB drive was plugged in, the date, minus the relative duration.
  return getAdjustedDate(isoDate, [usbPluggedInfo.duration], true);
}

// const results = [];

// attributes.forEach(attribute => {
//   const median = getMedian(json.records, attribute);
//   const { sum, min, max } = getStats(json.records, attribute);
//   const length = json.records.length;
//   const average = sum / length;

//   results.push({ [attribute]: { average, median, min, max } });
// });

// return results;

// function getStats(records, attribute) {
//   let sum = 0;
//   let min = records[0][attribute];
//   let max = records[0][attribute];

//   records.forEach(record => {
//     const value = record[attribute];
//     sum += value;
//     if (value < min) min = value;
//     if (value > max) max = value;
//   });

//   return { sum, min, max };
// }

// function getMedian(records, attribute) {
//   const length = records.length;
//   if (records.length === 0) {
//     return null;
//   }

//   const sortedValues = records
//     .map(record => record[attribute])
//     .sort((a, b) => a - b);

//   if (length % 2 === 0) {
//     return (sortedValues[length / 2 - 1] + sortedValues[length / 2]) / 2;
//   }

//   return sortedValues[Math.floor(length / 2)];
// }

function getAdjustedDate(incomingDate, durations, subtract = false) {
  //console.log(incomingDate, durations);

  // Parse duration in the format PnDTnHnMnS.
  function parseDuration(duration) {
    const regex =
      /^P((?<days>\d+)D)?(T((?<hours>\d+)H)?((?<minutes>\d+)M)?((?<seconds>\d+)S)?)?$/;
    const match = duration.match(regex);

    if (!match) {
      throw new Error(`Invalid duration format: ${duration}`);
    }

    const multiplier = subtract ? -1 : 1;
    const days = parseInt(match.groups.days || 0, 10) * multiplier;
    const hours = parseInt(match.groups.hours || 0, 10) * multiplier;
    const minutes = parseInt(match.groups.minutes || 0, 10) * multiplier;
    const seconds = parseInt(match.groups.seconds || 0, 10) * multiplier;

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return null;
    }

    return { days, hours, minutes, seconds };
  }

  function applyDuration(date, duration) {
    date.setDate(date.getDate() + duration.days);
    date.setHours(date.getHours() + duration.hours);
    date.setMinutes(date.getMinutes() + duration.minutes);
    date.setSeconds(date.getSeconds() + duration.seconds);
  }

  const adjustedDate = new Date(incomingDate);

  for (const duration of durations) {
    if (!duration) continue;

    const parsedDuration = parseDuration(duration);
    if (!parsedDuration) continue;

    applyDuration(adjustedDate, parsedDuration);
  }

  return adjustedDate;
}

function abbreviatedIsoToIso(abbreviatedIso) {
  // Incoming format is abbreviated ISO 8601: 20240913T171251Z
  const regex = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/;
  const match = abbreviatedIso.match(regex);

  if (!match) {
    throw new Error(`Invalid abbreviated ISO date format: ${abbreviatedIso}`);
  }

  // Reformat to ISO 8601: YYYY-MM-DDTHH:MM:SSZ
  return `${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:${match[6]}Z`;
}

function isoToAbbreviatedIso(iso) {
  return iso
    .toISOString()
    .replace(/[\-\:]/g, '')
    .replace('.000Z', 'Z');
}

export {
  alterState,
  combine,
  cursor,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  fn,
  fnIf,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
