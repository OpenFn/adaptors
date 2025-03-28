export function parseMetadata(message) {
  if (!message.metadata?.content) {
    console.error('No metadata supplied.');
    return null;
  }

  try {
    return JSON.parse(message.metadata.content);
  } catch (error) {
    console.error('Invalid metadata JSON.', error);
    return null;
  }
}

export function mapEmsProperties(root, records, reqRoot, reqRecord) {
  const def = {
    root: (
      'ACAT,ADOP,AMFR,AMOD,APQS,ASER,' +
      'CID,CNAM,CSER,CSOF,EDOP,EMFR,' +
      'EMOD,EMSV,EPQS,ESER,LAT,LDOP,' +
      'LMFR,LMOD,LNG,LPQS,LSER,LSV'
    ).split(','),

    record: (
      'ABST,ALRM,BEMD,BLOG,CMPR,CMPS,' +
      'DCCD,DCSV,DORV,DRCV,EERR,LERR,' +
      'SVA,TAMB,TVC'
    ).split(','),
  };

  const resolveReqKeys = (option, defaults) => {
    if (option === true) return defaults;
    if (typeof option === 'string' && option.trim()) {
      return option.split(',').map(k => k.trim());
    }
    return [];
  };

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

  if (!root) return null;

  const reqRootKeys = resolveReqKeys(reqRoot, def.root);
  const reqRecordKeys = resolveReqKeys(reqRecord, def.record);

  const rootKeys = [...new Set([...def.root, ...reqRootKeys])];
  const recordKeys = [...new Set([...def.record, ...reqRecordKeys])];

  const rootResult = extract(root, rootKeys, reqRootKeys);
  const recordResults =
    records
      ?.map(record => extract(record, recordKeys, reqRecordKeys))
      .filter(record => Object.keys(record).length > 0) ?? [];

  return {
    ...rootResult,
    records: recordResults,
  };
}
