export function parseMetadata(message) {
  const content = message.metadata?.content;
  if (!content) {
    console.error('No metadata supplied.');
    return null;
  }

  try {
    return JSON.parse(content);
  } catch (error) {
    console.error('Invalid metadata JSON.', error);
    return null;
  }
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

export function parseRecordsToReport(records, reqReport, reqRecord) {
  if (!Array.isArray(records) || records.length === 0) {
    console.error('No records to process for report.');
    return null;
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

  const reportRecord = records[0];
  copyLoggerToEmd(reportRecord);

  return mapProperties(reportRecord, records, reqReport, reqRecord);
}

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

export function removeNullProps(obj) {
  for (const key in obj) {
    if (obj[key] == null) {
      delete obj[key];
    }
  }
  return obj;
}

export function deepEqual(a, b) {
  if (a === b) return true;

  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  )
    return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (!bKeys.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}
