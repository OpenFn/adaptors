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

export function formatDeviceInfo(data) {
  function formatType(label, mfr, mod, ser) {
    let output = '';

    if (mfr || mod || ser) {
      output += `${label}\n`;

      if (mfr) {
        output += `  Manufacturer: ${mfr}\n`;
      }

      if (mod) {
        output += `  Model: ${mod}\n`;
      }

      if (ser) {
        output += `  Serial Number: ${ser}\n`;
      }

      output += '\n';
    }

    return output;
  }

  let output = '';

  output += formatType('Appliance', data.AMFR, data.AMOD, data.ASER);
  output += formatType('Logger', data.LMFR, data.LMOD, data.LSER);
  output += formatType('EMD', data.EMFR, data.EMOD, data.ESER);

  return output || 'No valid data found';
}
