export const validateRequestBody = (request, sample) => {
  // Check top-level keys
  const sampleKeys = Object.keys(sample);
  const requestKeys = Object.keys(request);

  for (const key of sampleKeys) {
    // make sure all keys are present
    if (!requestKeys.includes(key)) {
      console.log('Key missing:', key);
      return false;
    }

    // make sure all the value of all keys have the same value type
    if (typeof sample[key] != typeof request[key]) {
      console.log('Key with wrong value type:', key);
      return false;
    }

    // If the value is an object, recursively validate
    // can we check the keys of each key (assuming it's an object)
    if (typeof sample[key] === 'object' && sample[key] !== null) {
      if (!validateRequestBody(request[key], sample[key])) {
        console.log('Failed check at:', key);
        return false;
      }
    }
  }

  return true;
};
