import { removeNullProps } from './Utils';

export function parseVaroEmsToReport(metadata, data, rtcwMaps) {
  const report = {
    CID: null,
    LAT: metadata.location.used.latitude,
    LNG: metadata.location.used.longitude,
    ADOP: data.ADOP,
    AMFR: data.AMFR,
    AMOD: data.AMOD,
    APQS: data.APQS,
    ASER: data.ASER,
    EDOP: null,
    EMFR: null,
    EMOD: null,
    EPQS: null,
    ESER: null,
    EMSV: null,
    LDOP: data.LDOP,
    LMFR: data.LMFR,
    LMOD: data.LMOD,
    LPQS: data.LPQS,
    LSER: data.LSER,
    LSV: data.LSV,
    records: [],
  };

  removeNullProps(report);

  for (const item of data.records) {
    // For this record, verify the RTCW timeline has been identified.
    const deviceDate = rtcwMaps.get(item.RTCW);
    if (!deviceDate) {
      report.zHasUnreconciledRtcw = true;
      continue;
    }

    const absoluteDate = applyDurationToDate(deviceDate, item.RELT);
    const abst = parseIsoToAbbreviatedIso(absoluteDate);

    const record = {
      ABST: abst, // absolute time utc
      ALRM: null, // presence of defined alarm conditions
      BEMD: null, // emd - estimated number of days of battery life remaining
      BLOG: item.BLOG, // logger - estimated number of days of battery life remaining
      CMPR: null, // compressor operation seconds per 15 minutes
      DORV: item.DORV, // vaccine compartment open seconds per 15 minutes
      HAMB: null, // relative humidity
      HOLD: item.HOLD, // days the vaccine department will stay cold if power disconnected
      LERR: item.LERR, // logger errors
      EERR: null, // emd errors
      SVA: null, // good voltage in seconds per 15 minutes
      TAMB: item.TAMB, // ambient temperature
      TVC: item.TVC, // vaccine chamber temperature
    };

    removeNullProps(record);

    report.records.push(record);
  }

  return report;
}

export function applyDurationToDate(incomingDate, duration, subtract = false) {
  const date = normalizeIncomingDate(incomingDate);
  const parsedDuration = parseDuration(duration, subtract);
  if (!parsedDuration) return date;

  date.setUTCDate(date.getUTCDate() + parsedDuration.days);
  date.setUTCHours(date.getUTCHours() + parsedDuration.hours);
  date.setUTCMinutes(date.getUTCMinutes() + parsedDuration.minutes);
  date.setUTCSeconds(date.getUTCSeconds() + parsedDuration.seconds);

  return date;
}

function parseDuration(duration, subtract) {
  const regex =
    /^P(?:(?<days>\d+)D)?(?:T(?:(?<hours>\d+)H)?(?:(?<minutes>\d+)M)?(?:(?<seconds>\d+)S)?)?$/;
  const match = duration.match(regex);
  if (!match) throw new Error(`Invalid duration format: ${duration}`);

  const m = subtract ? -1 : 1;
  const days = +(match.groups.days || 0) * m;
  const hours = +(match.groups.hours || 0) * m;
  const minutes = +(match.groups.minutes || 0) * m;
  const seconds = +(match.groups.seconds || 0) * m;

  return days || hours || minutes || seconds
    ? { days, hours, minutes, seconds }
    : null;
}

function normalizeIncomingDate(incomingDate) {
  let date = incomingDate;

  // If it's an abbreviated ISO string, convert to regular ISO string.
  if (typeof date === 'string' && /^\d{8}T\d{6}Z$/.test(date)) {
    date = parseAbbreviatedIsoToIso(date);
  }

  // Always return a new Date object (clones existing Date if already a Date).
  return new Date(date);
}

function parseAbbreviatedIsoToIso(abbrIso) {
  const m = abbrIso.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/);
  if (!m) throw new Error(`Invalid abbreviated ISO date format: ${abbrIso}`);
  return `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}Z`;
}

function parseIsoToAbbreviatedIso(iso) {
  return iso
    .toISOString()
    .replace(/[\-\:]/g, '')
    .replace('.000Z', 'Z');
}

export function buildDeviceRtcwDateMaps(contents) {
  const dataContents = contents.filter(c => c.data);
  const deviceRtcwDateMaps = new Map();

  for (const content of dataContents) {
    // Extract core device info and final RTCW from this data file.
    const { deviceId, deviceDate, finalRtcw } = extractDeviceData(content);

    // Maintain a mapping of final RTCW to absolute device date.
    let rtcwDateMap = deviceRtcwDateMaps.get(deviceId);
    if (!rtcwDateMap) {
      rtcwDateMap = new Map();
      deviceRtcwDateMaps.set(deviceId, rtcwDateMap);
    }

    const existingDate = rtcwDateMap.get(finalRtcw);
    if (!existingDate || deviceDate < existingDate) {
      rtcwDateMap.set(finalRtcw, deviceDate);
    }
  }

  return deviceRtcwDateMaps;
}

export function extractDeviceData(content) {
  const regex =
    /^([a-zA-Z0-9]+)_(?:.+)_([A-Z0-9]{4,15})_([0-9]{8}T[0-9]{6}Z)\.json$/;

  // Parse filename for device ID, relative time, and USB plug-in date.
  const [, deviceId, deviceRelt, abbrUsbDate] =
    content.data.filename.match(regex);

  // Calculate the deviceDate: [usb mount time] - [device duration] = absolute time device was turned on.
  const deviceDate = applyDurationToDate(abbrUsbDate, deviceRelt, true);

  if (typeof content.data.content === 'string') {
    try {
      content.data.content = JSON.parse(content.data.content);
    } catch (e) {
      console.error('Invalid JSON string in content.data.content:', e);
    }
  }

  // Store device ID for later reference.
  content.zDeviceId = deviceId;

  // Extract final RTCW from the data set.
  const data = content.data.content;
  const finalRtcw = data.records[data.records.length - 1].RTCW;

  return { deviceId, deviceDate, finalRtcw };
}
