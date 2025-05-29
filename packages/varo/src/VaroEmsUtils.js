export function parseVaroEmsToReport(metadata, data, dataPath) {
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

  const deviceDate = parseRelativeDateFromUsbPluggedInfo(dataPath);

  for (const item of data.records) {
    const durations = [item.RELT]; // ignore RTCW?
    const absoluteDate = parseAdjustedDate(deviceDate, durations);
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

    report.records.push(record);
  }

  return report;
}

function parseRelativeDateFromUsbPluggedInfo(path) {
  const regex = /_CURRENT_DATA_(?<duration>\w+?)_(?<date>\w+?)\.json$/;
  const match = path.match(regex);

  if (!match) {
    throw new Error(`Path format is incorrect: ${path}`);
  }

  const usbPluggedInfo = {
    date: match.groups.date,
    duration: match.groups.duration,
  };

  const isoDate = parseAbbreviatedIsoToIso(usbPluggedInfo.date);

  // The relative date is: from when the USB drive was plugged in, the date, minus the relative duration.
  return parseAdjustedDate(isoDate, [usbPluggedInfo.duration], true);
}

function parseAdjustedDate(incomingDate, durations, subtract = false) {
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

function parseAbbreviatedIsoToIso(abbreviatedIso) {
  // Incoming format is abbreviated ISO 8601: 20240913T171251Z
  const regex = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/;
  const match = abbreviatedIso.match(regex);

  if (!match) {
    throw new Error(`Invalid abbreviated ISO date format: ${abbreviatedIso}`);
  }

  // Reformat to ISO 8601: YYYY-MM-DDTHH:MM:SSZ
  return `${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:${match[6]}Z`;
}

function parseIsoToAbbreviatedIso(iso) {
  return iso
    .toISOString()
    .replace(/[\-\:]/g, '')
    .replace('.000Z', 'Z');
}
