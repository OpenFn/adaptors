import { composeNextState } from '@openfn/language-common';

export function getEmsData() {
  return async state => {
    const results = [];

    console.log('--- Incoming message count', state.data.length);

    for (const message of state.data) {
      if (message.fridgeTag) {
        if (!message.metadata?.content) {
          console.error('No metadata supplied.');
          continue;
        }

        if (!message.fridgeTag?.content) {
          console.error('No fridgetag supplied.');
          continue;
        }

        const metadata = JSON.parse(message.metadata.content);
        const fridgeTagNodes = parseFridgeTag(message.fridgeTag.content);

        const result = parseFridgeTagToEms(metadata, fridgeTagNodes);
        results.push(result);
        continue;
      }

      if (message.data) {
        if (!message.metadata?.content) {
          console.error('No metadata supplied.');
          continue;
        }

        if (!message.data?.content) {
          console.error('No data supplied.');
          continue;
        }

        const metadata = JSON.parse(message.metadata.content);
        const data = JSON.parse(message.data.content);
        const dataPath = message.data.filename;

        const result = parseVaroEmsToEms(metadata, data, dataPath);
        results.push(result);
        continue;
      }

      throw new Error(
        `Insufficient content found for MessageID: ${message.messageId}`
      );
    }

    console.log('--- Converted message count', results.length);

    const nextState = { ...composeNextState(state, results) };

    return nextState;
  };
}

function parseVaroEmsToEms(metadata, data, dataPath) {
  const result = {
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

  const deviceDate = getRelativeDateFromUsbPluggedInfo(dataPath);

  for (const item of data.records) {
    const durations = [item.RELT]; // ignore RTCW?
    const absoluteDate = getAdjustedDate(deviceDate, durations);
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

  const isoDate = parseAbbreviatedIsoToIso(usbPluggedInfo.date);

  // The relative date is: from when the USB drive was plugged in, the date, minus the relative duration.
  return getAdjustedDate(isoDate, [usbPluggedInfo.duration], true);
}

function getAdjustedDate(incomingDate, durations, subtract = false) {
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

function parseFridgeTagToEms(metadata, nodes) {
  const result = {
    records: [],
    reports: [],
  };

  applyMetadataToResult();
  applyNodesToResult();

  function applyMetadataToResult() {
    applyPropertyToResult('AMFR', metadata.refrigerator?.deviceManufacturer);
    applyPropertyToResult('ASER', metadata.refrigerator?.deviceId);
    applyPropertyToResult('AMOD', metadata.refrigerator?.model);

    applyPropertyToResult('LAT', metadata.location?.used?.latitude);
    applyPropertyToResult('LNG', metadata.location?.used?.longitude);
    applyPropertyToResult('LACC', metadata.location?.used?.accuracy);

    applyPropertyToResult('LSV', metadata.appInfo?.version);
    applyPropertyToResult('LMFR', metadata.appInfo?.os);
    applyPropertyToResult('LMOD', metadata.appInfo?.phoneModel);
  }

  function applyNodesToResult() {
    applyPropertyToResult('AID', nodes['Conf']['CID']);

    let dayIndex = 1;
    let dayNode;
    while ((dayNode = nodes['Hist'][dayIndex++]) !== undefined) {
      applyDayToRecords(dayNode);
      applyDayToReports(dayNode);
    }
  }

  function applyPropertyToResult(property, text) {
    if (!text) return;
    result[property] = text;
  }

  function applyDayToRecords(dayNode) {
    applyNodeToRecords(dayNode, 'TS Min T', 'Min T', '0', 'FRZE');
    applyNodeToRecords(dayNode, 'TS Max T', 'Max T', '1', 'HEAT');

    function applyNodeToRecords(
      dayNode,
      timeField,
      tempField,
      alarmField,
      alarmDescription
    ) {
      const date = dayNode['Date'];
      const time = dayNode[timeField];
      const dateTime = new Date(`${date}T${time}:00Z`);
      const temp = parseFloat(dayNode[tempField]);
      const alarm = parseAlarm(dayNode['Alarm'][alarmField], alarmDescription);

      result.records.push({
        ABST: dateTime,
        TVC: temp,
        ALRM: alarm,
        description: date + ' ' + tempField,
      });

      function parseAlarm(alarmNode, description) {
        if (alarmNode['t Acc'] === '0') return null;
        return description + (alarmNode['C A'] !== '0' ? 'ACK' : '');
      }
    }
  }

  function applyDayToReports(dayNode) {
    const report = {
      date: new Date(dayNode['Date']),
      duration: '1D',
      alarms: [],
      aggregates: [],
    };

    applyAlarmsToReport(dayNode);
    applyAggregatesToReport(dayNode);

    result.reports.push(report);

    function applyAlarmsToReport(dayNode) {
      const date = dayNode['Date'];

      applyAlarmToAlarms(dayNode['Alarm']['0'], 'FRZE');
      applyAlarmToAlarms(dayNode['Alarm']['1'], 'HEAT');

      function applyAlarmToAlarms(alarmNode, description) {
        const minutes = parseInt(alarmNode['t Acc']);
        if (!minutes) return;

        const alarm = {
          condition: description,
          conditionMinutes: minutes,
        };

        const time = alarmNode['TS A'];
        if (time) {
          alarm.alarmTime = new Date(`${date}T${time}:00Z`);
        }

        const count = parseInt(alarmNode['C A']);
        if (count) {
          alarm.count = count;
        }

        report.alarms.push(alarm);
      }
    }

    function applyAggregatesToReport(dayNode) {
      applyTvcToAggregates(dayNode);

      function applyTvcToAggregates(dayNode) {
        report.aggregates.push({
          id: 'TVC',
          min: parseFloat(dayNode['Min T']),
          max: parseFloat(dayNode['Max T']),
          average: parseFloat(dayNode['Avrg T']),
        });
      }
    }
  }

  return result;
}

function parseFridgeTag(text) {
  const result = {};
  const properties = [{ indent: -1, property: result }];

  for (const line of text.split('\n')) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Determine current indent level.
    const indent = line.search(/\S/);

    // If our indent is the same or smaller, it indicates a new property; remove the finished property.
    while (indent <= properties[properties.length - 1].indent) {
      properties.pop();
    }

    const property = properties[properties.length - 1].property;
    const segments = trimmedLine.split(',').map(s => s.trim());

    for (const segment of segments) {
      const pair = getKeyValuePair(segment);
      if (!pair) continue;

      if (pair.value) {
        property[pair.key] = pair.value;
      } else {
        // If the value is empty, create a child property.
        property[pair.key] = {};
        properties.push({ indent, property: property[pair.key] });
      }
    }
  }

  return result;

  function getKeyValuePair(segment) {
    const colonIndex = segment.indexOf(':');
    if (colonIndex === -1) return null;
    const key = segment.slice(0, colonIndex).trim();
    const value = segment.slice(colonIndex + 1).trim();
    return { key, value };
  }
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
