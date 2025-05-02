import { deepEqual, removeNullProps } from './Utils';

export function parseRtmdCollectionToReports(collection) {
  const reports = groupDifferencesAndMergeRecords(collection, 'ESER');

  for (const report of reports) {
    //delete report['records'];
    //report.records = '[redacted]';
  }

  //const report = reports.find(r => r.ESER == '3rkt-5anz-fokmw');
  const report = reports[0];

  console.log(JSON.stringify(report, null, 4));
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
      if (!excludedProps.includes(prop) && item[prop] !== null) {
        props.add(prop);
      }
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

function groupDifferencesAndMergeRecords(
  collection,
  groupByProp,
  recordsGroupKey = 'ABST'
) {
  const grouped = groupByProperty(collection, groupByProp);
  const result = [];

  for (const key in grouped) {
    const group = grouped[key];
    const base = { ...group[0] };

    removeNullProps(base);

    const allRecords = group.flatMap(r => r.records || []);
    const mergedRecords = mergeRecords(allRecords, recordsGroupKey);
    const allProps = getAllProps(group, [groupByProp, 'records']);
    const differingProps = getDifferingProps(group, allProps);
    const differences = buildDifferences(group, base, differingProps);

    base['records'] = mergedRecords;
    base['zDifferences'] = differences;

    result.push(base);
  }

  return result;
}
