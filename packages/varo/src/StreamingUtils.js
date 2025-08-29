import { deepEqual, removeNullProps } from './Utils';

export function parseRtmdCollectionToReports(collection) {
  if (!Array.isArray(collection) || collection.length === 0) {
    console.error('No records to process for report.');
    return null;
  }

  return groupDifferencesAndMergeRecords(collection, 'ESER', 'ABST');
}

export function parseFlatRecordsToReports(collection, reqReport, reqRecord) {
  if (!Array.isArray(collection) || collection.length === 0) {
    console.error('No records to process for report.');
    return null;
  }

  const reports = [];
  const groups = groupByProperty(collection, 'LSER');

  for (const key in groups) {
    const records = groups[key];
    const reportRecord = records[0];

    const report = mapProperties(reportRecord, records, reqReport, reqRecord);
    promoteDeviceProperties(report, 'E');

    reports.push(report);
  }

  return reports;
}

function groupDifferencesAndMergeRecords(
  collection,
  reportsGroupKey,
  recordsGroupKey
) {
  const groups = groupByProperty(collection, reportsGroupKey);
  const reports = [];

  for (const key in groups) {
    const rawReports = groups[key];
    const report = { ...rawReports[0] };

    removeNullProps(report);

    const allRecords = rawReports.flatMap(r => r.records || []);
    const mergedRecords = mergeRecords(allRecords, recordsGroupKey);
    const allProps = getAllProps(rawReports, [reportsGroupKey, 'records']);
    const differingProps = getDifferingProps(rawReports, allProps);
    const differences = buildDifferences(rawReports, report, differingProps);

    report['records'] = mergedRecords;
    report['zDifferences'] = differences;

    promoteDeviceProperties(report, 'L');

    reports.push(report);
  }

  return reports;
}

function groupByProperty(collection, property) {
  return collection.reduce((acc, item) => {
    const key = item[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

function mergeRecords(records, groupKey) {
  const grouped = groupByProperty(records, groupKey);
  const merged = [];

  for (const key in grouped) {
    const group = grouped[key];
    const mergedRecord = {};

    let tvcAlrm = null;
    let tambAlrm = null;

    for (const record of group) {
      Object.assign(mergedRecord, record);

      const alrm = record['ALRM'];
      if (alrm != null) {
        if ('TVC' in record) tvcAlrm = alrm;
        if ('TAMB' in record) tambAlrm = alrm;
      }
    }

    if (tambAlrm != null) {
      mergedRecord['zTambAlrm'] = tambAlrm;

      // Do not assign ambient temperature alarms (tambAlrm) to ALRM when merging.
      // Business logic specifies they are not considered true alarms.
    }

    if (tvcAlrm != null) {
      mergedRecord['zTvcAlrm'] = tvcAlrm;
      mergedRecord['ALRM'] = tvcAlrm;
    }

    removeNullProps(mergedRecord);

    merged.push(mergedRecord);
  }

  return merged;
}

function getAllProps(collection, excludedProps = []) {
  const props = new Set();
  for (const item of collection) {
    for (const prop in item) {
      if (excludedProps.includes(prop)) continue;
      if (item[prop] === null) continue;
      props.add(prop);
    }
  }

  return Array.from(props);
}

function getDifferingProps(records, props) {
  const differing = [];
  for (const prop of props) {
    const firstValue = records[0][prop];
    const isDifferent = records.some(r => !deepEqual(r[prop], firstValue));
    if (isDifferent) {
      differing.push(prop);
    }
  }

  return differing;
}

function buildDifferences(records, base, differingProps) {
  const uniqueSet = new Set();

  return records
    .map(record => {
      const diff = {};
      for (const prop of differingProps) {
        if (!deepEqual(record[prop], base[prop])) {
          diff[prop] = record[prop];
        }
      }

      // Sort properties to ensure consistent order
      const sortedDiff = Object.keys(diff)
        .sort()
        .reduce((acc, key) => {
          acc[key] = diff[key];
          return acc;
        }, {});

      // Create a unique key based on the sorted difference object
      const key = JSON.stringify(sortedDiff);

      // Only include if not already present and has differences
      if (Object.keys(diff).length > 0 && !uniqueSet.has(key)) {
        uniqueSet.add(key);
        return sortedDiff;
      }

      return null;
    })
    .filter(Boolean);
}

// These report properties are also allowed in the record,
// used for overriding report characteristics per record:
// EDOP, EMSV, LACC, LAT, LNG, LSV, SIGN

const defs = {
  report: (
    'ACAT,ADOP,AID,AMFR,AMID,AMOD,APQS,ASER,CDAT,CDAT2,CID,CNAM,CNAM2,' +
    'CSER,CSER2,CSOF,CSOF2,DLST,DNAM,EDOP,EID,EMFR,EMOD,EMSV,EPQS,ESER,' +
    'FID,FNAM,LACC,LAT,LDOP,LID,LMFR,LMOD,LNG,LPQS,LSER,LSV,RNAM,SIGN'
  ).split(','),

  record: (
    'ABST,ACCD,ACSV,ALRM,BEMD,BLOG,CMPR,CMPR2,CMPS,CMPS2,CSOF,CSOF2,' +
    'DCCD,DCSV,DORF,DORV,DRCF,DRCV,EERR,FANS,HAMB,HCOM,HOLD,IDRF,IDRV,' +
    'LERR,MSW,SVA,TAMB,TCON,TCON2,TFRZ,TPCB,TPCB2,TVC'
  ).split(','),
};

function mapProperties(report, records, reqReport, reqRecord) {
  function resolveReqKeys(option, defaults) {
    if (option === true) return defaults;
    if (typeof option === 'string' && option.trim()) {
      return option.split(',').map(k => k.trim());
    }
    return [];
  }

  function extract(source, keys, reqKeys) {
    const result = {};
    for (const key of keys) {
      if (key in source && source[key] !== null) {
        result[key] = source[key];
      } else if (reqKeys.includes(key)) {
        result[key] = null;
      }
    }
    return result;
  }

  if (!report) return null;

  const reqReportKeys = resolveReqKeys(reqReport, defs.report);
  const reqRecordKeys = resolveReqKeys(reqRecord, defs.record);

  const reportKeys = [...new Set([...defs.report, ...reqReportKeys])];
  const recordKeys = [...new Set([...defs.record, ...reqRecordKeys])];

  const reportResult = extract(report, reportKeys, reqReportKeys);
  const recordResults =
    records
      ?.map(record => extract(record, recordKeys, reqRecordKeys))
      .filter(record => Object.keys(record).length > 0) ?? [];

  return {
    ...reportResult,
    records: recordResults,
  };
}

function promoteDeviceProperties(source, destination) {
  const keyPairs = [
    ['LID', 'EID'],
    ['LMFR', 'EMFR'],
    ['LMOD', 'EMOD'],
    ['LSER', 'ESER'],
    ['LDOP', 'EDOP'],
    ['LSV', 'EMSV'],
    ['LPQS', 'EPQS'],
  ];

  for (const [lKey, eKey] of keyPairs) {
    const [fromKey, toKey] = destination === 'E' ? [lKey, eKey] : [eKey, lKey];

    if (source[toKey] != null) continue;
    if (source[fromKey] != null) source[toKey] = source[fromKey];
  }
}
