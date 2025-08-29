export function parseFridgeTagToReport(metadata, nodes) {
  const report = {};
  const records = [];
  const zReports = [];

  applyMetadataToReport();
  applyNodesToReport();

  report.records = records;
  report.zReports = zReports;

  return report;

  function applyMetadataToReport() {
    applyPropertyToReport('AMFR', metadata?.refrigerator?.manufacturer);
    applyPropertyToReport('AMOD', metadata?.refrigerator?.model);
    applyPropertyToReport('LMFR', metadata?.refrigerator?.deviceManufacturer);

    applyPropertyToReport('CID', metadata?.facility?.country);

    applyPropertyToReport('LAT', metadata?.location?.used?.latitude);
    applyPropertyToReport('LNG', metadata?.location?.used?.longitude);
    applyPropertyToReport('LACC', metadata?.location?.used?.accuracy);
  }

  function applyNodesToReport() {
    applyPropertyToReport('LMOD', nodes['Device']);
    applyPropertyToReport('LSER', nodes['Conf']?.['Serial']);
    applyPropertyToReport('LSV', nodes['Fw Vers']);

    let productionDate = nodes['Conf']?.['Test TS'];
    productionDate = productionDate ? new Date(productionDate) : null;
    applyPropertyToReport('LDOP', productionDate);

    let dayIndex = 1;
    let dayNode;
    while ((dayNode = nodes['Hist']?.[dayIndex++]) !== undefined) {
      applyDayToRecords(dayNode);
      applyDayToZReports(dayNode);
    }
  }

  function applyPropertyToReport(property, text) {
    if (!text) return;
    report[property] = text;
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
      const alarm = parseAlarm(
        dayNode['Alarm']?.[alarmField],
        alarmDescription
      );

      records.push({
        ABST: dateTime,
        TVC: temp,
        ALRM: alarm,
        zDescription: date + ' ' + tempField,
      });

      function parseAlarm(alarmNode, description) {
        if (alarmNode['t Acc'] === '0') return null;
        return description + (alarmNode['C A'] !== '0' ? 'ACK' : '');
      }
    }
  }

  function applyDayToZReports(dayNode) {
    const report = {
      date: new Date(dayNode['Date']),
      duration: '1D',
      alarms: [],
      aggregates: [],
    };

    applyAlarmsToZReport(dayNode);
    applyAggregatesToZReport(dayNode);

    zReports.push(report);

    function applyAlarmsToZReport(dayNode) {
      const date = dayNode['Date'];

      applyAlarmToAlarms(dayNode['Alarm']?.['0'], 'FRZE');
      applyAlarmToAlarms(dayNode['Alarm']?.['1'], 'HEAT');

      function applyAlarmToAlarms(alarmNode, description) {
        if (!alarmNode) return;

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

    function applyAggregatesToZReport(dayNode) {
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
}

export function parseFridgeTag(text) {
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
