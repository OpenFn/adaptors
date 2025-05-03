import { deepEqual, removeNullProps } from './Utils';

export function parseRtmdCollectionToReports(collection) {
  if (!Array.isArray(collection) || collection.length === 0) {
    console.error('No records to process for report.');
    return null;
  }

  return groupDifferencesAndMergeRecords(collection, 'ESER', 'ABST');
}

export function parseRecordsToReport(records, reqReport, reqRecord) {
  if (!Array.isArray(records) || records.length === 0) {
    console.error('No records to process for report.');
    return null;
  }

  const reportRecord = records[0];
  copyLoggerToEmd(reportRecord);

  return mapProperties(reportRecord, records, reqReport, reqRecord);
}

function groupDifferencesAndMergeRecords(
  collection,
  reportsGroupKey,
  recordsGroupKey
) {
  const grouped = groupByProperty(collection, reportsGroupKey);
  const result = [];

  for (const key in grouped) {
    const group = grouped[key];
    const base = { ...group[0] };

    removeNullProps(base);

    const allRecords = group.flatMap(r => r.records || []);
    const mergedRecords = mergeRecords(allRecords, recordsGroupKey);
    const allProps = getAllProps(group, [reportsGroupKey, 'records']);
    const differingProps = getDifferingProps(group, allProps);
    const differences = buildDifferences(group, base, differingProps);

    base['records'] = mergedRecords;
    base['zDifferences'] = differences;

    result.push(base);
  }

  return result;
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
      mergedRecord['ALRM'] = tambAlrm;
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
  return records
    .map(record => {
      const diff = {};
      for (const prop of differingProps) {
        if (!deepEqual(record[prop], base[prop])) {
          diff[prop] = record[prop];
        }
      }

      if (Object.keys(diff).length > 0) {
        return diff;
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

function copyLoggerToEmd(source) {
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
    if (source[eKey] != null) continue;
    if (source[lKey] != null) source[eKey] = source[lKey];
  }
}
